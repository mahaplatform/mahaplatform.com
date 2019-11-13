import Form from '../../../models/form'

const showRoute = async (req, res) => {

  const form = await Form.query(qb => {
    qb.where('code', req.params.code)
  }).fetch({
    transacting: req.trx
  })

  res.status(200).render('show', {
    form: {
      code: form.get('code'),
      config: form.get('config')
    }
  })

}

export default showRoute
