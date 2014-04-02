MapBlog.Views.MapTripIndex = Backbone.View.extend({
  initialize: function() {
    this.listenTo(this.collection, "add remove change", this.render);
  },
  template: JST["map_trips/index"],
  events: {
    "click .delete_map_trip": "deleteMapTrip"
  },
  
  render: function() {
    var mapTripIndex = this;
    var renderedContent = this.template();
    this.$el.html(renderedContent);
    this.collection.forEach(function(mapTrip) {
      var mapTripDetail = new MapBlog.Views.MapTripDetailList({
        model: mapTrip
      });
      mapTripIndex.$(".map_trips").append(mapTripDetail.render().$el);
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
        console.log("successfully destroyed");
      }
    });
    console.log(mapTripId);
  }

});
