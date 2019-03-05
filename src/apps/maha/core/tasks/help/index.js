import task from '../../objects/task'
import path from 'path'

const Help = [

  task({
    command: 'help:build',
    description: 'Build help index',
    file: path.resolve(__dirname, 'help'),
    function: 'helpBuild'
  })

]

export default Help
