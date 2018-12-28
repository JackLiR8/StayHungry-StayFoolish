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