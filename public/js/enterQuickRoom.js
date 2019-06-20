const urlParams = new URLSearchParams(window.location.search);
const myParam = urlParams.get('room');
// const urlAction = url = $form.attr( "action" );

const chatData = "/room"

$(document).ready(function(){
    $("#room").val(myParam);

    $.ajax({
      method: "GET",
      url: "/room"
    })
      .then(function( data) {
        console.log(data );
      });
  
  //     (function() {
  //       $.getJSON( chatData).done(function( data ) {
  // console.log(data)
  //       });
  //   })();
});

// $.post(urlAction, $( "#testform" ).serialize(), 
//      function(returnedData){
//         console.log(returnedData);
// }, 'json');

