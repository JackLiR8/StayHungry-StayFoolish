# jsonp —— (JSON with padding)
***
## jsonp基本思想
>&emsp;网页通过添加一个 script 标签，向服务器请求 JSON 数据，这种做法不受同源策略限制；服务器收到请求后，将数据放在一个指定名字的回调函数里传出来
&emsp;当通过 script 调用数据时，*响应内容必须用 javascript 函数名和圆括号包裹起来*。类似下面这样：
```javascript
    handleResponse({"name":"jack","gender":"male"})
```

## 应用
>1. 需要通讯时，本站脚本创建一个 script 标签，地址指向第三方的API网址
```javascript
    <script src="http://www.example.net/api?param1=1&param2=2"></script>
```
>2. 提供一个回调函数来接收数据（函数名可以约定，或者通过地址传递参数传递）  
>3. 第三方产生的响应为 JSON 数据的包装  
>4. 浏览器调用callback函数，并传递解析后的 JSON 对象作为参数。本站脚本可以在 callback 函数里处理所传入的数据  

## 实现代码：
```javascript
    <!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>jsonp</title>
</head>
<body>
	<div id="result"></div>
<script>
    (function(window,document,undefined){
        var jsonp = function(url,data,callback){
            // 回调函数+时间戳
            var cbName = 'callback_' + new Date().getTime();
            // 暴露全局函数给window
            // 判读查询字符串最后一位是否为?或者是&
            var queryString = url.indexOf('?') == -1 ? '?' : '&';
            // 遍历传进来的data实参赋值给查询字符串
            for(var k in data){
                queryString += k + '=' + data[k] + '&';
            }
            // 查询字符串加上回调函数
            queryString += 'callback=' + cbName;
            // 创建script标签
            var ele = document[0].createElement('script');
            // 给script标签添加src属性值
            ele.src = url + queryString;
            window[cbName] = function(data){
                callback(data);
                document[0].body.removeChild(ele);
            };
            // 添加到body尾部
            document[0].body.appendChild(ele);
        }
        //jsonp函数暴露给window
        window.$jsonp = jsonp;
    })(window,document,undefined);
    </script>
    <script>
        $jsonp('http://api.douban.com/v2/movie/in_theaters',{
            'count':1
        },function(data){
            document.getElementsByTagName('body')[0].innerHTML = JSON.stringify(data);
        })
    </script>
    </body>
    </html>
```