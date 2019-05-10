import App from '../../../../apps/maha/models/app'

const route = (code) => async(req, res, next) => {

  req.app = await App.where({ code }).fetch({
    transacting: req.trx
  })

  next()

}

export default route
