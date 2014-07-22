require(['jquery', 'GMaps', 'bootstrap'], function ($, GMaps) {

    var maps = function (options) {
        $.extend(true, this.options, options);
        this._init();
    };

    maps.prototype.options = {
        getLocationBtn: '.js-getLocation',
        searchInput: '.js-locationSearch',
        saveLocationBtn: '.js-saveLocation',

        errorContainer: '.js-errorContainer',

        initialLat: 44.4353484,
        initialLng: 26.10242059999996,

        requiredComponents: [
        {
            Name: 'Country',
            Type: 'country'
        },
        {
            Name: 'City',
            Type: 'locality'
        }]
    };

    //#region init
    maps.prototype._init = function () {
        this.$container = $('.main-content');
        this._initMap();
        this._initAutocomplete();

        this._initSelectors();

        this._delegateEvents();
    };

    maps.prototype._initMap = function () {
        this.map = new GMaps({
            div: '#map',
            lat: this.options.initialLat,
            lng: this.options.initialLng,
            click: $.proxy(this._onMapClick, this)
        });
    };

    maps.prototype._initAutocomplete = function () {

        var input = this.$container.find(this.options.searchInput)[0];

        this.autocomplete = new window.google.maps.places.Autocomplete(input);
    };

    maps.prototype._initSelectors = function () {
        this.$errorContainer = this.$container.find(this.options.errorContainer);
    };

    maps.prototype._delegateEvents = function () {

        this.$container.on('click', this.options.getLocationBtn, $.proxy(this._onGetLocationClick, this));

        this.$container.on('click', this.options.saveLocationBtn, $.proxy(this._onSaveLocationClick, this));

        window.google.maps.event.addListener(this.autocomplete, 'place_changed', $.proxy(this._onPlaceChanged, this));
    };
    //#endregion

    //#region events
    maps.prototype._onGetLocationClick = function (e) {

        e.preventDefault();

        GMaps.geolocate({
            success: $.proxy(this._onLocationFound, this),
            error: $.proxy(this._onLocationError, this),
            not_supported: $.proxy(this._onLocationError, this)
        });

    };

    maps.prototype._onLocationFound = function (position) {
        this.map.setCenter(position.coords.latitude, position.coords.longitude);
    };

    maps.prototype._onLocationError = function () {
        console.log('An error occurred');
    };

    maps.prototype._onPlaceChanged = function () {
        var place = this.autocomplete.getPlace();

        this._currentPlace = place;

        if (typeof this._currentPlace.geometry !== "undefined") {

            this._setPin(this._currentPlace.geometry.location.lat(), this._currentPlace.geometry.location.lng());
        }
    };

    maps.prototype._onMapClick = function (e) {
        GMaps.geocode({
            lat: e.latLng.lat(),
            lng: e.latLng.lng(),
            callback: $.proxy(this._onMapClickGeocode, this, [e])
        });
    };

    maps.prototype._onMapClickGeocode = function (args, results, status) {
        if (status == 'OK') {
            if (typeof results !== "undefined" && results.length) {
                this._currentPlace = results[0];
                this._setPin(args[0].latLng.lat(), args[0].latLng.lng());
            }
        } else {
            this.showErrorMessage("An error occurred. Please try again later");
        }

    };

    maps.prototype._onSaveLocationClick = function (e) {
        e.preventDefault();

        if (this._currentPlace != null) {

            var result = this._outputCurrentPlace();

            console.log(result);

        } else {
            this.showErrorMessage('Please select your location. Pin required');
        }
    };
    //#endregion

    //#region private methods
    maps.prototype._setPin = function (lat, lng) {
        if (this.map.markers.length) {
            this.map.removeMarker(this.map.markers[0]);
        }

        this.map.setCenter(lat, lng);

        this.map.addMarker({
            lat: lat,
            lng: lng,
            title: 'Locația ta',
            draggable: true,
            dragend: $.proxy(function (e) {
                GMaps.geocode({
                    lat: e.latLng.lat(),
                    lng: e.latLng.lng(),
                    callback: $.proxy(this._onMapClickGeocode, this, [e])
                });
            }, this)
        });
    };

    maps.prototype._outputCurrentPlace = function () {

        var result = {};

        for (var key in this.options.requiredComponents) {

            var requiredName = this.options.requiredComponents[key].Name,
                requiredType = this.options.requiredComponents[key].Type;

            var wantedComponents = this._currentPlace.address_components.filter(function (item, index) {
                if (item.types.indexOf(requiredType) > -1) return true;
            });

            if (wantedComponents.length) {
                result[requiredName] = wantedComponents[0].long_name;
            }
        }

        var coords = {
            Lat: this._currentPlace.geometry.location.lat(),
            Lng: this._currentPlace.geometry.location.lng()
        };

        result.Coords = coords;

        return result;
    };
    //#endregion

    //#region public methods
    maps.prototype.showErrorMessage = function (message) {

        var $error = $('<div class="bs-form-error alert alert-danger">' +
                         '<button class="close" data-dismiss="alert" type="button">×</button>' +
                             message +
                     '</div>');

        this.$errorContainer.html($error);
    };
    //#endregion

    $(function () {
        var controller = new maps();
    });

});