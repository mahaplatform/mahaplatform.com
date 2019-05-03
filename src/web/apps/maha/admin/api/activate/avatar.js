import { Route, BackframeError } from '../../../../../core/backframe'

const processor = async (req, trx, options) => {

  try {

    const data = { photo_id: req.body.photo_id }

    await req.user.save(data, { patch: true, transacting: trx })

    await req.user.load(['photo'], { transacting: trx })

  } catch(err) {

    throw new BackframeError({
      code: 422,
      message: 'Unable to save avatar'
    })

  }

  return {
    id: req.user.related('photo').get('id'),
    photo: req.user.related('photo').get('path')
  }

}

const rules = {
  token: 'required',
  photo_id: 'required'
}

const passwordRoute = new Route({
  path: '/avatar',
  method: 'post',
  authenticated: false,
  processor,
  rules
})

export default passwordRoute
