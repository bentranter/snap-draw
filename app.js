var app = app || {};

(function() {
  'use strict';

  // Drawing app
  var View = Backbone.View.extend({
    el: 'body',

    // Shortcut to drawing area
    snap: Snap('#drawingArea'),

    events: {
      'click #rect': 'drawRect',
      'keypress': 'handleShortcuts'
    },

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
      this.$('#drawingArea')
        .height(function() {
          return Math.floor(window.innerHeight);
        })
        .width(function() {
          return Math.floor(window.innerWidth - 160);
        });
    },

    handleShortcuts: function(e) {
      e.preventDefault();

      if (e.keyCode === 114) {
        this.drawRect();
      }
    },

    drawRect: function() {
      var data = {};
      var drawAttr = {
        stroke: '#fff',
        strokeWidth: 5
      };

      var self = this;
      this.snap
        .mousedown(function(evt) {
          data.x1 = evt.clientX;
          data.y1 = evt.clientY;
        })
        .mouseup(function(evt) {
          data.x2 = evt.clientX;
          data.y2 = evt.clientY;

          self.snap.path(Snap.format('M {x1} {y1} L {x2} {y1}', data)).attr(drawAttr);
          self.snap.path(Snap.format('M {x1} {y1} L {x1} {y2}', data)).attr(drawAttr);
          self.snap.path(Snap.format('M {x1} {y2} L {x2} {y2}', data)).attr(drawAttr);
          self.snap.path(Snap.format('M {x2} {y1} L {x2} {y2}', data)).attr(drawAttr);
      });
    }
  });


  // Handle generated coordinate data
  var Data = Backbone.Model.extend({
    defaults: {
      coordinates: {}
    }
  });

  // Kick things off
  window.mainView = new View({ model: new Data() });

})();