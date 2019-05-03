import { Segment } from '../../../core/backframe'
import apps from './api/apps'
import assets from './api/assets'
import teams_apps from './api/teams_apps'
import teams from './api/teams'
import users from './api/users'

const api = new Segment({
  routes: [
    apps,
    assets,
    teams_apps,
    teams,
    users
  ]
})

export default api
