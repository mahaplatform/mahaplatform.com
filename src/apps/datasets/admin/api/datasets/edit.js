import Dataset from '@apps/datasets/models/dataset'

const editRoute = async (req, res) => {

  const dataset = await Dataset.query(qb => {
    qb.where('id', req.params.id)
  }).fetch({
    transacting: req.trx
  })

  if(!dataset) return res.status(404).respond({
    code: 404,
    message: 'Unable to load dataset'
  })

  res.status(200).respond({
    title: dataset.get('title')
  })

}

export default editRoute
