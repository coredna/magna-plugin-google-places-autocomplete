/**
 * Magna Plugin: Google Places Autocomplete v1.0.0 (https://github.com/coredna/magna)
 * Copywrite 2020 Andrew Fountain
 * Released under the MIT license 
 */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var $ = _interopDefault(require('jquery'));
var magna = require('@coredna/magna');

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly) symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    });
    keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};

    if (i % 2) {
      ownKeys(Object(source), true).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }

  return target;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  if (superClass) _setPrototypeOf(subClass, superClass);
}

function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}

function _isNativeReflectConstruct() {
  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === "function") return true;

  try {
    Date.prototype.toString.call(Reflect.construct(Date, [], function () {}));
    return true;
  } catch (e) {
    return false;
  }
}

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

function _possibleConstructorReturn(self, call) {
  if (call && (typeof call === "object" || typeof call === "function")) {
    return call;
  }

  return _assertThisInitialized(self);
}

function _createSuper(Derived) {
  return function () {
    var Super = _getPrototypeOf(Derived),
        result;

    if (_isNativeReflectConstruct()) {
      var NewTarget = _getPrototypeOf(this).constructor;

      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }

    return _possibleConstructorReturn(this, result);
  };
}

function _classPrivateFieldGet(receiver, privateMap) {
  var descriptor = privateMap.get(receiver);

  if (!descriptor) {
    throw new TypeError("attempted to get private field on non-instance");
  }

  if (descriptor.get) {
    return descriptor.get.call(receiver);
  }

  return descriptor.value;
}

function _classPrivateMethodGet(receiver, privateSet, fn) {
  if (!privateSet.has(receiver)) {
    throw new TypeError("attempted to get private field on non-instance");
  }

  return fn;
}

var _Symbol$toStringTag;
_Symbol$toStringTag = Symbol.toStringTag;

var GooglePlacesAutocomplete = /*#__PURE__*/function (_Plugin) {
  _inherits(GooglePlacesAutocomplete, _Plugin);

  var _super = _createSuper(GooglePlacesAutocomplete);

  function GooglePlacesAutocomplete(_config) {
    var _this;

    _classCallCheck(this, GooglePlacesAutocomplete);

    _this = _super.call(this, _config);

    _initializeAutocomplete.add(_assertThisInitialized(_this));

    _defineProperty(_assertThisInitialized(_this), _Symbol$toStringTag, 'GooglePlacesAutocomplete');

    _defineProperty(_assertThisInitialized(_this), "autocomplete", null);

    _defineProperty(_assertThisInitialized(_this), "_state", new magna.State({}));

    _reduceAddressComponents.set(_assertThisInitialized(_this), {
      writable: true,
      value: function value(addressComponents) {
        var accumulator = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        Object.keys(componentForm).forEach(function (key) {
          var component = componentForm[key];
          var field = _this.config.fields[component.name];
          if (!field) return;

          for (var ii = 0; ii < addressComponents.length; ii++) {
            var addressItem = addressComponents[ii];

            if (addressItem.types.includes(key)) {
              accumulator[component.name] = addressItem[field.type || component.type];
            }
          }
        });
        return accumulator;
      }
    });

    _defineProperty(_assertThisInitialized(_this), "onPlaceChanged", function () {
      var place = _this.autocomplete.getPlace();

      if (typeof _this.config.onPlaceChanged === 'function') {
        var result = _this.config.onPlaceChanged.call(_assertThisInitialized(_this), place);

        if (result === false) {
          return;
        }
      }

      var addressComponents = place.address_components;

      var fields = _classPrivateFieldGet(_assertThisInitialized(_this), _reduceAddressComponents).call(_assertThisInitialized(_this), addressComponents);

      var value = _this.$input.val();

      var address = value.substr(0, value.indexOf(','));

      _this._state.setState('fields', function (_) {
        return _objectSpread2({}, fields, {
          address: address
        });
      });

      _this._state.addressComponents = addressComponents;
    });

    _defineProperty(_assertThisInitialized(_this), "updateFields", function (values) {
      Object.keys(_this.config.fields).forEach(function (key) {
        var field = _this.config.fields[key];
        $(field.selector).val(values[key]);
      });
    });

    _loadPlacesApi.set(_assertThisInitialized(_this), {
      writable: true,
      value: function value(_ref) {
        var config = _ref.config;
        return new Promise(function (res, rej) {
          var _window, _window$google;

          if ((_window = window) === null || _window === void 0 ? void 0 : (_window$google = _window.google) === null || _window$google === void 0 ? void 0 : _window$google.maps) {
            _classPrivateMethodGet(_assertThisInitialized(_this), _initializeAutocomplete, _initializeAutocomplete2).call(_assertThisInitialized(_this));

            return res();
          }

          window.initAutocomplete = _classPrivateMethodGet(_assertThisInitialized(_this), _initializeAutocomplete, _initializeAutocomplete2).bind(_assertThisInitialized(_this));
          var script = document.createElement('script');
          script.src = "https://maps.google.com/maps/api/js?" + $.param({
            libraries: 'places',
            language: config.language,
            callback: 'initAutocomplete',
            key: config.API_KEY
          });

          script.onload = function () {
            return res({
              success: true,
              message: 'google autocomplete loaded'
            });
          };

          script.onerror = function () {
            return rej(new Error('failed to load google places autocomplete'));
          };

          document.head.appendChild(script);
        });
      }
    });

    _disableEnter.set(_assertThisInitialized(_this), {
      writable: true,
      value: function value(e) {
        if (e.keyCode === 13) {
          e.preventDefault();
          e.stopPropagation();
        }
      }
    });

    if (!_this.config.API_KEY) throw new Error('missing google places API_KEY from config');
    return _this;
  }

  _createClass(GooglePlacesAutocomplete, [{
    key: "initPromise",
    value: function initPromise(_ref2) {
      var request = _ref2.request;
      return _classPrivateFieldGet(this, _loadPlacesApi).call(this, {
        request: request,
        config: this.config
      });
    }
  }, {
    key: "init",
    value: function init(_ref3) {
      var request = _ref3.request,
          config = _ref3.config;

      this._state.subscribe('fields', this.config.updateFields || this.updateFields);
    }
  }]);

  return GooglePlacesAutocomplete;
}(magna.Plugin);

var _reduceAddressComponents = new WeakMap();

var _initializeAutocomplete = new WeakSet();

var _loadPlacesApi = new WeakMap();

var _disableEnter = new WeakMap();

_defineProperty(GooglePlacesAutocomplete, "prefixDefaultFields", function (prefix) {
  return {
    country: {
      selector: "[name=\"".concat(prefix, "countryid\"]"),
      type: 'short_name'
    },
    unit: {
      selector: "[name=\"".concat(prefix, "address2\"]"),
      type: 'long_name'
    },
    address: {
      selector: "[name=\"".concat(prefix, "address1\"]"),
      type: 'long_name'
    },
    postcode: {
      selector: "[name=\"".concat(prefix, "postcode\"]"),
      type: 'short_name'
    },
    city: {
      selector: "[name=\"".concat(prefix, "city\"]"),
      type: 'long_name'
    },
    state: {
      selector: "[name=\"".concat(prefix, "state\"]"),
      type: 'short_name'
    }
  };
});

_defineProperty(GooglePlacesAutocomplete, "defaultFields", GooglePlacesAutocomplete.prefixDefaultFields(''));

_defineProperty(GooglePlacesAutocomplete, "defaultConfig", {
  API_KEY: '',
  country: 'US',
  fields: {},
  language: 'en-US',
  selector: '#google-autocomplete'
});

var _initializeAutocomplete2 = function _initializeAutocomplete2() {
  if (location.hostname === 'localhost' || location.hostname === '127.0.0.1') return false;
  this.$input = $(this.config.selector);
  this.autocomplete = new google.maps.places.Autocomplete(this.$input.get(0), {
    types: ['geocode'],
    componentRestrictions: {
      country: this.config.country
    }
  });
  this.autocomplete.addListener('place_changed', this.onPlaceChanged);
  this.$input.on('keydown keyup keypress', _classPrivateFieldGet(this, _disableEnter));
};
var componentForm = {
  street_number: {
    type: 'short_name',
    name: 'street_number'
  },
  route: {
    type: 'short_name',
    name: 'street'
  },
  colloquial_area: {
    type: 'long_name',
    name: 'city'
  },
  postal_town: {
    type: 'short_name',
    name: 'city'
  },
  neighborhood: {
    type: 'long_name',
    name: 'city'
  },
  sublocality: {
    type: 'long_name',
    name: 'city'
  },
  locality: {
    type: 'long_name',
    name: 'city'
  },
  postal_code_prefix: {
    type: 'short_name',
    name: 'postcode'
  },
  postal_code: {
    type: 'short_name',
    name: 'postcode'
  },
  administrative_area_level_1: {
    type: 'short_name',
    name: 'state'
  },
  country: {
    type: 'short_name',
    name: 'countryId'
  }
};

exports.default = GooglePlacesAutocomplete;
//# sourceMappingURL=magna-plugin-google-places-autocomplete.common.js.map
