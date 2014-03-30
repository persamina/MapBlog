MapBlog.Views.MapTripIndex = Backbone.View.extend({
  initialize: function() {
    this.listenTo(this.collection, "add remove change", this.render);
  },
  template: JST["map_trips/index"],
  
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

});
