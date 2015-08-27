
$(document).ready(function(){
  headerEffect();
  smoothNavigation();
});


/**
 * Function that initialise the header effect that show and hide the header 
 * depending of the sections being visited
 */
function headerEffect(){
  
  var $head = $( '#pf-header' );
    
  $( '.pf-waypoint' ).each( function(i) {
    var $el = $( this ),
    animClassDown = $el.data( 'animateDown' ),
    animClassUp = $el.data( 'animateUp' );

    $el.waypoint( function( direction ) {

      if( direction === 'down' && animClassDown ) {
        $head.attr('class', 'pf-header ' + animClassDown);        
      }
      else if( direction === 'up' && animClassUp ){
        $head.attr('class', 'pf-header ' + animClassUp);
      }

    }, { offset: '100%' } );
  });
}

/**
 * Function that initialise the smoothNavigation
 */
function smoothNavigation(){
  $("a").on('click',function(){
    $(window).scrollTo($($(this).attr("href")),1000);
  });
}