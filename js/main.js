
$(document).ready(function(){
  headerEffect();
  smoothNavigation();
  showMobileNavigation();
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
        //If it's the mobile version the target is the trigger button, not the header
        if($(window).width()>480){
          $head.attr('class', 'pf-header ' + animClassDown); 
        }
        else if( animClassDown !== "pf-header-hide"){
          $(".pf-mobile-navigation-trigger").fadeIn(300);          
        }              
      }
      else if( direction === 'up' && animClassUp ){
        //If it's the mobile version the target is the trigger button, not the header
        if($(window).width()>480){
           $head.attr('class', 'pf-header ' + animClassUp); 
        }
        else{
          $(".pf-mobile-navigation-trigger").fadeOut(300);
        } 

      }

    }, { offset: '100%' } );
  });
}

/**
 * Function that initialise the smoothNavigation
 */
function smoothNavigation(){
  $("a").on('click',function(ev){
    ev.preventDefault();

    //When a link is clicked from the mobile navigation
    if($(window).width()<=480){
      $(".pf-mobile-navigation-trigger").find("span").first().removeClass("is-clicked");
      $("#pf-header").switchClass("pf-header-show","pf-header-hide");
    }

    $(window).scrollTo($($(this).attr("href")),1000);
    
  });
}

function showMobileNavigation(){
  $(".pf-mobile-navigation-trigger").on('click',function(){
    
    if($("#pf-header").hasClass("pf-header-hide")){
      $(this).find("span").first().addClass("is-clicked");
      $("#pf-header").switchClass("pf-header-hide","pf-header-show");

    }
    else{
      $(this).find("span").first().removeClass("is-clicked");
      $("#pf-header").switchClass("pf-header-show","pf-header-hide");
    }
    
  });
}
