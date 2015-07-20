/* CSS Example *
#uarrow {
      top: 40%;
      right: 1%;
      z-index: 90;
      font-size: 250%;
      cursor: pointer;
      position: fixed;
}
#darrow {
      top: 50%;
      right: 1%;
      z-index: 90;
      font-size: 250%;
      cursor: pointer;
      position: fixed;
}
HTML Example
<div id="uarrow">&#9650;</div>
<div id="darrow">&#9660;</div>
*/

function scrollControl(){

      var upArrow = document.getElementById('uarrow');
      var downArrow = document.getElementById('darrow');
      upArrow.style.display = 'none';
      downArrow.style.display = 'none';

      function scrollUp(e){

            if (!screen.top) {
                  if (e.keyCode === 38){

                        window.scrollBy(0, - window.innerHeight + 40);
                        //need +48 if mozila
                  } else if(e.type === "click") {

                        window.scrollBy(0, - window.innerHeight);
                  }
            }
      }//scrollUp()
      upArrow.addEventListener('click', scrollUp);
      window.addEventListener('keydown', scrollUp);


      function scrollDown(e){

            if (!screen.bottom) {
                  if (document.getElementById('message') != null) {
                        document.getElementById('message').style.display = 'none';
                  }

                  if (e.keyCode === 40){
                        window.scrollBy(0,  window.innerHeight -40);
                        //need -48 if mozila

                  } else if(e.type === "click") {
                        window.scrollBy(0,  window.innerHeight);
                  }
            }
      }//scrollDown()
      downArrow.addEventListener('click', scrollDown);
      window.addEventListener('keydown', scrollDown);

}
window.addEventListener('DOMContentLoaded', scrollControl);


function showHideArrows(){

      var upArrow = document.getElementById('uarrow');
      var downArrow = document.getElementById('darrow');

      var section = document.getElementsByTagName("section");

      if (section.length > 1) {
            if (window.pageYOffset >= section[1].offsetTop-100){
                  upArrow.style.display = "block";
                  downArrow.style.display = "block";

            }else if(window.pageYOffset <= section[1].offsetTop+100){
                  upArrow.style.display = "none";
                  downArrow.style.display = "none";
            }
      }
}
window.addEventListener('scroll', showHideArrows);
