$(function($) {
    //初始化验证码
    let verifyCode = new GVerify({
        id: "picyzm",
        length: 4
    });
    let codes = verifyCode.options.code;
    $('.usera').on('click', function() {
        verifyCode = new GVerify({
            id: "verifyCanvas",
            length: 4
        });
        codes = verifyCode.options.code;
        // console.log(codes);
    })


    let una = 0;
    // 账号的正则判断
    $('#username').blur(function() {
        una = 0;
        let reg = /^1[3-9]\d{9}$/g;
        let res = reg.test($('#username').val());
        if (!res) {

            $('.usernamewarning').css('opacity', '1')
            $('.usernamewarningem').text('手机号格式错误')
            return false;
        }

        // 失去焦点判断账号是否已经注册

        $.ajax({
            url: '../api/regcode.php',
            method: 'post',
            data: {
                username: $('#username').val()
            },
            dataType: 'json',
            success: function(res) {
                if (res.code == 0) {
                    $('.usernamewarning').css('opacity', '1');
                    $('.usernamewarningem').text('该用户已被注册');
                } else {
                    una = 1;
                }
            }
        })
        $('.usernamewarning').css('opacity', '0')

    });

    // 密码判断
    // 判断密码强弱
    $('#password').on("input", function() {
        if ($('#password').val().length == 6) {
            $('.weak').css('backgroundColor', '#e22335');
        } else if ($('#password').val().length == 15) {
            $('.hit').css('backgroundColor', '#ff8135');
        } else if ($('#password').val().length == 20) {
            $('.strong').css('backgroundColor', '#8ab65d');
        }


    });
    $('#password').blur(function() {
        if ($('#password').val().length >= 6) {
            $('.passwordwarning').css('opacity', '0')
        }
    });
    // 第二次密码失去焦点判断两次密码是否一样


    $('#password2').blur(function() {
        if ($('#password').val() != $('#password2').val()) {
            alert('密码与确认密码不相符，请重新填写')
        }
    });
    // 绑定点击注册事件
    $('.registerBtn').on('click', function() {
        // 判断账号
        if (una == 0) {
            $('.usernamewarning').css('opacity', '1')
            $('#username').focus()
            return false;
        }
        // 判断密码
        if ($('#password').val().length < 6) {
            $('.passwordwarning').css('opacity', '1')
            $('#password').focus()
            return false;
        }
        // 二次密码验证
        if ($('#password').val() != $('#password2').val()) {
            alert('密码与确认密码不相符，请重新填写')
            return false;
        }

        // 转成小写
        codes = codes.toLowerCase();
        let codenamesval = $('#codenames').val().toLowerCase();
        if (codes != codenamesval) {
            alert('验证码不正确，请重新输入')
            $('#codenames').focus()
            return false;
        }
        // 判断是否勾选协议
        if (!($('.check')[0].checked)) {
            alert('请勾选并且阅读会员注册协议');
            return false
        }

        $.ajax({
            url: '../api/register.php',
            method: 'post',
            data: {
                username: $('#username').val(),
                password: $('#password').val()
            },
            dataType: 'json',
            success: function(res) {
                if (res.code == 1) {
                    // 保存登陆状态
                    setCookie('login', $('#username').val());
                    // 跳转页面 如果从购物车过来的时候登录成功去购物车页面
                    // 否则就去到首页
                    let url = localStorage.getItem('url');
                    if (url) {
                        location.href = url;
                        // 登录成功的时候把url的这个cookie值清除
                        localStorage.removeItem('url');
                    } else {
                        location.href = '../html/index.html';
                    }
                } else {
                    alert('注册失败，请检查网络，重新操作')
                }
                // console.log(res);

            }
        })
    })

})