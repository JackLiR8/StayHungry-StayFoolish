export default function timeTransfer(time){
    let thatTime = new Date(time)
    let current = new Date()

    let TY = thatTime.getFullYear()
    let TMon = thatTime.getMonth() + 1
    let TD = thatTime.getDate()
    let TH = thatTime.getHours()<10?'0'+thatTime.getHours():thatTime.getHours();
    let TMin = thatTime.getMinutes()<10?'0'+thatTime.getMinutes():thatTime.getMinutes();
    // console.log('///////////// 当时',TY,TMIN,TD,TY)

    let CY = current.getFullYear()
    let CMon = current.getMonth() + 1
    let CD = current.getDate()
    let CH = current.getHours()<10?'0'+current.getHours():current.getHours();
    let CMin = current.getMinutes()<10?'0'+current.getMinutes():current.getMinutes();

    let year = CY - TY;
    if (year > 0) return this.formatDate(time)

    let month = CMon - TMon;
    if (month > 0) return this.formatDate(time)

    let day = CD - TD;
    
    if (day < 1){
        let time_lag = current.getTime() - thatTime.getTime() - 8
        let hours = new Date(time_lag).getHours()
        if(hours<1){
            let minute = new Date(time_lag).getMinutes()
            if(minute < 5){
                return '刚刚'
            }
            return minute + '分钟前'
        }
        return TH+":"+TMin
    } else if (day === 1){
        return '昨天'+ TH +":"+TMin
    } else if (day < 7) {
        return day + "天前"
    } else {
            return this.formatDate(time) 
    }
}
