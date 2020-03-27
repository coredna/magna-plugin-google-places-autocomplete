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
    if (!this.config.API_KEY)
      throw new Error('missing google places API_KEY from config')
  }

  initPromise({ request }) {
    return this.#loadPlacesApi({ request, config: this.config })
  }

  init({ request, config }) {
    this._state.subscribe('fields', this.config.updateFields || this.updateFields)
  }


  #reduceAddressComponents = (addressComponents, accumulator = {}) => {
    // loop through  all the components in the componentForm object
    Object.keys(componentForm).forEach(key => {
      const component = componentForm[key]
      const field = this.config.fields[component.name]
      if (!field) return
      // loop through each address item to find the value we are looking for
      for (let ii = 0; ii < addressComponents.length; ii++) {
        const addressItem = addressComponents[ii]
        // if we find an addressItem with a matching type use it to set the field
        if (addressItem.types.includes(key)) {
          accumulator[component.name] = addressItem[field.type || component.type]
        }
      }
    })
    return accumulator
  }

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
    const place = this.autocomplete.getPlace();
    // allow access to the place from the configuration
    if (typeof this.config.onPlaceChanged === 'function') {
      const result = this.config.onPlaceChanged.call(this, place)
      // allow overriding the default behavior by returning false
      if (result === false) {
        return
      }
    }
    const addressComponents = place.address_components
    const fields = this.#reduceAddressComponents(addressComponents)
    const value = this.$input.val()
    // the street address that is returned from google generally misses unit numbers
    // we will grab everything before the first comma to set the street address
    const address = value.substr(0, value.indexOf(','))

    this._state.setState('fields', _ => ({
      ...fields,
      address,
    }))
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
 * we will loop through each key until we find one that matches
 * */
const componentForm = {
  street_number: {
    type: 'short_name',
    name: 'street_number',
  },
  route: {
    type: 'short_name',
    name: 'street',
  },
  colloquial_area: {
    type: 'long_name',
    name: 'city',
  },
  postal_town: {
    type: 'short_name',
    name: 'city',
  },
  neighborhood: {
    type: 'long_name',
    name: 'city',
  },
  sublocality: {
    type: 'long_name',
    name: 'city',
  },
  locality: {
    type: 'long_name',
    name: 'city',
  },
  postal_code_prefix: {
    type: 'short_name',
    name: 'postcode',
  },
  postal_code: {
    type: 'short_name',
    name: 'postcode',
  },
  administrative_area_level_1: {
    type: 'short_name',
    name: 'state',
  },
  country: {
    type: 'short_name',
    name: 'countryId'
  }
}
