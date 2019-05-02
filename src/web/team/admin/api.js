import { Segment } from 'maha'
import access from './api/access'
import activities from './api/activities'
import app_settings from './api/app_settings'
import apps from './api/apps'
import device_values from './api/device_values'
import emails from './api/emails'
import groups from './api/groups'
import groupUsers from './api/group_users'
import imports from './api/imports'
import roles from './api/roles'
import roleUsers from './api/role_users'
import sessions from './api/sessions'
import settings from './api/settings'
import supervisors from './api/supervisors'
import supervisorUsers from './api/supervisor_users'
import users from './api/users'

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
