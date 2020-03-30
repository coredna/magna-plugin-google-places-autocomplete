# Magna Plugin: GooglePlacesAutocomplete

This plugin will add the functionality for a [google places autocomplete](https://developers.google.com/maps/documentation/javascript/examples/places-autocomplete) to be added to your page.

You do not need to include the google places script in your page as this code will handle loading the api when only the `API_KEY` is specified

By default you provide it with the fields, their type and their matching selector in your page
and it will fill in the details with what is returned from the google api request.

```javascript
import Magna from '@coredna/magna'
import GooglePlacesAutocomplete from '@coredna/magna-plugin-google-places-autocomplete'

const app = new Magna([
  new GooglePlacesAutocomplete({
    selector: '#my-selector',
    fields: GooglePlacesAutocomplete.defaultFields,
    API_KEY: 'AIzaSyA....',
  })
]).start()
```

## Install
Install through either [npm](https://www.npmjs.com/package/@coredna/magna-plugin) or *yarn*
```bash
npm install @coredna/magna-plugin-google-places-autocomplete
```
or
```bash
yarn add @coredna/magna-plugin-google-places-autocomplete
```

## Config
| property | type | default | required | Description |
|---       |---    |---      |---       |---         |
| API_KEY | string | `null` | true | Google places API KEY
| country | string | `'US'` | false | Country code, can specify multiple with comma separation `'US,AU'` |
| fields | object | `{}` | false | Object of fields containing key, selector and type see [Fields](#fields)

## Fields
You can set your own fields you can use any of:

| property | type | default | required | Description |
|---       |---    |---      |---       |---         |
| address | object | `{ selector: '[name="address1"]', type: 'long_name' }` | false | Street address eg. `'348 High Street'` |
| unit | object | `{ selector: '[name="address2"]', type: 'long_name' }` | false | Unit number "address_line2" eg. `'Unit 1'` |
| city | object | `{ selector: '[name="city"]', type: 'long_name' }` | false | Nearest city (suburb) eg. `'Windsor'` |
| postcode | object | `{ selector: '[name="postcode"]', type: 'long_name' }` | false | Postal code (Zip code) eg. `'3182'` |
| state | object | `{ selector: '[name="state"]', type: 'long_name' }` | false | State eg. `'VIC'` `'Victoria'` |
| country | object | `{ selector: '[name="countryid"]', type: 'long_name' }` | false | Country eg. `'AU'` `'Australia'`|

| type | description |
|---   |---    |
| long_name | Long version of the value eg. `'Victoria'` |
| short_name | Short version of the value eg. `'VIC'` |

```javascript
const fields = {
  ['address|unit|postcode|city|state|country']: {
    selector: '[name="my_field_name"]',
    type: 'long_name|short_name'
  }
}
```

## Default field objects
To help save time `GooglePlacesAutocomplete` has a static property `defaultFields` with useful defaults you should be able to use in your code immediately, but you cant still extend or modify
```javascript
GooglePlacesAutocomplete.defaultFields = {
 country: {
   selector: '[name=countryid]',
   type: 'short_name'
 },
 unit: {
   selector: '[name=address2]',
   type: 'long_name'
 },
 address: {
   selector: '[name=address1]',
   type: 'long_name'
 },
 postcode: {
   selector: '[name=postcode]',
   type: 'short_name'
 },
 city: {
   selector: '[name=city]',
   type: 'long_name'
 },
 state: {
   selector: '[name=state]',
   type: 'short_name'
 }
}
```

If you need to update the fields to have a prefix you can do so using the static method `GooglePlacesAutocomplet.prefixDefaultFields(prefix)`

```javascript
const userPrefixedFields = GooglePlacesAutocomplete.prefixDefaultFields('user_') // => { address: { selector: '[name=user_address1]'} ...}
```

### Extend default fields
Using ES6 you can select specific entries, and extend or create your own
```javascript
// extract individual default fields
const { address, country } = GooglePlacesAutocomplete.defaultFields
new GooglePlacesAutocomplete({
  selector: '#my-selector',
  API_KEY: 'AIzaSyA....',
  fields: {
    address,
    country: { ...country, selector: '#my-custom-selector' },
    city: { selector: '#my-custom-selector', type: 'long_name' },
  },
})
```

### Events
You are able to hook into the google places api event `onPlaceChange`, and assigning the formatted values to your site using `updateFields`

```javascript
const { address, country } = GooglePlacesAutocomplete.defaultFields
new GooglePlacesAutocomplete({
  onPlaceChange(place) {
    // do something with the place object
    return false // if you return false it will cancel the default behaviour
  },
  updateFields(fields) {
    console.log(fields)
  }
})
```
