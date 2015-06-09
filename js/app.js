var CanvasView = require('./views/canvas');
var SidebarView = require('./views/sidebar');
var $ = require('jquery');

$('document').ready(function() {
  new CanvasView();
  new SidebarView();
});