MapBlog.Views.MapTripNew = Backbone.View.extend({
  initialize: function() {
  },
  events: {
    "submit .new-map-trip-form": "submit"
  },

  template: JST["map_trips/new"],

  render: function() {
    var renderedContent = this.template();
    this.$el.html(renderedContent);
    return this;
  },
  submit: function(e) {
    e.preventDefault();
    var newMapTripData = $(e.currentTarget).serializeJSON().map_trip;
    var newMapTrip = new MapBlog.Models.MapTrip({
      title: newMapTripData.title,
      description: newMapTripData.description,
      user_id: MapBlog.currentUser.id,
      shared: newMapTripData.shared
    });
    newMapTrip.save({}, {
      wait: true,
      success: function(model) {
        var mapTripModel = new MapBlog.Models.MapTrip(model);
        MapBlog.mapTrips.add([model])
      }
    });
    Backbone.history.navigate("", {trigger: true});
  }

});
