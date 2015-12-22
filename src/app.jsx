var React = require('react' ),
  $ = require('jquery');

  
function onMove (evt) {
  var x = evt.pageX, y = evt.pageY, 
  updatePositions = function updatePositions(){
        $('div').each(function(i,divCurrent){
             var jDivCurrent = $(divCurrent),offset = (parseInt( jDivCurrent.css('width') )-50);
             jDivCurrent.css({
                'top':(y + offset),
                'left':(x + offset)
             });
         });
  }
  //skipping 1 callback
  
  requestAnimationFrame(updatePositions);
}



$(function () {
    
    $('body').on('mousemove',onMove);
});





