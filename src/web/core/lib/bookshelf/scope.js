const scopePlugin = function(bookshelf) {

  const scope = function(options) {
    return this.query(qb => {
      if(options.team) qb.where('team_id', options.team.get('id'))
      if(options.user) qb.where('user_id', options.user.get('id'))
    })
  }

  bookshelf.Collection.prototype.scope = scope

  bookshelf.Model.prototype.scope = scope

}

export default scopePlugin
