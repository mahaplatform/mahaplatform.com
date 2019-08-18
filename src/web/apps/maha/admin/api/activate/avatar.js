import { validate } from '../../../../../core/utils/validation'

const avatarRoute = async (req, res) => {

  await validate({
    token: 'required',
    photo_id: 'required'
  }, req.body)

  await req.user.save({
    photo_id:
    req.body.photo_id
  }, {
    patch: true,
    transacting: req.trx
  })

  await req.user.load(['photo'], {
    transacting: req.trx
  })

  res.status(200).respond({
    id: req.user.related('photo').get('id'),
    photo: req.user.related('photo').get('path')
  })

}

export default avatarRoute
