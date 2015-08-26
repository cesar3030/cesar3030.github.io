
$(document).ready(function(){
  setSectionHeigth();
  scrollManager();
});




function setSectionHeigth(){
  $(".pf-section")
}
/**
* Function that show and hide the header depending of
* the current section being visited
*/
function scrollManager(){
  
  var $head = $( '#ha-header' );
  
  $( '.ha-waypoint' ).each( function(i) {
  var $el = $( this ),
    animClassDown = $el.data( 'animateDown' ),
    animClassUp = $el.data( 'animateUp' );

  $el.waypoint( function( direction ) {
    if( direction === 'down' && animClassDown ) {
      $head.attr('class', 'ha-header ' + animClassDown);
    }
    else if( direction === 'up' && animClassUp ){
      $head.attr('class', 'ha-header ' + animClassUp);
    }
  }, { offset: '100%' } );
} );
}