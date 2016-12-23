$(".delete").on('click',function(e){
  e.preventDefault();
  var element = $(this);
  var url = element.attr('href');

  $.ajax({
    method: 'DELETE',
    url: url
  }).done(function(data){
    window.location = '/post/all';
  });
});


$("#edit-form").on('submit',function(e){
  e.preventDefault();
  console.log("edit");

  var element = $(this);
  var url = element.attr('action');
  var data = element.serialize();

  $.ajax({
    method: 'PUT',
    url: url,
    data: data
  }).done(function(){
    console.log("got here");
    console.log(url);
    // debugger
    window.location = url;
  });
});

$('.back-button').on('click',function(){
  console.log('clicked');
  history.back();
});
