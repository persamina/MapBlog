MapBlog.Views.MapTripNew = Backbone.View.extend({
  initialize: function() {
  },
  events: {
    "submit .new-edit-map-trip-form": "submit"
  },

  template: JST["map_trips/new_edit"],

  render: function() {
    var newMapTripView = this;
    this.model = new MapBlog.Models.MapTrip();
    var renderedContent = this.template({
      mapTrip: newMapTripView.model, 
      title: "Create Map Trip", 
      buttonText: "Create Map Trip!",
      publicCheckedValue: "",
      privateCheckedValue: "checked"
    });
    this.$el.html(renderedContent);
    return this;
  },
  submit: function(e) {
    var newMapTripView = this;
    e.preventDefault();
    var newMapTripData = $(e.currentTarget).serializeJSON().map_trip;
    this.model = new MapBlog.Models.MapTrip({
      title: newMapTripData.title,
      description: newMapTripData.description,
      user_id: MapBlog.currentUser.id,
      shared: newMapTripData.shared
    });
    MapBlog.mapTrips.create(this.model, {
      wait: true,
      success: function(mapTrip) {
        newMapTripView.model = mapTrip;
      }
    });
    Backbone.history.navigate("", {trigger: true});
  }

});
