import { loadUserFromToken } from '../../../../../web/core/utils/user_tokens'
import { validate } from '../../../../../web/core/utils/validation'

const passwordRoute = async (req, res) => {

  await validate({
    password: 'required',
    confirmation: ['required', 'matchesField:password'],
    token: 'required'
  }, req.body)

  const { user } = await loadUserFromToken('activation_id', req.body.token, req.trx)

  await user.save({
    password: req.body.password
  }, {
    patch: true,
    transacting: req.trx
  })

  res.status(200).respond({
    photo_id: user.get('photo_id')
  })

}

export default passwordRoute
