MapBlog.Models.Comment = Backbone.Model.extend({
  urlRoot: "/comments",

  parse: function(respAttrs, options) {
    respAttrs.user= new MapBlog.Models.User(respAttrs.user);
    return respAttrs;
  }
});
