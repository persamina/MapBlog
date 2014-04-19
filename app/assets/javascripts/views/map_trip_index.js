MapBlog.Views.MapTripIndex = Backbone.View.extend({
  initialize: function(options) {
    this.public_collection = options.public_collection;
    this.listenTo(this.collection, "add remove change", this.render);
    this.listenTo(this.public_collection, "add remove change", this.render);
  },
  template: JST["map_trips/index"],
  events: {
    "click .delete-map-trip": "deleteMapTrip"
  },
  
  render: function() {
    var mapTripIndex = this;
    var renderedContent = this.template();
    this.$el.html(renderedContent);
    this.$(".map_trips").empty();
    this.$(".public_map_trips").empty();
    this.collection.forEach(function(mapTrip) {
      var mapTripDetail = new MapBlog.Views.MapTripDetailList({
        model: mapTrip
      });
      mapTripIndex.$(".map_trips").append(mapTripDetail.render().$el);
    });
    this.public_collection.forEach(function(mapTrip) {
      var publicMapTripDetail = new MapBlog.Views.MapTripDetailList({
        model: mapTrip
      });
      mapTripIndex.$(".public_map_trips").append(publicMapTripDetail.render().$el);
    });
    return this;
  },
  deleteMapTrip: function(e) {
    e.preventDefault();
    var iconClicked = $(e.target);
    var mapTripId = iconClicked.parent().data("mapTripId");
    var mapTripToDelete = this.collection.get(mapTripId);
    mapTripToDelete.destroy({
      wait: true,
      success: function(model, response) {
        var successMessage = MapBlog.Store.successTemplate({message: "Map Trip successfully Deleted"});
        $(".success-messages").append(successMessage);
      }
    });
  }

});
