import { task } from 'maha'
import { import_20170622, import_20171107 } from './ccetc'

export default [
  task({
    command: 'ccetc:import:20170622',
    description: 'Importing ccetompkins seeds',
    processor: import_20170622
  }),
  task({
    command: 'ccetc:import:20171107',
    description: 'Fixing role data',
    processor: import_20171107
  })
]
