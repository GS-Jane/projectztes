/* 
    js工具库：封装一些比较常用的函数
*/

// 计算任意参数之和

function sum() {
    var sum = 0;
    for (var i = 0; i < arguments.length; i++) {
        sum += arguments[i]
    }

    return sum
}

// 获取函数中的最大值

function maxNum() {
    var max = arguments[0];
    for (var i = 1; i <= arguments.length; i++) {
        max = arguments[i] > max ? arguments[i] : max
    }
    return max
}

// 获取函数中的最小值

function minNum() {
    var min = arguments[0];
    for (var i = 1; i <= arguments.length; i++) {
        min = arguments[i] < min ? arguments[i] : min
    }
    return min
}

//封装一个函数，求 n-m之间随机整数

function randomNumber(n, m) {
    if (n > m) {
        return parseInt(Math.random() * (n - m + 1) + m)
    } else {
        return parseInt(Math.random() * (m - n + 1) + n)
    }
}

//封装生成随机颜色

function getColor() {
    var str = "#";
    var arr = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f"];
    for (var i = 0; i < 6; i++) {
        var num = parseInt(Math.random() * 16)
        str += arr[num];
    }
    return str
}

//传入一个数n，随机生成n个数(纯数字)的验证码

function randomCode(n) {
    var res = '';
    for (var i = 0; i < n; i++) {
        res += parseInt(Math.random() * 10)
    }
    // console.log(res);
    return res
}

//传入一个数n，随机生成n个数(包含数字字母)的验证码
function randomCodes(n) {
    var str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var res = '';
    for (var i = 0; i < n; i++) {
        var index = parseInt(Math.random() * str.length);
        res += str[index]
    }
    return res
}

//利用indexOf()进行给数组去重

function norepeat(arr) {
    var arr1 = []
    for (var i = 0; i < arr.length; i++) {
        if (arr1.indexOf(arr[i]) === -1) {
            arr1.push(arr[i])
        }
    }
    return arr1
}

//封装一个函数，利用sort对数组进行从小到大排序

function arrerLargeSort(arr) {
    arr.sort(function(a, b) {
        return a - b
    })
    return arr
}

//封装一个函数，利用sort对数组进行从大到小排序

function arrerSmallSort(arr) {
    arr.sort(function(a, b) {
        return b - a
    })
    return arr
}

// 封装一个时间格式的函数 生成如：2020-11-07  15:30:32  星期六 格式的时间

function formatTime(date1, symbol) {
    // 把时间date1转为年月日时分秒的格式

    // 时间转年
    var year = date1.getFullYear();
    // 时间转月
    var month = date1.getMonth() + 1;
    //补零，当月份小于10时，给月份加前面补 "0"
    month = month >= 10 ? month : "0" + month;
    // 时间转日
    var day = date1.getDate();
    //补零，当天数小于10时，给月份加前面补 "0"
    day = day >= 10 ? day : "0" + day;

    // 时间转小时
    var hours = date1.getHours();
    //补零，当小时小于10时，给小时加前面补 "0"
    hours = hours >= 10 ? hours : "0" + hours;

    // 时间转分钟
    var min = date1.getMinutes();
    //补零，当分钟小于10时，给分钟加前面补 "0"
    min = min >= 10 ? min : "0" + min;

    // 时间转秒
    var sec = date1.getSeconds();
    //补零，当秒小于10时，给秒加前面补 "0"
    sec = sec >= 10 ? sec : "0" + sec;

    //星期几
    var week = date1.getDay(); //返回的是数字。所以创建一个数组，根据数组获取对应的星期

    var arr = ["星期天", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];
    // 把对应的数据赋值给week
    week = arr[week]
        // 根据传入的符号对年月日进行符号拼接显示
    symbol = symbol ? symbol : "/";
    // 直接return对应格式
    // return `${year}${symbol}${month}${symbol}${day}  ${hours}:${min}:${sec}  ${week}`

    // 把对应的数据通过对象的形式进行输出
    var obj = {
        year: year + symbol,
        month: month + symbol,
        day: day,
        hours: hours,
        min: min,
        sec: sec,
        week: week
    };
    return obj
        // console.log(obj);
}

// 封装一个计算两个时间差的函数

function timeDifference(date1, date2) {

    // 先把对应的时间换算成格林威治的时间戳
    var time1 = date1.getTime();
    var time2 = date2.getTime();

    // 计算两个时间的时间差,在取差的绝对值
    var time = Math.abs(time1 - time2);


    // 1000毫秒 = 1秒
    // 60秒 = 1分
    // 60份 = 1小时
    // 24小时 = 1天

    // 计算两个时间差的天数
    var day = parseInt(time / 1000 / 60 / 60 / 24);

    // 计算小时 
    // var hours = time / 1000 / 60 / 60 / 24 - day;
    var hours = parseInt((time / 1000 / 60 / 60) % 24);

    // 计算 分钟
    var min = parseInt((time / 1000 / 60) % 60);

    // 计算秒数
    var sec = parseInt(time / 1000 % 60);
    // 把计算的day hours min sec 当成函数的返回值
    var obj = {
        day: day,
        hours: hours,
        min: min,
        sec: sec
    }
    return obj;
    // console.log(`两个时间相差${day}天${hours}小时${min}分${sec}秒`);

}

// 封装一个函数 把url的参数转化为 对象

function urlParameterObj(url) {
    var arr = url.split('&')
    var obj = {}; //定义一个空对象用
    arr.forEach((item) => {
            var newArr = item.split("=");
            obj[newArr[0]] = newArr[1];
            // console.log(newArr);
        })
        // console.log(obj);
    return obj
}

// 封装一个函数 兼容的获取元素的样式
// 你要获取哪个元素的什么样式  box width

function getStyle(ele, attr) {
    var res;
    // 判断window中是否有这个getComputedStyle属性，有就执行有getComputedStyle的代码;
    if (window.getComputedStyle) {
        res = window.getComputedStyle(ele)[attr];
    } else {
        res = ele.currentStyle[attr];
    }
    return res;
}

// 封装一个事件监听的函数
// 事件源ele，事件类型type, 事件处理函数callback 可变
// ele:元素 type：事件类型 callback：函数  isCaptrue：是否捕获，事件源无法捕获（提前执行）
function addEvent(ele, type, callback, isCaptrue) {
    // w3c标准事件监听
    if (ele.addEventListener) {
        ele.addEventListener(type, callback, isCaptrue)
    } else if (ele.attachEvent) {
        // IE8以下浏览器事件监听
        ele.attachEvent("on" + type, callback);
    } else {
        // 如果都没有，就用dom节点绑定事件
        ele['on' + type] = callback
    }
}

// 封装移除一个函数（移除对应的函数，传入的参数需一模一样，函数需要提取出去单独写（与内存存储有关））
// 事件源ele，事件类型type, 事件处理函数callback 可变
// ele:元素 type：事件类型 callback：函数  isCaptrue：是否捕获，事件源无法捕获（提前执行）
function removeFun(ele, type, callback, isCaptrue) {
    // w3c标准事件清除
    if (ele.removeEventListener) {
        ele.removeEventListener(type, callback, isCaptrue)
    } else if (ele.detachEvent) {
        // IE8以下浏览器事件清除
        ele.detachEvent("on" + type, callback);
    } else {
        // 如果都没有，就直接等于null
        ele['on' + type] = null;
    }
}

/* 
    封装一个动画函数
    参数：
        目标值
        给谁做动画
        做什么样式的动画（css属性）

    思考：多属性的动画？
    多属性动画，会传递多个参数(width,heigh...)，考虑到多个参数，所以参数传递通过对象的形象进行传递。
    在封装动画的函数中对该对象形象循环处理。
    参数：
    ele。需要执行动画的元素。
    obj。这个元素参与动画的属性。
    callback。回调函数，动画结束之后，需要做哪些操作。可执行函数，也可不执行函数
*/
function animations(ele, obj, callback) {
    // 记录定定时器的个数
    // console.log(obj);
    let timerLen = 0;
    // 循环对象，对象中有多少属性就执行多少次动画(实现多属性动画)
    for (let key in obj) {
        timerLen++;
        // 获取当前元素的当前值
        let attr = key; //当前的属性
        let target = obj[key]; //当前的属性值
        let style;
        let speed;
        // 开启这次定时器之前 先清空定时器
        clearInterval(ele[attr]);
        // 定义一个定时器来执行动画
        // 把定时器当成元素的属性存储起来
        // attr = width ele[attr] = ele.width
        // ele.height

        ele[attr] = setInterval(() => {
            // 每执行一次定时器的时候就需要获取元素的最新的当前值
            // opacity 的取值为 0-1 ===》0-100

            if (attr == 'opacity') {
                // 不能取整， 因为透明度没有单位 而且透明度的取整为0-1 有小数
                style = getStyle(ele, attr) * 100;
            } else {
                style = parseInt(getStyle(ele, attr));
            }

            speed = (target - style) / 10;
            speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
            style += speed;
            if (target == style) {
                clearInterval(ele[attr]);
                // 没结束一个定时器，就让timerLen - 1
                timerLen--;
                // 如果在这个位置 去写动画结束 执行的代码，会执行多次，有几个定时就会执行几次
                //    ele.style.backgroundColor = "green";
            }

            // 如果属性为透明度的时候 ，样式是不需要单位的
            if (attr == "opacity") {
                // 因为上面获取的时候 *100
                ele.style[attr] = style / 100;
            } else {
                ele.style[attr] = style + 'px';
            }

            // 当timerLen = 0的时候说明所有动画都结束
            if (timerLen == 0) {
                //  当有callback的时候那么久执行callback
                // 如果没有callback 就不用 当callback没有传递参数的时候，callback = undefined
                callback && callback();
            }
        }, 30);
    }
}


/* 
    封装设置,删除，修改cookie

    分析思路：
    【1】因为客户端(浏览器)所获取的时间是+8时区的时间，而服务端(服务器)的时间为0时区的时间，所以客户端所获取的时间会比服务端时间多8个小时。所以需要把时间转化为0时区的时间。

    0时区的时间转化：    0时区的时间 = new Date() - 8小时。

    操作：
    封装设置cookie，删除，修改
    如果cookie中没有key就添加，如果有这个可以 就是修改
    删除，直接设置cookie的过期时间为负数
*/

function setCookie(key, value, expires) {
    // 当没有传递过期时间的时候，那么默认为会话时间，不设置 expires=${date}
    if (expires) {
        // 获取当前时间
        let date = new Date();
        // 在把当前的时间转为时间戳(毫秒)  date.getTime()，在把8小时转为时间戳(毫秒)的形式，在加上expires，这就为cookie过期的时间
        // expires 这里设定为分钟
        let time = date.getTime() - 8 * 60 * 60 * 1000 + expires * 60 * 1000;

        // 在计算的时间(时间戳的形式)转为时间形式
        date.setTime(time);

        // 在把设置好的cookie添加或删除或修改
        document.cookie = `${key}=${value};expires=${date}`
        return
    }
    document.cookie = `${key}=${value}`;
}

/*  
    封装获取cookie 
    获取cookie，需要传递一个参数，为key,获取为key的cookie(这个属性的属性值);
*/
function getCookie(key) {
    // console.log(key);
    // 获取cookie(获取的是所有的cookie)为字符串
    let cookie = document.cookie;
    // console.log(cookie);
    // a=1;b=2;c=3;
    // 先把字符串分割为数组，然后再把数组转化为对象

    let arr = cookie.split('; '); //["a=1","b=1"]
    // 创建一个对象
    let obj = {};
    arr.forEach((item) => {
        let newArr = item.split("=");
        obj[newArr[0]] = newArr[1];
    })
    return obj[key]
}


// 封装拖拽事件

class  Drag  {    
    constructor(ele)  {            
        this.ele  =  document.querySelector(ele);            
        this.init();        
    };        
    //初始化
        
    init()  {            
        // 鼠标按下时候实现拖拽效果          
        this.ele.onmousedown  =   ()  =>  {                
            this.down();            
        };            
        // 鼠标抬起 停止拖拽          
        document.onmouseup  =  this.up;        
    };        
    //鼠标按下
        
    down()  {            
        let  e  =  window.event;            
        let  x  =  e.offsetX;            
        let  y  =  e.offsetY;            
        document.onmousemove  =   ()  =>  {                
            this.move(x,  y);            
        }        
    };        
    // 移动
        
    move(x,  y)  {            
            let  event  =  window.event;            
            let  left  =  event.clientX  -  x;            
            let  top  =  event.clientY  -  y;            
            let  wi  =  parseInt(getStyle(this.ele,  "width"));            
            let  hei  =  parseInt(getStyle(this.ele,  "height"));            
             //判断边界值
                        
            if  (left  <=  0)  {               
                  left  =  0;           
              }            
            if  (top  <=  0)  {     
              top  =  0;   
                      
            }            
            if  (left  >=  window.innerWidth  -  wi)  {      
               left  =  window.innerWidth  -  wi;     
            };           
            if  (top  >=  window.innerHeight  -  hei)  {        
                 top  =  window.innerHeight  -  hei;    
            } ;           
            this.ele.style.left  =  left  +  'px';            
            this.ele.style.top  =  top  +  'px';        
        }         // 鼠标抬起
            
    up()  {        
         document.onmousemove  =  null;   
    }
}