class DBHelper {
  constructor(dbName) {
    this.databaseName = dbName
    this.db = null

    this.addData = this.addData.bind(this)
    this.removeData = this.removeData.bind(this)
    this.readData = this.readData.bind(this)
  }

  /**
   * 打开数据库
   */
  openDatabase() {
    return new Promise((resolve, reject) => {
      // indexDB.open()
      const request = indexedDB.open(this.databaseName)
      request.onerror = ev => {
        reject(`Error: ${ev.target.errorCode}`)
      }
      request.onsuccess = ev => {
        this.db = ev.target.result
        resolve(this.db)
      }

      request.onupgradeneeded = this.setDatabaseStores
    })
  }

  /**
   * 设置Object Stores
   */
  setDatabaseStores(ev) {
    const db = ev.target.result
    const userObjectStore = db.createObjectStore('users', {
      keyPath: 'userid'
    })
    userObjectStore.createIndex('name', 'name', { unique: false })
    userObjectStore.createIndex('email', 'email', { unique: true })
  }

  /**
   * 添加数据
   */
  async addData(data) {
    return new Promise((resolve, reject) => {
      const userReadwriteTransaction = this.db.transaction('users', 'readwrite')
      const newObjectStore = userReadwriteTransaction.objectStore('users')

      const addReq = newObjectStore.add(data)

      addReq.onerror = ev => reject(`Error: ${ev.target.errorCode}`)
      addReq.onsuccess = () => resolve()
    })
  }

  /**
   * 删除数据
   */
  async removeData(id) {
    return new Promise((resolve, reject) => {
      const request = this.db
        .transaction('users', 'readwrite')
        .objectStore('users')
        .delete(id)

      request.onsuccess = () => resolve()
      request.onerror = (ev) => reject(`Error: ${ev.target.errorCode}`)
    })
  }

  async readData(id) {
    return new Promise((resolve, reject) => {
      const request = this.db
        .transaction('users', 'readwrite')
        .objectStore('users')
        .get(id)

      request.onsuccess = () => resolve()
      request.onerror = (ev) => reject(`Error: ${ev.target.errorCode}`)
    })
  }

  async readAllData() {
    return new Promise((resolve, reject) => {
      const request = this.db
        .transaction('users', 'readwrite')
        .objectStore('users')
        .getAll()

      request.onsuccess = (ev) => resolve(ev.target.result)
      request.onerror = (ev) => reject(`Error: ${ev.target.errorCode}`)
    })
  }
}





function renderData(data) {
  document.querySelector(".data").innerHTML = data
    .map(
      user => `
    <div style="border-bottom: 1px solid #999; margin-bottom: 10px">
      UserID: ${user.userid}<br>
      Name: ${user.name}<br>
      Email: ${user.email}<br/>
      <button data-id="${user.userid}" class="remove-button">Remove</button>
    </div>
    `
    )
    .join("");

  // Set remove handlers
  document.querySelectorAll(".remove-button").forEach(el =>
    el.addEventListener("click", async () => {
      await database.removeData(Number(el.dataset.id));
      let data = await database.readAllData();
      renderData(data);
    })
  );
}

async function submitData() {
  const userid = Number(document.querySelector("#userid").value);
  const name = document.querySelector("#name").value;
  const email = document.querySelector("#email").value;

  if (!userid || !name || !email) return;

  const user = { userid, name, email };
  await database.addData(user);
  let data = await database.readAllData();
  renderData(data);
}

// initial dataload
const database = new DBHelper("UserDB");
database
  .openDatabase()
  .then(db => database.readAllData())
  .then(renderData);

document.querySelector(".add-data").addEventListener("click", submitData);