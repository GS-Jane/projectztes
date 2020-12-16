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
    })

    $('.hand').on('click', function() {
        // 转成小写
        codes = codes.toLowerCase();
        let codenamesval = $('#code').val().toLowerCase();
        if (codes != codenamesval) {
            alert('验证码不正确，请重新输入')
            return false;
        }

        $.ajax({
            url: '../api/login.php',
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
                    alert('登陆失败，账号密码不正确')
                }
            }
        })
    })
})