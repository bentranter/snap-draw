var app = app || {};

(function() {
  'use strict';

  var View = Backbone.View.extend({
    el: 'body',

    // Shortcut to drawing area
    snap: Snap('#drawingArea'),

    events: {
      'keypress': 'handleShortcut'
    },

    initialize: function() {
      console.log('Hello');
    },

    render: function() {

    },

    handleShortcut: function(e) {
      e.preventDefault();

      if (e.keyCode === 114) {
        console.log('Rect');
      }
    }
  });

  var mainView = new View();

})();