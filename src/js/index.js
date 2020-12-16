jQuery(function($) {
    // 头部导入
    header();
    // 尾部导入
    footer();


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
    };
    $('#loading').show();
    $.ajax({
        url: '../api/index.php',
        method: 'get',
        data: {},
        dataType: 'json',
        success: function(res) {
            if (res.code == 1) {
                rendering(res.list);
                rendering1(res.list);
                parts(res.list);
                $('#loading').hide();
            }
        }
    });

    function rendering(data) {
        let str = '';
        for (let i = 0; i <= 5; i++) {
            str += `
            <li data-id="${data[i].id}">
                <div class="commodity-right-pic">
                    <img src="${data[i].good_img}" alt="">
                    <span class="spannew">${data[i].good_new}</span>
                </div>
                <div class="commodity-right-info">
                    <div class="info-t">${data[i].name} </div>
                    <div class="info-c">${data[i].good_name}</div>
                    <div class="info-b">
                        <span>￥ ${data[i].good_price}</span>
                    </div>
                </div>
            </li>`
        }

        $('.commodityul1').html(str)
        let commodityul1 = document.querySelector('.commodityul1');
        let spannew = commodityul1.querySelectorAll('.spannew')
        spannew.forEach((item) => {
            if (item.innerHTML == 'null') {
                item.style.display = 'none'
            }
        })

    }

    function rendering1(data) {
        let str = '';
        for (let i = 6; i <= 11; i++) {
            str += `
            <li data-id="${data[i].id}">
                <div class="commodity-right-pic">
                    <img src="${data[i].good_img}" alt="">
                    <span class="spannew">${data[i].good_new}</span>
                </div>
                <div class="commodity-right-info">
                    <div class="info-t">${data[i].name} </div>
                    <div class="info-c">${data[i].good_name}</div>
                    <div class="info-b">
                        <span>￥ ${data[i].good_price}</span>
                    </div>
                </div>
            </li>`
        }

        $('.commodityul2').html(str);
        let commodityul2 = document.querySelector('.commodityul2');
        let spannew = commodityul2.querySelectorAll('.spannew')
        spannew.forEach((item) => {
            if (item.innerHTML == 'null') {
                item.style.display = 'none'
            }
        })
    }

    function parts(data) {
        let str = '';
        for (let i = 12; i < 17; i++) {
            str += `
            <li data-id="${data[i].id}">
            <div class="parts-pic">
                <img src="${data[i].good_img}" alt="">

            </div>
            <div class="parts-name">${data[i].name}</div>
            <div class="parts-price">￥${data[i].good_price}</div>
        </li>
         `
        }

        $('.partsul').html(str);
    };

    // 事件委托绑定点击事件
    $('.commodityul1').on('click', 'li', function() {
        location.href = `../html/goodlist.html?id=${$(this).attr('data-id')}`
    })
    $('.commodityul2').on('click', 'li', function() {
        location.href = `../html/goodlist.html?id=${$(this).attr('data-id')}`
    })
    $('.partsul').on('click', 'li', function() {
        location.href = `../html/goodlist.html?id=${$(this).attr('data-id')}`
    })
})