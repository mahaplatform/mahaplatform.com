import Checkit from 'checkit'

const avatarRoute = async (req, res) => {

  await Checkit({
    token: 'required',
    photo_id: 'required'
  }).run(req.body)

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
