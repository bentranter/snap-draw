var Backbone     = require('backbone');
var LocalStorage = require('backbone.localstorage');

module.exports = Backbone.Model.extend({
  
  localStorage: new LocalStorage('DrawingModel'),

  defaults: {
    title: 'Untitled'
  }
});