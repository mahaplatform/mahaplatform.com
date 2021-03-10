import { validate } from '@core/utils/validation'
import { updatePhoto } from '@apps/maha/services/accounts'

const avatarRoute = async (req, res) => {

  await validate({
    token: 'required',
    photo_id: 'required'
  }, req.body)

  await updatePhoto(req, {
    account: req.account,
    photo_id: req.body.photo_id
  })

  await req.account.load(['photo'], {
    transacting: req.trx
  })

  await res.status(200).respond({
    id: req.account.related('photo').get('id'),
    photo: req.account.related('photo').get('path')
  })

}

export default avatarRoute
