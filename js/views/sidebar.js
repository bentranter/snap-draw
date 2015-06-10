var Backbone = require('backbone');
var _        = require('underscore');
var $        = require('jquery');

module.exports = Backbone.View.extend({
  el: '#sidebar',

  tpl: _.template($('#titleTpl').html(), {}),

  events: {
    'click #insert': 'showInsertMenu',
    'click #overlay': 'hideAll',
    'click #showSetTitle': 'showSetTitle',
    'submit #newTitleForm': 'newTitle'
  },

  initialize: function() {
    this.listenTo(this.model, 'change', this.render);
    this.render();
  },

  render: function() {
    var data = this.model.toJSON();
    $('#title').html(this.tpl(data));
    return this;
  },

  hideAll: function() {
    $('.z2').fadeOut(600).hide();
    $('#overlay').fadeOut(600).hide();
  },

  newTitle: function(e) {
    e.preventDefault();
    this.model.set('title', $('#newTitle').val());
    this.hideAll();
  },

  showInsertMenu: function() {
    $('#insertMenu').show();
    $('#overlay').show();
  },

  showSetTitle: function() {
    $('#setTitle').show();
    $('#overlay').show();
  }
});