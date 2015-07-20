/*
EXAMPLE
      css:
            #tilesGroup { font-family: Verdana; }
            .tile { color: #FFFFFF; }
            .tileWrap:hover .tile{ transform: rotateY(180deg); }
      html:
            <div id="tilesGroup">
                  <div class="tileWrap">
                        <div class="tile">
                              <div class="front red">
                              </div>
                              <div class="back">
                              </div>
                        </div>
                  </div>
            </div>
            <div class="clear"></div>
*/
function setDefaults() {
      //Assign Elements To Variables
      var tilesGroup = document.getElementById('tilesGroup');
      var tileWrap = document.getElementsByClassName('tileWrap');
      var tile = document.getElementsByClassName('tile');
      var back = document.getElementsByClassName('back');
      var front = document.getElementsByClassName('front');

      //This function sets an element to the remaining parent height
      function setToRemaingParentHeight(elm){
            //Set the element height to the innerHeight minus the all previous elements
            var newElmHeight = elm.parentElement.offsetHeight - elm.offsetTop;

            if(!tilesGroup.nextElementSibling || tilesGroup.nextElementSibling.offsetHeight <= 0){
                  //The 22px is to account for a padding error
                  return newElmHeight + 22;
            }else if(tilesGroup.nextElementSibling.offsetHeight > 0){
                  var nextElementHeight = tilesGroup.nextElementSibling.offsetHeight;
                  return newElmHeight - nextElementHeight;
            }
      }
      var tilesGroupHeight = setToRemaingParentHeight(tilesGroup);

      if (window.innerWidth <= 770) {
            var tilesGroupHeight = tilesGroupHeight - (tilesGroupHeight * 0.10);
            tilesGroup.style.marginTop = '2%';
      }

      tilesGroup.style.height = tilesGroupHeight + 'px';
      tilesGroup.style.textAlign = 'center';
      tilesGroup.style.msPerspective = '1000px';
      tilesGroup.style.mozPerspective = '1000px';
      tilesGroup.style.webkitPerspective = '1000px';
      tilesGroup.style.perspective = '1000px';
      tilesGroup.style.marginBottom = '1%';

      var desktopWidth = (window.innerWidth / tile.length) + (3 * -10) - ((window.innerWidth / tile.length)* 0.05) + 'px';
      var desktopHeight = tilesGroupHeight + 'px';
      var desktopMinWidth = '200px';

      var mediumWidth = (tilesGroup.offsetWidth / tile.length) + 'px';
      var mediumHeight = (tilesGroupHeight / 2) + 'px';
      var mediumMinWidth = '200px';

      var smallWidth = '100%';
      var smallHeight = (tilesGroupHeight / tile.length) + 'px';
      var smallMinWidth = '100px';

      for (var i = 0; i < tile.length; i++) {
            //Constants
            tileWrap[i].style.display = 'inline-block';

            tile[i].style.mozTransition = '1s';
            tile[i].style.webkitTransition = '1s';
            tile[i].style.transition = '1s';
            tile[i].style.mozTransformStyle = 'preserve-3d';
            tile[i].style.webkitTransformStyle = 'preserve-3d';
            tile[i].style.transformStyle = 'preserve-3d';

            front[i].style.position = 'absolute';
            front[i].style.webkitBackfaceVisibility = 'hidden';
            front[i].style.backfaceVisibility = 'hidden';
            front[i].style.zIndex = '2';
            front[i].style.mozTransform = 'rotateY(0deg)';
            front[i].style.webkitTransform = 'rotateY(0deg)';
            front[i].style.transform = 'rotateY(0deg)';
            front[i].style.display = 'table';
            front[i].children[0].style.display = 'table-cell';
            front[i].children[0].style.verticalAlign = 'middle';

            back[i].style.position = 'absolute';
            back[i].style.webkitBackfaceVisibility = 'hidden';
            back[i].style.backfaceVisibility = 'hidden';
            back[i].style.backgroundColor = '#333841';
            back[i].style.mozTransform = 'rotateY(180deg)';
            back[i].style.webkitTransform = 'rotateY(180deg)';
            back[i].style.transform = 'rotateY(180deg)';
            back[i].style.display = 'table';
            back[i].children[0].style.display = 'table-cell';
            back[i].children[0].style.verticalAlign = 'middle';
            //Constants

            if (window.innerWidth < 414) {
                  tileWrap[i].style.width = '80%';
                  tileWrap[i].style.height = smallHeight;
                  tileWrap[i].style.minWidth = smallMinWidth;
                  tileWrap[i].style.marginLeft = 'atuo';
                  tileWrap[i].style.marginRight = 'atuo';

                  tile[i].style.width = smallWidth;
                  tile[i].style.height = smallHeight;
                  tile[i].style.minWidth = smallMinWidth;

                  front[i].style.width = smallWidth;
                  front[i].style.height = smallHeight;
                  front[i].style.minWidth = smallMinWidth;

                  back[i].style.width = smallWidth;
                  back[i].style.height = smallHeight;
                  back[i].style.minWidth = smallMinWidth;
            }

            if (window.innerWidth <= 770 && window.innerWidth >= 410){
                  tileWrap[i].style.width = mediumWidth;
                  tileWrap[i].style.height = mediumHeight;
                  tileWrap[i].style.minWidth = mediumMinWidth;

                  tile[i].style.width = mediumWidth;
                  tile[i].style.height = mediumHeight;
                  tile[i].style.minWidth = mediumMinWidth;

                  front[i].style.width = mediumWidth;
                  front[i].style.height = mediumHeight;
                  front[i].style.minWidth = mediumMinWidth;

                  back[i].style.width = mediumWidth;
                  back[i].style.height = mediumHeight;
                  back[i].style.minWidth = mediumMinWidth;
            }

            if (window.innerWidth > 770) {
                  tileWrap[i].style.width = desktopWidth;
                  tileWrap[i].style.height = desktopHeight;
                  tileWrap[i].style.minWidth = desktopMinWidth;

                  tile[i].style.width = desktopWidth;
                  tile[i].style.height = desktopHeight;
                  tile[i].style.minWidth = mediumMinWidth;

                  front[i].style.width = desktopWidth;
                  front[i].style.height = desktopHeight;
                  front[i].style.minWidth = mediumMinWidth;

                  back[i].style.width = desktopWidth;
                  back[i].style.height = desktopHeight;
                  back[i].style.minWidth = mediumMinWidth;
            }
      }

      tilesGroup.style.visibility = 'visible';
}


// Define that page dynamic tiles will be used
if (location.pathname === '/') {

      window.addEventListener('DOMContentLoaded', function(){
            tilesGroup.style.visibility = 'hidden';
      });
      window.addEventListener('load',function(){
            setDefaults();
      });
      window.addEventListener('resize', function(){
            //location.reload();
            setDefaults();
      });
      
}
