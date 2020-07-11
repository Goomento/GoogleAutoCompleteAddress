/**
 * @author @haihv433
 * @copyright Copyright (c) 2020 Goomento (https://store.goomento.com)
 * @package Goomento_GoogleAutoCompleteAddress
 * @link https://github.com/Goomento/GoogleAutoCompleteAddress
 */

define([
    'jquery',
    'uiComponent'
], function($, Component){
    'use strict';
    let google_map_api = "https://maps.googleapis.com/maps/api/js",
        address_elements = '[name="street[]"], [name="street[0]"]';

    let AddressForm = function($form = null) {
        const CONTEXT = document;
        this.elements = {
            postcode: '[name="postcode"]',
            region: '[name="region"], [name="region_id"]',
            city: '[name="city"]',
            country: '[name="country_id"]',
        };
        this.$form = $form;
        this.setForm = function ($form) {
            if (!$form.length) {
                $form = $(CONTEXT);
            }
            this.$form = $form;
            return this;
        };
        this.setValue = function(name, value) {
            try {
                this._setValue(this.getElement(name), value);
                this._triggerChange(name);
            } catch (e) {
                console.error(e);
            }

            return this;
        };
        this._setValue = function ($ele, value) {
            $ele.each(function (ele) {
                let $target = $(this),
                    type = $target.prop('tagName');
                switch (type) {
                    case 'SELECT':
                        $target.find('option').each(function (i, opt_ele) {
                            let $opt_ele = $(this);
                            if ($opt_ele.text().indexOf(value) >= 0) {
                                $target.val( $opt_ele.attr('value') );
                                // Stop loop
                                return false;
                            }
                        });
                        break;
                    default:
                        $target.val(value);
                        break;
                }
            });
        }
        this.getElement = function (name) {
            return this.$form.find(this.elements[name] || null);
        };
        this._triggerChange = function (name) {
            try {
                this.getElement(name).trigger('change');
            } catch (e) {
                console.error(e);
            }
            return this;
        };
        this.getInputFields = function () {
            return this.$form.find(address_elements);
        }
    };

    let addressForm = new AddressForm();

    return Component.extend({
        initialize: function (config, node) {
            this.token = config.token || null;
            this.allow_countries = (config.allow_countries && config.allow_countries !== '0')
                ? config.allow_countries
                : false;
            this.loadGoogleMapApi().then(() => {
                this.bindEvent();
            }).catch();
        },
        autocompleteAddress: function(ele) {
            if (!ele) {
                throw new Error('Invalid DOM element!!!');
            }

            let autocomplete;

            addressForm.setForm($(ele).parents('form'));

            autocomplete = new google.maps.places.Autocomplete(
                ele, {types: ['geocode']}
            );

            google.maps.event.addDomListener(ele, 'keydown', function (event) {
                if (event.keyCode === 13) {
                    event.preventDefault();
                }
            });

            if (this.allow_countries) {
                autocomplete.setComponentRestrictions({'country': this.allow_countries});
            }

            autocomplete.setFields(['address_component']);
            autocomplete.addListener('place_changed', _fillInAddress);

            function _fillInAddress() {
                let place = _parsePlace() || {};

                if (place.country) {
                    addressForm.setValue('country', place.country.long_name);
                }
                setTimeout(() => {
                    if (place.administrative_area_level_1) {
                        addressForm.setValue('region', place.administrative_area_level_1.long_name);
                    }

                    if (place.locality) {
                        addressForm.setValue('city', place.locality.long_name);
                    }

                    if (place.postal_code) {
                        addressForm.setValue('postcode', place.postal_code.long_name);
                    } else {
                        addressForm.setValue('postcode', '');
                    }

                }, 300);

                addressForm.getInputFields().trigger('change');

            }

            function _parsePlace(place = null) {
                if (place == null) {
                    place = autocomplete.getPlace();
                }

                let result = {};
                for (var i = 0; i < place.address_components.length; i++) {
                    var addressType = place.address_components[i].types[0];
                    result[addressType] = place.address_components[i];
                }

                return result;
            }

        },
        bindEvent: function() {
            $(document).on('keyup', address_elements, (event) => {
                this.autocompleteAddress( event.target || null );
            });
        },
        loadGoogleMapApi: function () {
            if (this.token) {
                return new Promise((resolve, reject) => {
                    $.ajax({
                        url: google_map_api,
                        dataType: "script",
                        data: {key: this.token,
                            libraries: 'places',}
                    }).done(() => {
                        return resolve();
                    }).fail(() => {
                        return reject();
                    });
                })
            }
            throw new Error('Invalid Token');
        }
    });
});
