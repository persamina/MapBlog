MapBlog.Views.MapTripDetail = Backbone.View.extend({
  initialize: function() {
    this.map;
    this.geoJSON = [];
    this.galleriaData = [];
    this.currentPhoto = null;
  },
  selectedColor: "#a0e5ce",
  deselectedColor: "#1C625E",

  events: {
    "click a.show_hide_button": "showHidePhotoAdder",
    "keypress.new_comment": "addNewComment",
  },

  template: JST["map_trips/detail"],
  photo_loader: JST["map_trips/photo_loader"],
  commentTemplate: JST["comments/comment"],
  subCommentTemplate: JST["comments/sub_comment"],
  addCommentTemplate: JST["comments/add_comment"],

  render: function() {
    var mapTripDetail = this;
    var renderedContent = this.template({ mapTrip: this.model });
    this.$el.html(renderedContent);
    if (this.model.get("user_id") == MapBlog.currentUser.get("id")) {
      var photoLoader = this.photo_loader({mapTrip: this.model});
      this.$("#photo_loader").append(photoLoader);
    }

    return this;
  },

  loadGalleryMap: function() {
    var mapTripDetail = this;
    var imageData = this.generateImageData(this.model);
    this.map = L.mapbox.map('map');
    L.mapbox.tileLayer('persamina.hejgkefp').addTo(this.map);

    if(this.model.get("map_photos").models.length > 0) {
      this.map.featureLayer.setGeoJSON(this.geoJSON); 
      this.map.fitBounds(this.map.featureLayer.getBounds());
    } else {
      $("#content").css("display", "none");
    }
   
    Galleria.run('.galleria', { 
      dataSource: this.galleriaData,
      showCounter: true,
      thumbnails: false,
    });

    // setup events
    Galleria.on('image', function(e) {
      mapTripDetail.setColors(e.galleriaData.latitude, e.galleriaData.longitude);
      mapTripDetail.currentPhoto = e.galleriaData;
      mapTripDetail.addComments(e.galleriaData);
    });

    this.map.featureLayer.on("click", function(e) {
      mapTripDetail.setColors(e.latlng.lat, e.latlng.lng);
      var galleria = $(".galleria").data('galleria');
      galleria.show(e.layer.feature.properties["slideIndex"]);
    });

    this.initializeFileUpload();

    $('#fileupload').bind('fileuploaddone', function(e, data) {
      var galleria = $(".galleria").data('galleria');
      var newMapPhoto = new MapBlog.Models.MapPhoto(data.result.files[0], {parse: true});
      mapTripDetail.model.get("map_photos").models.push(newMapPhoto);
      
      if(data.result.files[0].longitude != null || data.result.files[0].longitude  != null ) 
      {
        var imageGeoJSON = {
          type: 'Feature',
          geometry: {
            type: 'Point',
            coordinates: [data.result.files[0].longitude, data.result.files[0].latitude]
          },
          properties: {
            'marker-color': this.deselectedColor,
            slideIndex: galleria.getDataLength() 
          }
        };
        mapTripDetail.geoJSON.push(imageGeoJSON);
        mapTripDetail.map.featureLayer.setGeoJSON(mapTripDetail.geoJSON); 
      }
      if (data.result.files[0].latitude != null)
      {
        var lat = data.result.files[0].latitude.toString() ;
      }

      if (data.result.files[0].longitude != null)
      {
        var lng = data.result.files[0].longitude.toString() ;
      }

      var imageData = { 
        id: data.result.files[0].id,
        index: galleria.getDataLength(), 
        image: data.result.files[0].url, 
        latitude: lat,   
        longitude: lng,  
        description: data.result.files[0].description.toString(),
        slideIndex: galleria.getDataLength(),
        deleteUrl: data.result.files[0].delete_url
      };
      
      if(galleria.getDataLength() == 0)
      {
        $("#content").css("display", "block");
        galleria.load([ imageData ]);
      } else {
        galleria.push(imageData);
      }

      mapTripDetail.map.fitBounds(mapTripDetail.map.featureLayer.getBounds());
      
    });

    $('#fileupload').bind('fileuploaddestroy', function(e, data) {
      var galleria = $(".galleria").data('galleria');
      var numImages = galleria.getDataLength();
      var currentSlideIndex = galleria.getIndex();
      for (var index = 0; index < numImages; index++)
      {
        var currentSlideData = galleria.getData(index)
        if (currentSlideData.deleteUrl == data.url) 
        {
          galleria.splice(currentSlideData.slideIndex, 1);
          break;
        }
      }
      mapTripDetail.geoJSON.splice(index, 1);
      mapTripDetail.map.featureLayer.setGeoJSON(mapTripDetail.geoJSON); 
      if (index == currentSlideIndex && galleria.getDataLength() > 0) 
      {
        galleria.show(0);
      }
    });

  },
  initializeFileUpload: function() {


  },
  generateImageData: function(mapTrip) {
    //var galleriaData = [];
    //var deselectedColor = "#1C625E";
    for (var index = 0; index < mapTrip.get("map_photos").models.length; index++) {

      this.galleriaData.push(
      { 
        id: mapTrip.get("map_photos").models[index].get("id"),
        index: index,
        image: mapTrip.get("map_photos").models[index].get("url"), 
        latitude: mapTrip.get("map_photos").models[index].get("latitude"), 
        longitude: mapTrip.get("map_photos").models[index].get("longitude"),
        description: mapTrip.get("map_photos").models[index].get("description"),
        slideIndex: index,
        deleteUrl: mapTrip.get("map_photos").models[index].get("delete_url")
      });

      if (mapTrip.get("map_photos").models[index].get("longitude") != null &&
        mapTrip.get("map_photos").models[index].get("latitude") != null) {

        var genericGeoJSON = {
          type: 'Feature',
          geometry: {
            type: 'Point',
            coordinates: [mapTrip.get("map_photos").models[index].get("longitude"), 
                mapTrip.get("map_photos").models[index].get("latitude")]
          },
          properties: {
            //title: 'Marker Two',
            'marker-color': this.deselectedColor,
            slideIndex: index
          }
        };
        this.geoJSON.push(genericGeoJSON);
      }

    }
  },

  showHidePhotoAdder: function(e) {
    e.preventDefault();

    var button = $(e.target);
    var current_text = button.text();
    if (current_text == "Show Photo Loader") {
      button.text("Hide Photo Loader");
      $("#photo_loader").show("medium");
    }  else {
      button.text("Show Photo Loader");
      $("#photo_loader").hide("medium");
    }
  },

  addComments: function(currentPhotoData) {
    var mapTripDetail = this;
    $(".media-list.comments").empty();
    console.log("add comments");
    $(".media-list.comments").hide();
    this.model.get("map_photos").models[currentPhotoData.index].get("comments").forEach(function(comment) {
      var renderedContent = mapTripDetail.commentTemplate({ comment: comment});
      $(".media-list.comments").append(renderedContent);
    });
    $(".media-list.comments").fadeIn("slow");
    var addCommentHTML = this.addCommentTemplate();
    $(".media-list.comments").append(addCommentHTML);

  },

  addNewComment: function(e) {
    if(e.keyCode == 13) {
      e.preventDefault();
      var mapTripDetail = this;
      var newCommentTextArea = $(e.target);
      var newComment = new MapBlog.Models.Comment({
        user_id: MapBlog.currentUser.id,
        map_photo_id: mapTripDetail.currentPhoto.id,
        comment_text: newCommentTextArea.val(),
        user: MapBlog.currentUser
      });
      newComment.save({}, {
        wait: true,
        success: function(comment) {
          // add to current map_trip map_photo
          if( MapBlog.mapTrips.findWhere({id: mapTripDetail.model.id}))
          {
            MapBlog.mapTrips.findWhere({id: mapTripDetail.model.id})
            .get("map_photos").models[mapTripDetail.currentPhoto.index]
            .get("comments").push(comment)
          } else {
            MapBlog.publicMapTrips.findWhere({id: mapTripDetail.model.id})
            .get("map_photos").models[mapTripDetail.currentPhoto.index]
            .get("comments").push(comment)
          }

          $("li.new_comment").remove();
          var renderedContent = mapTripDetail.commentTemplate({ comment: comment});
          $(".media-list.comments").hide().append(renderedContent).fadeIn("slow");
          var addCommentHTML = mapTripDetail.addCommentTemplate();
          $(".media-list.comments").append(addCommentHTML);
        },
        error: function(model) {
          console.log("failure");
        }
      });
    }
  },

  groupComments: function(rawComments) {
    var groupedComments = new Object;
    rawComments.forEach(function(comment) {
      if(groupedComments[comment.parent_comment_id] == null) {
        groupedComments[comment.parent_comment_id] = [];
      }
      groupedComments[comment.parent_comment_id].push(comment);
    });
    return groupedComments;
  },

  setColors: function(latitude, longitude) 
  {
    for (var i = 0; i < this.geoJSON.length; i++)
    {
      if (latitude == this.geoJSON[i].geometry.coordinates[1] && 
      longitude == this.geoJSON[i].geometry.coordinates[0])
      {
        this.geoJSON[i].properties["marker-color"] = this.selectedColor; 
        this.map.panTo([this.geoJSON[i].geometry.coordinates[1], this.geoJSON[i].geometry.coordinates[0]])
      } else {
        this.geoJSON[i].properties["marker-color"] = this.deselectedColor;
      }
    }
    this.map.featureLayer.setGeoJSON(this.geoJSON); 
  },

});
