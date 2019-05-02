import task from '../../objects/task'
import path from 'path'

const Db = [

  task({
    command: 'db:migrate:up',
    description: 'Running up migrations',
    file: path.resolve(__dirname, 'db'),
    function: 'migrateUp'
  }),

  task({
    command: 'db:migrate:down',
    description: 'Running down migrations',
    file: path.resolve(__dirname, 'db'),
    function: 'migrateDown'
  }),

  task({
    command: 'db:migrate:reset',
    description: 'Resetting database',
    file: path.resolve(__dirname, 'db'),
    function: 'reset'
  }),

  task({
    command: 'db:fixtures:load',
    description: 'Loading test fixtures',
    file: path.resolve(__dirname, 'db'),
    function: 'loadFixtures'
  }),

  task({
    command: 'db:seeds:load',
    description: 'Loading seeds',
    file: path.resolve(__dirname, 'db'),
    function: 'loadSeeds'
  })

]

export default Db
