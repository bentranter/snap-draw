var Backbone = require('backbone');
var $ = require('jquery');

module.exports = Backbone.View.extend({
  el: '#sidebar',

  events: {
    'click #insert': 'showInsertMenu',
    'click #overlay': 'hideAll'
  },

  initialize: function() {
    console.log('working w sidebar');
  },

  hideAll: function() {
    $('.z2').fadeOut(600).hide();
    $('#overlay').fadeOut(600).hide();
  },

  showInsertMenu: function() {
    $('#insertMenu').show();
    $('#overlay').show();
  }
});