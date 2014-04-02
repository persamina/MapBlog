MapBlog.Views.UserNew = Backbone.View.extend({

  initialize: function() {
  },

  template: JST["users/new"],

  render: function() {
    var renderedContent = this.template();
    this.$el.html(renderedContent);
    return this;
  },

  loadFUMethods: function() {
    var newUserView = this;

    $('#fileupload').bind('fileuploaddone', function(e, data) {
      Backbone.history.navigate("sign_in", {trigger: true});
    });

  },

});
