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
      var successMessage = MapBlog.Store.successTemplate({message: "User Updated!"});
      $(".success-messages").append(successMessage);
      Backbone.history.navigate("sign_in", {trigger: true});
    });

  },

});
