MapBlog.Views.SignIn = Backbone.View.extend({
  initialize: function() {

  }, 
  events: {
    "submit .sign_in_form": "submit",
    "click .sign-out-button": "signOut"
  },
  template: JST["session/new"],
  signOutTemplate: JST["sign_out"],
  render: function() {
    var renderedContent = this.template();
    this.$el.html(renderedContent);
    return this;
  },
  submit: function(e) {
    var signInView = this;
    e.preventDefault();
    console.log("submitted");
    var signInValues = $(e.target).serializeJSON();
    var newSession = new MapBlog.Models.Session(signInValues);

    newSession.save({}, {
      success: function(model, response, options) {
        MapBlog.currentUser.set(response.user);
        MapBlog.mapTrips.fetch();
        MapBlog.publicMapTrips.fetch();
        var renderedContent = signInView.signOutTemplate({user: MapBlog.currentUser});
        $(".nav-buttons").html(renderedContent);
        Backbone.history.navigate("", {trigger: true});
      }
    });
  },
  signOut: function(e) {
    e.preventDefault();


  }

});
