import task from '../../objects/task'
import path from 'path'

const Bootstrap = [

  task({
    command: 'bootstrap',
    description: 'Bootstrap maha configuration',
    file: path.resolve(__dirname, 'bootstrap'),
    function: 'bootstrap'
  })

]

export default Bootstrap
