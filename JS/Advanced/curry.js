function curry(func){
    return function(a){
        return function(b){
            return function(c){
                return func(a,b,c)
            }
        }
    }
}

function message(date,form,msg) {
    console.log(`[${date.getHours()}:${date.getMinutes()}] ${form}: ${msg}`)
}

const curriedMsg = curry(message)
const msgTemp = {
    autoDate: curriedMsg(new Date()),
    autoDateName: curriedMsg(new Date())('Jack'),
}

msgTemp.autoDate('Jack')('hi')
setTimeout(() => {
    msgTemp.autoDateName('Hi,how are you')
}, 2000);
setTimeout(() => {
    curriedMsg(new Date())('Jack')('Happy New Year！')
}, 4000);