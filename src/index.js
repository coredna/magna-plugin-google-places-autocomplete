import $ from 'jquery'
import { Plugin, State } from '@coredna/magna'

export default class GooglePlacesAutocomplete extends Plugin {

  [Symbol.toStringTag] = 'GooglePlacesAutocomplete'

  autocomplete = null

  _state = new State({})

  /**
   * Using this format you can specify the fields you wish to use from google autocomplete and their matching input selector
   *
   * @type {{country: {selector: string, type: string}, unit: {selector: string, type: string}, address: {selector: string, type: string}, city: {selector: string, type: string}, postcode: {selector: string, type: string}, state: {selector: string, type: string}}}
   */
   static prefixDefaultFields = prefix => ({
    country:  { selector: `[name="${prefix}countryid"]`, type: 'short_name' },
    unit:     { selector: `[name="${prefix}address2"]`, type: 'long_name' },
    address:  { selector: `[name="${prefix}address1"]`, type: 'long_name' },
    postcode: { selector: `[name="${prefix}postcode"]`, type: 'short_name' },
    city:     { selector: `[name="${prefix}city"]`, type: 'long_name' },
    state:    { selector: `[name="${prefix}state"]`, type: 'short_name' },
  })

  // Create the default fields without a prefix
  static defaultFields = GooglePlacesAutocomplete.prefixDefaultFields('')


  static defaultConfig = {
    API_KEY: '',
    country: 'US',
    fields: {},
    language: 'en-US',
    selector: '#google-autocomplete',
  }


  constructor(config) {
    super(config);
  }


  initPromise({ request }) {
    return this.#loadPlacesApi({ request, config: this.config })
  }


  init({ request, config }) {
    if (!this.config.API_KEY)
      throw new Error('missing google places API_KEY from GooglePlacesAutocomplete config')
    this._state.subscribe('fields', this.config.updateFields || this.updateFields)
  }


  #reduceAddressComponents = (addressComponents, accumulator = {}) =>
    // key the address components by their first declared type
    addressComponents.reduce((acc, x) => ({
      ...acc,
      [x.types[0]]: {
        long_name: x.long_name,
        short_name: x.short_name,
      }
    }), {})


  #normalizeAddressComponents = addressObj =>
    // loop through componentForm attempting to fill in each `name` in the fields object using the `key` for the address object above
    componentForm.reduce((acc, { key, type, name }) => ({
      ...acc,
      ...(typeof acc[name] === 'undefined' && {
        [name]: addressObj[key]
      })
    }), {})


  #initializeAutocomplete() {
    // don't initialize the autocomplete on localhost as the google api key will fail
    if (location.hostname === 'localhost' || location.hostname === '127.0.0.1')
      return false
    this.$input = $(this.config.selector)
    // initialize google autocomplete
    this.autocomplete = new google.maps.places.Autocomplete(
      this.$input.get(0),
      {
        types: ['geocode'],
        componentRestrictions: { country: this.config.country }
      });
    this.autocomplete.addListener('place_changed', this.onPlaceChanged);
    // disable the enter key in the autosuggest
    this.$input.on('keydown keyup keypress', this.#disableEnter)
  }

  onPlaceChanged = () => {
    const value = this.$input.val()
    // the street address that is returned from google generally misses unit numbers
    // we will grab everything before the first comma to set the street address
    const address = value.substr(0, value.indexOf(','))

    const place = this.autocomplete.getPlace();
    const addressComponents = place.address_components
    const addressComponentObject = this.#reduceAddressComponents(addressComponents)
    const normalized = this.#normalizeAddressComponents(addressComponentObject)
    // take the normalized field values, using the type specified in the `fields` object
    const fields = Object.keys(this.config.fields).reduce((acc, key) => ({
      ...acc,
      ...(typeof normalized[key] !== 'undefined' && {
        [key]: normalized[key][this.config.fields[key].type]
      }),
    }), { address })
    // allow access to the place from the configuration
    if (typeof this.config.onPlaceChanged === 'function') {
      const result = this.config.onPlaceChanged.call(this, {
        place,
        addressComponentObject,
        address: normalized,
        fields
      })
      // allow overriding the default behavior by returning false
      if (result === false) {
        return
      }
    }

    this._state.setState('fields', _ => fields)
    // the original google address response is saved incase there are any issues
    this._state.addressComponents = addressComponents
  }


  updateFields = values => {
    Object.keys(this.config.fields).forEach(key => {
      const field = this.config.fields[key]
      $(field.selector).val(values[key])
    })
  }


  #loadPlacesApi = ({ config }) => new Promise((res, rej) => {
    if (window?.google?.maps) {
      this.#initializeAutocomplete()
      return res()
    }
    window.initAutocomplete = this.#initializeAutocomplete.bind(this)
    const script = document.createElement('script')
    script.src=`https://maps.google.com/maps/api/js?` + $.param({
      libraries: 'places',
      language: config.language,
      callback: 'initAutocomplete',
      key: config.API_KEY
    })
    script.onload = () => res({ success: true, message: 'google autocomplete loaded' })
    script.onerror = () => rej(new Error('failed to load google places autocomplete'))
    document.head.appendChild(script)
  })


  #disableEnter = e => {
    if (e.keyCode === 13) {
      e.preventDefault()
      e.stopPropagation()
    }
  }

}
/*
 * this will attempt to find the most relevant piece of information from the google response
 * to normalize the names to more closely match core dna. we will loop through each key until we find one that matches
 * */

/**
 *
 * @param {String}  name  name of the normalized key
 * @param {Array<String>}  order  order of lookup for the google address component type, higher index means higher precedence
 * @returns {key, name}
 */
const createComponentLookup = (name, order) =>
  order.map(key => ({
    key,
    name
  }))

const componentForm = [
  ...createComponentLookup('street_number', ['street_number']),
  ...createComponentLookup('street', ['street']),
  ...createComponentLookup('city', ['locality', 'sublocality', 'neighborhood', 'postal_town', 'colloquial_area']),
  ...createComponentLookup('suburb', ['postal_town', 'neighborhood', 'colloquial_area', 'locality', 'sublocality']),
  ...createComponentLookup('postcode', ['postal_code', 'postal_code_prefix']),
  ...createComponentLookup('state', ['administrative_area_level_1', 'administrative_area_level_2']),
  ...createComponentLookup('country', ['country']),
]
