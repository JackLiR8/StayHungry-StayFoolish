/**
 * @file 点击下载文件
 * exportTableData 调用axios.get请求返回二进制文件，
 * 请求拦截器里要声明responseType为二进制文件: 
 *     Object.assign(config, {responseType: 'blob'})
 */
async function exportData() {
  const params = this.$utils.searchConfigHandler(this);
  Object.assign(params, {page: 0, size: 5000});
  const res = await exportTableData(params);

  if (!res) {
    return
  }

  const blob = new Blob([res], {type: 'application/vnd.ms-excel;charset=utf-8'});
  const href = window.URL.createObjectURL(blob);
  let aLink = document.createElement("a");
  Object.assign(aLink, {
    style: {display: 'none'},
    download: '订单列表.xlsx',
    href
  })

  document.body.appendChild(aLink);
  aLink.click()
}

function exportTableData() {
  return Promise.resolve('...')
}