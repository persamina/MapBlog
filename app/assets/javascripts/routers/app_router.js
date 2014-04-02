MapBlog.Routers.AppRouter = Backbone.Router.extend({

  initialize: function($rootEl) {
    this.$rootEl = $rootEl;
  },

  routes: {
    "": "showMapTripIndex",
    "signin": "showSignIn",
    "new": "showNewMapTrip",
    ":id": "showMapTripDetail",
    "users/new": "showNewUser"
  },

  showMapTripIndex: function() {
    if (MapBlog.currentUser.get("id") ) {
      var mapTripIndex = new MapBlog.Views.MapTripIndex({
        collection: MapBlog.mapTrips
      });
      this._swapView(mapTripIndex.render().$el);
    } else {
      Backbone.history.navigate("signin", {trigger: true})
    }
  },

  showMapTripDetail: function(id) {
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

  showNewMapTrip: function() {
    var mapTripNew = new MapBlog.Views.MapTripNew();
    this._swapView(mapTripNew.render().$el);
  },

  showNewUser: function() {
    var newUser = new MapBlog.Views.UserNew();
    this._swapView(newUser.render().$el);
    newUser.loadFUMethods();
  },

  _swapView: function(view) {
    this._currentView && this._currentView.remove();
    this._currentView = view;
    this.$rootEl.html(view);
  }

});
