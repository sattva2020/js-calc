// Підключаємо технологію express для back-end сервера
const express = require('express')
// Cтворюємо роутер - місце, куди ми підключаємо ендпоїнти
const router = express.Router()

// ================================================================
class User {
  static #list = []

  constructor(email, login, password) {
    this.email = email
    this.login = login
    this.password = password
    this.id = new Date().getTime()
  }

  verifyPassword = (password) => this.password === password

  static add = (user) => {
    this.#list.push(user)
  }

  static getList = () => this.#list
  

  static getById = (id) => 
    this.#list.findI((user) => user.id === id)  

  static deleteById = (id) => {
   const index = this.#list.findIndex(
    (user) => user.id === id,
    ) 
    if (index !== -1) {
      this.#list.splice(index, 1)
      return true
    } else {
      return false
    }
  }

  static updateById = (id, data) => {
    const user = this.getById(id)

    if (user) {
      this.update(user, data) 

      return true
    } else {
      return false
    }
  }

  static update = (user, {email}) => {
    if (email) {
        user.email = email
      }   
  }

}

// (id, createDate, name, price, description)
// ================================================================
class Product  {

  static #list = []

  constructor(name, price, description) {
    this.name = name
    this.price = price
    this.description = description
    this.id = Math.floor(Math.random() * 100000)
    this.createDate = () => {
    this.date = new Date().toISOString()
    }
  }

  static getList = () => this.#list

  static add = (product) => {
    this.#list.push(product)
  }

  static getById = (id) =>
  this.#list.find((product) => product.id === id)  

  static deleteById = (id) => {
    const index = this.#list.findIndex(
      (product) => product.id === id,
      ) 
      if (index !== -1) {
        this.#list.splice(index, 1)

        return true
      } else {
        return false
      }
    }

  static updateById = (id, data) => {
    const product = this.getById(id)
    const {name} = data

    if (product) {
      if (name) {
        product.name = name
      }

      return true
    } else {
      return false
    }
  }
  

   static update = (name, {product}) => {
    if (name) {
        product.name = name
      }   
  }
}

// ================================================================

// router.get Створює нам один ентпоїнт

// ↙️ тут вводимо шлях (PATH) до сторінки
router.get('/', function (req, res) {
  // res.render генерує нам HTML сторінку

  const list = User.getList()

  // ↙️ cюди вводимо назву файлу з сontainer
  res.render('user-index', {
    // вказуємо назву папки контейнера, в якій знаходяться наші стилі
    style: 'user-index',

    data: {
      users: {
      list,
      isEmpty: list.length === 0,
      }
    },

  })
  // ↑↑ сюди вводимо JSON дані
})

// ================================================================

router.post('/user-create', function (req, res) {
  // res.render генерує нам HTML сторінку
  const {email, login, password} = req.body

  const user = new User(email, login, password);

  User.add(user)



  res.render('user-success-info', {
    style: 'user-success-info',
    info: 'Користувач створенний',
  })
})

// ================================================================

router.get('/user-delete', function (req, res) {
  // res.render генерує нам HTML сторінку
  const { id } = req.query

  User.deleteById(Number(id))

  res.render('user-success-info', {
    style: 'user-success-info',
    info: 'Користувач видаленний',
  })
})

// ================================================================

router.post('/user-update', function (req, res) {
  // res.render генерує нам HTML сторінку
  const {email, password, id} = req.body

  let result = false

  const user = User.getById(Number(id))

  if (user.verifyPassword(password)) {
    User.update(user, {email})
    result = true
  }


  res.render('user-success-info', {
    style: 'user-success-info',
    info: result
      ? 'Email пошта оновлена'
      : 'Сталася помилка',
  })
})


// ================================================================

router.get('/product-create', function (req, res) {
  // res.render генерує нам HTML сторінку
  const list = Product.getList()

  // ↙️ cюди вводимо назву файлу з сontainer
  res.render('product-create', {
    // вказуємо назву папки контейнера, в якій знаходяться наші стилі
    style: 'product-create',
  })
  // ↑↑ сюди вводимо JSON дані
})

// ================================================================

router.post('/product-create', function (req, res) {
  // res.render генерує нам HTML сторінку
  const {name, price, description} = req.body

  // створити товар
  const product = new Product(name, price, description)

  // зберегти товар в списку створених товарів
  Product.add(product)

  console.log(Product.getList())


  // ↙️ cюди вводимо назву файлу з сontainer
 res.render('alert', {
    // вказуємо назву папки контейнера, в якій знаходяться наші стилі
    style: 'alert',
    info: 'Успішне виконання дії',
    info2: 'Товар був успішно доданий',

  })
  // ↑↑ сюди вводимо JSON дані
})

// ================================================================

router.get('/product-list', function (req, res) {
  // res.render генерує нам HTML сторінку
  // const {name, price, description} = req.body

  const list = Product.getList();

 // ↙️ cюди вводимо назву файлу з сontainer
  res.render('product-list', {
    style: 'product-list',

      data: {
      products: {
      list: list,
      isEmpty: list.length === 0,
      },
    },
  })

})

// ================================================================

router.get('/product-edit', function (req, res) {
  // res.render генерує нам HTML сторінку
  const { id } = req.query
  const product = Product.getById(Number(id))
  console.log(`product-edit(get): ${product}`)

  if (product) {
    // ↙️ cюди вводимо назву файлу з сontainer
    return res.render('product-edit', {
      // вказуємо назву папки контейнера, в якій знаходяться наші стилі
      style: 'product-edit',

      data: {
        name: product.name,
        price: product.price,
        id: product.id,
        description: product.description,
      },
    })
  } else {
    return res.render('alert', {
      // вказуємо назву папки контейнера, в якій знаходяться наші стилі
      style: 'alert',
      info: 'Продукту за таким ID не знайдено',
    })
  }
})

// ================================================================

router.post('/product-edit', function (req, res) {
  // res.render генерує нам HTML сторінку
    const {id, name, price, description} = req.body

  const product = Product.updateById(Number(id), {
    name,
    price,
    description,
  })

  console.log(`product-edit(post): ${product}`)


   if (product) {
    // ↙️ cюди вводимо назву файлу з сontainer
    res.render('alert', {
      // вказуємо назву папки контейнера, в якій знаходяться наші стилі
      style: 'product-alert',
      info: 'Інформація про товар оновлена',
    })
  } else {
    // ↙️ cюди вводимо назву файлу з сontainer
    res.render('alert', {
      // вказуємо назву папки контейнера, в якій знаходяться наші стилі
      style: 'alert',
      info: 'Сталася помилка',
    })
  }
  // ↑↑ сюди вводимо JSON дані
})

// ================================================================

router.get('/product-delete', function (req, res) {
  // res.render генерує нам HTML сторінку
  const { id } = req.query

  Product.deleteById(Number(id))

 // ↙️ cюди вводимо назву файлу з сontainer
  res.render('alert', {
    style: 'alert',
    info: 'Товар видалено',
  })
})
// Підключаємо роутер до бек-енду
module.exports = router
