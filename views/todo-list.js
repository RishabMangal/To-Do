$(document).ready(function(){

  $('form').on('submit', function(){

      var item = $('form input');
      var todo = {item: item.val()};

      $.ajax({
        type: 'POST',
        url: '/todo',
        data: todo,
        success: function(data){
          //do something with the data via front-end framework
          location.reload();
        }
      });

      return false;

  });

  $('li').on('click', function(){
    // var item = $(this).text().replace(/ /g, "-");
      var item = $(this).text()
    console.log(item);
      $.ajax({
        type: 'delete',
        url: '/todo/' + item,
        success: function (todos) {
          // console.log(item);
          console.log(this.url);
          console.log("Deleted yet");
          //do something with the data via front-end framework
          location.reload();
        }
      });
  });

});
