import AppSerializer from '../../../serializers/app_serializer'
import { Resources, App } from 'maha'

const appResources = new Resources({
  defaultSort: ['code'],
  model: App,
  only: ['list','show'],
  ownedByTeam: false,
  path: '/apps',
  rights: ['team:manage_apps'],
  serializer: AppSerializer,
  sortParams: ['code']
})

export default appResources
