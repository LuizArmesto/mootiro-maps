(function(){var e=Object.prototype.hasOwnProperty,t=function(t,n){function i(){this.constructor=t}for(var r in n)e.call(n,r)&&(t[r]=n[r]);return i.prototype=n.prototype,t.prototype=new i,t.__super__=n.prototype,t},n=Array.prototype.indexOf||function(e){for(var t=0,n=this.length;t<n;t++)if(t in this&&this[t]===e)return t;return-1};define(["require","googlemaps","./component","./common","./geometries","./utils","infobox","markerclusterer"],function(e){var r,i,s,o,u,a,f,l,c,h,p,d,v,m,g,y,b,w,E,S,x,T,N,C,k,L,A,O,M,D,P,H,B,j,F,I,q,R,U,z,W,X,V,J,K,Q,G,Y,Z,et,tt,nt,rt;return X=e("googlemaps"),c=e("./component"),z=e("./common"),W=e("./geometries"),V=e("./utils"),b=e("infobox"),L=e("markerclusterer"),window.komoo==null&&(window.komoo={}),(rt=window.komoo).event==null&&(rt.event=X.event),tt=gettext("Next Step"),G=gettext("Cancel"),Y=gettext("Close"),Q=gettext("Add shape"),J=gettext("Add line"),K=gettext("Add point"),nt=gettext("Sum"),Z=gettext("Cut out"),et=gettext("Loading..."),m=z.geometries.types.EMPTY,D=z.geometries.types.POINT,C=z.geometries.types.MULTIPOINT,P=z.geometries.types.POLYGON,H=z.geometries.types.LINESTRING,E=z.geometries.types.LINESTRING,k=z.geometries.types.MULTILINESTRING,N=z.geometries.types.MULTILINESTRING,O={},O[D]=X.drawing.OverlayType.MARKER,O[C]=X.drawing.OverlayType.MARKER,O[E]=X.drawing.OverlayType.POLYLINE,O[N]=X.drawing.OverlayType.POLYLINE,O[P]=X.drawing.OverlayType.POLYGON,v="edit",h="delete",A="new",r="add",f="cutout",M="perimeter_selection",a=function(e){function n(){n.__super__.constructor.apply(this,arguments)}return t(n,e),n.prototype.position=X.ControlPosition.RIGHT_BOTTOM,n.prototype.init=function(){return n.__super__.init.call(this),this.box=$("<div>"),this.id!=null&&this.box.attr("id",this.id),this["class"]!=null&&this.box.addClass(this["class"]),this.map.addControl(this.position,this.box.get(0)),typeof this.handleMapEvents=="function"?this.handleMapEvents():void 0},n.prototype.hide=function(){return this.box.hide()},n.prototype.show=function(){return this.box.show()},n}(c),x=function(e){function n(){n.__super__.constructor.apply(this,arguments)}return t(n,e),n.prototype.position=X.ControlPosition.TOP_CENTER,n.prototype.id="map-loading",n.prototype.init=function(){return n.__super__.init.call(this),this.requestsTotal=0,this.requestsWaiting=0,this.repaint(),this.hide()},n.prototype.getPercent=function(){return this.requestsTotal===0?0:Math.round(100*((this.requestsTotal-this.requestsWaiting)/this.requestsTotal))},n.prototype.repaint=function(){return this.box.html(""+et+" "+this.getPercent()+"%")},n.prototype.handleMapEvents=function(){var e=this;return this.map.subscribe("features_request_started",function(){return e.show()}),this.map.subscribe("features_request_queued",function(){return e.requestsTotal++,e.requestsWaiting++,e.repaint()}),this.map.subscribe("features_request_unqueued",function(){return e.requestsWaiting--,e.repaint()}),this.map.subscribe("features_request_completed",function(){return e.requestsTotal=0,e.requestsWaiting=0,setTimeout(function(){return e.hide()},200)})},n}(a),I=function(n){function r(){r.__super__.constructor.apply(this,arguments)}return t(r,n),r.prototype.position=X.ControlPosition.TOP_RIGHT,r.prototype.id="map-searchbox",r.prototype.init=function(){var t=this;return r.__super__.init.call(this),e(["map/views"],function(e){return t.view=new e.SearchBoxView,t.box.append(t.view.render().el),t.handleViewEvents()})},r.prototype.handleViewEvents=function(){var e=this;return this.view.on("search",function(t){var n,r;return r=t.type,n=t.position,e.map.publish("goto",n,!0)})},r}(a),R=function(e){function n(){n.__super__.constructor.apply(this,arguments)}return t(n,e),n.prototype.id="map-supporters",n.prototype.init=function(){return n.__super__.init.call(this),this.box.append($("#map-supporters-content").show())},n}(a),S=function(e){function n(){n.__super__.constructor.apply(this,arguments)}return t(n,e),n.prototype.id="map-license",n.prototype.position=X.ControlPosition.BOTTOM_LEFT,n.prototype.init=function(){return n.__super__.init.call(this),this.box.html('Este conteúdo é disponibilizado nos termos da licença <a href="http://creativecommons.org/licenses/by-sa/3.0/deed.pt_BR">Creative Commons - Atribuição - Partilha nos Mesmos Termos 3.0 Não Adaptada</a>; pode estar sujeito a condições adicionais. Para mais detalhes, consulte as Condições de Uso.')},n}(a),d=function(e){function n(){n.__super__.constructor.apply(this,arguments)}return t(n,e),n.prototype.enabled=!0,n.prototype.defaultDrawingManagerOptions={drawingControl:!1,drawingMode:null},n.prototype.componentOriginalStatus={},n.prototype.init=function(e){var t;this.options=e!=null?e:{},(t=this.options).drawingManagerOptions==null&&(t.drawingManagerOptions=this.defaultDrawingManagerOptions);if(this.options.map)return this.setMap(this.options.map)},n.prototype.initManager=function(e){return e==null&&(e=this.defaultDrawingManagerOptions),this.manager=new X.drawing.DrawingManager(e),this.handleManagerEvents()},n.prototype.setMap=function(e){return this.map=e,this.options.drawingManagerOptions.map=this.map.googleMap,this.initManager(this.options.drawingManagerOptions),this.handleMapEvents()},n.prototype.enable=function(){return this.enabled=!0},n.prototype.disable=function(){return this.enabled=!1},n.prototype.setMode=function(e){var t;this.mode=e,this.manager.setDrawingMode((t=this.mode)===r||t===A||this.mode===f&&this.feature.getGeometryType()===P?O[this.feature.getGeometryType()]:null);if(this.mode===f&&this.feature.getGeometryType()!==P)return this.mode=v},n.prototype.handleMapEvents=function(){var e=this;return this.map.subscribe("draw_feature",function(t,n){return e.drawFeature(n)}),this.map.subscribe("edit_feature",function(t){return e.editFeature(t)}),this.map.subscribe("drawing_finished",function(t){return e.feature.setEditable(!1),e.feature.updateIcon(),e.setFeature(null),e.setMode(null)}),this.map.subscribe("finish_drawing",function(){return e.map.publish("drawing_finished",e.feature,!0)}),this.map.subscribe("cancel_drawing",function(){return e.map.publish("drawing_finished",e.feature,!1)}),this.map.subscribe("mode_changed",function(t){return e.setMode(t)}),this.map.subscribe("feature_rightclick",function(e,t){var n,r,i;if(e.vertex==null)return;n=t.getGeometry().getOverlay(),i=typeof n.getPaths=="function"?n.getPaths():void 0,r=i!=null?i.getAt(e.path):void 0,r!=null&&r.removeAt(e.vertex);if((r!=null?r.getLength():void 0)===1)return i.removeAt(e.path)})},n.prototype.handleManagerEvents=function(){var e=this;return komoo.event.addListener(this.manager,"overlaycomplete",function(t){var n,i,s,o,u,a,l,c,h,p,d,m,g;s=(l=t.overlay)!=null?typeof l.getPath=="function"?l.getPath():void 0:void 0;if(s&&((c=e.mode)===r||c===A||c===f)&&((h=t.overlay)!=null?h.getPaths:void 0)){o=e.feature.getGeometry().getPaths(),e.mode===A&&o.clear();if((o!=null?o.length:void 0)>0){u=X.geometry.spherical.computeSignedArea(s),a=X.geometry.spherical.computeSignedArea(o.getAt(0)),n=u/Math.abs(u),i=a/Math.abs(a);if(n===i&&e.mode===f||n!==i&&((p=e.mode)===r||p===A))s=new X.MVCArray(s.getArray().reverse())}o.push(s),e.feature.getGeometry().setPaths(o),t.overlay.setMap(null)}else(d=e.mode)!==r&&d!==A||!t.overlay.getPosition?((m=e.mode)===r||m===A)&&t.overlay.getPath&&e.feature.getGeometry().addPolyline(t.overlay,!0):(e.feature.getGeometry().addMarker(t.overlay),e.feature.updateIcon(100));return e.map.setMode(v),(g=e.feature)!=null?g.setEditable(!0):void 0})},n.prototype.setFeature=function(e){var t=this;this.feature=e,this.featureClickListener!=null&&komoo.event.removeListener(this.featureClickListener);if(this.feature==null)return;return this.feature.setMap(this.map,{geometry:!0}),this.featureClickListener=komoo.event.addListener(this.feature,"click",function(e,n){var r,i,s,o,u,a;if(t.mode===h)return t.feature.getGeometryType()===P?(o=t.feature.getGeometry().getPaths(),o.forEach(function(t,n){if(V.isPointInside(e.latLng,t))return o.removeAt(n)})):n&&t.feature.getGeometryType()===C?(s=t.feature.getGeometry().getMarkers(),r=$.inArray(n,s.getArray()),r>-1&&(i=s.removeAt(r),i.setMap(null))):n&&t.feature.getGeometryType()===N&&(a=t.feature.getGeometry().getPolylines(),r=$.inArray(n,a.getArray()),r>-1&&(u=a.removeAt(r),u.setMap(null))),t.map.setMode(v)})},n.prototype.editFeature=function(e){var t;if(this.enabled===!1)return;this.setFeature(e);if(this.feature.getGeometryType()==="Empty"){this.map.publish("select_new_geometry",this.feature);return}return this.feature.setEditable(!0),t={},t[""+O[this.feature.getGeometryType()]+"Options"]=this.feature.getGeometry().getOverlayOptions({strokeWeight:2.5,zoom:100}),this.manager.setOptions(t),this.map.setMode(v),this.map.publish("drawing_started",this.feature)},n.prototype.drawFeature=function(e){this.feature=e;if(this.enabled===!1)return;return this.editFeature(this.feature),this.map.setMode(A)},n}(c),l=function(e){function n(){n.__super__.constructor.apply(this,arguments)}return t(n,e),n.prototype.id="map-drawing-box",n.prototype["class"]="map-panel",n.prototype.position=X.ControlPosition.TOP_LEFT,n.prototype.init=function(e){var t,r;return e==null&&(e={title:""}),n.__super__.init.call(this),t=(r=e.title)!=null?r:"",this.box.html('<div id="drawing-control">\n  <div class="map-panel-title" id="drawing-control-title">'+t+'</div>\n  <div class="content" id="drawing-control-content"></div>\n  <div class="map-panel-buttons">\n    <div class="map-button" id="drawing-control-cancel">'+Y+"</div>\n  </div>\n</div>"),this.show(),this.handleButtonEvents()},n.prototype.setTitle=function(e){return e==null&&(e=""),this.box.find("#drawing-control-title").text(e)},n.prototype.handleButtonEvents=function(){var e=this;return $("#drawing-control-cancel",this.box).click(function(){return e.map.publish("close_clicked")})},n}(a),y=function(e){function n(){n.__super__.constructor.apply(this,arguments)}return t(n,e),n.prototype.id="map-drawing-box",n.prototype["class"]="map-panel",n.prototype.position=X.ControlPosition.TOP_LEFT,n.prototype.init=function(){return n.__super__.init.call(this),this.hide(),this.box.html('<div id="geometry-selector">\n  <div class="map-panel-title" id="drawing-control-title"></div>\n  <ul class="content" id="drawing-control-content">\n    <li class="polygon btn" data-geometry-type="Polygon">\n      <i class="icon-polygon middle"></i><span class="middle">Adicionar área</span>\n    </li>\n    <li class="linestring btn" data-geometry-type="LineString">\n      <i class="icon-linestring middle"></i><span class="middle">Adicionar linha</span>\n    </li>\n    <li class="point btn" data-geometry-type="Point">\n      <i class="icon-point middle"></i><span class="middle">Adicionar ponto</span>\n    </li>\n  </ul>\n  <div class="map-panel-buttons">\n    <div class="map-button" id="drawing-control-cancel">'+G+"</div>\n  </div>\n</div>"),this.handleBoxEvents()},n.prototype.handleMapEvents=function(){var e=this;return this.map.subscribe("select_new_geometry",function(t){return e.open(t)})},n.prototype.handleBoxEvents=function(){var e=this;return this.box.find("li").each(function(t,n){var r,i;return r=$(n),i=r.attr("data-geometry-type"),r.click(function(){return e.close(),e.map.editFeature(e.feature,i)})})},n.prototype.handleButtonEvents=function(){var e=this;return $("#drawing-control-cancel",this.box).click(function(){return e.map.publish("cancel_drawing")})},n.prototype.showContent=function(){var e,t,n,r,i,s;this.box.find("li").hide(),i=(r=this.feature.getFeatureType())!=null?r.geometryTypes:void 0,s=[];for(t=0,n=i.length;t<n;t++)e=i[t],s.push(this.box.find("li."+e.toLowerCase()).show());return s},n.prototype.open=function(e){return this.feature=e,this.showContent(),$("#drawing-control-title",this.box).html("Selecione o tipo de objeto"),this.handleButtonEvents(),this.show()},n.prototype.close=function(){return this.hide()},n}(a),p=function(e){function n(){n.__super__.constructor.apply(this,arguments)}return t(n,e),n.prototype.id="map-drawing-box",n.prototype["class"]="map-panel",n.prototype.position=X.ControlPosition.TOP_LEFT,n.prototype.init=function(){return n.__super__.init.call(this),this.hide(),this.box.html('<div id="drawing-control">\n  <div class="map-panel-title" id="drawing-control-title"></div>\n  <div class="content" id="drawing-control-content"></div>\n  <div class="map-panel-buttons">\n    <div class="map-button" id="drawing-control-finish">'+tt+'</div>\n    <div class="map-button" id="drawing-control-cancel">'+G+"</div>\n  </div>\n</div>"),this.handleBoxEvents()},n.prototype.handleMapEvents=function(){var e=this;return this.map.subscribe("drawing_started",function(t){return e.open(t)}),this.map.subscribe("drawing_finished",function(t){return e.close()}),this.map.subscribe("mode_changed",function(t){return e.setMode(t)})},n.prototype.handleBoxEvents=function(){var e=this;return $("#drawing-control-finish",this.box).click(function(){if($("#drawing-control-finish",e.box).hasClass("disabled"))return;return e.map.publish("finish_drawing")}),$("#drawing-control-cancel",this.box).click(function(){return e.map.publish("cancel_drawing")})},n.prototype.handleButtonEvents=function(){var e=this;return $("#drawing-control-add",this.box).click(function(){return e.map.setMode(e.mode!==r?r:v)}),$("#drawing-control-cutout",this.box).click(function(){return e.map.setMode(e.mode!==f?f:v)}),$("#drawing-control-delete",this.box).click(function(){return e.map.setMode(e.mode!==h?h:v)})},n.prototype.setMode=function(e){var t;return this.mode=e,this.mode===A?($("#drawing-control-content",this.box).hide(),$("#drawing-control-finish",this.box).addClass("disabled")):($("#drawing-control-content",this.box).show(),$("#drawing-control-finish",this.box).removeClass("disabled")),$(".map-button.active",this.box).removeClass("active"),$("#drawing-control-"+((t=this.mode)!=null?t.toLowerCase():void 0),this.box).addClass("active")},n.prototype.getTitle=function(){var e,t,n,r;if(this.feature.getGeometryType()===P)e="polygon",t=Q;else if((n=this.feature.getGeometryType())===E||n===N)e="linestring",t=J;else if((r=this.feature.getGeometryType())===D||r===C)e="point",t=K;return'<i class="icon-'+e+' middle"></i><span class="middle">'+t+"</span>"},n.prototype.getContent=function(){var e,t,n,r;return e=$('<div class="map-button" id="drawing-control-add"><i class="icon-komoo-plus middle"></i><span class="middle">'+nt+"</span></div>"),n=$('<div class="map-button" id="drawing-control-cutout"><i class="icon-komoo-minus middle"></i><span class="middle">'+Z+"</span></div>"),r=$('<div class="map-button" id="drawing-control-delete"><i class="icon-komoo-trash middle"></i></div>'),t=$("<div>").addClass(this.feature.getGeometryType().toLowerCase()),this.feature.getGeometryType()!==D&&t.append(e),this.feature.getGeometryType()===P&&t.append(n),this.feature.getGeometryType()!==D&&t.append(r),t},n.prototype.open=function(e){return this.feature=e,$("#drawing-control-title",this.box).html(this.getTitle()),$("#drawing-control-content",this.box).html(this.getContent()),this.handleButtonEvents(),this.show()},n.prototype.close=function(){return this.hide()},n}(a),B=function(e){function n(){n.__super__.constructor.apply(this,arguments)}return t(n,e),n.prototype.enabled=!0,n.prototype.init=function(){var e=this;return n.__super__.init.call(this),this.circle=new X.Circle({visible:!0,radius:100,fillColor:"white",fillOpacity:0,strokeColor:"#ffbda8",zIndex:-1}),this.marker=new X.Marker({icon:"/static/img/marker.png"}),komoo.event.addListener(this.circle,"click",function(t){if(e.map.mode===M)return e.selected(t.latLng)})},n.prototype.select=function(e,t){this.radius=e,this.callback=t;if(!this.enabled)return;return this.origMode=this.map.mode,this.map.disableComponents("infoWindow"),this.map.setMode(M)},n.prototype.selected=function(e){return typeof this.radius=="number"&&this.circle.setRadius(this.radius),typeof this.callback=="function"&&this.callback(e,this.circle),this.circle.setCenter(e),this.circle.setMap(this.map.googleMap),this.marker.setPosition(e),this.marker.setMap(this.map.googleMap),this.map.publish("perimeter_selected",e,this.circle),this.map.setMode(this.origMode),this.map.enableComponents("infoWindow")},n.prototype.handleMapEvents=function(){var e,t,n,r,i,s=this;this.map.subscribe("select_perimeter",function(e,t){return s.select(e,t)}),r=["click","feature_click"],i=[];for(t=0,n=r.length;t<n;t++)e=r[t],i.push(this.map.subscribe(e,function(e){if(s.map.mode===M)return s.selected(e.latLng)}));return i},n.prototype.setMap=function(e){return this.map=e,this.handleMapEvents()},n.prototype.enable=function(){return this.enabled=!0},n.prototype.disable=function(){return this.hide(),this.enabled=!1},n}(c),u=function(e){function n(){n.__super__.constructor.apply(this,arguments)}return t(n,e),n.prototype.defaultWidth="300px",n.prototype.enabled=!0,n.prototype.init=function(e){return this.options=e!=null?e:{},n.__super__.init.call(this),this.width=this.options.width||this.defaultWidth,this.createInfoBox(this.options),this.options.map&&this.setMap(this.options.map),this.customize()},n.prototype.createInfoBox=function(e){return this.setInfoBox(new b({pixelOffset:new X.Size(0,-20),enableEventPropagation:!0,closeBoxMargin:"10px",disableAutoPan:!0,boxStyle:{cursor:"pointer",background:"url(/static/img/infowindow-arrow.png) no-repeat 0 10px",width:this.width}}))},n.prototype.handleMapEvents=function(){var e=this;return this.map.subscribe("drawing_started",function(t){return e.disable()}),this.map.subscribe("drawing_finished",function(t){return e.enable()})},n.prototype.setInfoBox=function(e){this.infoBox=e},n.prototype.setMap=function(e){return this.map=e,this.handleMapEvents()},n.prototype.enable=function(){return this.enabled=!0},n.prototype.disable=function(){return this.close(!1),this.enabled=!1},n.prototype.open=function(e){var t,n,r,i,s,o,u,a;this.options=e!=null?e:{};if(!this.enabled)return;return this.setContent(this.options.content||(this.options.features?this.createClusterContent(this.options):this.createFeatureContent(this.options))),this.feature=(s=this.options.feature)!=null?s:(o=this.options.features)!=null?o.getAt(0):void 0,i=(u=this.options.position)!=null?u:this.feature.getCenter(),i instanceof Array&&(t=new komoo.geometries.Empty,i=t.getLatLngFromArray(i)),r=V.latLngToPoint(this.map,i),r.x+=5,n=V.pointToLatLng(this.map,r),this.infoBox.setPosition(n),this.infoBox.open((a=this.map.googleMap)!=null?a:this.map)},n.prototype.setContent=function(e){return e==null&&(e={title:"",body:""}),typeof e=="string"&&(e={title:"",url:"",body:e}),this.title.html(e.url?'<a href="'+e.url+"'\">"+e.title+"</a>":e.title),this.body.html(e.body)},n.prototype.close=function(){var e;return this.isMouseover=!1,this.infoBox.close(),((e=this.feature)!=null?e.isHighlighted():void 0)&&this.feature.setHighlight(!1),this.feature=null},n.prototype.customize=function(){var e=this;return X.event.addDomListener(this.infoBox,"domready",function(t){var n;return n=e.infoBox.div_,X.event.addDomListener(n,"click",function(e){return e.cancelBubble=!0,typeof e.stopPropagation=="function"?e.stopPropagation():void 0}),X.event.addDomListener(n,"mouseout",function(t){return e.isMouseover=!1}),komoo.event.trigger(e,"domready")}),this.initDomElements()},n.prototype.initDomElements=function(){var e=this;return this.title=$("<div>"),this.body=$("<div>"),this.content=$("<div>").addClass("map-infowindow-content"),this.content.append(this.title),this.content.append(this.body),this.content.css({background:"white",padding:"10px",margin:"0 0 0 15px"}),this.content.hover(function(t){return e.isMouseover=!0},function(t){return e.isMouseover=!1}),this.infoBox.setContent(this.content.get(0))},n.prototype.createClusterContent=function(e){var t,n,r,i,s;return e==null&&(e={}),r=e.features||[],i=ngettext("%s Community","%s Communities",r.length),s="<strong>"+interpolate(i,[r.length])+"</strong>",t=function(){var e,t,i,s;i=r.slice(0,11),s=[];for(e=0,t=i.length;e<t;e++)n=i[e],s.push("<li>"+n.getProperty("name")+"</li>");return s}(),t="<ul>"+t.join("")+"</ul>",{title:s,url:"",body:t}},n.prototype.createFeatureContent=function(e){var t,n;return e==null&&(e={}),n="",t=e.feature,t&&(n=t.getProperty("name")),{title:n,url:"",body:""}},n}(c),i=function(e){function n(){n.__super__.constructor.apply(this,arguments)}return t(n,e),n.prototype.createFeatureContent=function(e){var t,r,i=this;e==null&&(e={}),t=e.feature;if(!t)return;return t[this.contentViewName]?t[this.contentViewName]:t.getProperty("id")==null?n.__super__.createFeatureContent.call(this,e):(r=dutils.urls.resolve(this.contentViewName,{zoom:this.map.getZoom(),app_label:t.featureType.appLabel,model_name:t.featureType.modelName,obj_id:t.getProperty("id")}),$.get(r,function(e){return t[i.contentViewName]=e,i.setContent(e)}),et)},n}(u),w=function(e){function n(){n.__super__.constructor.apply(this,arguments)}return t(n,e),n.prototype.defaultWidth="350px",n.prototype.contentViewName="info_window",n.prototype.open=function(e){var t,r;return(t=this.feature)!=null&&(t.displayTooltip=!0),n.__super__.open.call(this,e),(r=this.feature)!=null?r.displayTooltip=!1:void 0},n.prototype.close=function(e){var t,r;return e==null&&(e=!0),(t=this.feature)!=null&&t.setHighlight(!1),(r=this.feature)!=null&&(r.displayTooltip=!0),e&&this.map.enableComponents("tooltip"),n.__super__.close.call(this)},n.prototype.customize=function(){var e=this;return n.__super__.customize.call(this),X.event.addDomListener(this.infoBox,"domready",function(t){var n,r;return r=e.content.get(0),n=e.infoBox.div_.firstChild,X.event.addDomListener(r,"mousemove",function(t){return e.map.disableComponents("tooltip")}),X.event.addDomListener(r,"mouseout",function(t){n=e.infoBox.div_.firstChild;if(t.toElement!==n)return e.map.enableComponents("tooltip")}),X.event.addDomListener(n,"click",function(t){return e.close()})})},n.prototype.handleMapEvents=function(){var e=this;return n.__super__.handleMapEvents.call(this),this.map.subscribe("feature_click",function(t,n){return setTimeout(function(){return e.open({feature:n,position:t.latLng})},200)}),this.map.subscribe("feature_highlight_changed",function(t,n){if(n.isHighlighted())return e.open({feature:n})})},n}(i),U=function(e){function n(){n.__super__.constructor.apply(this,arguments)}return t(n,e),n.prototype.contentViewName="tooltip",n.prototype.close=function(){return clearTimeout(this.timer),n.__super__.close.call(this)},n.prototype.customize=function(){var e=this;return n.__super__.customize.call(this),X.event.addDomListener(this.infoBox,"domready",function(t){var n,r;return r=e.infoBox.div_,X.event.addDomListener(r,"click",function(t){return t.latLng=e.infoBox.getPosition(),e.map.publish("feature_click",t,e.feature)}),n=r.firstChild,$(n).hide()})},n.prototype.handleMapEvents=function(){var e=this;return n.__super__.handleMapEvents.call(this),this.map.subscribe("feature_mousemove",function(t,n){var r;clearTimeout(e.timer);if(n===e.feature||!n.displayTooltip)return;return r=n.getType()==="Community"?400:10,e.timer=setTimeout(function(){if(!n.displayTooltip)return;return e.open({feature:n,position:t.latLng})},r)}),this.map.subscribe("feature_mouseout",function(t,n){return e.close()}),this.map.subscribe("feature_click",function(t,n){return e.close()}),this.map.subscribe("cluster_mouseover",function(t,n){var r;if((r=t.getAt(0))!=null?!r.displayTooltip:!void 0)return;return e.open({features:t,position:n})}),this.map.subscribe("cluster_mouseout",function(t,n){return e.close()}),this.map.subscribe("cluster_click",function(t,n){return e.close()})},n}(i),g=function(e){function n(){n.__super__.constructor.apply(this,arguments)}return t(n,e),n.prototype.enabled=!0,n.prototype.maxZoom=9,n.prototype.gridSize=20,n.prototype.minSize=1,n.prototype.imagePath="/static/img/cluster/communities",n.prototype.imageSizes=[24,29,35,41,47],n.prototype.init=function(e){var t,n,r,i,s;this.options=e!=null?e:{},(t=this.options).gridSize==null&&(t.gridSize=this.gridSize),(n=this.options).maxZoom==null&&(n.maxZoom=this.maxZoom),(r=this.options).minimumClusterSize==null&&(r.minimumClusterSize=this.minSize),(i=this.options).imagePath==null&&(i.imagePath=this.imagePath),(s=this.options).imageSizes==null&&(s.imageSizes=this.imageSizes),this.featureType=this.options.featureType,this.features=[];if(this.options.map)return this.setMap(this.options.map)},n.prototype.initMarkerClusterer=function(e){var t,n;return e==null&&(e={}),t=((n=this.map)!=null?n.googleMap:void 0)||this.map,window.clusterer=this.clusterer=new L(t,[],e)},n.prototype.initEvents=function(e){var t,n=this;e==null&&(e=this.clusterer);if(!e)return;return t=["clusteringbegin","clusteringend"],t.forEach(function(t){return komoo.event.addListener(e,t,function(e){return komoo.event.trigger(n,t,n)})}),t=["click","mouseout","mouseover"],t.forEach(function(t){return komoo.event.addListener(e,t,function(e){var r,i;return r=komoo.collections.makeFeatureCollection({features:function(){var t,n,r,s;r=e.getMarkers(),s=[];for(t=0,n=r.length;t<n;t++)i=r[t],s.push(i.feature);return s}()}),komoo.event.trigger(n,t,r,e.getCenter()),n.map.publish("cluster_"+t,r,e.getCenter())})})},n.prototype.setMap=function(e){return this.map=e,this.initMarkerClusterer(this.options),this.initEvents(),this.addFeatures(this.map.getFeatures()),this.handleMapEvents()},n.prototype.handleMapEvents=function(){var e=this;return this.map.subscribe("feature_created",function(t){if(e.map.getZoom()<=e.maxZoom&&(e.featureType==null||t.getType()===e.featureType))return e.push(t)}),this.map.subscribe("idle features_loaded",function(){return e.map.getZoom()<=e.maxZoom?e.map.getFeatures().setVisible(!1):e.map.getFeatures().setVisible(!0)}),this.map.subscribe("idle",function(){if(e.length===0&&e.map.getZoom()<=e.maxZoom)return e.addFeatures(e.map.getFeatures())}),this.map.subscribe("features_request_completed",function(){if(e.map.getZoom()<=e.maxZoom)return e.addFeatures(e.map.getFeatures())})},n.prototype.updateLength=function(){return this.length=this.features.length},n.prototype.clear=function(){return this.features=[],this.clusterer.clearMarkers(),this.updateLength()},n.prototype.getAt=function(e){return this.features[e]},n.prototype.push=function(e){if(e.getMarker())return this.features.push(e),this.clusterer.addMarker(e.getMarker().getOverlay().markers_.getAt(0),!0),this.updateLength()},n.prototype.pop=function(){var e;return e=this.features.pop(),this.clusterer.removeMarker(e.getMarker()),this.updateLength(),e},n.prototype.forEach=function(e,t){return this.features.forEach(e,t)},n.prototype.repaint=function(){return this.clusterer.repaint()},n.prototype.getAverageCenter=function(){return this.clusterer.getAverageCenter()},n.prototype.addFeatures=function(e){var t=this;return e!=null&&e.forEach(function(e){return t.push(e)}),this.repaint()},n}(c),T=function(e){function n(){n.__super__.constructor.apply(this,arguments)}return t(n,e),n.prototype.enabled=!0,n.prototype.init=function(){return this.geocoder=new X.Geocoder,this.marker=new X.Marker({icon:"/static/img/marker.png"})},n.prototype.handleMapEvents=function(){var e=this;return this.map.subscribe("goto",function(t,n){return e.goTo(t,n)}),this.map.subscribe("goto_user_location",function(){return e.goToUserLocation()})},n.prototype.goTo=function(e,t){var n,r,i,s=this;return t==null&&(t=!1),i=function(e){if(e){s.map.googleMap.panTo(e);if(t)return s.marker.setPosition(e)}},typeof e=="string"?(r={address:e,region:this.region},this.geocoder.geocode(r,function(e,t){var n,r;if(t===X.GeocoderStatus.OK)return n=e[0],r=n.geometry.location,i(r)})):(n=e instanceof Array?e.length===2?new X.LatLng(e[0],e[1]):void 0:e,i(n))},n.prototype.goToUserLocation=function(){var e,t,n=this;e=google.loader.ClientLocation,e&&(t=new X.LatLng(e.latitude,e.longitude),this.map.googleMap.setCenter(t),typeof console!="undefined"&&console!==null&&console.log("Getting location from Google..."));if(navigator.geolocation)return navigator.geolocation.getCurrentPosition(function(e){return t=new X.LatLng(e.coords.latitude,e.coords.longitude),n.map.googleMap.setCenter(t),typeof console!="undefined"&&console!==null?console.log("Getting location from navigator.geolocation..."):void 0},function(){return typeof console!="undefined"&&console!==null?console.log("User denied access to navigator.geolocation..."):void 0})},n.prototype.setMap=function(e){return this.map=e,this.marker.setMap(this.map.googleMap),this.handleMapEvents()},n.prototype.enable=function(){return this.enabled=!0},n.prototype.disable=function(){return this.close(!1),this.enabled=!1},n}(c),j=function(e){function n(){n.__super__.constructor.apply(this,arguments)}return t(n,e),n.prototype.handleMapEvents=function(){var e=this;return n.__super__.handleMapEvents.call(this),this.map.subscribe("save_location",function(t,n){return e.saveLocation(t,n)}),this.map.subscribe("goto_saved_location",function(){return e.goToSavedLocation()})},n.prototype.saveLocation=function(e,t){return e==null&&(e=this.map.googleMap.getCenter()),t==null&&(t=this.map.getZoom()),V.createCookie("lastLocation",e.toUrlValue(),90),V.createCookie("lastZoom",t,90)},n.prototype.goToSavedLocation=function(){var e,t;e=V.readCookie("lastLocation"),t=parseInt(V.readCookie("lastZoom"),10);if(e&&t)return typeof console!="undefined"&&console!==null&&console.log("Getting location from cookie..."),this.map.publish("set_location",e),this.map.publish("set_zoom",t)},n}(T),s=function(e){function n(){n.__super__.constructor.apply(this,arguments)}return t(n,e),n.prototype.handleMapEvents=function(){var e=this;return n.__super__.handleMapEvents.call(this),this.map.subscribe("idle",function(){return e.saveLocation()})},n}(j),F=function(e){function r(){r.__super__.constructor.apply(this,arguments)}return t(r,e),r.prototype.setMap=function(e){var t;this.map=e,this.handleMapEvents(),t=this.getSavedMapType();if(n.call(_.values(X.MapTypeId),t)>=0)return this.useSavedMapType()},r.prototype.handleMapEvents=function(){var e=this;return this.map.subscribe("maptype_loaded",function(t){if(t===e.getSavedMapType())return e.map.googleMap.setMapTypeId(t)}),this.map.subscribe("initialized",function(){return e.useSavedMapType()})},r.prototype.saveMapType=function(e){return e==null&&(e=this.map.getMapTypeId()),V.createCookie("mapTypeId",e,X.MapTypeId.ROADMAP)},r.prototype.getSavedMapType=function(){return V.readCookie("mapTypeId")},r.prototype.useSavedMapType=function(){var e;return e=this.getSavedMapType(),typeof console!="undefined"&&console!==null&&console.log("Getting map type from cookie..."),this.map.googleMap.setMapTypeId(e)},r}(c),o=function(e){function n(){n.__super__.constructor.apply(this,arguments)}return t(n,e),n.prototype.handleMapEvents=function(){var e=this;return n.__super__.handleMapEvents.call(this),this.map.subscribe("maptypeid_changed",function(){return e.saveMapType()})},n}(F),q=function(e){function n(){n.__super__.constructor.apply(this,arguments)}return t(n,e),n.prototype.enabled=!0,n.prototype.init=function(){return typeof console!="undefined"&&console!==null&&console.log("Initializing StreetView support."),this.streetViewPanel=$("<div>").addClass("map-panel"),this.streetViewPanel.height("100%").width("50%"),this.streetViewPanel.hide(),this.createObject()},n.prototype.setMap=function(e){this.map=e,this.map.googleMap.controls[X.ControlPosition.TOP_LEFT].push(this.streetViewPanel.get(0));if(this.streetView!=null)return this.map.googleMap.setStreetView(this.streetView)},n.prototype.createObject=function(){var e,t,n=this;return e={enableCloseButton:!0,visible:!1},this.streetView=new X.StreetViewPanorama(this.streetViewPanel.get(0),e),(t=this.map)!=null&&t.googleMap.setStreetView(this.streetView),X.event.addListener(this.streetView,"visible_changed",function(){return n.streetView.getVisible()?n.streetViewPanel.show():n.streetViewPanel.hide(),n.map.refresh()})},n}(c),window.komoo.controls={DrawingManager:d,DrawingControl:p,GeometrySelector:y,Balloon:u,AjaxBalloon:i,InfoWindow:w,Tooltip:U,FeatureClusterer:g,CloseBox:l,LoadingBox:x,SupporterBox:R,LicenseBox:S,SearchBox:I,PerimeterSelector:B,Location:T,SaveLocation:j,AutosaveLocation:s,SaveMapType:F,AutosaveMapType:o,StreetView:q},window.komoo.controls})}).call(this);