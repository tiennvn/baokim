var btnScrollTop = document.querySelector('.btn-scrollTop');
if(btnScrollTop){
    btnScrollTop.addEventListener('click', (e)=>{
        $('html, body').animate({scrollTop:0}, '300');
    })
}

window.onscroll = () => {
    if(document.body.scrollTop > 20 || document.documentElement.scrollTop > 20){
        btnScrollTop.classList.add('flex');
        btnScrollTop.classList.remove('hidden');
    }
    else {
        btnScrollTop.classList.remove('flex');
        btnScrollTop.classList.add('hidden');
    }
}