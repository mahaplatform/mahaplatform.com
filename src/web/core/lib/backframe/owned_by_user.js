import { Plugin } from '../../backframe'

const defaultQuery = (req, trx, qb, options) => {

  if(options.ownedByUser !== true) return

  const tableName = options.model.extend().__super__.tableName

  const foreignKey = options.ownedByUserForeignKey || 'user_id'

  qb.whereRaw(`${tableName}.${foreignKey} = ?`, req.user.get('id'))

}

const defaultParams = (req, trx, options) => {

  if(options.ownedByUser !== true) return {}

  const foreignKey = options.ownedByUserForeignKey || 'user_id'

  return {
    [foreignKey]: req.user.get('id')
  }

}

const ownedByUserPlugin = new Plugin({
  name: 'ownedByUser',
  defaultParams,
  defaultQuery
})

export default ownedByUserPlugin
