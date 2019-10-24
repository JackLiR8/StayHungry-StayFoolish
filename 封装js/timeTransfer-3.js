const add0 = (num) => {
  return num < 10 ? `0${num}` : num;
}

const timeTransfer = (timestamp) => {
  const now = Date.now();

  // 未来的时间
  if (now < timestamp) {
    return 'Range Error' 
  }

  // 五分钟之内
  if (now - timestamp < 5 * 60 * 1000) {
    return '刚刚'
  }

  const cur = new Date(now);
  const curY = cur.getFullYear();
  const curM = cur.getMonth() + 1;
  const curD = cur.getDate();

  const that = new Date(timestamp);
  const year = that.getFullYear();
  const month = that.getMonth() + 1;
  const date = that.getDate();
  const hour = that.getHours();
  const min = that.getMinutes();

  if (curY > year) {

    // 处理 12-31 和 01-01 的情况
    if (curY - year === 1 && 
        month === 12 && 
        curM === 1 && 
        curD === 1 && 
        date === 31
      ) {
        return `昨日 ${add0(hour)}:${add0(min)}`
    }

    return `${year}年${add0(month)}月${add0(date)}日`
  } else {

    // 当天且五分钟之前
    if (curM === month && curD === date) {
      return `${add0(hour)}:${add0(min)}`
    } 
    else if (curM === month && curD - date === 1) {
      return `昨日 ${add0(hour)}:${add0(min)}`
    }
    else {
      return `${add0(month)}月${add0(date)}日`
    }
  }
}
