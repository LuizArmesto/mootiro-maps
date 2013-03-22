(function(){var e=function(e,t){return function(){return e.apply(t,arguments)}},t=Object.prototype.hasOwnProperty,n=function(e,n){function i(){this.constructor=e}for(var r in n)t.call(n,r)&&(e[r]=n[r]);return i.prototype=n.prototype,e.prototype=new i,e.__super__=n.prototype,e},r=Array.prototype.indexOf||function(e){for(var t=0,n=this.length;t<n;t++)if(t in this&&this[t]===e)return t;return-1};define(["require","googlemaps","underscore","./core","./collections","./features","./geometries","./controls","./maptypes","./providers"],function(t){var i,s,o,u,a,f,l,c,h,p,d,v,m,g;return v=t("googlemaps"),m=t("underscore"),p=t("./core"),o=t("./collections"),a=t("./features"),d=t("./geometries"),t("./controls"),t("./maptypes"),t("./providers"),window.komoo==null&&(window.komoo={}),(g=window.komoo).event==null&&(g.event=v.event),f=function(t){function i(t){var n;this.options=t!=null?t:{},this.addFeature=e(this.addFeature,this),i.__super__.constructor.call(this),this.element=(n=this.options.element)!=null?n:document.getElementById(this.options.elementId),this.features=o.makeFeatureCollectionPlus({map:this}),this.components={},this.addComponent("map/controls::Location"),this.initGoogleMap(this.options.googleMapOptions),this.initFeatureTypes(),this.handleEvents()}return n(i,t),i.prototype.featureTypesUrl="/map_info/feature_types/",i.prototype.googleMapDefaultOptions={zoom:12,center:new v.LatLng(-23.55,-46.65),disableDefaultUI:!1,streetViewControl:!0,scaleControl:!0,panControlOptions:{position:v.ControlPosition.RIGHT_TOP},zoomControlOptions:{position:v.ControlPosition.RIGHT_TOP},scaleControlOptions:{position:v.ControlPosition.RIGHT_BOTTOM,style:v.ScaleControlStyle.DEFAULT},mapTypeControlOptions:{mapTypeIds:[v.MapTypeId.ROADMAP,v.MapTypeId.HYBRID]},mapTypeId:v.MapTypeId.HYBRID},i.prototype.addControl=function(e,t){return this.googleMap.controls[e].push(t)},i.prototype.loadGeoJsonFromOptions=function(){var e,t;if(this.options.geojson)return t=this.loadGeoJSON(this.options.geojson,this.options.zoom==null),e=t.getBounds(),e!=null&&this.fitBounds(e),t!=null&&t.setMap(this,{geometry:!0,icon:!0}),this.publish("set_zoom",this.options.zoom)},i.prototype.initGoogleMap=function(e){return e==null&&(e=this.googleMapDefaultOptions),this.googleMap=new v.Map(this.element,e),this.handleGoogleMapEvents(),$(this.element).trigger("initialized",this)},i.prototype.handleGoogleMapEvents=function(){var e,t=this;return e=["click","idle","maptypeid_changed"],e.forEach(function(e){return komoo.event.addListener(t.googleMap,e,function(n){return t.publish(e,n)})})},i.prototype.initFeatureTypes=function(){var e,t=this;return this.featureTypes==null&&(this.featureTypes={}),this.options.featureTypes!=null?((e=this.options.featureTypes)!=null&&e.forEach(function(e){return t.featureTypes[e.type]=e}),this.loadGeoJsonFromOptions()):$.ajax({url:this.featureTypesUrl,dataType:"json",success:function(e){return e.forEach(function(e){return t.featureTypes[e.type]=e}),t.loadGeoJsonFromOptions()}})},i.prototype.handleEvents=function(){var e=this;return this.subscribe("features_loaded",function(t){return komoo.event.trigger(e,"features_loaded",t)}),this.subscribe("close_clicked",function(){return komoo.event.trigger(e,"close_click")}),this.subscribe("drawing_started",function(t){return komoo.event.trigger(e,"drawing_started",t)}),this.subscribe("drawing_finished",function(t,n){komoo.event.trigger(e,"drawing_finished",t,n);if(n===!1)return e.revertFeature(t);if(t.getProperty("id")==null)return e.addFeature(t)}),this.subscribe("set_location",function(t){var n;return t=t.split(","),n=new v.LatLng(t[0],t[1]),e.googleMap.setCenter(n)}),this.subscribe("set_zoom",function(t){return e.setZoom(t)})},i.prototype.addComponent=function(e,t,n){var r=this;return t==null&&(t="generic"),n==null&&(n={}),e=m.isString(e)?this.start(e,"",n):this.start(e),this.data.when(e).done(function(){var e,n,i,s,o;o=[];for(i=0,s=arguments.length;i<s;i++)e=arguments[i],e.setMap(r),(n=r.components)[t]==null&&(n[t]=[]),r.components[t].push(e),o.push(typeof e.enable=="function"?e.enable():void 0);return o})},i.prototype.enableComponents=function(e){var t,n=this;return(t=this.components[e])!=null?t.forEach(function(e){return typeof e.enable=="function"?e.enable():void 0}):void 0},i.prototype.disableComponents=function(e){var t,n=this;return(t=this.components[e])!=null?t.forEach(function(e){return typeof e.disable=="function"?e.disable():void 0}):void 0},i.prototype.getComponentsStatus=function(e){var t,n,i=this;return t=[],(n=this.components[e])!=null&&n.forEach(function(e){if(e.enabled===!0)return t.push("enabled")}),r.call(t,"enabled")>=0?"enabled":"disabled"},i.prototype.clear=function(){return this.features.removeAllFromMap(),this.features.clear()},i.prototype.refresh=function(){return v.event.trigger(this.googleMap,"resize")},i.prototype.saveLocation=function(e,t){return e==null&&(e=this.googleMap.getCenter()),t==null&&(t=this.getZoom()),this.publish("save_location",e,t)},i.prototype.goToSavedLocation=function(){return this.publish("goto_saved_location"),!0},i.prototype.goToUserLocation=function(){return this.publish("goto_user_location")},i.prototype.handleFeatureEvents=function(e){var t,n=this;return t=["mouseover","mouseout","mousemove","click","dblclick","rightclick","highlight_changed"],t.forEach(function(t){return komoo.event.addListener(e,t,function(r){return n.publish("feature_"+t,r,e)})})},i.prototype.goTo=function(e,t){return t==null&&(t=!0),this.publish("goto",e,t)},i.prototype.panTo=function(e,t){return t==null&&(t=!1),this.goTo(e,t)},i.prototype.makeFeature=function(e,t){var n;return t==null&&(t=!0),n=a.makeFeature(e,this.featureTypes),t&&this.addFeature(n),this.publish("feature_created",n),n},i.prototype.addFeature=function(e){return this.handleFeatureEvents(e),this.features.push(e)},i.prototype.revertFeature=function(e){if(e.getProperty("id")==null)return e.setMap(null)},i.prototype.getFeatures=function(){return this.features},i.prototype.getFeaturesByType=function(e,t,n){return this.features.getByType(e,t,n)},i.prototype.showFeaturesByType=function(e,t,n){var r;return(r=this.getFeaturesByType(e,t,n))!=null?r.show():void 0},i.prototype.hideFeaturesByType=function(e,t,n){var r;return(r=this.getFeaturesByType(e,t,n))!=null?r.hide():void 0},i.prototype.showFeatures=function(e){return e==null&&(e=this.features),e.show()},i.prototype.hideFeatures=function(e){return e==null&&(e=this.features),e.hide()},i.prototype.centerFeature=function(e,t){var n;return n=e instanceof a.Feature?e:this.features.getById(e,t),this.panTo(n!=null?n.getCenter():void 0,!1)},i.prototype.loadGeoJson=function(e,t,n,r){var i,s,u=this;return t==null&&(t=!1),n==null&&(n=!0),r==null&&(r=!1),i=o.makeFeatureCollection({map:this}),(e!=null?e.type:void 0)==null||!e.type==="FeatureCollection"?i:((s=e.features)!=null&&s.forEach(function(e){var t;return t=u.features.getById(e.properties.type,e.properties.id),t==null&&(t=u.makeFeature(e,n)),i.push(t)}),t&&i.getBounds()!=null&&this.fitBounds(),r||this.publish("features_loaded",i),i)},i.prototype.loadGeoJSON=function(e,t,n,r){return this.loadGeoJson(e,t,n,r)},i.prototype.getGeoJson=function(e){var t;return e==null&&(e={}),e.newOnly==null&&(e.newOnly=!1),e.currentOnly==null&&(e.currentOnly=!1),e.geometryCollection==null&&(e.geometryCollection=!1),t=e.newOnly?this.newFeatures:e.currentOnly?o.makeFeatureCollection({map:this.map,features:[this.currentFeature]}):this.features,t.getGeoJson({geometryCollection:e.geometryCollection})},i.prototype.getGeoJSON=function(e){return this.getGeoJson(e)},i.prototype.drawNewFeature=function(e,t){var n;return n=this.makeFeature({type:"Feature",geometry:{type:e},properties:{name:"New "+t,type:t}}),this.publish("draw_feature",e,n)},i.prototype.editFeature=function(e,t){return e==null&&(e=this.features.getAt(0)),t!=null&&e.getGeometryType()===d.types.EMPTY?(e.setGeometry(d.makeGeometry({geometry:{type:t}})),this.publish("draw_feature",t,e)):this.publish("edit_feature",e)},i.prototype.setMode=function(e){return this.mode=e,this.publish("mode_changed",this.mode)},i.prototype.selectCenter=function(e,t){return this.selectPerimeter(e,t)},i.prototype.selectPerimeter=function(e,t){return this.publish("select_perimeter",e,t)},i.prototype.highlightFeature=function(){return this.centerFeature.apply(this,arguments),this.features.highlightFeature.apply(this.features,arguments)},i.prototype.getBounds=function(){return this.googleMap.getBounds()},i.prototype.setZoom=function(e){if(e!=null)return this.googleMap.setZoom(e)},i.prototype.getZoom=function(){return this.googleMap.getZoom()},i.prototype.fitBounds=function(e){return e==null&&(e=this.features.getBounds()),this.googleMap.fitBounds(e)},i.prototype.getMapTypeId=function(){return this.googleMap.getMapTypeId()},i}(p.Mediator),h=function(e){function t(e){t.__super__.constructor.call(this,e),this.addComponent("map/controls::AutosaveMapType"),this.addComponent("map/maptypes::CleanMapType","mapType"),this.addComponent("map/controls::DrawingManager","drawing"),this.addComponent("map/controls::SearchBox")}return n(t,e),t}(f),u=function(e){function t(e){t.__super__.constructor.call(this,e),this.addComponent("map/controls::AutosaveMapType"),this.addComponent("map/maptypes::CleanMapType"),this.addComponent("map/controls::SaveLocation"),this.addComponent("map/controls::StreetView"),this.addComponent("map/controls::DrawingManager"),this.addComponent("map/controls::DrawingControl"),this.addComponent("map/controls::GeometrySelector"),this.addComponent("map/controls::SupporterBox"),this.addComponent("map/controls::PerimeterSelector"),this.addComponent("map/controls::SearchBox")}return n(t,e),t}(f),l=function(e){function t(){t.__super__.constructor.apply(this,arguments)}return n(t,e),t.prototype.googleMapDefaultOptions={zoom:12,center:new v.LatLng(-23.55,-46.65),disableDefaultUI:!0,streetViewControl:!1,scaleControl:!0,scaleControlOptions:{position:v.ControlPosition.RIGHT_BOTTOM,style:v.ScaleControlStyle.DEFAULT},mapTypeId:v.MapTypeId.HYBRID},t}(f),c=function(e){function t(e){t.__super__.constructor.call(this,e),this.addComponent("map/controls::AutosaveMapType"),this.addComponent("map/maptypes::CleanMapType","mapType"),this.addComponent("map/controls::AutosaveLocation"),this.addComponent("map/controls::StreetView"),this.addComponent("map/controls::Tooltip","tooltip"),this.addComponent("map/controls::InfoWindow","infoWindow"),this.addComponent("map/controls::SupporterBox"),this.addComponent("map/controls::LicenseBox"),this.addComponent("map/controls::SearchBox")}return n(t,e),t.prototype.loadGeoJson=function(e,n,r){var i,s=this;return n==null&&(n=!1),r==null&&(r=!0),i=t.__super__.loadGeoJson.call(this,e,n,r),i.forEach(function(e){return e.setMap(s,{geometry:!0})}),i},t}(f),s=function(e){function t(e){t.__super__.constructor.call(this,e),this.addComponent("map/controls::LoadingBox"),this.addComponent("map/providers::FeatureProvider","provider"),this.addComponent("map/controls::FeatureClusterer","clusterer",{map:this})}return n(t,e),t}(c),i=function(e){function t(e){t.__super__.constructor.call(this,e),this.addComponent("map/controls::DrawingManager"),this.addComponent("map/controls::DrawingControl"),this.addComponent("map/controls::GeometrySelector"),this.addComponent("map/controls::PerimeterSelector"),this.goToSavedLocation()||this.goToUserLocation()}return n(t,e),t}(s),window.komoo.maps={Map:f,Preview:l,AjaxMap:s,makeMap:function(e){var t,n;e==null&&(e={}),t=(n=e.type)!=null?n:"map";if(t==="main")return new i(e);if(t==="editor")return new u(e);if(t==="view")return new s(e);if(t==="static")return new c(e);if(t==="preview"||t==="tooltip")return new l(e);if(t==="userEditor")return new h(e)}},window.komoo.maps})}).call(this);