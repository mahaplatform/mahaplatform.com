const scopePlugin = function(bookshelf) {

  const scope = function(scopeQuery = () => {}) {
    this.scopeQuery = scopeQuery
    this.__super__.scopeQuery = scopeQuery
    return this.query(scopeQuery)
  }

  bookshelf.Collection.prototype.scope = scope

  bookshelf.Model.prototype.scope = scope

  bookshelf.Model.scope = scope

}

export default scopePlugin
