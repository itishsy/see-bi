var jsonfile = require('jsonfile')
var file = '../../static/mock/login.json'
jsonfile.readFile(file, function (err, obj) {
  if (err) {
    console.error(err)
  } else {
    console.dir(obj)
  }
})
