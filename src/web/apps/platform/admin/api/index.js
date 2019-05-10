import { Segment } from '../../../../core/backframe'
import apps from './apps'
import assets from './assets'
import teams_apps from './teams_apps'
import teams from './teams'
import users from './users'

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
