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

        // if (serval == null) {
        // console.log(serval);
        $('.numlength').html(data.length);
        let str = '';
        data.forEach((item) => {
            str += `
        <li data-id="${item.id}">
        <div class="commodity-right-pic">
            <img src="${item.good_img}" alt="" class="info-img">
           
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

        let serval = sessionStorage.getItem('searchval');
        if (serval != null) {
            let attr = $(".listul .info-t").filter(":contains(" + serval.trim() + ")");
            // console.log(attr);
            let arr = []
            attr.each((idx, item) => {
                    // console.log(idx, item);
                    // $(item.parentNode.parentNode).show()
                    arr.push($(item.parentNode.parentNode).attr('data-id'))

                })
                // console.log(arr);
            let data = JSON.parse(localStorage.getItem('goodsList'));
            let res = []

            data.forEach(item => {
                for (let i = 0; i < arr.length; i++) {
                    if (item.id == arr[i]) {
                        res.push(item)
                    }

                }
            })

            rende(res)
                // console.log(res);

        }
    };

    function rende(data) {
        $('.listul').html();
        let str = '';
        console.log(data.length);
        if (data.length == 0) {
            str = `
            <li>
                <h2>搜索的商品不存在，<span class="shuax">刷新页面</span> </h2>
        </li>`
            $('.listul').html(str);
        } else {
            data.forEach((item) => {
                str += `
        <li data-id="${item.id}">
        <div class="commodity-right-pic">
            <img src="${item.good_img}" alt="" class="info-img">
           
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
        }
        sessionStorage.removeItem('searchval');
        $('.shuax').on('click', function() {
            location.reload();
        })
    }
    // let serval = sessionStorage.getItem('searchval');
    // if (serval != null) {
    //     let attr = $(".listul .info-t").filter(":contains(" + serval.trim() + ")");
    //     console.log(attr);
    //     attr.each((idx, item) => {
    //         // console.log(idx, item);
    //         // $(item.parentNode.parentNode).show()
    //         console.log($(item.parentNode.parentNode));
    //     })
    // }

    // 事件委托绑定点击事件
    let listul = document.querySelector('.listul');
    listul.onclick = function(e) {
        if (e.target.classList == 'info-img') {
            let id = e.target.parentNode.parentNode.getAttribute('data-id');
            location.href = `../html/goodlist.html?id=${id}`
        }
        if (e.target.classList == 'info-t') {
            let id = e.target.parentNode.parentNode.getAttribute('data-id');
            location.href = `../html/goodlist.html?id=${id}`
        }
        if (e.target.classList == 'listcar') {
            let id = e.target.parentNode.parentNode.getAttribute('data-id');
            $('.mask').show();
            $('.listaddcar').show()
            $('body').css({　　
                "overflow-x": "hidden",
                　　"overflow-y": "hidden"
            });

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
                        render(res.detail);
                        $('#loading').hide();
                    }
                }
            });



        }
    };

    // $('.listul').on('click', 'li', function() {
    //     location.href = `../html/goodlist.html?id=${$(this).attr('data-id')}`
    // });
    function render(data) {
        // console.log(data);
        let str = `
        <div class="listaddcar-dialoog">
        <div class="dialoog-top clearfix">
            <h3 class="fl">加入购物车</h3>
            <span class="fr dignone">X</span>
        </div>
        <div class="dialoog-boy">

            <div class="main-cen clearfix">

                <div class="main-cenright ">
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
                                        <img src="${data.good_img}" alt="" class="datacorimg">
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
                            <span class="addCat" ids = "${data.id}">加入购物车
                </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>


`

        $('.listaddcar').html(str);
        // 隐藏弹框
        $('.dignone').on('click', function() {
            $('.mask').hide();
            $('.listaddcar').hide();
            $('body').css({　　
                "overflow-x": "auto",
                　　"overflow-y": "auto"
            });
        })




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

        // 选择规格参数
        let goodimg;
        goodimg = $('.datacorimg').attr('src');
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
                $('.numgod span').text($('.choose-numval').val());
            }
            if ($(this).hasClass('add')) {
                $('.choose-numval').val($('.choose-numval').val() * 1 + 1);
                $('.numgod span').text($('.choose-numval').val());
            }
        });

        $('.addCat').on('click', function() {
            if (!arr1 || !arr3 || !arr4) {
                alert('请先选择完整规格。');
                return
            }
            // 判断是否登录
            // 所以需要判断是否有登录
            let login = getCookie('login');
            let id = $(this).attr('ids');
            if (!login) {
                location.href = '../html/login.html';
                let wurl = window.location.href
                localStorage.setItem('url', wurl)
                return
            }
            // console.log(id, $('.choose-numval').val(), $('.numgod em').html(), $('.numgod i').html(), $('.numgod stong').html());
            // return
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
                    // console.log(res);
                    if (res.code) {
                        $('.mask').hide();
                        $('.listaddcar').hide();
                        $('body').css({　　
                            "overflow-x": "auto",
                            　　"overflow-y": "auto"
                        });
                    }
                }

            })
        })
    }

    // 排序
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

    });



})