MapBlog.Routers.AppRouter = Backbone.Router.extend({

  initialize: function($rootEl) {
    this.$rootEl = $rootEl;
  },

  routes: {
    "": "showIndex",
    "signin": "showSignIn",
    "new": "showNew",
    ":id": "showDetail"
  },

  showIndex: function() {
    console.log("showIndex");
    if (MapBlog.currentUser.get("id") ) {
      var mapTripIndex = new MapBlog.Views.MapTripIndex({
        collection: MapBlog.mapTrips
      });
      this._swapView(mapTripIndex.render().$el);
    } else {
      Backbone.history.navigate("signin", {trigger: true})
    }
  },

  showDetail: function(id) {
    var mapTrip = MapBlog.mapTrips.get(id);
    if (MapBlog.currentUser.get("id") ) {
      var mapTripDetail = new MapBlog.Views.MapTripDetail({
        model: mapTrip
      });
      this._swapView(mapTripDetail.render().$el);
      mapTripDetail.loadGalleryMap();
    } else {
      Backbone.history.navigate("signin", {trigger: true})
    }

  },

  showSignIn: function() {
    var signIn = new MapBlog.Views.SignIn();
    this._swapView(signIn.render().$el);
  },

  showNew: function() {

  },

  _swapView: function(view) {
    this._currentView && this._currentView.remove();
    this._currentView = view;
    this.$rootEl.html(view);
  }

});
