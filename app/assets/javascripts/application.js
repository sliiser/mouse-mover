// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or any plugin's vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
//= require turbolinks
//= require_tree .
//= require websocket_rails/main

$(function(){
  dispatcher = new WebSocketRails('localhost:3000/websocket');
  $('#take-control').on('click', function(e){
    e.preventDefault();
    var user_id = $('#user-id').val();
    dispatcher.trigger('mouse.create', {user_id: user_id});
    $(document.body).on('mousemove', sendMouseLoc(user_id));
  });
  $('#give-control').on('click', function(e){
    e.preventDefault();
    var user_id = $('#user-id').val();
    dispatcher.trigger('mouse.destroy', {user_id: user_id});
    $(document.body).off('mousemove');
  });
  dispatcher.bind('mouse.create', handleCreate);
  dispatcher.bind('mouse.update', handleUpdate);
  dispatcher.bind('mouse.destroy', handleDestroy);
});

function sendMouseLoc(user_id){
  return function(e){
    dispatcher.trigger('mouse.update', {user_id: user_id, x: e.pageX, y: e.pageY});
  }
};

function handleCreate(message){
  document.body.style.cursor = 'none';
  document.body.style.pointerEvents = 'none';
  $('#myCursor').show();
}
function handleUpdate(message){
  $('#myCursor')[0].style.left = message.x + 'px';
  $('#myCursor')[0].style.top = message.y + 'px';
}
function handleDestroy(message){
  document.body.style.cursor = 'auto';
  document.body.style.pointerEvents = 'auto';
  $('#myCursor').hide();
}