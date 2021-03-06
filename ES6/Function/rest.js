+(() => {
    console.group('----------- rest 参数 -----------')

     /* 
            ES6引入rest参数(形式为"...变量名")，用于获取函数多余参数，
            这样就不需要使用 arguments 对象了。rest参数搭配的变量是
            一个数组，该变量将多余的参数放入其中。

            rest参数中的变量代表一个数组，所以可以使用数组所有的方法
        */    
        
    // 1.
    function add(...vals) {     // 利用rest参数可以传入任意数目的参数
        let sum = 0;
        for (let val of vals){
            sum += val
        }
        return sum
    }
    
    console.log(add(1,2,3))     // 6

    // 2.
        const sortArr = (...numbers) => numbers.sort()
        console.log(sortArr(4,3,5,2,0,1))       // [0,1,2,3,4,5]

    // 3. rest参数调用forEach
        function push(arr,...vals) {
            vals.forEach(val => arr.push(val))
        }
        let arr = [];
        push(arr,1,2,3);
        console.log(arr)    // [1,2,3]

    // 4. 注意 rest参数只能是最后一个参数，否则会报错
        /* 
            以下代码报错
            function(a,...b,c){
                // ...
            }
        */

    // 5. 函数的 length 属性不包括 rest 参数
            console.log((function(a){}).length)         // 1
            console.log((function(a,...b){}).length)    // 1
            console.log((function(...a){}).length)      // 0

        console.groupEnd()
})()