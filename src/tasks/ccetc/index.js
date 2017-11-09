import { task } from 'maha'
import * as ccetc from './ccetc'

export default [
  task({
    command: 'ccetc:import:20170622',
    description: 'Importing ccetompkins seeds',
    processor: ccetc.import_20170622
  }),
  task({
    command: 'ccetc:import:20171107',
    description: 'Fixing role data',
    processor: ccetc.import_20171107
  }),
  task({
    command: 'ccetc:import:20171109',
    description: 'Importing project members',
    processor: ccetc.import_20171109
  })
]
