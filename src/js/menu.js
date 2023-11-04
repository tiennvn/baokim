var btnOpenMenu = document.querySelector('.btn-open-menu');
var btnCloseMenu = document.querySelector('.btn-close-menu');
var overlayMenu = document.querySelector('.overlay-menu');
var menuHeader = document.querySelector('.menu-header');


if(btnOpenMenu){
    btnOpenMenu.addEventListener('click', (e) => {
        overlayMenu.classList.add('active');
        menuHeader.classList.add('active');
    })
}
if(btnCloseMenu){
    btnCloseMenu.addEventListener('click', (e) => {
        removeActive();
    })
}

if(overlayMenu) {
    overlayMenu.addEventListener("click", function(event) {
      if(event.target===this) {
        removeActive();
      }
    });
}

function removeActive() {
    overlayMenu.classList.remove('active');
    menuHeader.classList.remove('active');
}