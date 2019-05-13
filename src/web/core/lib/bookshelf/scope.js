const scopePlugin = function(bookshelf) {

  let team = null

  let user = null

  const scope = function(options) {
    if(options.team) team = options.team
    if(options.team) user = options.user
    return applyScope.bind(this)()
  }

  const applyScope = function() {
    return this.query(qb => {
      if(team) qb.where('team_id', team.get('id'))
      if(user) qb.where('user_id', user.get('id'))
    })
  }

  bookshelf.Collection.prototype.applyScope = applyScope

  bookshelf.Model.prototype.applyScope = applyScope

  bookshelf.Model.applyScope = applyScope

  bookshelf.Collection.prototype.scope = scope

  bookshelf.Model.prototype.scope = scope

  bookshelf.Model.scope = scope

}

export default scopePlugin
