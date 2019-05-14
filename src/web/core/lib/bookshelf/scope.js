const scopePlugin = function(bookshelf) {

  const scope = function(options) {
    const tableName = this.tableName
    return this.query(qb => {
      if(options.team) qb.where(`${tableName}.team_id`, options.team.get('id'))
      if(options.user) qb.where(`${tableName}.user_id`, options.user.get('id'))
    })
  }

  bookshelf.Collection.prototype.scope = scope

  bookshelf.Model.prototype.scope = scope

  bookshelf.Model.scope = scope

}

export default scopePlugin
