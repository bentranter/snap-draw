'use strict';

var Backbone = require('backbone');
var _ = require('underscore');
var $ = require('jquery');

module.exports = Backbone.View.extend({
  el: '#canvas',

  // Cachy cachy
  snap: Snap('#drawingArea'),

  // Cached DOM references
  zoomValue: document.getElementById('zoomValue'),

  events: {
    'click #zoomIn': 'zoomIn',
    'click #zoomOut': 'zoomOut',
    'keyup': 'handleShortcuts'
  },

  initialize: function() {

    // Fix references for resize 
    // events and callbacks
    _.bindAll(this, 
      'getDimensions', 
      'setViewBoxDimensions', 
      'setDrawingAreaDimensions', 
      'resizeViewBoxDimensions',
      'handleShortcuts'
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

    // Try
    $(window).on('keyup', this.handleShortcuts);

    // Register mousewheel event
    // in Chrome, Opera, Safari
    document
      .getElementById('drawingArea')
      .addEventListener('mousewheel', this.handleMousewheel, false);

    // Test drawing
    // this.snap.circle(0, 0, 25);
  },

  handleShortcuts: function(e) {
    e.preventDefault();

    console.log(e.keyCode);

    if (e.keyCode === 82) {
      this.drawRect();
    }
    if (e.keyCode === 76) {
      this.drawLine();
    }
    if (e.keyCode === 32) {
      this.testProblems();
    }
  },

  testProblems: function() {
    this.snap.mousedown(function(e) {
      // Always draw based on the viewBox's position
      console.log('Viewbox: ', e.currentTarget.viewBox.baseVal.x, e.currentTarget.viewBox.baseVal.y);
      console.log('Layers: ', e.layerX, e.layerY);
    });
  },

  drawRect: function(e) {
    var self = this;
    var data = {};
    var drawAttr = {
      stroke: '#333',
      strokeWidth: 5
    };
    this.snap
      .mousedown(function(evt) {
        data.x1 = evt.currentTarget.viewBox.baseVal.x + evt.clientX;
        data.y1 = evt.currentTarget.viewBox.baseVal.y + evt.clientY;
        console.log(data.x1, data.y1);
      })
      .mouseup(function(evt) {
        data.x2 = evt.currentTarget.viewBox.baseVal.x + evt.clientX;
        data.y2 = evt.currentTarget.viewBox.baseVal.y + evt.clientY;
        console.log(data.x2, data.y2);

        self.snap.path(Snap.format('M {x1} {y1} L {x2} {y1}', data)).attr(drawAttr);
        self.snap.path(Snap.format('M {x1} {y1} L {x1} {y2}', data)).attr(drawAttr);
        self.snap.path(Snap.format('M {x1} {y2} L {x2} {y2}', data)).attr(drawAttr);
        self.snap.path(Snap.format('M {x2} {y1} L {x2} {y2}', data)).attr(drawAttr);
    });
  },

  drawLine: function(e) {
    var data = {};
    var drawAttr = {
      stroke: '#333',
      strokeWidth: 5
    };

    var self = this;
    this.snap
      .mousedown(function(evt) {
        data.x1 = evt.currentTarget.viewBox.baseVal.x + evt.clientX;
        data.y1 = evt.currentTarget.viewBox.baseVal.y + evt.clientY;
        console.log(data.x1, data.y1);
      })
      .mouseup(function(evt) {
        data.x2 = evt.currentTarget.viewBox.baseVal.x + evt.clientX;
        data.y2 = evt.currentTarget.viewBox.baseVal.y + evt.clientY;
        console.log(data.x2, data.y2);

        self.snap.path(Snap.format('M {x1} {y1} L {x2} {y2}', data)).attr(drawAttr);
    });
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

    box.width = Math.round(parseFloat(box.width * 0.9));
    box.height = Math.round(parseFloat(box.height * 0.9));

    this.zoomValue.textContent = parseInt(currentZoom) + 10;
  },

  zoomOut: function() {

    var box = this.getDimensions().drawingArea[0].viewBox.baseVal;
    var currentZoom = parseInt(this.zoomValue.textContent);

    box.width = Math.round(parseFloat(box.width / 0.9));
    box.height = Math.round(parseFloat(box.height / 0.9));

    this.zoomValue.textContent = parseInt(currentZoom) - 10;
  }
});