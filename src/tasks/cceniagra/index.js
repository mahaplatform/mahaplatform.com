import { task } from 'maha'
import * as cceniagra from './cceniagra'

export default [
  task({
    command: 'cceniagra:setup',
    description: 'Importing eatfresh data',
    processor: cceniagra.setup
  })
]
