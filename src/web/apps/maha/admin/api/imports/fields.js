const fieldsRoute = async (req, res) => {

  const table_constraints = await req.trx.raw(`
    SELECT ccu.table_name, kcu.column_name
    FROM information_schema.table_constraints tc
    INNER JOIN information_schema.key_column_usage kcu ON tc.constraint_name = kcu.constraint_name AND tc.table_schema = kcu.table_schema
    INNER JOIN information_schema.constraint_column_usage AS ccu ON ccu.constraint_name = tc.constraint_name AND ccu.table_schema = tc.table_schema
    WHERE constraint_type = ? AND tc.table_name = ?
  `, ['FOREIGN KEY', req.params.tablename])

  const constraints = table_constraints.rows.reduce((table_constraints, table_constraint) => ({
    ...table_constraints,
    [table_constraint.column_name]: {
      table: table_constraint.table_name,
      column: table_constraint.column_name
    }
  }), {})

  const fields = await req.trx.raw(`
    SELECT *
    FROM information_schema.columns
    WHERE table_name=?
  `, req.params.tablename)

  res.status(200).respond(fields.rows.map(field => ({
    name: field.column_name,
    data_type: field.data_type,
    is_nullable: field.is_nullable === 'YES',
    column_default: field.column_default,
    related: constraints[field.column_name] || null
  })))

}

export default fieldsRoute
