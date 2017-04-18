import maha from 'maha'
import expenses from 'maha-expenses'

const apps = [
  expenses
]

export default () => {

   maha({ apps }).listen(process.env.SERVER_PORT, () => {
    console.log('Server listening on port', process.env.SERVER_PORT)
  })

}
