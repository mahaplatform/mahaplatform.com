const fetchOrCreatePlugin = function(bookshelf) {

  const fetchOrCreate = async function(data, options) {

    const result = await this.where(data).fetch(options)

    if(result) return result

    return await this.forge(data).save(null, options)

  }

  bookshelf.Model.prototype.fetchOrCreate = fetchOrCreate

  bookshelf.Collection.prototype.fetchOrCreate = fetchOrCreate

  bookshelf.Model.fetchOrCreate = fetchOrCreate

}

export default fetchOrCreatePlugin
