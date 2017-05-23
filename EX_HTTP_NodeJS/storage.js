let fs = require('fs')

let dataFile = 'storage.dat'

let data = {}

let validateKeyAsString = (key) => {
  if (typeof key !== 'string') {
    throw Error('Key must be a string')
  }
}

let validateKeyExists = (key) => {
  if (!data.hasOwnProperty(key)) {
    throw Error('Key could not be found')
  }
}

let validateDoesNotExists = (key) => {
  if (data.hasOwnProperty(key)) {
    throw Error('Key already exists')
  }
}

let put = (key, value) => {
  validateKeyAsString(key)
  validateDoesNotExists(key)

  data[key] = value
}

let get = (key) => {
  validateKeyAsString(key)
  validateKeyExists(key)

  return data[key]
}

let remove = (key) => {
  validateKeyAsString(key)
  validateKeyExists(key)

  delete data[key]
}

let clear = () => {
  data = {}
}

let save = () => {
  return new Promise((resolve, reject) => {
    let dataJson = JSON.stringify(data)

    fs.writeFile(dataFile, dataJson, (err) => {
      if (err) {
        reject(err)
        return
      }

      resolve('Data saved')
    })
  })
}

let load = () => {
  return new Promise((resolve, reject) => {
    fs.readFile(dataFile, 'UTF-8', (err, dataJson) => {
      if (err) {
        reject(err)
        return
      }

      data = JSON.parse(dataJson)
      resolve(data)
    })
  })
}

module.exports = {
  put: put,
  get: get,
  delete: remove,
  clear: clear,
  save: save,
  load: load
}
