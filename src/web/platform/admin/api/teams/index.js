import TeamSerializer from '../../../serializers/team_serializer'
import { Resources, Team, updateRelated } from 'maha'
import create from './create'
import apps from './apps'

const refresh = {
  create: (req, trx, result, options) => [
    '/admin/platform/teams',
    { channel: `/admin/teams/${result.get('id')}`, target: '/admin/team/apps' }
  ],
  update: (req, trx, result, options) => [
    '/admin/platform/teams',
    `/admin/platform/teams/${result.get('id')}`,
    { channel: `/admin/teams/${result.get('id')}`, target: '/admin/team/apps' }
  ]
}

const teamResources = new Resources({
  afterProcessor: {
    update: [
      updateRelated('apps', 'maha_teams_apps', 'app_ids', 'team_id', 'app_id')
    ]
  },
  allowedParams: ['title', 'subdomain'],
  collectionActions: [
    create
  ],
  defaultSort: 'title',
  except: ['create','destroy'],
  memberActions: [
    apps
  ],
  model: Team,
  ownedByTeam: false,
  path: '/teams',
  refresh,
  serializer: TeamSerializer,
  sortParams: ['title', 'subdomain', 'logo'],
  withRelated: ['logo','web'],
  virtualParams: ['app_ids']
})

export default teamResources
