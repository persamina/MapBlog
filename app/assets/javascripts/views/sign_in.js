MapBlog.Views.SignIn = Backbone.View.extend({
  initialize: function() {

  }, 
  events: {
    "submit .sign_in_form": "submit",
  },
  template: JST["session/new"],
  render: function() {
    var renderedContent = this.template();
    this.$el.html(renderedContent);
    return this;
  },
  submit: function(event) {
    event.preventDefault();
    console.log("submitted");
    var signInValues = $(event.target).serializeJSON();
    var newSession = new MapBlog.Models.Session(signInValues);

    newSession.save({}, {
      success: function(model, response, options) {
        MapBlog.currentUser.set(response.user);
        MapBlog.mapTrips.fetch();
        Backbone.history.navigate("", {trigger: true});
      }
    });

  },

});
