MapBlog.Views.MapTripEdit= Backbone.View.extend({
  initialize: function() {
  },
  events: {
    "submit .new-edit-map-trip-form": "submit"
  },

  template: JST["map_trips/new_edit"],

  render: function() {
    var editMapTripView = this;
    if(this.model.get("shared") == true) {
      var publicCheckedValue = "checked";
      var privateCheckedValue = "";
    } else {
      var publicCheckedValue = "";
      var privateCheckedValue = "checked";
    }
    var renderedContent = this.template({
      mapTrip: editMapTripView.model, 
      title: "Edit Map Trip", 
      buttonText: "Update Map Trip!",
      publicCheckedValue: publicCheckedValue,
      privateCheckedValue: privateCheckedValue
    });
    this.$el.html(renderedContent);
    return this;
  },
  submit: function(e) {
    var editMapTripView = this;
    e.preventDefault();
    var editMapTripData = $(e.currentTarget).serializeJSON().map_trip;
    editMapTripData["id"] = this.model.id;
    editMapTripData["user_id"] = this.model.get("user_id");

    var updatedMapTrip = new MapBlog.Models.MapTrip(editMapTripData, {parse: true});
    this.model.set(editMapTripData);
    this.model.save({}, {
      wait: true,
      success: function(mapTrip) {
        editMapTripView.model = mapTrip;
        console.log("successfully updated");
      }
    });

    Backbone.history.navigate("", {trigger: true});
  }

});
