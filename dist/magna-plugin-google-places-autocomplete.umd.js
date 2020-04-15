/**
 * Magna Plugin: Google Places Autocomplete v1.0.1 (https://github.com/coredna/magna)
 * Copywrite 2020 Andrew Fountain
 * Released under the MIT license 
 */
var GooglePlacesAutocomplete = (function (exports, $, magna) {
  'use strict';

  $ = $ && Object.prototype.hasOwnProperty.call($, 'default') ? $['default'] : $;

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

  function _toConsumableArray(arr) {
    return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
  }

  function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) return _arrayLikeToArray(arr);
  }

  function _iterableToArray(iter) {
    if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);
  }

  function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(n);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
  }

  function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;

    for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

    return arr2;
  }

  function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
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
          return addressComponents.reduce(function (acc, x) {
            return _objectSpread2({}, acc, _defineProperty({}, x.types[0], {
              long_name: x.long_name,
              short_name: x.short_name
            }));
          }, {});
        }
      });

      _normalizeAddressComponents.set(_assertThisInitialized(_this), {
        writable: true,
        value: function value(addressObj) {
          return componentForm.reduce(function (acc, _ref) {
            var key = _ref.key,
                type = _ref.type,
                name = _ref.name;
            return _objectSpread2({}, acc, {}, typeof acc[name] === 'undefined' && _defineProperty({}, name, addressObj[key]));
          }, {});
        }
      });

      _defineProperty(_assertThisInitialized(_this), "onPlaceChanged", function () {
        var value = _this.$input.val();

        var address = value.substr(0, value.indexOf(','));

        var place = _this.autocomplete.getPlace();

        var addressComponents = place.address_components;

        var addressComponentObject = _classPrivateFieldGet(_assertThisInitialized(_this), _reduceAddressComponents).call(_assertThisInitialized(_this), addressComponents);

        var normalized = _classPrivateFieldGet(_assertThisInitialized(_this), _normalizeAddressComponents).call(_assertThisInitialized(_this), addressComponentObject);

        var fields = Object.keys(_this.config.fields).reduce(function (acc, key) {
          return _objectSpread2({}, acc, {}, typeof normalized[key] !== 'undefined' && _defineProperty({}, key, normalized[key][_this.config.fields[key].type]));
        }, {
          address: address
        });

        if (typeof _this.config.onPlaceChanged === 'function') {
          var result = _this.config.onPlaceChanged.call(_assertThisInitialized(_this), {
            place: place,
            addressComponentObject: addressComponentObject,
            address: normalized,
            fields: fields
          });

          if (result === false) {
            return;
          }
        }

        _this._state.setState('fields', function (_) {
          return fields;
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
        value: function value(_ref4) {
          var config = _ref4.config;
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

      return _this;
    }

    _createClass(GooglePlacesAutocomplete, [{
      key: "initPromise",
      value: function initPromise(_ref5) {
        var request = _ref5.request;
        return _classPrivateFieldGet(this, _loadPlacesApi).call(this, {
          request: request,
          config: this.config
        });
      }
    }, {
      key: "init",
      value: function init(_ref6) {
        var request = _ref6.request,
            config = _ref6.config;
        if (!this.config.API_KEY) throw new Error('missing google places API_KEY from GooglePlacesAutocomplete config');

        this._state.subscribe('fields', this.config.updateFields || this.updateFields);
      }
    }]);

    return GooglePlacesAutocomplete;
  }(magna.Plugin);

  var _reduceAddressComponents = new WeakMap();

  var _normalizeAddressComponents = new WeakMap();

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

  var createComponentLookup = function createComponentLookup(name, order) {
    return order.map(function (key) {
      return {
        key: key,
        name: name
      };
    });
  };

  var componentForm = [].concat(_toConsumableArray(createComponentLookup('street_number', ['street_number'])), _toConsumableArray(createComponentLookup('street', ['street'])), _toConsumableArray(createComponentLookup('city', ['locality', 'sublocality', 'neighborhood', 'postal_town', 'colloquial_area'])), _toConsumableArray(createComponentLookup('suburb', ['postal_town', 'neighborhood', 'colloquial_area', 'locality', 'sublocality'])), _toConsumableArray(createComponentLookup('postcode', ['postal_code', 'postal_code_prefix'])), _toConsumableArray(createComponentLookup('state', ['administrative_area_level_1', 'administrative_area_level_2'])), _toConsumableArray(createComponentLookup('country', ['country'])));

  exports.default = GooglePlacesAutocomplete;

  return exports;

}({}, $, magna));
//# sourceMappingURL=magna-plugin-google-places-autocomplete.umd.js.map
