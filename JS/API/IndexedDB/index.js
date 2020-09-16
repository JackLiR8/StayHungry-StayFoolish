let users = [{
  username: '007',
  firstname: 'James',
  lastname: 'Bond'
},{
  username: '001',
  firstname: 'Mac',
  lastname: 'Gradi'
}]

let db,
    request,
    version = 1

// open request
request = indexedDB.open('users', version)

request.onerror = function(ev) {
  alert(`Failed to open: ${ev.target.errorCode}`)
}

request.onsuccess = function(ev) {
  db = ev.target.result
  console.log('db:', db)
}

// Object Stores
request.onupgradeneeded = function(ev) {
  console.log('======= upgrade =======')
  const db = ev.target.result
  if (db.objectStoreNames.contains('users')) {
    db.deleteObjectStore('users')
  }

  db.createObjectStore('users', { keyPath: 'username' })

}

async function storeUsers(store, users) {
  let req, requests
  for (const user of users) {
    req = store.add(user)
    req.onerror = (ev) => alert(`Error: ${ev.target.errorCode}`)
    req.onsuccess = () => {}
    requests.push(req)
  }

}

/* ================================================================ */
/*                           TRANSACTIONS                           */
/* ================================================================ */

