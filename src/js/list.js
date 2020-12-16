jQuery(function($) {
    // 头部导入
    header();
    // 尾部导入
    footer();

    // 进入页面二级导航首先隐藏
    $('.secondLevel').hide();

    // 二级页面的hover效果
    $('.allSort').hover(function() {
        $('.secondLevel').show();
    }, function() {
        $('.secondLevel').hide();
    });

    // 排序
    $('.sortdiv span').on('click', function() {
        // console.log($(this));
        // console.log($(this).addClass('activesort').siblings());
        $('.sortdiv span').removeClass('activesort');
        $(this).addClass('activesort');
    });

    // 渲染数据

    $('#loading').show();
    $.ajax({
        url: '../api/index.php',
        method: 'get',
        data: {},
        dataType: 'json',
        success: function(res) {
            if (res.code == 1) {
                // 先把数据存放到本地
                localStorage.setItem('goodsList', JSON.stringify(res.list));
                rendering(res.list);
                $('#loading').hide();
            }
        }
    });
    // 数据渲染
    function rendering(data) {
        // console.log(data);
        $('.numlength').html(data.length);
        let str = '';
        data.forEach((item) => {
            str += `
        <li data-id="${item.id}">
        <div class="commodity-right-pic">
            <img src="${item.good_img}" alt="">
           
            <div class="listcar">加入购物车</div>
        </div>
        <div class="commodity-right-info">
            <div class="info-t">${item.name} </div>
           
            <div class="info-b">
                <span>￥ ${item.good_price}</span>
            </div>
        </div>
    </li>`
        })
        $('.listul').html(str);

    };

    // 事件委托绑定点击事件
    $('.listul').on('click', 'li', function() {
        location.href = `../html/goodlist.html?id=${$(this).attr('data-id')}`
    })

    $('.sort-left').on('click', 'div', function() {
        // 先获取本地存储中的数据
        let data = JSON.parse(localStorage.getItem('goodsList'));

        if ($(this).index() == 0) {
            rendering(data)
        }
        if ($(this).index() == 1) {
            let res = data.sort(function(a, b) {
                return a.good_sales - b.good_sales
            });
            rendering(res)
        }
        if ($(this).index() == 2) {
            let res = data.sort(function(a, b) {
                return b.good_price - a.good_price
            });
            rendering(res)
        }
        if ($(this).index() == 3) {
            let res = data.sort(function(a, b) {
                return a.good_sj - b.good_sj
            });
            rendering(res)
        }

    })
})