(function() {

  define(['jquery', 'underscore', 'backbone'], function($, _, Backbone) {
    window.PanelInfo = Backbone.Model.extend({
      toJSON: function(attr) {
        return Backbone.Model.prototype.toJSON.call(this, attr);
      }
    });
    window.PanelInfoView = Backbone.View.extend({
      className: 'panel-info',
      initialize: function() {
        _.bindAll(this, 'render');
        return this.template = _.template($('#panel-info-template').html());
      },
      render: function() {
        var renderedContent;
        renderedContent = this.template(this.model.toJSON());
        $(this.el).html(renderedContent);
        return this;
      }
    });
    window.Feature = Backbone.Model.extend({
      toJSON: function(attr) {
        var defaultJSON, name, _ref, _ref2, _ref3;
        defaultJSON = Backbone.Model.prototype.toJSON.call(this, attr);
        name = (_ref = (_ref2 = this.get('properties')) != null ? _ref2['organization_name'] : void 0) != null ? _ref : '';
        if (name) name += ' - ';
        name += (_ref3 = this.get('properties')) != null ? _ref3['name'] : void 0;
        return _.extend(defaultJSON, {
          iconClass: this.iconClass,
          name: name
        });
      },
      displayOnMap: function() {
        return $('#map-canvas').komooMap('highlight', {
          type: this.get('properties').type,
          id: this.get('properties').id
        });
      }
    });
    window.FeatureView = Backbone.View.extend({
      tagName: 'li',
      className: 'feature',
      events: {
        'mouseover': 'displayOnMap'
      },
      initialize: function() {
        _.bindAll(this, 'render', 'displayOnMap');
        return this.template = _.template($('#feature-template').html());
      },
      render: function() {
        var renderedContent;
        renderedContent = this.template(this.model.toJSON());
        $(this.el).html(renderedContent);
        return this;
      },
      displayOnMap: function() {
        this.model.displayOnMap();
        return this;
      }
    });
    window.Features = Backbone.Collection.extend({
      initialize: function() {},
      model: Feature
    });
    window.FeaturesView = Backbone.View.extend({
      initialize: function(attr) {
        _.bindAll(this, 'render');
        this.type = attr.type;
        this.template = _.template($('#features-template').html());
        return this.collection.bind('reset', this.render);
      },
      title: function(count) {
        var msg;
        msg = this.type === 'OrganizationBranch' ? ngettext("%s organization branch", "%s organization branchs", count) : this.type === 'Community' ? ngettext("%s community", "%s communities", count) : this.type === 'Resource' ? ngettext("%s resource", "%s resources", count) : this.type === 'Need' ? ngettext("%s need", "%s needs", count) : this.type === 'User' ? ngettext("%s contributors", "%s contributors", count) : "";
        return interpolate(msg, [count]);
      },
      iconClass: function() {
        var modelName, _ref;
        if ((_ref = this.type) === 'OrganizationBranch' || _ref === 'SelfOrganizationBranch') {
          modelName = 'Organization';
        } else {
          modelName = this.type;
        }
        return "icon-" + (modelName.toLowerCase()) + "-big";
      },
      render: function() {
        var $features, collection;
        collection = this.collection;
        if (collection.length === 0) return this;
        this.$el.html(this.template({
          title: this.title(collection.length),
          iconClass: this.iconClass()
        }));
        $features = this.$('.feature-list');
        collection.each(function(feature) {
          var view;
          view = new FeatureView({
            model: feature
          });
          return $features.append(view.render().$el);
        });
        return this;
      }
    });
    if (typeof KomooNS === "undefined" || KomooNS === null) KomooNS = {};
    KomooNS.drawFeaturesList = function(FeaturesViewClass) {
      var branchsView, communitiesView, needsView, resourcesView, selfBranchsView,
        _this = this;
      if (FeaturesViewClass == null) FeaturesViewClass = FeaturesView;
      KomooNS.features = _(geojson.features).groupBy(function(f) {
        return f.properties.type;
      });
      communitiesView = new FeaturesViewClass({
        type: 'Community',
        collection: new Features().reset(KomooNS.features['Community'])
      });
      $('.features-wrapper').append(communitiesView.render().$el);
      needsView = new FeaturesViewClass({
        type: 'Need',
        collection: new Features().reset(KomooNS.features['Need'])
      });
      $('.features-wrapper').append(needsView.render().$el);
      resourcesView = new FeaturesViewClass({
        type: 'Resource',
        collection: new Features().reset(KomooNS.features['Resource'])
      });
      $('.features-wrapper').append(resourcesView.render().$el);
      selfBranchsView = new FeaturesViewClass({
        type: 'SelfOrganizationBranch',
        collection: new Features().reset(_.filter(KomooNS.features['OrganizationBranch'], function(o) {
          return o.properties.organization_name === KomooNS.obj.name;
        }))
      });
      $('.features-wrapper').append(selfBranchsView.render().$el);
      branchsView = new FeaturesViewClass({
        type: 'OrganizationBranch',
        collection: new Features().reset(_.filter(KomooNS.features['OrganizationBranch'], function(o) {
          return o.properties.organization_name !== KomooNS.obj.name;
        }))
      });
      $('.features-wrapper').append(branchsView.render().$el);
      branchsView = new FeaturesViewClass({
        type: 'User',
        collection: new Features().reset(KomooNS.features['User'])
      });
      $('.features-wrapper').append(branchsView.render().$el);
      return geoObjectsListing($('.features-wrapper'));
    };
    return KomooNS.drawFeaturesList;
  });

}).call(this);
