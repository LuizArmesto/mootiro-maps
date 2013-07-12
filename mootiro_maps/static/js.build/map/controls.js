(function(){var e=Object.prototype.hasOwnProperty,t=function(t,n){function i(){this.constructor=t}for(var r in n)e.call(n,r)&&(t[r]=n[r]);return i.prototype=n.prototype,t.prototype=new i,t.__super__=n.prototype,t},n=Array.prototype.indexOf||function(e){for(var t=0,n=this.length;t<n;t++)if(t in this&&this[t]===e)return t;return-1};define(["googlemaps","map/component","map/common","map/geometries","map/utils","infobox","markerclusterer"],function(e,r,i,s,o,u,a){var f,l,c,h,p,d,v,m,g,y,b,w,E,S,x,T,N,C,k,L,A,O,M,D,P,H,B,j,F,I,q,R,U,z,W,X,V,J,K,Q,G,Y,Z,et,tt;return window.komoo==null&&(window.komoo={}),(tt=window.komoo).event==null&&(tt.event=e.event),Z=gettext("Next Step"),K=gettext("Cancel"),Q=gettext("Close"),J=gettext("Add shape"),X=gettext("Add line"),V=gettext("Add point"),et=gettext("Sum"),G=gettext("Cut out"),Y=gettext("Loading..."),E=i.geometries.types.EMPTY,H=i.geometries.types.POINT,A=i.geometries.types.MULTIPOINT,B=i.geometries.types.POLYGON,j=i.geometries.types.LINESTRING,N=i.geometries.types.LINESTRING,O=i.geometries.types.MULTILINESTRING,L=i.geometries.types.MULTILINESTRING,D={},D[H]=e.drawing.OverlayType.MARKER,D[A]=e.drawing.OverlayType.MARKER,D[N]=e.drawing.OverlayType.POLYLINE,D[L]=e.drawing.OverlayType.POLYLINE,D[B]=e.drawing.OverlayType.POLYGON,w="edit",g="delete",M="new",f="add",v="cutout",P="perimeter_selection",d=function(n){function r(){r.__super__.constructor.apply(this,arguments)}return t(r,n),r.prototype.position=e.ControlPosition.RIGHT_BOTTOM,r.prototype.init=function(){return r.__super__.init.call(this),this.box=$("<div>"),this.id!=null&&this.box.attr("id",this.id),this["class"]!=null&&this.box.addClass(this["class"]),this.map.addControl(this.position,this.box.get(0)),typeof this.handleMapEvents=="function"?this.handleMapEvents():void 0},r}(r),R=function(n){function r(){r.__super__.constructor.apply(this,arguments)}return t(r,n),r.prototype.position=e.ControlPosition.TOP_RIGHT,r.prototype.id="map-searchbox",r.prototype.init=function(){var e=this;return r.__super__.init.call(this),require(["map/views"],function(t){return e.view=new t.SearchBoxView,e.box.append(e.view.render().el),e.handleViewEvents()})},r.prototype.handleViewEvents=function(){var e=this;return this.view.on("search",function(t){var n,r;return r=t.type,n=t.position,e.map.publish("goto",n,!0)})},r}(d),z=function(e){function n(){n.__super__.constructor.apply(this,arguments)}return t(n,e),n.prototype.id="map-supporters",n.prototype.init=function(){return n.__super__.init.call(this),this.box.append($("#map-supporters-content").show())},n}(d),C=function(n){function r(){r.__super__.constructor.apply(this,arguments)}return t(r,n),r.prototype.id="map-license",r.prototype.position=e.ControlPosition.BOTTOM_LEFT,r.prototype.init=function(){return r.__super__.init.call(this),this.box.html('Este conteúdo é disponibilizado nos termos da licença <a href="http://creativecommons.org/licenses/by-sa/3.0/deed.pt_BR">Creative Commons - Atribuição - Partilha nos Mesmos Termos 3.0 Não Adaptada</a>; pode estar sujeito a condições adicionais. Para mais detalhes, consulte as Condições de Uso.')},r}(d),b=function(n){function r(){r.__super__.constructor.apply(this,arguments)}return t(r,n),r.prototype.enabled=!0,r.prototype.defaultDrawingManagerOptions={drawingControl:!1,drawingMode:null},r.prototype.componentOriginalStatus={},r.prototype.init=function(e){var t;this.options=e!=null?e:{},(t=this.options).drawingManagerOptions==null&&(t.drawingManagerOptions=this.defaultDrawingManagerOptions);if(this.options.map)return this.setMap(this.options.map)},r.prototype.initManager=function(t){return t==null&&(t=this.defaultDrawingManagerOptions),this.manager=new e.drawing.DrawingManager(t),this.handleManagerEvents()},r.prototype.setMap=function(e){return this.map=e,this.options.drawingManagerOptions.map=this.map.googleMap,this.initManager(this.options.drawingManagerOptions),this.handleMapEvents()},r.prototype.enable=function(){return this.enabled=!0},r.prototype.disable=function(){return this.enabled=!1},r.prototype.setMode=function(e){var t;this.mode=e,this.manager.setDrawingMode((t=this.mode)===f||t===M||this.mode===v&&this.feature.getGeometryType()===B?D[this.feature.getGeometryType()]:null);if(this.mode===v&&this.feature.getGeometryType()!==B)return this.mode=w},r.prototype.handleMapEvents=function(){var e=this;return this.map.subscribe("draw_feature",function(t,n){return e.drawFeature(n)}),this.map.subscribe("edit_feature",function(t){return e.editFeature(t)}),this.map.subscribe("drawing_finished",function(t){return e.feature.setEditable(!1),e.feature.updateIcon(),e.setFeature(null),e.setMode(null)}),this.map.subscribe("finish_drawing",function(){return e.map.publish("drawing_finished",e.feature,!0)}),this.map.subscribe("cancel_drawing",function(){return e.map.publish("drawing_finished",e.feature,!1)}),this.map.subscribe("mode_changed",function(t){return e.setMode(t)}),this.map.subscribe("feature_rightclick",function(e,t){var n,r,i;if(e.vertex==null)return;n=t.getGeometry().getOverlay(),i=typeof n.getPaths=="function"?n.getPaths():void 0,r=i!=null?i.getAt(e.path):void 0,r!=null&&r.removeAt(e.vertex);if((r!=null?r.getLength():void 0)===1)return i.removeAt(e.path)})},r.prototype.handleManagerEvents=function(){var t=this;return komoo.event.addListener(this.manager,"overlaycomplete",function(n){var r,i,s,o,u,a,l,c,h,p,d,m,g;s=(l=n.overlay)!=null?typeof l.getPath=="function"?l.getPath():void 0:void 0;if(s&&((c=t.mode)===f||c===M||c===v)&&((h=n.overlay)!=null?h.getPaths:void 0)){o=t.feature.getGeometry().getPaths(),t.mode===M&&o.clear();if((o!=null?o.length:void 0)>0){u=e.geometry.spherical.computeSignedArea(s),a=e.geometry.spherical.computeSignedArea(o.getAt(0)),r=u/Math.abs(u),i=a/Math.abs(a);if(r===i&&t.mode===v||r!==i&&((p=t.mode)===f||p===M))s=new e.MVCArray(s.getArray().reverse())}o.push(s),t.feature.getGeometry().setPaths(o),n.overlay.setMap(null)}else(d=t.mode)!==f&&d!==M||!n.overlay.getPosition?((m=t.mode)===f||m===M)&&n.overlay.getPath&&t.feature.getGeometry().addPolyline(n.overlay,!0):(t.feature.getGeometry().addMarker(n.overlay),t.feature.updateIcon(100));return t.map.setMode(w),(g=t.feature)!=null?g.setEditable(!0):void 0})},r.prototype.setFeature=function(e){var t=this;this.feature=e,this.featureClickListener!=null&&komoo.event.removeListener(this.featureClickListener);if(this.feature==null)return;return this.feature.setMap(this.map,{geometry:!0}),this.featureClickListener=komoo.event.addListener(this.feature,"click",function(e,n){var r,i,s,u,a,f;if(t.mode===g)return t.feature.getGeometryType()===B?(u=t.feature.getGeometry().getPaths(),u.forEach(function(t,n){if(o.isPointInside(e.latLng,t))return u.removeAt(n)})):n&&t.feature.getGeometryType()===A?(s=t.feature.getGeometry().getMarkers(),r=$.inArray(n,s.getArray()),r>-1&&(i=s.removeAt(r),i.setMap(null))):n&&t.feature.getGeometryType()===L&&(f=t.feature.getGeometry().getPolylines(),r=$.inArray(n,f.getArray()),r>-1&&(a=f.removeAt(r),a.setMap(null))),t.map.setMode(w)})},r.prototype.editFeature=function(e){var t;if(this.enabled===!1)return;this.setFeature(e);if(this.feature.getGeometryType()==="Empty"){this.map.publish("select_new_geometry",this.feature);return}return this.feature.setEditable(!0),t={},t[""+D[this.feature.getGeometryType()]+"Options"]=this.feature.getGeometry().getOverlayOptions({strokeWeight:2.5,zoom:100}),this.manager.setOptions(t),this.map.setMode(w),this.map.publish("drawing_started",this.feature)},r.prototype.drawFeature=function(e){this.feature=e;if(this.enabled===!1)return;return this.editFeature(this.feature),this.map.setMode(M)},r}(r),m=function(n){function r(){r.__super__.constructor.apply(this,arguments)}return t(r,n),r.prototype.id="map-drawing-box",r.prototype["class"]="map-panel",r.prototype.position=e.ControlPosition.TOP_LEFT,r.prototype.init=function(e){var t,n;return e==null&&(e={title:""}),r.__super__.init.call(this),t=(n=e.title)!=null?n:"",this.box.html('<div id="drawing-control">\n  <div class="map-panel-title" id="drawing-control-title">'+t+'</div>\n  <div class="content" id="drawing-control-content"></div>\n  <div class="map-panel-buttons">\n    <div class="map-button" id="drawing-control-cancel">'+Q+"</div>\n  </div>\n</div>"),this.box.show(),this.handleButtonEvents()},r.prototype.setTitle=function(e){return e==null&&(e=""),this.box.find("#drawing-control-title").text(e)},r.prototype.handleButtonEvents=function(){var e=this;return $("#drawing-control-cancel",this.box).click(function(){return e.map.publish("close_clicked")})},r}(d),x=function(n){function r(){r.__super__.constructor.apply(this,arguments)}return t(r,n),r.prototype.id="map-drawing-box",r.prototype["class"]="map-panel",r.prototype.position=e.ControlPosition.TOP_LEFT,r.prototype.init=function(){return r.__super__.init.call(this),this.box.hide(),this.box.html('<div id="geometry-selector">\n  <div class="map-panel-title" id="drawing-control-title"></div>\n  <ul class="content" id="drawing-control-content">\n    <li class="polygon btn" data-geometry-type="Polygon">\n      <i class="icon-polygon middle"></i><span class="middle">Adicionar área</span>\n    </li>\n    <li class="linestring btn" data-geometry-type="LineString">\n      <i class="icon-linestring middle"></i><span class="middle">Adicionar linha</span>\n    </li>\n    <li class="point btn" data-geometry-type="Point">\n      <i class="icon-point middle"></i><span class="middle">Adicionar ponto</span>\n    </li>\n  </ul>\n  <div class="map-panel-buttons">\n    <div class="map-button" id="drawing-control-cancel">'+K+"</div>\n  </div>\n</div>"),this.handleBoxEvents()},r.prototype.handleMapEvents=function(){var e=this;return this.map.subscribe("select_new_geometry",function(t){return e.open(t)})},r.prototype.handleBoxEvents=function(){var e=this;return this.box.find("li").each(function(t,n){var r,i;return r=$(n),i=r.attr("data-geometry-type"),r.click(function(){return e.close(),e.map.editFeature(e.feature,i)})})},r.prototype.handleButtonEvents=function(){var e=this;return $("#drawing-control-cancel",this.box).click(function(){return e.map.publish("cancel_drawing")})},r.prototype.showContent=function(){var e,t,n,r,i,s;this.box.find("li").hide(),i=(r=this.feature.getFeatureType())!=null?r.geometryTypes:void 0,s=[];for(t=0,n=i.length;t<n;t++)e=i[t],s.push(this.box.find("li."+e.toLowerCase()).show());return s},r.prototype.open=function(e){return this.feature=e,this.showContent(),$("#drawing-control-title",this.box).html("Selecione o tipo de objeto"),this.handleButtonEvents(),this.box.show()},r.prototype.close=function(){return this.box.hide()},r}(d),y=function(n){function r(){r.__super__.constructor.apply(this,arguments)}return t(r,n),r.prototype.id="map-drawing-box",r.prototype["class"]="map-panel",r.prototype.position=e.ControlPosition.TOP_LEFT,r.prototype.init=function(){return r.__super__.init.call(this),this.box.hide(),this.box.html('<div id="drawing-control">\n  <div class="map-panel-title" id="drawing-control-title"></div>\n  <div class="content" id="drawing-control-content"></div>\n  <div class="map-panel-buttons">\n    <div class="map-button" id="drawing-control-finish">'+Z+'</div>\n    <div class="map-button" id="drawing-control-cancel">'+K+"</div>\n  </div>\n</div>"),this.handleBoxEvents()},r.prototype.handleMapEvents=function(){var e=this;return this.map.subscribe("drawing_started",function(t){return e.open(t)}),this.map.subscribe("drawing_finished",function(t){return e.close()}),this.map.subscribe("mode_changed",function(t){return e.setMode(t)})},r.prototype.handleBoxEvents=function(){var e=this;return $("#drawing-control-finish",this.box).click(function(){if($("#drawing-control-finish",e.box).hasClass("disabled"))return;return e.map.publish("finish_drawing")}),$("#drawing-control-cancel",this.box).click(function(){return e.map.publish("cancel_drawing")})},r.prototype.handleButtonEvents=function(){var e=this;return $("#drawing-control-add",this.box).click(function(){return e.map.setMode(e.mode!==f?f:w)}),$("#drawing-control-cutout",this.box).click(function(){return e.map.setMode(e.mode!==v?v:w)}),$("#drawing-control-delete",this.box).click(function(){return e.map.setMode(e.mode!==g?g:w)})},r.prototype.setMode=function(e){var t;return this.mode=e,this.mode===M?($("#drawing-control-content",this.box).hide(),$("#drawing-control-finish",this.box).addClass("disabled")):($("#drawing-control-content",this.box).show(),$("#drawing-control-finish",this.box).removeClass("disabled")),$(".map-button.active",this.box).removeClass("active"),$("#drawing-control-"+((t=this.mode)!=null?t.toLowerCase():void 0),this.box).addClass("active")},r.prototype.getTitle=function(){var e,t,n,r;if(this.feature.getGeometryType()===B)e="polygon",t=J;else if((n=this.feature.getGeometryType())===N||n===L)e="linestring",t=X;else if((r=this.feature.getGeometryType())===H||r===A)e="point",t=V;return'<i class="icon-'+e+' middle"></i><span class="middle">'+t+"</span>"},r.prototype.getContent=function(){var e,t,n,r;return e=$('<div class="map-button" id="drawing-control-add"><i class="icon-komoo-plus middle"></i><span class="middle">'+et+"</span></div>"),n=$('<div class="map-button" id="drawing-control-cutout"><i class="icon-komoo-minus middle"></i><span class="middle">'+G+"</span></div>"),r=$('<div class="map-button" id="drawing-control-delete"><i class="icon-komoo-trash middle"></i></div>'),t=$("<div>").addClass(this.feature.getGeometryType().toLowerCase()),this.feature.getGeometryType()!==H&&t.append(e),this.feature.getGeometryType()===B&&t.append(n),this.feature.getGeometryType()!==H&&t.append(r),t},r.prototype.open=function(e){return this.feature=e,$("#drawing-control-title",this.box).html(this.getTitle()),$("#drawing-control-content",this.box).html(this.getContent()),this.handleButtonEvents(),this.box.show()},r.prototype.close=function(){return this.box.hide()},r}(d),F=function(n){function r(){r.__super__.constructor.apply(this,arguments)}return t(r,n),r.prototype.enabled=!0,r.prototype.init=function(){var t=this;return r.__super__.init.call(this),this.circle=new e.Circle({visible:!0,radius:100,fillColor:"white",fillOpacity:0,strokeColor:"#ffbda8",zIndex:-1}),this.marker=new e.Marker({icon:"/static/img/marker.png"}),komoo.event.addListener(this.circle,"click",function(e){if(t.map.mode===P)return t.selected(e.latLng)})},r.prototype.select=function(e,t){this.radius=e,this.callback=t;if(!this.enabled)return;return this.origMode=this.map.mode,this.map.disableComponents("infoWindow"),this.map.setMode(P)},r.prototype.selected=function(e){return typeof this.radius=="number"&&this.circle.setRadius(this.radius),typeof this.callback=="function"&&this.callback(e,this.circle),this.circle.setCenter(e),this.circle.setMap(this.map.googleMap),this.marker.setPosition(e),this.marker.setMap(this.map.googleMap),this.map.publish("perimeter_selected",e,this.circle),this.map.setMode(this.origMode),this.map.enableComponents("infoWindow")},r.prototype.handleMapEvents=function(){var e,t,n,r,i,s=this;this.map.subscribe("select_perimeter",function(e,t){return s.select(e,t)}),r=["click","feature_click"],i=[];for(t=0,n=r.length;t<n;t++)e=r[t],i.push(this.map.subscribe(e,function(e){if(s.map.mode===P)return s.selected(e.latLng)}));return i},r.prototype.setMap=function(e){return this.map=e,this.handleMapEvents()},r.prototype.enable=function(){return this.enabled=!0},r.prototype.disable=function(){return this.hide(),this.enabled=!1},r}(r),p=function(n){function r(){r.__super__.constructor.apply(this,arguments)}return t(r,n),r.prototype.defaultWidth="300px",r.prototype.enabled=!0,r.prototype.init=function(e){return this.options=e!=null?e:{},r.__super__.init.call(this),this.width=this.options.width||this.defaultWidth,this.createInfoBox(this.options),this.options.map&&this.setMap(this.options.map),this.customize()},r.prototype.createInfoBox=function(t){return this.setInfoBox(new u({pixelOffset:new e.Size(0,-20),enableEventPropagation:!0,closeBoxMargin:"10px",disableAutoPan:!0,boxStyle:{cursor:"pointer",background:"url(/static/img/infowindow-arrow.png) no-repeat 0 10px",width:this.width}}))},r.prototype.handleMapEvents=function(){var e=this;return this.map.subscribe("drawing_started",function(t){return e.disable()}),this.map.subscribe("drawing_finished",function(t){return e.enable()})},r.prototype.setInfoBox=function(e){this.infoBox=e},r.prototype.setMap=function(e){return this.map=e,this.handleMapEvents()},r.prototype.enable=function(){return this.enabled=!0},r.prototype.disable=function(){return this.close(!1),this.enabled=!1},r.prototype.open=function(e){var t,n,r,i,s,u,a,f;this.options=e!=null?e:{};if(!this.enabled)return;return this.setContent(this.options.content||(this.options.features?this.createClusterContent(this.options):this.createFeatureContent(this.options))),this.feature=(s=this.options.feature)!=null?s:(u=this.options.features)!=null?u.getAt(0):void 0,i=(a=this.options.position)!=null?a:this.feature.getCenter(),i instanceof Array&&(t=new komoo.geometries.Empty,i=t.getLatLngFromArray(i)),r=o.latLngToPoint(this.map,i),r.x+=5,n=o.pointToLatLng(this.map,r),this.infoBox.setPosition(n),this.infoBox.open((f=this.map.googleMap)!=null?f:this.map)},r.prototype.setContent=function(e){return e==null&&(e={title:"",body:""}),typeof e=="string"&&(e={title:"",url:"",body:e}),this.title.html(e.url?'<a href="'+e.url+"'\">"+e.title+"</a>":e.title),this.body.html(e.body)},r.prototype.close=function(){var e;return this.isMouseover=!1,this.infoBox.close(),((e=this.feature)!=null?e.isHighlighted():void 0)&&this.feature.setHighlight(!1),this.feature=null},r.prototype.customize=function(){var t=this;return e.event.addDomListener(this.infoBox,"domready",function(n){var r;return r=t.infoBox.div_,e.event.addDomListener(r,"click",function(e){return e.cancelBubble=!0,typeof e.stopPropagation=="function"?e.stopPropagation():void 0}),e.event.addDomListener(r,"mouseout",function(e){return t.isMouseover=!1}),komoo.event.trigger(t,"domready")}),this.initDomElements()},r.prototype.initDomElements=function(){var e=this;return this.title=$("<div>"),this.body=$("<div>"),this.content=$("<div>").addClass("map-infowindow-content"),this.content.append(this.title),this.content.append(this.body),this.content.css({background:"white",padding:"10px",margin:"0 0 0 15px"}),this.content.hover(function(t){return e.isMouseover=!0},function(t){return e.isMouseover=!1}),this.infoBox.setContent(this.content.get(0))},r.prototype.createClusterContent=function(e){var t,n,r,i,s;return e==null&&(e={}),r=e.features||[],i=ngettext("%s Community","%s Communities",r.length),s="<strong>"+interpolate(i,[r.length])+"</strong>",t=function(){var e,t,i,s;i=r.slice(0,11),s=[];for(e=0,t=i.length;e<t;e++)n=i[e],s.push("<li>"+n.getProperty("name")+"</li>");return s}(),t="<ul>"+t.join("")+"</ul>",{title:s,url:"",body:t}},r.prototype.createFeatureContent=function(e){var t,n;return e==null&&(e={}),n="",t=e.feature,t&&(n=t.getProperty("name")),{title:n,url:"",body:""}},r}(r),l=function(e){function n(){n.__super__.constructor.apply(this,arguments)}return t(n,e),n.prototype.createFeatureContent=function(e){var t,r,i=this;e==null&&(e={}),t=e.feature;if(!t)return;return t[this.contentViewName]?t[this.contentViewName]:t.getProperty("id")==null?n.__super__.createFeatureContent.call(this,e):(r=dutils.urls.resolve(this.contentViewName,{zoom:this.map.getZoom(),app_label:t.featureType.appLabel,model_name:t.featureType.modelName,obj_id:t.getProperty("id")}),$.get(r,function(e){return t[i.contentViewName]=e,i.setContent(e)}),Y)},n}(p),T=function(n){function r(){r.__super__.constructor.apply(this,arguments)}return t(r,n),r.prototype.defaultWidth="350px",r.prototype.contentViewName="info_window",r.prototype.open=function(e){var t,n;return(t=this.feature)!=null&&(t.displayTooltip=!0),r.__super__.open.call(this,e),(n=this.feature)!=null?n.displayTooltip=!1:void 0},r.prototype.close=function(e){var t,n;return e==null&&(e=!0),(t=this.feature)!=null&&t.setHighlight(!1),(n=this.feature)!=null&&(n.displayTooltip=!0),e&&this.map.enableComponents("tooltip"),r.__super__.close.call(this)},r.prototype.customize=function(){var t=this;return r.__super__.customize.call(this),e.event.addDomListener(this.infoBox,"domready",function(n){var r,i;return i=t.content.get(0),r=t.infoBox.div_.firstChild,e.event.addDomListener(i,"mousemove",function(e){return t.map.disableComponents("tooltip")}),e.event.addDomListener(i,"mouseout",function(e){r=t.infoBox.div_.firstChild;if(e.toElement!==r)return t.map.enableComponents("tooltip")}),e.event.addDomListener(r,"click",function(e){return t.close()})})},r.prototype.handleMapEvents=function(){var e=this;return r.__super__.handleMapEvents.call(this),this.map.subscribe("feature_click",function(t,n){return setTimeout(function(){return e.open({feature:n,position:t.latLng})},200)}),this.map.subscribe("feature_highlight_changed",function(t,n){if(n.isHighlighted())return e.open({feature:n})})},r}(l),W=function(n){function r(){r.__super__.constructor.apply(this,arguments)}return t(r,n),r.prototype.contentViewName="tooltip",r.prototype.close=function(){return clearTimeout(this.timer),r.__super__.close.call(this)},r.prototype.customize=function(){var t=this;return r.__super__.customize.call(this),e.event.addDomListener(this.infoBox,"domready",function(n){var r,i;return i=t.infoBox.div_,e.event.addDomListener(i,"click",function(e){return e.latLng=t.infoBox.getPosition(),t.map.publish("feature_click",e,t.feature)}),r=i.firstChild,$(r).hide()})},r.prototype.handleMapEvents=function(){var e=this;return r.__super__.handleMapEvents.call(this),this.map.subscribe("feature_mousemove",function(t,n){var r;clearTimeout(e.timer);if(n===e.feature||!n.displayTooltip)return;return r=n.getType()==="Community"?400:10,e.timer=setTimeout(function(){if(!n.displayTooltip)return;return e.open({feature:n,position:t.latLng})},r)}),this.map.subscribe("feature_mouseout",function(t,n){return e.close()}),this.map.subscribe("feature_click",function(t,n){return e.close()}),this.map.subscribe("cluster_mouseover",function(t,n){var r;if((r=t.getAt(0))!=null?!r.displayTooltip:!void 0)return;return e.open({features:t,position:n})}),this.map.subscribe("cluster_mouseout",function(t,n){return e.close()}),this.map.subscribe("cluster_click",function(t,n){return e.close()})},r}(l),S=function(e){function n(){n.__super__.constructor.apply(this,arguments)}return t(n,e),n.prototype.enabled=!0,n.prototype.maxZoom=9,n.prototype.gridSize=20,n.prototype.minSize=1,n.prototype.imagePath="/static/img/cluster/communities",n.prototype.imageSizes=[24,29,35,41,47],n.prototype.init=function(e){var t,n,r,i,s;this.options=e!=null?e:{},(t=this.options).gridSize==null&&(t.gridSize=this.gridSize),(n=this.options).maxZoom==null&&(n.maxZoom=this.maxZoom),(r=this.options).minimumClusterSize==null&&(r.minimumClusterSize=this.minSize),(i=this.options).imagePath==null&&(i.imagePath=this.imagePath),(s=this.options).imageSizes==null&&(s.imageSizes=this.imageSizes),this.featureType=this.options.featureType,this.features=[];if(this.options.map)return this.setMap(this.options.map)},n.prototype.initMarkerClusterer=function(e){var t,n;return e==null&&(e={}),t=((n=this.map)!=null?n.googleMap:void 0)||this.map,this.clusterer=new a(t,[],e)},n.prototype.initEvents=function(e){var t,n=this;e==null&&(e=this.clusterer);if(!e)return;return t=["clusteringbegin","clusteringend"],t.forEach(function(t){return komoo.event.addListener(e,t,function(e){return komoo.event.trigger(n,t,n)})}),t=["click","mouseout","mouseover"],t.forEach(function(t){return komoo.event.addListener(e,t,function(e){var r,i;return r=komoo.collections.makeFeatureCollection({features:function(){var t,n,r,s;r=e.getMarkers(),s=[];for(t=0,n=r.length;t<n;t++)i=r[t],s.push(i.feature);return s}()}),komoo.event.trigger(n,t,r,e.getCenter()),n.map.publish("cluster_"+t,r,e.getCenter())})})},n.prototype.setMap=function(e){return this.map=e,this.initMarkerClusterer(this.options),this.initEvents(),this.addFeatures(this.map.getFeatures()),this.handleMapEvents()},n.prototype.handleMapEvents=function(){var e=this;return this.map.subscribe("feature_created",function(t){if(t.getType()===e.featureType)return e.push(t)})},n.prototype.updateLength=function(){return this.length=this.features.length},n.prototype.clear=function(){return this.features=[],this.clusterer.clearMarkers(),this.updateLength()},n.prototype.getAt=function(e){return this.features[e]},n.prototype.push=function(e){if(e.getMarker())return this.features.push(e),e.getMarker().setVisible(!1),this.clusterer.addMarker(e.getMarker().getOverlay().markers_.getAt(0)),this.updateLength()},n.prototype.pop=function(){var e;return e=this.features.pop(),this.clusterer.removeMarker(e.getMarker()),this.updateLength(),e},n.prototype.forEach=function(e,t){return this.features.forEach(e,t)},n.prototype.repaint=function(){return this.clusterer.repaint()},n.prototype.getAverageCenter=function(){return this.clusterer.getAverageCenter()},n.prototype.addFeatures=function(e){var t=this;return e!=null?e.forEach(function(e){return t.push(e)}):void 0},n}(r),k=function(n){function r(){r.__super__.constructor.apply(this,arguments)}return t(r,n),r.prototype.enabled=!0,r.prototype.init=function(){return this.geocoder=new e.Geocoder,this.marker=new e.Marker({icon:"/static/img/marker.png"})},r.prototype.handleMapEvents=function(){var e=this;return this.map.subscribe("goto",function(t,n){return e.goTo(t,n)}),this.map.subscribe("goto_user_location",function(){return e.goToUserLocation()})},r.prototype.goTo=function(t,n){var r,i,s,o=this;return n==null&&(n=!1),s=function(e){if(e){o.map.googleMap.panTo(e);if(n)return o.marker.setPosition(e)}},typeof t=="string"?(i={address:t,region:this.region},this.geocoder.geocode(i,function(t,n){var r,i;if(n===e.GeocoderStatus.OK)return r=t[0],i=r.geometry.location,s(i)})):(r=t instanceof Array?t.length===2?new e.LatLng(t[0],t[1]):void 0:t,s(r))},r.prototype.goToUserLocation=function(){var t,n,r=this;t=google.loader.ClientLocation,t&&(n=new e.LatLng(t.latitude,t.longitude),this.map.googleMap.setCenter(n),typeof console!="undefined"&&console!==null&&console.log("Getting location from Google..."));if(navigator.geolocation)return navigator.geolocation.getCurrentPosition(function(t){return n=new e.LatLng(t.coords.latitude,t.coords.longitude),r.map.googleMap.setCenter(n),typeof console!="undefined"&&console!==null?console.log("Getting location from navigator.geolocation..."):void 0},function(){return typeof console!="undefined"&&console!==null?console.log("User denied access to navigator.geolocation..."):void 0})},r.prototype.setMap=function(e){return this.map=e,this.marker.setMap(this.map.googleMap),this.handleMapEvents()},r.prototype.enable=function(){return this.enabled=!0},r.prototype.disable=function(){return this.close(!1),this.enabled=!1},r}(r),I=function(e){function n(){n.__super__.constructor.apply(this,arguments)}return t(n,e),n.prototype.handleMapEvents=function(){var e=this;return n.__super__.handleMapEvents.call(this),this.map.subscribe("save_location",function(t,n){return e.saveLocation(t,n)}),this.map.subscribe("goto_saved_location",function(){return e.goToSavedLocation()})},n.prototype.saveLocation=function(e,t){return e==null&&(e=this.map.googleMap.getCenter()),t==null&&(t=this.map.getZoom()),o.createCookie("lastLocation",e.toUrlValue(),90),o.createCookie("lastZoom",t,90)},n.prototype.goToSavedLocation=function(){var e,t;e=o.readCookie("lastLocation"),t=parseInt(o.readCookie("lastZoom"),10);if(e&&t)return typeof console!="undefined"&&console!==null&&console.log("Getting location from cookie..."),this.map.publish("set_location",e),this.map.publish("set_zoom",t)},n}(k),c=function(e){function n(){n.__super__.constructor.apply(this,arguments)}return t(n,e),n.prototype.handleMapEvents=function(){var e=this;return n.__super__.handleMapEvents.call(this),this.map.subscribe("idle",function(){return e.saveLocation()})},n}(I),q=function(r){function i(){i.__super__.constructor.apply(this,arguments)}return t(i,r),i.prototype.setMap=function(t){var r;this.map=t,this.handleMapEvents(),r=this.getSavedMapType();if(n.call(_.values(e.MapTypeId),r)>=0)return this.useSavedMapType()},i.prototype.handleMapEvents=function(){var e=this;return this.map.subscribe("maptype_loaded",function(t){if(t===e.getSavedMapType())return e.map.googleMap.setMapTypeId(t)}),this.map.subscribe("initialized",function(){return e.useSavedMapType()})},i.prototype.saveMapType=function(t){return t==null&&(t=this.map.getMapTypeId()),o.createCookie("mapTypeId",t,e.MapTypeId.ROADMAP)},i.prototype.getSavedMapType=function(){return o.readCookie("mapTypeId")},i.prototype.useSavedMapType=function(){var e;return e=this.getSavedMapType(),typeof console!="undefined"&&console!==null&&console.log("Getting map type from cookie..."),this.map.googleMap.setMapTypeId(e)},i}(r),h=function(e){function n(){n.__super__.constructor.apply(this,arguments)}return t(n,e),n.prototype.handleMapEvents=function(){var e=this;return n.__super__.handleMapEvents.call(this),this.map.subscribe("maptypeid_changed",function(){return e.saveMapType()})},n}(q),U=function(n){function r(){r.__super__.constructor.apply(this,arguments)}return t(r,n),r.prototype.enabled=!0,r.prototype.init=function(){return typeof console!="undefined"&&console!==null&&console.log("Initializing StreetView support."),this.streetViewPanel=$("<div>").addClass("map-panel"),this.streetViewPanel.height("100%").width("50%"),this.streetViewPanel.hide(),this.createObject()},r.prototype.setMap=function(t){this.map=t,this.map.googleMap.controls[e.ControlPosition.TOP_LEFT].push(this.streetViewPanel.get(0));if(this.streetView!=null)return this.map.googleMap.setStreetView(this.streetView)},r.prototype.createObject=function(){var t,n,r=this;return t={enableCloseButton:!0,visible:!1},this.streetView=new e.StreetViewPanorama(this.streetViewPanel.get(0),t),(n=this.map)!=null&&n.googleMap.setStreetView(this.streetView),e.event.addListener(this.streetView,"visible_changed",function(){return r.streetView.getVisible()?r.streetViewPanel.show():r.streetViewPanel.hide(),r.map.refresh()})},r}(r),window.komoo.controls={DrawingManager:b,DrawingControl:y,GeometrySelector:x,Balloon:p,AjaxBalloon:l,InfoWindow:T,Tooltip:W,FeatureClusterer:S,CloseBox:m,SupporterBox:z,LicenseBox:C,SearchBox:R,PerimeterSelector:F,Location:k,SaveLocation:I,AutosaveLocation:c,SaveMapType:q,AutosaveMapType:h,StreetView:U},window.komoo.controls})}).call(this);