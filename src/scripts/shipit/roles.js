import sshPool from 'ssh-pool'
import _ from 'lodash'

const roles = (shipit) => {

  shipit.servers = shipit.config.servers.reduce((servers, server) => ({
    ...servers,
    all: [
      ...servers.all || [],
      `${server.user}@${server.host}:${server.port}`
    ],
    ..._.castArray(server.roles).reduce((roles, role) => ({
      ...roles,
      [role]: [
        ...servers[role] || [],
        `${server.user}@${server.host}:${server.port}`
      ]
    }), {})
  }), {})

  shipit.getPool = function(roles) {

    const servers = _.uniq(_.castArray(roles).reduce((servers, role) => [
      ...servers,
      ...this.servers[role] || []
    ], []))

    return new sshPool.ConnectionPool(servers, {
      ...this.options,
      ..._.pick(this.config, 'key', 'strict', 'asUser')
    })

  }

  shipit.remote = function(command, userOptions, cb) {

    if(userOptions && userOptions.cwd) {
      command = `cd ${userOptions.cwd.replace(/"/g, '\\"')} && ${command}`
      delete userOptions.cwd
    }

    const options = {
      roles: 'all',
      ...userOptions || {}
    }

    return this.getPool(options.roles).run(command, options, cb)

  }

  shipit.copyToRemote = function(src, dest, userOptions) {

    const options = {
      ignores: _.get(this, 'config.ignores') || [],
      rsync: _.get(this, 'config.rsync') || [],
      roles: 'all',
      ...userOptions || {}
    }

    return this.getPool(options.roles).copyToRemote(src, dest, options)

  }

  shipit.copyFromRemote = async function(src, dest, options) {
    const defaultOptions = {
      ignores: this.config && this.config.ignores ? this.config.ignores : [],
      rsync: this.config && this.config.rsync ? this.config.rsync : [],
      roles: 'all'
    }
    const copyOptions = { ...defaultOptions, ...options }
    return this.getPool(options.roles).copyFromRemote(src, dest, copyOptions)
  }

}

export default roles
