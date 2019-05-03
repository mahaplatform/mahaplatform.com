import { Route } from '../../../../../core/backframe'

const processor = async (req, trx, options) => {

  const related_tables = await options.knex.raw('SELECT ccu.table_name, c.column_name, c.data_type FROM information_schema.table_constraints tc INNER JOIN information_schema.constraint_column_usage ccu ON ccu.constraint_name=tc.constraint_name INNER JOIN information_schema.columns as c ON ccu.table_name=c.table_name AND tc.table_schema=\'public\' WHERE tc.constraint_type=? AND tc.table_name=?', ['FOREIGN KEY', req.params.tablename])

  return related_tables.rows.map(table => ({
    table: table.table_name,
    field: table.column_name
  }))

}

const tablesRoute = new Route({
  method: 'get',
  path: '/tables/:tablename',
  processor
})

export default tablesRoute
