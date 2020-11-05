import Item from '@apps/drive/models/item'

const shareRoute = async (req, res) => {

  const item = await Item.where({
    code: req.params.code
  }).fetch({
    withRelated: ['asset','team'],
    transacting: req.trx
  })

  if(!item) return res.status(404).send('Not Found')

  req.team = item.related('team')

  res.status(200).render('share', {
    asset: item.related('asset').toJSON()
  })

}

export default shareRoute
