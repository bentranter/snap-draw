var Backbone = require('backbone');
var $ = require('jquery');

module.exports = Backbone.View.extend({
  el: '#drawingArea',

  snap: Snap(this.el),

  events: {
  },

  initialize: function() {
      // Set the width and height
      // of the drawing area
      this.setDrawingAreaDimensions();

      // Reset on resize
      $(window).on('resize', this.setDrawingAreaDimensions);

      // Register mousewheel event
      // in Chrome, Opera, Safari
      document.getElementById('drawingArea').addEventListener('mousewheel', this.handleMousewheel, false);
    },

    render: function() {

    },

    handleMousewheel: function(e) {
      console.log(e.wheelDeltaX, e.wheelDeltaY);
    },

    setDrawingAreaDimensions: function() {
      $('#drawingArea')
        .height(function() {
          return Math.floor(window.innerHeight);
        })
        .width(function() {
          return Math.floor(window.innerWidth - 220);
        });
    }
});