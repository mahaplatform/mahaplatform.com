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
  }),
  task({
    command: 'ccetc:import:20171115',
    description: 'Importing project members',
    processor: ccetc.import_20171115
  }),
  task({
    command: 'ccetc:add_asset_previews',
    description: 'Add Asset Previews',
    processor: ccetc.add_asset_previews
  })
]
