import Item from '../../../models/item'

const shareRoute = async (req, res) => {

  const item = await Item.where({
    code: req.params.code
  }).fetch({
    withRelated: ['asset'],
    transacting: req.trx
  })

  if(!item) return res.status(404).send('Not Found')

  res.status(200).render('share', {
    asset: item.related('asset').toJSON()
  })

}

export default shareRoute
