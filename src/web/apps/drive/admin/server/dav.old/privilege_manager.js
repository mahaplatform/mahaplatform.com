import { v2 as webdav } from 'webdav-server'

class MahaPrivilegeManager extends webdav.PrivilegeManager {

  constructor() {
    super()
  }

  setRights(user, path, rights) {
    console.log('privilege_manager', 'setRights')
  }

  getRights(user, path) {
    console.log('privilege_manager', 'getRights')
  }

  _can(fullPath, user, resource, privilege, callback) {
    console.log('privilege_manager', '_can')
    return true
  }

}

module.exports = MahaPrivilegeManager
