'use strict';

var Backbone = require('backbone');
var _ = require('underscore');
var $ = require('jquery');

module.exports = Backbone.View.extend({
  el: '#canvas',

  // Snap.svg reference to drawingArea
  snap: Snap('#drawingArea'),

  // Cached DOM references
  zoomValue: document.getElementById('zoomValue'),

  events: {
    'click #zoomIn': 'zoomIn',
    'click #zoomOut': 'zoomOut'
  },

  initialize: function() {

    // Fix references for resize 
    // events and callbacks
    _.bindAll(this, 
      'getDimensions', 
      'setViewBoxDimensions', 
      'setDrawingAreaDimensions', 
      'resizeViewBoxDimensions'
    );

    // Set the width and height
    // of the drawing area
    this.setDrawingAreaDimensions();
    this.setViewBoxDimensions();

    // Reset on resize
    $(window).on(
      'resize', 
      this.setDrawingAreaDimensions,
      this.resizeViewBoxDimensions
    );

    // Register mousewheel event
    // in Chrome, Opera, Safari
    document
      .getElementById('drawingArea')
      .addEventListener('mousewheel', this.handleMousewheel, false);

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
    var moveX = Math.floor(e.wheelDeltaX / 6);
    var moveY = Math.floor(e.wheelDeltaY / 6);

    self.viewBox.baseVal.x -= moveX;
    self.viewBox.baseVal.y -= moveY;
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
  },

  /**
   * Simulates static positioning
   * inside viewBox.
   */
  resizeViewBoxDimensions: function() {

    var dim = this.getDimensions();
    dim.drawingArea[0].viewBox.baseVal.x += 0;
    dim.drawingArea[0].viewBox.baseVal.y += 0;
  },

  zoomIn: function() {

    var box = this.getDimensions().drawingArea[0].viewBox.baseVal;
    var currentZoom = parseInt(this.zoomValue.textContent);

    box.width -= 100;
    box.height -= 100;

    this.zoomValue.textContent = parseInt(currentZoom) + 10;
  },

  zoomOut: function() {

    var box = this.getDimensions().drawingArea[0].viewBox.baseVal;
    var currentZoom = parseInt(this.zoomValue.textContent);

    box.width += 100;
    box.height += 100;

    this.zoomValue.textContent = parseInt(currentZoom) - 10;
  }
});