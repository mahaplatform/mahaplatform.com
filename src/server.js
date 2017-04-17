import maha from 'maha'
import expenses from 'maha-expenses'

const apps = [
  expenses
]

const server = maha({
  apps
})

server.listen(process.env.SERVER_PORT, () => {
  console.log('Server listening on port', process.env.SERVER_PORT)
})
