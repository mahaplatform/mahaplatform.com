class Registry {

  models = {}

  lookup(tableName) {
    return this.models[tableName]
  }

  register(tableName, model) {
    this.models[tableName] = model
  }

}

const registry = new Registry()

export default registry
