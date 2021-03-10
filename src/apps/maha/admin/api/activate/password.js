import { validate } from '@core/utils/validation'

const passwordRoute = async (req, res) => {

  await validate({
    password: 'required',
    confirmation: ['required', 'matchesField:password'],
    token: 'required'
  }, req.body)

  await req.account.save({
    password: req.body.password
  }, {
    patch: true,
    transacting: req.trx
  })

  await res.status(200).respond(true)

}

export default passwordRoute
