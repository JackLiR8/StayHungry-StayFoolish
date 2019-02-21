let timeTransfer = function(timestamp) {
                
    let time = new Date(timestamp)
    let y = time.getFullYear();
    let m = time.getMonth() + 1;
    let d = time.getDate()
    return y + "-" + (m < 10 ? "0" + m : m) + "-" + (d < 10 ? "0" + d : d) + " " + time.toTimeString().substr(0, 8);
}

export default {
    timeTransfer
}