(function() {
  var __hasProp = Object.prototype.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  define(['googlemaps', 'map/component'], function(googleMaps, Component) {
    'use strict';
    var FeatureProvider, GenericProvider, _base;
    if (window.komoo == null) window.komoo = {};
    if ((_base = window.komoo).event == null) _base.event = googleMaps.event;
    GenericProvider = (function(_super) {

      __extends(GenericProvider, _super);

      function GenericProvider() {
        GenericProvider.__super__.constructor.apply(this, arguments);
      }

      GenericProvider.prototype.name = 'Generic Provider';

      GenericProvider.prototype.alt = 'Generic Data Provider';

      GenericProvider.prototype.tileSize = new googleMaps.Size(256, 256);

      GenericProvider.prototype.maxZoom = 32;

      GenericProvider.prototype.enabled = true;

      GenericProvider.prototype.init = function(options) {
        this.options = options;
        this.addrLatLngCache = {};
        return this.fetchedTiles = {};
      };

      GenericProvider.prototype.setMap = function(map) {
        this.map = map;
        this.map.googleMap.overlayMapTypes.insertAt(0, this);
        return typeof this.handleMapEvents === "function" ? this.handleMapEvents() : void 0;
      };

      GenericProvider.prototype.enable = function() {
        return this.enabled = true;
      };

      GenericProvider.prototype.disable = function() {
        return this.enabled = false;
      };

      GenericProvider.prototype.getAddrLatLng = function(coord, zoom) {
        var key, ne, numTiles, point1, point2, projection, sw;
        key = "x=" + coord.x + ",y=" + coord.y + ",z=" + zoom;
        if (this.addrLatLngCache[key]) return this.addrLatLngCache[key];
        numTiles = 1 << zoom;
        projection = this.map.googleMap.getProjection();
        point1 = new googleMaps.Point((coord.x + 1) * this.tileSize.width / numTiles, coord.y * this.tileSize.height / numTiles);
        point2 = new googleMaps.Point(coord.x * this.tileSize.width / numTiles, (coord.y + 1) * this.tileSize.height / numTiles);
        ne = projection.fromPointToLatLng(point1);
        sw = projection.fromPointToLatLng(point2);
        return this.addrLatLngCache[key] = "bounds=" + (ne.toUrlValue()) + "," + (sw.toUrlValue()) + "&zoom=" + zoom;
      };

      return GenericProvider;

    })(Component);
    FeatureProvider = (function(_super) {

      __extends(FeatureProvider, _super);

      function FeatureProvider() {
        FeatureProvider.__super__.constructor.apply(this, arguments);
      }

      FeatureProvider.prototype.name = 'Feature Provider';

      FeatureProvider.prototype.alt = 'Feature Provider';

      FeatureProvider.prototype.fetchUrl = '/get_geojson?';

      FeatureProvider.prototype.init = function(options) {
        FeatureProvider.__super__.init.call(this, options);
        this.keptFeatures = komoo.collections.makeFeatureCollection();
        return this.openConnections = 0;
      };

      FeatureProvider.prototype.handleMapEvents = function() {
        var _this = this;
        return this.map.subscribe('idle', function() {
          var bounds;
          if (_this.enabled === false) return;
          bounds = _this.map.googleMap.getBounds();
          _this.keptFeatures.forEach(function(feature) {
            if (!bounds.intersects(feature.getBounds())) {
              return feature.setMap(null);
            }
          });
          return _this.keptFeatures.clear();
        });
      };

      FeatureProvider.prototype.releaseTile = function(tile) {
        var bounds,
          _this = this;
        if (this.enabled === false) return;
        if (this.fetchedTiles[tile.addr]) {
          bounds = this.map.getBounds();
          return this.fetchedTiles[tile.addr].features.forEach(function(feature) {
            if (feature.getBounds) {
              if (!bounds.intersects(feature.getBounds())) {
                return feature.setMap(null);
              } else if (!bounds.contains(feature.getBounds().getNorthEast() || !bounds.contains(feature.getBounds().getSouthWest()))) {
                _this.keptFeatures.push(feature);
                return feature.setMap(_this.map);
              }
            } else if (feature.getPosition) {
              if (!bounds.contains(feature.getPosition())) {
                return feature.setMap(null);
              }
            }
          });
        }
      };

      FeatureProvider.prototype.getTile = function(coord, zoom, ownerDocument) {
        var addr, div,
          _this = this;
        div = ownerDocument.createElement('DIV');
        addr = this.getAddrLatLng(coord, zoom);
        div.addr = addr;
        if (this.enabled === false) return div;
        if (this.fetchedTiles[addr]) {
          this.fetchedTiles[addr].features.setMap(this.map);
          return div;
        }
        if (this.openConnections === 0) {
          this.map.publish('features_request_started');
        }
        this.openConnections++;
        this.map.publish('features_request_queued');
        $.ajax({
          url: this.fetchUrl + addr,
          dataType: 'json',
          type: 'GET',
          success: function(data) {
            var features;
            if (typeof console !== "undefined" && console !== null) {
              console.log("Getting tile " + addr + "...");
            }
            features = _this.map.loadGeoJSON(JSON.parse(data), false, true, true);
            _this.fetchedTiles[addr] = {
              geojson: data,
              features: features
            };
            return features.setMap(_this.map);
          },
          error: function(jqXHR, textStatus) {
            var errorContainer, serverErrorContainer;
            if (typeof console !== "undefined" && console !== null) {
              console.error(textStatus);
            }
            serverErrorContainer = $('#server-error');
            if (serverErrorContainer.parent().length === 0) {
              serverErrorContainer = $('<div>').attr('id', 'server-error');
              $('body').append(serverErrorContainer);
            }
            errorContainer = $('<div>').html(jqXHR.responseText);
            return serverErrorContainer.append(errorContainer);
          },
          complete: function() {
            _this.map.publish('features_request_unqueued');
            _this.openConnections--;
            if (_this.openConnections === 0) {
              return _this.map.publish('features_request_completed');
            }
          }
        });
        return div;
      };

      return FeatureProvider;

    })(GenericProvider);
    window.komoo.providers = {
      GenericProvider: GenericProvider,
      FeatureProvider: FeatureProvider,
      makeFeatureProvider: function(options) {
        return new FeatureProvider(options);
      }
    };
    return window.komoo.providers;
  });

}).call(this);
