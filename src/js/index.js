jQuery(function($) {
    // 头部导入
    $('#head').load('./html/header.html');
    // '/src/html/header.html'
    // 尾部导入
    $('#foots').load('./html/footer.html');

    // 轮播图

    var mySwiper = new Swiper('.swiper-container', {
        autoplay: true,
        loop: true, // 循环模式选项
        initialSlide: 0,
        autoplay: {
            disableOnInteraction: false,
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
    })

    for (i = 0; i < mySwiper.pagination.bullets.length; i++) {
        mySwiper.pagination.bullets[i].onclick = function() {
            this.click();
        };
    }
})