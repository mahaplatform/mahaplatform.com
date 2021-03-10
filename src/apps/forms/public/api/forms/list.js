import Form from '@apps/forms/models/form'

const listRoute = async (req, res) => {

  const forms = await Form.fetchAll({
    transacting: req.trx
  })

  res.status(200).respond(forms, (req, form) => ({
    code: form.get('code'),
    title: form.get('title')
  }))

}

export default listRoute
