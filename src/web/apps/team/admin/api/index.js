import { Segment } from '../../../../core/backframe'
import access from './access'
import activities from './activities'
import app_settings from './app_settings'
import apps from './apps'
import device_values from './device_values'
import emails from './emails'
import groups from './groups'
import groupUsers from './group_users'
import imports from './imports'
import roles from './roles'
import roleUsers from './role_users'
import sessions from './sessions'
import settings from './settings'
import supervisors from './supervisors'
import supervisorUsers from './supervisor_users'
import users from './users'

const api = new Segment({
  routes: [
    access,
    activities,
    app_settings,
    apps,
    device_values,
    emails,
    groups,
    groupUsers,
    imports,
    roles,
    roleUsers,
    sessions,
    settings,
    supervisors,
    supervisorUsers,
    users
  ]
})

export default api
