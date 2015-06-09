'use strict';

var Backbone = require('backbone');
var _ = require('underscore');
var $ = require('jquery');

module.exports = Backbone.View.extend({
  el: '#canvas',

  // Snap.svg reference to drawingArea
  snap: Snap('#drawingArea'),

  events: {
  },

  initialize: function() {

    // Fix references for resize 
    // events and callbacks
    _.bindAll(this, 'getDimensions', 'setViewBoxDimensions', 'setDrawingAreaDimensions');

    // Set the width and height
    // of the drawing area
    this.setDrawingAreaDimensions();
    this.setViewBoxDimensions();

    // Reset on resize
    $(window).on('resize', this.setDrawingAreaDimensions);

    // Register mousewheel event
    // in Chrome, Opera, Safari
    document.getElementById('drawingArea').addEventListener('mousewheel', this.handleMousewheel, false);

    // Test drawing
    this.snap.circle(0, 0, 25);
  },

  /**
   * Resizes the SVG's viewBox on
   * scroll, to simulate zooming.
   *
   * @param {Object} the mousewheel evevnt
   */
  handleMousewheel: function(e) {

    var self = this;

    // Reduce deltas to slow scrolling
    var moveX = Math.floor(e.wheelDeltaX / 3);
    var moveY = Math.floor(e.wheelDeltaY / 3);

    self.viewBox.baseVal.x += moveX;
    self.viewBox.baseVal.y += moveY;
  },

  /**
   * Get canvas width and height.
   *
   * @return Canvas width and height.
   */
  getDimensions: function() {

    var dimensions = {
      drawingArea: $('#drawingArea'),
      height: Math.floor(window.innerHeight),
      width: Math.floor(window.innerWidth - 220)
    };

    return dimensions;
  },

  /**
   * Sets the width and height of
   * the canvas.
   */
  setDrawingAreaDimensions: function() {

    var dim = this.getDimensions();

    dim.drawingArea
      .height(function() {
        return dim.height;
      })
      .width(function() {
        return dim.width;
      });
  },

  /**
   * Sets the viewBox dimensions.
   * Note: Width and height are 
   * opposite of viewPort.
   */
  setViewBoxDimensions: function() {

    var dim = this.getDimensions();
    dim.drawingArea[0].viewBox.baseVal.width = dim.height;
    dim.drawingArea[0].viewBox.baseVal.height = dim.width;
  }
});