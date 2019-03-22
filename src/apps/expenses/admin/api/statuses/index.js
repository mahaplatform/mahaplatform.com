import { Resources } from 'maha'
import Status from '../../../models/status'

const statusResources = new Resources({
  defaultSort: 'id',
  model: Status,
  path: '/statuses',
  only: ['list'],
  ownedByTeam: false
})

export default statusResources
