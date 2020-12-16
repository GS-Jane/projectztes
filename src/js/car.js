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

    // 进入购物车判断
    // 判断是否登录
    // 所以需要判断是否有登录
    let login = getCookie('login');
    if (!login) {
        location.href = '../html/login.html';
        let wurl = window.location.href
        localStorage.setItem('url', wurl)
    }
    // 渲染数据

    $('#loading').show();
    $.ajax({
        url: '../api/getCar.php',
        method: 'get',
        data: {
            username: login
        },
        dataType: 'json',
        success: function(res) {
            // console.log(res);

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

        if (!data.length) {
            $('#main')[0].innerHTML = `<div class="container nuls">
                <h1>亲爱的用户</h1>
                <p>您购物空空如也，请到列表页选购你商品</p>
                <p><a class="btn btn-primary btn-lg" href="../html/list.html" role="button">点击去到列表页</a></p>
            </div>`;
            return
        }
        let allChecked = data.every(item => {
            return item.is_select == 1;
        });
        let total = shopNum(data);
        let str = `
        <div class="container">
            <ul class="car-head clearfix">
                <li>
                    <input type="checkbox" class="carall" ${allChecked?'checked' :''}> 全选
                </li>
                <li>商品</li>
                <li>单价（元）</li>
                <li>数量</li>
                <li>金额</li>
                <li>操作</li>
            </ul>
            <div class="car-table">
                <table>
                    <tbody class="tbodys"> `
        data.forEach((item) => {
            str += `
            <tr>
            <td><input type="checkbox" class="check" ${item.is_select==1 ?'checked':''} goods_id="${item.id}"></td>
            <td class="carintroduce">
                <div class="fl divimg">
                    <img src="${item.good_img}" alt="">
                </div>
                <div class="fl divcen">
                    <p>${item.name}</p>
                    <p>颜色：${item.good_color}、版本：${item.good_edition}、网络制式：${item.good_network}</p>
                </div>
            </td>
            <td>￥${(item.good_price*1).toFixed(2)}</td>
            <td class="carnum" goods_id="${item.id}">
                <span class="fl carreduce">-</span>
                <input type="text" value="${item.good_num}" class="fl choose-numval">
                <span class="fl caradd">+</span>
            </td>
            <td>￥${(item.good_price*item.good_num).toFixed(2)}</td>
            <td class="hand cardel" goods_id="${item.id}">删除</td>
        </tr>`
        });
        str += `
                </tbody>
                </table>
            </div>
            <div class="car-foot clearfix">
                <div class="carfootleft fl">
                    <input type="checkbox" class="carall" ${allChecked?'checked' :''}>
                    <span>全选</span>
                    <span class="cardels hand">删除</span>
                </div>
                <div class="fr carfootright">
                    <span>
                        已选商品<em class=""> ${total.totalNum} </em> 件 
                    </span>
                    <span>
                        总计原价（不含运费）：<em>￥ ${(total.totalPrice).toFixed(2)}</em>
                    </span>
                    <span>
                        优惠金额：<em> ￥ 0</em>
                    </span>
                    <span>
                        合计（不含运费）：<em class="titlemoney">￥${(total.totalPrice).toFixed(2)}</em>
                    </span>
                    <span class="gosettlement hand">去结算</span>
                </div>
            </div>
        </div>`
        $('#main').html(str);
    }

    // 事件委托操作商品
    $('#main')[0].onclick = function(e) {
        // 全选商品
        if (e.target.classList.contains('carall')) {
            let data = JSON.parse(localStorage.getItem('goodsList'));
            data.forEach(item => {
                e.target.checked ? item.is_select = 1 : item.is_select = 0;
            });
            localStorage.setItem('goodsList', JSON.stringify(data));
            rendering(data);
            gosettlements()
        }
        // 单选商品
        if (e.target.classList.contains('check')) {
            let id = e.target.getAttribute('goods_id');
            let data = JSON.parse(localStorage.getItem('goodsList'));
            data.forEach(item => {
                if (item.id == id) {
                    item.is_select = e.target.checked ? 1 : 0;
                }
            });
            localStorage.setItem('goodsList', JSON.stringify(data));
            rendering(data);
            gosettlements()
        }
        // 减少商品数量
        if (e.target.classList.contains('carreduce')) {
            // 进行数量减法
            let data = JSON.parse(localStorage.getItem('goodsList'));
            let id = e.target.parentNode.getAttribute('goods_id');

            let obj = data.filter(item => {
                return item.id == id
            })[0];
            let num = obj.good_num * 1;
            if (num <= 1) {
                num = 1
            } else {
                num--
            }
            gosettlements()

            $.ajax({
                url: '../api/updCarData.php',
                method: 'get',
                data: {
                    username: login,
                    goods_id: id,
                    goods_num: num
                },
                dataType: 'json',
                success: function(res) {
                    if (res.code) {
                        obj.good_num = num;
                        localStorage.setItem('goodsList', JSON.stringify(data));
                        rendering(data);
                    }
                }
            })

        }
        // 添加商品数量
        if (e.target.classList.contains('caradd')) {
            // 进行数量减法
            let data = JSON.parse(localStorage.getItem('goodsList'));
            let id = e.target.parentNode.getAttribute('goods_id');

            let obj = data.filter(item => {
                return item.id == id
            })[0];
            let num = obj.good_num * 1;
            num++
            gosettlements()
            $.ajax({
                url: '../api/updCarData.php',
                method: 'get',
                data: {
                    username: login,
                    goods_id: id,
                    goods_num: num
                },
                dataType: 'json',
                success: function(res) {
                    if (res.code) {
                        obj.good_num = num;
                        localStorage.setItem('goodsList', JSON.stringify(data));
                        rendering(data);
                    }
                }
            })
        }

        // 删除商品
        if (e.target.classList.contains('cardel')) {
            // 删除数据库中 和 本地存储中对应的数据 
            if (!confirm("你确定要删除吗？")) {
                return
            }
            let id = e.target.getAttribute('goods_id');
            gosettlements()
            $.ajax({
                url: '../api/removeCarData.php',
                method: 'get',
                data: {
                    username: login,
                    goods_id: id
                },
                dataType: 'json',
                success: function(res) {
                    if (res.code) {
                        // 先获取本地存储中的数据
                        let data = JSON.parse(localStorage.getItem('goodsList'));
                        let res = data.filter(item => {
                            return item.id != id;
                        });

                        localStorage.setItem('goodsList', JSON.stringify(res));
                        rendering(res);
                    }
                }
            })
        }

        // 点击可删除选中多个
        if (e.target.classList.contains('cardels')) {

            let data = JSON.parse(localStorage.getItem('goodsList'));

            let res = data.filter(item => {
                return item.is_select == 1
            });
            if (res.length <= 0) {
                alert('请选择需要删除的商品')
                return
            }
            if (!confirm("你确定要删除选中的商品吗？")) {
                return
            }
            gosettlements()
            delsjs(res)


        }

        // 结算购物车
        if (e.target.classList.contains('gosettlement')) {
            let data = JSON.parse(localStorage.getItem('goodsList'));
            let res = data.filter(item => {
                return item.is_select == 1
            });
            if (res.length <= 0) {
                alert('请先勾选需要购买的商品')
                return
            }
            gosettlements()
            delsjs(res)


        }
    }


    function shopNum(goods) {
        let res = goods.filter(item => {
            return item.is_select == 1
        });

        // console.log(res);
        // 计算选中商品的数量
        let totalNum = res.reduce((pre, item) => {
            return pre + item.good_num * 1
        }, 0);

        // 计算选中商品的总价格
        let totalPrice = res.reduce((pre, item) => {
            return pre + item.good_price * item.good_num
        }, 0);
        return {
            totalNum,
            totalPrice
        }
    }
    // 判断是否有商品被选中
    function gosettlements() {
        let data = JSON.parse(localStorage.getItem('goodsList'));
        let res = data.filter(item => {
            return item.is_select == 1
        });
        if (res.length > 0) {
            $('.gosettlement').addClass('gosettlementactive')
        } else {
            $('.gosettlement').removeClass('gosettlementactive')
        }
    }

    // 结算购物车和删除商品
    function delsjs(res) {
        res.forEach((item) => {
            $.ajax({
                url: '../api/removeCarData.php',
                method: 'get',
                data: {
                    username: login,
                    goods_id: item.id
                },
                dataType: 'json',
                success: function(res1) {
                    if (res1.code) {
                        // 先获取本地存储中的数据
                        // console.log(item.id);
                        let data = JSON.parse(localStorage.getItem('goodsList'));
                        // console.log(data);
                        let res2 = data.filter(item1 => {
                            return item1.id != item.id;
                        });
                        // console.log(res2);
                        localStorage.setItem('goodsList', JSON.stringify(res2));
                        rendering(res2);
                    }
                }
            })
        })
    }

})