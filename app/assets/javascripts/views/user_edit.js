MapBlog.Views.UserEdit = Backbone.View.extend({

  initialize: function() {
  },

  template: JST["users/edit"],

  render: function() {
    var renderedContent = this.template();
    this.$el.html(renderedContent);
    return this;
  },

  loadFUMethods: function() {
    var editUserView = this;

    $('#fileupload').bind('fileuploaddone', function(e, data) {
      Backbone.history.navigate("sign_in", {trigger: true});
    });

  },

});
