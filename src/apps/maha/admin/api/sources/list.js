const listRoute = async (req, res) => {

  const sources = await req.trx.raw('select pg_enum.enumlabel as text from pg_type inner join pg_enum on pg_enum.enumtypid = pg_type.oid where pg_type.typname=?', 'maha_asset_sources')

  res.status(200).respond(sources, (req, source) => ({
    text: source.text
  }))

}

export default listRoute
