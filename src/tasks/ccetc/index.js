import { task } from 'maha'
import { import_20170622 } from './ccetc'

export default task({
  command: 'ccetc:import:20170622',
  description: 'Migrate database',
  processor: import_20170622
})
