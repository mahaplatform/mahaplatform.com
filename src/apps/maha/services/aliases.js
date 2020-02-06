import Alias from '../models/alias'

export const updateAlias = async (req, { src, destination }) => {

  const alias = await Alias.query(qb => {
    qb.where('destination', destination)
  }).fetch({
    transacting: req.trx
  })

  if(alias && (!src || src.length === 0)) {
    return await alias.destroy(null, {
      transacting: req.trx
    })
  }

  if(alias && src === alias.get('src')) {
    return alias
  }

  if(alias) {
    return await alias.save({
      src
    }, {
      transacting: req.trx
    })
  }

  if(src && src.length > 0) {
    return await Alias.forge({
      team_id: req.team.get('id'),
      src,
      destination
    }).save(null, {
      transacting: req.trx
    })
  }

}
