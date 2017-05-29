let storage = require('./storage')

storage.put('One', 1)
storage.put('Two', 2)
storage.put('Three', 3)
storage.delete('Two')

console.log(storage.get('One'))

storage
  .save()
  .then((message) => {
    console.log(message)

    storage
      .load()
      .then((data) => {
        console.log(data)
      })
  })
