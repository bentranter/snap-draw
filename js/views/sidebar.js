var Backbone = require('backbone');
var $ = require('jquery');

module.exports = Backbone.View.extend({
  el: '#sidebar',

  events: {
    'click #insert': 'showInsertMenu'
  },

  initialize: function() {
    console.log('working w sidebar');
  },

  showInsertMenu: function() {
    $('#insertMenu').toggle();
  }
});