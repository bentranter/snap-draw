var Backbone = require('backbone');
var $ = require('jquery');

module.exports = Backbone.View.extend({
  el: '#drawingArea',
  snap: Snap(this.el),
  initialize: function() {
      // Set the width and height
      // of the drawing area
      this.setDrawingAreaDimensions();

      // Reset on resize
      $(window).on('resize', this.setDrawingAreaDimensions);
    },

    render: function() {

    },

    setDrawingAreaDimensions: function() {
      $('#drawingArea')
        .height(function() {
          return Math.floor(window.innerHeight);
        })
        .width(function() {
          return Math.floor(window.innerWidth - 160);
        });
    }
});