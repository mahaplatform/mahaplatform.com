import { v2 as webdav } from 'webdav-server'
import User from '../../../../maha/models/user'

class MahaUserManager {

  constructor() {
    this.users = [
      new webdav.SimpleUser('DefaultUser', null, false, true)
    ]
  }

  async getUserByNamePassword(name, password, callback) {
    console.log('user_manager', 'getUserByNamePassword')
    const user = await User.query(qb => {

    })
    callback(null, new webdav.SimpleUser('DefaultUser', null, false, true))
  }

  getDefaultUser(callback) {
    console.log('user_manager', 'getDefaultUser')
    callback(new webdav.SimpleUser('DefaultUser', null, false, true))
  }

  getUsers(callback) {
    console.log('user_manager', 'getUsers')
    callback(null, this.users)
  }

}

export default MahaUserManager
