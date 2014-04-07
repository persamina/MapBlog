MapBlog.Views.UserDetail = Backbone.View.extend({

  initialize: function() {
    this.listenTo(this.model, "add remove change", this.render);
  },

  template: JST["users/detail"],

  render: function() {
    var userDetail = this;
    var renderedContent = this.template({ user: this.model });
    this.$el.html(renderedContent);
    this.$(".map_trips").empty();
    if(this.model.get("map_trips")) {
      this.model.get("map_trips").forEach(function(mapTrip) {
        var mapTripDetail = new MapBlog.Views.MapTripDetailList({
          model: mapTrip
        });
        userDetail.$(".map_trips").append(mapTripDetail.render().$el)
      });
    }
    
    return this;
  },

  loadFUMethods: function() {
    var editUserView = this;

    $('#fileupload').bind('fileuploaddone', function(e, data) {
      Backbone.history.navigate("sign_in", {trigger: true});
    });

  },

});
