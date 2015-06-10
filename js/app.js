var CanvasView  = require('./views/canvas');
var SidebarView = require('./views/sidebar');
var Drawing     = require('./models/drawing');
var Settings    = require('./models/settings');

var $ = require('jquery');

$('document').ready(function() {
  new CanvasView();
  new SidebarView({ model: new Drawing() });
});