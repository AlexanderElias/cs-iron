function menu() {
      var menu = document.getElementById('menu');
      var links = document.getElementById('slide');
      var openIcon = document.getElementById('openIcon');
      var closeIcon = document.getElementById('closeIcon');

      /* Constants */
      menu.style.left = '-30%';
      closeIcon.style.display = 'none';

      for (i=0; i < list.children.length; i++){
            list.children[i].style.display = 'none';
      }

      if(window.innerWidth < 750){
            menu.style.left = '-65%';
      }
      /* Constants */

      /* Defaults */
      function setSize(){
            // Menu
            menu.style.width = '40%';
            menu.style.height = '100%';
            menu.style.position = 'fixed';
            menu.style.zIndex = '100';
            menu.backgroundColor = '';

            // List
            list.style.margin = '15% 0px 15% 15%';

            for (i=0; i < list.children.length; i++){
                  list.children[i].style.fontSize = '200%';
                  list.children[i].style.padding = '5%';
            }

            // Open Icon
            openIcon.style.cursor = 'pointer';
            openIcon.style.cssFloat = 'right';
            openIcon.style.margin = '2%';
            openIcon.style.fontSize = '350%';

            // Close Icon
            closeIcon.style.cursor = 'pointer';
            closeIcon.style.margin = '2%';
            closeIcon.style.cssFloat = 'right';
            closeIcon.style.fontSize = '350%';

            if(window.innerWidth < 750){
                  menu.style.width = '85%';
            }
      }
      window.addEventListener('resize', setSize);

      setSize();

      function openMenu() {
            menu.style.left = '0px';
            menu.style.backgroundColor = '#FFFFFF';
            menu.style.boxShadow = '7px 7px 7px 0px rgba(51, 56, 65, 0.5)';
            openIcon.style.display = 'none';
            closeIcon.style.display = 'block';
            for (i=0; i < list.children.length; i++){
                  list.children[i].style.display = 'block';
            }
      }
      openIcon.addEventListener('click', openMenu);

      function closeMenu(){

            if(window.innerWidth < 750){
                  menu.style.left = '-65%';
                  menu.style.width = '85%';
            } else {
                  menu.style.left = '-30%';
            }
            menu.style.backgroundColor = '';
            menu.style.boxShadow = 'none';
            openIcon.style.display = 'block';
            closeIcon.style.display = 'none';
            for (i=0; i < list.children.length; i++){
                  list.children[i].style.display = 'none';
            }
      }
      closeIcon.addEventListener('click', closeMenu);
}
window.addEventListener('DOMContentLoaded', menu);
