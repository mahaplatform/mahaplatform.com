const maha = require('maha').default
const expenses = require('maha-expenses').default

const apps = [
  expenses
]

exports.default = () => {

   maha({ apps }).listen(process.env.SERVER_PORT, () => {
    console.log('Server listening on port', process.env.SERVER_PORT)
  })

}
