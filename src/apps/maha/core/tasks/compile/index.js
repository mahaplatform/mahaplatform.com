import task from '../../objects/task'
import path from 'path'

const Compile = [

  task({
    command:  'compile',
    description: 'Compiling source',
    file: path.resolve(__dirname, 'compile'),
    function: 'compile'
  })

]

export default Compile
