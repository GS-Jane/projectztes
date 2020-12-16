jQuery(function($) {

    // 判断进入详情页是否携带ID，没有携带ID跳转列表页
    let reg = /id=(\d+)/;
    if (!reg.test(location.search)) {
        location.href = '../html/list.html'
    }
    // 获取ID
    let id = reg.exec(location.search)[1];
    // console.log(id);

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


    // 发起请求获取对应的数据
    $('#loading').show();
    $.ajax({
        url: '../api/goodlist.php',
        method: 'get',
        data: {
            id
        },
        dataType: 'json',
        success: function(res) {
            // console.log(res.detail);
            if (res.code == 1) {
                rendering(res.detail);
                $('#loading').hide();
            }
        }
    });


    // 渲染数据
    function rendering(data) {
        // console.log(data);

        let str = `
          <div class="bread-nav">
            <span>智能手机</span>
            <span> > </span>
            <span>Axon系列</span>
            <span> > </span>
            <span>Axon 20</span>
            <span> > </span>
            <span>ZTE中兴</span>
            <span> > </span>
            <span class="bread-navmbx">${data.name}</span>
        </div>
        <div class="main-cen clearfix">
            <div class="main-cenleft fl">
                <div class="main-cenlefttop show">
                    <img src="${data.good_img}" alt="">
                    <div class="mask"></div>
                </div>
                <div class="main-cenleftbom clearfix list"> 
                        <p class="active">
                            <img midelImg="${data.good_img}" bigImg="${data.good_img}" src="${data.good_img}" alt="">
                        </p>
                        <p>
                            <img midelImg="${data.good_img1}" bigImg="${data.good_img1}" src="${data.good_img1}" alt="">
                        </p>
                        <p>
                            <img midelImg="${data.good_img2}" bigImg="${data.good_img2}" src="${data.good_img2}" alt="">
                        </p>
                </div>
                <div class="enlarge"></div>
            </div>
            <div class="main-cenright fl">
                <div class="main-cenrighttop">
                    <h2>${data.name}</h2>
                    <p class="cenrightp">${data.good_name ? data.good_name:''}</p>
                    <div class="cenrightbox clearfix">
                        <div class="fl">
                            <span>￥<em class="goodprice">${(data.good_price*1).toFixed(2)}</em> </span>

                        </div>
                        <div class="fr">
                            <span>手机购买 <i class="iconfont icon-sanjiaoxing"></i></span>
                            <img src="../static/images/ewm.png" alt="">
                        </div>
                    </div>
                    <div class="cenrightx"></div>
                </div>
                <div class="main-cenrightbom">
                    <div class="choose-spec clearfix">
                    <div class="speccol">
                        <div class="dt">颜色</div>
                        <div class="choose-item-wrap clearfix">
                            <div class="choose-item" data-title="${data.good_color}">
                                <img src="${data.good_img}" alt="">
                            </div>
                            <div class="choose-item" data-title="${data.good_color1}">
                                <img src="${data.good_img1}" alt="">
                            </div>
                            <div class="choose-item" data-title="${data.good_color2}">
                                <img src="${data.good_img2}" alt="">
                            </div>
                        </div>
                        </div>
                        <div class="choose-spec specbb">
                            <div class="dt">版本</div>
                            <div class="choose-item-wrap clearfix">
                                <div class="choose-item" data-title="${data.good_edition}">
                                    <span>${data.good_edition}</span>
                                </div>
                                <div class="choose-item" data-title="${data.good_edition1}">
                                    <span>${data.good_edition1}</span>
                                </div>
                                <div class="choose-item" data-title="${data.good_edition2}">
                                    <span>${data.good_edition2}</span>
                                </div>
                            </div>
                        </div>
                        <div class="choose-spec specg">
                            <div class="dt">网络制式</div>
                            <div class="choose-item-wrap clearfix">
                                <div class="choose-item" data-title="${data.good_network}">
                                   <span>${data.good_network}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="choose-mb numgod">
                        <div class="dt">已选择商品：</div>
                        <div class="dd">
                            <em></em>
                            <i></i>
                            <stong></stong>
                            <span>1</span> 台
                        </div>
                    </div>
                    <div class="choose-mb choose-num clearfix">
                        <div class="dt">数 &nbsp; &nbsp;&nbsp;&nbsp;量：</div>
                        <div class="dd">
                            <span class="fl reduce">-</span>
                            <input type="text" value="${data.good_num}" class="fl choose-numval">
                            <span class="fl add">+</span>
                        </div>
                    </div>
                    <div class="btn-wrap">
                        <span class="immediately">立即购买</span>
                        <span class="addCat">加入购物车
                        </span>
                        <div class="caradd">
                        <div class="carheader">
                        <h5>加入购物车</h5>
                        <i>x</i>
                        </div>
                        <div class="carcen">
                            <p>商品成功加入购物车！</p>
                            <div class="actis">
                                <button><i>继续购物</i></button>
                                <a href="../html/car.html">进入购物车</a>
                            </div>
                        </div>
                    </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="main-introduce">
            <div class="dig-tab">
                <ul class="clearfix">
                    <li class="active">产品介绍</li>
                    <li>规格参数</li>
                    <li>商品咨询</li>
                    <li>用户评论</li>
                </ul>
            </div>
            <div class="introduce-cer">
                <ul class="detailinfo-list clearfix">
                   ${data.good_details}
                </ul>
            </div>
            <div class="goods-info">
                <h3>产品信息</h3>
                <div class="hdimg">
                    <img src="${data.good_details1}" alt="">
                    <img src="${data.good_details2}" alt="">
                    <img src="${data.good_details3}" alt="">
                </div>
            </div>
        </div>`
        $('.goodslist').html(str);
        // 初次给enlarge设置图片路径
        $('.enlarge').css('background-image', `url(${data.good_img})`);
        // 判断元素中是否有内容，有内容就显示，没有内容就隐藏
        $('.list p img').each(function() {
            if ($(this).attr('src') == 'null') {
                $(this).parent().hide()
            }
        });

        // 判断颜色
        // console.log($('.choose-item'));
        $('.choose-item').each(function() {
            if ($(this).attr('data-title') == 'null') {
                $(this).hide()
            }
        });
        // $('.specg .choose-item')
        let arr = [];
        $('.speccol .choose-item').each(function() {
            arr.push($(this).attr('data-title'))

        });
        let arr1 = arr.every(function(item) {
            return item == 'null'
        });

        if (arr1) {
            $('.speccol').hide();
        }

        // 版本判断
        let arr2 = [];
        $('.specbb .choose-item').each(function() {
            arr2.push($(this).attr('data-title'))

        });
        let arr3 = arr2.every(function(item) {
            return item == 'null'
        });
        if (arr3) {
            $('.specbb').hide();
        }
        let arr4 = false;
        $('.specg .choose-item').each(function() {
            if ($(this).attr('data-title') == 'null') {
                $('.specg').hide();
                arr4 = true;
            }
        });

        // 放大镜
        new Enlarge(".main-cenleft");
        // 选择规格参数
        let goodimg;
        $('.speccol').on('click', '.choose-item', function() {
            // $(this).siblings().removeClass('choose-itemactive');
            $(this).addClass('choose-itemactive').siblings().removeClass('choose-itemactive');
            $('.numgod em').text($(this).attr('data-title'));

            goodimg = $(this).children('img').attr('src');
            arr1 = true;
        });
        $('.specbb').on('click', '.choose-item', function() {
            $(this).addClass('choose-itemactive').siblings().removeClass('choose-itemactive');
            $('.numgod i').text($(this).attr('data-title'))
            arr3 = true
        });
        $('.specg').on('click', '.choose-item', function() {
            $(this).addClass('choose-itemactive').siblings().removeClass('choose-itemactive');
            $('.numgod stong').text($(this).attr('data-title'))
            arr4 = true
        });

        // 点击加减
        $('.choose-num').on('click', 'span', function() {
            if ($(this).hasClass('reduce')) {
                if ($('.choose-numval').val() <= 1) {
                    alert('此商品的最小购买数量为1件')
                    return
                }
                $('.choose-numval').val($('.choose-numval').val() * 1 - 1);
            }
            if ($(this).hasClass('add')) {
                if ($('.choose-numval').val() >= 5) {
                    alert('此商品的最大购买数量为5件')
                    return
                }
                $('.choose-numval').val($('.choose-numval').val() * 1 + 1);
            }
        });

        // 立即购买
        $('.btn-wrap').on('click', 'span', function() {
            if (!arr1 || !arr3 || !arr4) {
                alert('请先选择完整规格。');
                return
            }
            // 判断是否登录
            // 所以需要判断是否有登录
            let login = getCookie('login');
            if (!login) {
                location.href = '../html/login.html';
                let wurl = window.location.href
                localStorage.setItem('url', wurl)
                return
            }

            console.log($('.choose-numval').val(), $('.numgod em').html(), $('.numgod i').html(), $('.numgod stong').html());
            // 立即购买添加到购物车
            if ($(this).hasClass('immediately')) {
                $.ajax({
                    url: '../api/addcar.php',
                    method: 'get',
                    data: {
                        username: login,
                        goods_id: id,
                        good_num: $('.choose-numval').val(),
                        good_color: $('.numgod em').html(),
                        good_edition: $('.numgod i').html(),
                        good_network: $('.numgod stong').html(),
                        good_img: goodimg,
                        name: $('.main-cenrighttop h2').html(),
                        good_price: $('.goodprice').html()
                    },
                    dataType: 'json',
                    success: function(res) {
                        console.log(res);
                        if (res.code) {
                            location.href = '../html/car.html';
                        }
                    }

                })
            }
            // 添加到购物车
            if ($(this).hasClass('addCat')) {
                $.ajax({
                    url: '../api/addcar.php',
                    method: 'get',
                    data: {
                        username: login,
                        goods_id: id,
                        good_num: $('.choose-numval').val(),
                        good_color: $('.numgod em').html(),
                        good_edition: $('.numgod i').html(),
                        good_network: $('.numgod stong').html(),
                        good_img: goodimg,
                        name: $('.main-cenrighttop h2').html(),
                        good_price: $('.goodprice').html()
                    },
                    dataType: 'json',
                    success: function(res) {
                        console.log(res);
                        if (res.code) {
                            console.log(1);
                            $('.caradd').show()
                        }
                    }

                })
            }
        })

        $('.caradd').on('click', 'i', function() {
            $('.caradd').hide()
        })
        $('.dig-tab').on('click', 'li', function() {  
            $(this).addClass('active').siblings().removeClass('active');
        })

    };


})