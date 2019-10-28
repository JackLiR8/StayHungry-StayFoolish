HTTP

## HTTP request methods
[HTTP请求方法](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Methods)
1. GET  
GET 方法请求指定的资源。使用 GET 的请求应该只用于获取数据。

2. HEAD  
HEAD 方法 请求资源的头部信息, 并且这些头部与 HTTP GET 方法请求时返回的一致. 该请求方法的一个使用场景是在下载一个大文件前先获取其大小再决定是否要下载, 以此可以节约带宽资源

3. POST  
POST方法用于将实体提交到指定的资源，通常会引起服务器上的状态变化或副作用. 
> HTTP POST 方法 发送数据给服务器. 请求主体的类型由 Content-Type 首部指定.  
PUT 和POST方法的区别是,PUT方法是幂等的：连续调用一次或者多次的效果相同（无副作用）。连续调用同一个POST可能会带来额外的影响，比如多次提交订单。  
当 POST 请求是通过除 HTML 表单之外的方式发送时, 例如使用 XMLHttpRequest, 那么请求主体可以是任何类型.按HTTP 1.1规范中描述，POST为了以统一的方法来涵盖以下功能：
>+ 注释已有的资源
>+ 在公告板，新闻组，邮件列表或类似的文章组中发布消息;
>+ 通过注册新增用户;
>+ 向数据处理程序提供一批数据，例如提交一个表单;
>+ 通过追加操作，扩展数据库数据.

4. PUT  
HTTP PUT 请求方法使用请求中的负载创建或者替换目标资源。

5. DELETE  
DELETE方法删除指定的资源。

6. CONNECT  
CONNECT 方法可以开启一个客户端与所请求资源之间的双向沟通的通道。它可以用来创建隧道（tunnel）。  

7. OPTIONS  
HTTP 的 OPTIONS 方法 用于获取目的资源所支持的通信选项。客户端可以对特定的 URL 使用 OPTIONS 方法，也可以对整站（通过将 URL 设置为“*”）使用该方法。

8. TRACE  
TRACE 方法 实现沿通向目标资源的路径的消息环回（loop-back）测试 ，提供了一种实用的 debug 机制。

9. PATCH  
PATCH方法用于对资源应用部分修改
>在HTTP协议中， PUT 方法已经被用来表示对资源进行整体覆盖， 而 POST 方法则没有对标准的补丁格式的提供支持。不同于  PUT 方法，而与 POST 方法类似，PATCH  方法是非幂等的，这就意味着连续多个的相同请求会产生不同的效果。
