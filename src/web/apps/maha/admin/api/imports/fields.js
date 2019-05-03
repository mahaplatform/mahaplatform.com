import { Route } from '../../../../../core/backframe'

const processor = async (req, trx, options) => {

  const constraints = await _getConstraints(req.params.tablename, options)

  const fields = await options.knex.raw(`select * from information_schema.columns where table_name='${req.params.tablename}'`)

  return fields.rows.map(field => ({
    name: field.column_name,
    data_type: field.data_type,
    is_nullable: field.is_nullable === 'YES',
    column_default: field.column_default,
    related: constraints[field.column_name] || null
  }))

}

const _getConstraints = async (table_name, options) => {

  const table_constraints = await options.knex.raw('SELECT ccu.table_name, kcu.column_name FROM information_schema.table_constraints tc JOIN information_schema.key_column_usage kcu ON tc.constraint_name = kcu.constraint_name AND tc.table_schema = kcu.table_schema JOIN information_schema.constraint_column_usage AS ccu ON ccu.constraint_name = tc.constraint_name AND ccu.table_schema = tc.table_schema where constraint_type = ? AND tc.table_name = ?', ['FOREIGN KEY', table_name])

  return table_constraints.rows.reduce((table_constraints, table_constraint) => ({
    ...table_constraints,
    [table_constraint.column_name]: {
      table: table_constraint.table_name,
      column: table_constraint.column_name
    }
  }), {})

}

const fieldsRoute = new Route({
  method: 'get',
  path: '/fields/:tablename',
  processor
})

export default fieldsRoute
