//JSON Array that contain the terminal lines
var terminalContent=[
{
  type: "query",
  content: "echo 'Hello World !'",
  timeout:2
},
{
  type: "answer",
  content: "Hello world !",
  timeout:1
},
{
  type: "query",
  content: "cat profil.txt",
  timeout:1
},
{
  type: "answer",
  content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse pharetra sed tellus id congue. Aenean vel ultrices augue, vitae facilisis lectus. Pellentesque efficitur feugiat quam nec molestie. Nulla vitae odio diam. Praesent pharetra enim ultrices metus eleifend, vitae auctor turpis ultrices. Nulla a sapien sed est dapibus finibus ac quis ante. Quisque vel magna cursus, placerat ex quis, tristique turpis.",
  timeout:1
},
{
  type: "query",
  content: ""
}];
//The current index used to display the text in the terminal
var index=0;

/**
* Fontions run when the page is loaded
*/
$(document).ready(function(){
  headerEffect();
  smoothNavigation();
  showMobileNavigation();
  terminalAnimation();  
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

/**
* Function that show the mobile navigation when the button is pressed
*/
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

/**
* Fonction that trigger the adding of a new row.
* A timeout is setted if the object has one.
*/
function terminalAnimation(){
  if(index<terminalContent.length){
    var newLine = terminalContent[index];
    if(newLine.timeout !== undefined){
      setTimeout(function(){
        addTerminalRow(newLine);
      },newLine.timeout*1000);
    }
    else{
      addTerminalRow(terminalContent[index]);
    }    
  } 
}

/**
* Function that insert html in DOM to add a new row in the terminal
*/
function addTerminalRow(object){
  var text="";

  //If the text is an answer, we just display it
  if(object.type==="answer"){
    text=object.content;
    //We remove the cursor of the last query line
    $(".pf-terminal-line").find("span").remove();
  }

  var html =""+
    "<div class='pf-terminal-line'>"+
      "<div class='pf-terminal-line--title'>cesar@portfolio:~$</div>"+
      "<div class='pf-terminal-line--content'> "+text+"</div>"+
    "</div>";
  $(".pf-terminal-body").append(html);

  //If the text is a query, we type it
  if(object.type==="query"){
    typeText(object.content);
  }
  else{
    index++;
    terminalAnimation();
  }

}

/**
* Function that type the text given in the last row of the terminal
*/
function typeText(text){
  $(".pf-terminal-line--content").last().typed({
      strings: [text],
      typeSpeed: 90,
      contentType: 'html',
      callback: function(){
        index++;
        terminalAnimation();       
      }
  });
}












