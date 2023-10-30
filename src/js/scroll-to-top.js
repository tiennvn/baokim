$(window).scroll(function(){
    if($(this).scrollTop() > 100){
        $('#scrollToTopBtn').addClass('scrollToTopBtn')
    } else{
        $('#scrollToTopBtn').removeClass('scrollToTopBtn')
    }
  });
  var scrollToTopBtn = document.getElementById("scrollToTopBtn");
  var rootElement = document.documentElement;
  
  function scrollToTop() {
    // Scroll to top logic
    rootElement.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  }
  if(scrollToTopBtn){
    scrollToTopBtn.addEventListener("click", scrollToTop);
  }