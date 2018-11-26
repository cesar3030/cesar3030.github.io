//JSON Array that contain terminal texts
var terminalContent = [
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
    content: "cat About_me.txt",
    timeout:1
  },
  {
    type: "answer",
    content: "Hi! I’m César, a software engineering consultant and full-stack developer with a huge interest in web technologies.<br>When I’m not working or training with my triathlon club, you can catch me at a software meetup in Montreal discussing anything and everything from software development to team management. Programming is more than a job for me, it’s a passion. I’m doing software engineering to find simple solutions to complex problems.",
    timeout:1
  },
  {
    type: "query",
    content: ""
  }
];

//The current index used to display the text in the terminal
var index=0;

/**
* Fontions to run when the page is loaded
*/
$(document).ready(function(){

  headerEffect();
  smoothNavigation();
  showMobileNavigation();
  terminalAnimation(); 
  addEmailAddress();
  timelineEffects();
  
});
/**
 * Function that initialise the header effect that show and hide the header 
 * depending of the sections being visited
 */
function headerEffect(){
  
  var $head = $('#pf-header');
    
  $('.pf-waypoint').each( function(i) {
    var $el = $( this ),
    animClassDown = $el.data('animateDown'),
    animClassUp = $el.data('animateUp');

    $el.waypoint( function( direction ) {
      if( direction === 'down' && animClassDown ) {
        //If it's the mobile version the target is the trigger button, not the header
        if($(window).width()>738){
          $head.attr('class', 'pf-header ' + animClassDown); 
        }
        else if(animClassDown === "pf-header-show"){
          $(".pf-mobile-navigation-trigger").fadeIn(300);          
        }        
      }
      else if(direction === 'up' && animClassUp){
        if($(window).width()>738){
           $head.attr('class', 'pf-header ' + animClassUp); 
        }
        else if(animClassUp === 'pf-header-hide'){
          $(".pf-mobile-navigation-trigger").fadeOut(300);
        } 

      }

    }, { offset: '10%' } );
  });

  /* We manage the window's size transition*/
  $(window).resize(function(){
    //$.waypoints('refresh');
    Waypoint.refreshAll()
    //If it's the desktop version, we hide the mobile menu button
    if($(window).width()>738){
      $(".pf-mobile-navigation-trigger").fadeOut(300);
      $(".pf-mobile-navigation-trigger").find("span").first().removeClass("is-clicked");
      
      /*
      If the button was display, it meens that the user had access to the menu, 
      so we show the desktop navigation bar
      */
      if($(".pf-mobile-navigation-trigger").is(':visible')){
        $head.attr('class', 'pf-header pf-header-show');
      }
      else{
        $head.attr('class', 'pf-header pf-header-hide');
      }
    }
    else{
      $(".pf-mobile-navigation-trigger").fadeIn(300);          
      $head.attr('class', 'pf-header pf-header-hide');
      
    }
  });
}

/**
 * Function that initialise the smoothNavigation
 */
function smoothNavigation(){
  $("a.nav").on('click',function(ev){
    ev.preventDefault();
    //When a link is clicked from the mobile navigation
    if($(window).width()<=738){
      $(".pf-mobile-navigation-trigger").find("span").first().removeClass("is-clicked");
      $("#pf-header").switchClass("pf-header-show","pf-header-hide");
    }
    $(window).scrollTo($($(this).attr("href")),1000);    
  });

  //if a navigation button is clicked
  $("button.nav").on('click',function(ev){
    ev.preventDefault();
    $(window).scrollTo($($(this).attr("data-href")),1000);
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
* Fonction that adds a new row.
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
* Function to insert html in DOM that adds a new row in the terminal
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
* Function that types the given text in the last row of the terminal
* 
* Plugin used for the typing animation:
*   Typing.js ->  http://www.mattboldt.com/demos/typed-js/ 
*
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

/**
* Function that adds my email address in the DOM to protect mailto links
*/
function addEmailAddress(){
  var fristPart="contact";
  var secondPart="cesarjeanroy.com";
  $(".email-address").append("<i class='material-icons'>email</i><a href='mailto:"+fristPart+"@"+secondPart+"'><p>"+fristPart+"@"+secondPart+"</p></a>");
}


/**
* Function that initialises timeline annimation
*/
function timelineEffects(){
  timelineBlocks = $('.cd-timeline-block');
  offset = 0.8;

  //hide timeline blocks which are outside the viewport
  hideBlocks(timelineBlocks, offset);

  //on scolling, show/animate timeline blocks when enter the viewport
  $(window).on('scroll', function(){
    (!window.requestAnimationFrame) 
      ? setTimeout(function(){ showBlocks(timelineBlocks, offset); }, 100)
      : window.requestAnimationFrame(function(){ showBlocks(timelineBlocks, offset); });
  });

  $(window).on('touchmove', function() { 
    (!window.requestAnimationFrame) 
      ? setTimeout(function(){ showBlocks(timelineBlocks, offset); }, 100)
      : window.requestAnimationFrame(function(){ showBlocks(timelineBlocks, offset); });
  });
}

/**
* Function to hide a timeline block
*/
function hideBlocks(blocks, offset) {
  blocks.each(function(){
    ( $(this).offset().top > $(window).scrollTop()+$(window).height()*offset ) && $(this).find('.cd-timeline-img, .cd-timeline-content').addClass('is-hidden');
  });
}

/**
* Function to show a timeline block
*/
function showBlocks(blocks, offset) {
  blocks.each(function(){
    ( $(this).offset().top <= $(window).scrollTop()+$(window).height()*offset && $(this).find('.cd-timeline-img').hasClass('is-hidden') ) && $(this).find('.cd-timeline-img, .cd-timeline-content').removeClass('is-hidden').addClass('bounce-in');
  });
}









