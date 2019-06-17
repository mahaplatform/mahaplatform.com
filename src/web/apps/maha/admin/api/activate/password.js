import { loadUserFromToken } from '../../../../../core/utils/user_tokens'
import Checkit from 'checkit'

const passwordRoute = async (req, res) => {

  await Checkit({
    password: 'required',
    confirmation: ['required', 'matchesField:password'],
    token: 'required'
  }).run(req.body)

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
