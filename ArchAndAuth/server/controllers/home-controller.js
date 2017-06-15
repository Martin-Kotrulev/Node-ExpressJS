module.exports = {
  index: (req, res) => {
    res.render('home/index', {names: ['joe', 'poe', 'alex', 'johny']})
  },
  about: (req, res) => {
    res.render('home/about')
  }
}
