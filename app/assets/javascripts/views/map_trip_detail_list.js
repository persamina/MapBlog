MapBlog.Views.MapTripDetailList = Backbone.View.extend({
  initialize: function() {

  },
  template: JST["map_trips/detail_list"],
  render: function() {
    var renderedContent = this.template({ mapTrip: this.model});
    this.$el.html(renderedContent);
    return this;
  }

});
