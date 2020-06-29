import App from '../../../../apps/maha/models/app'

const route = (code) => async(req, res, next) => {

  req.app = await App.query(qb => {
    qb.select(req.trx.raw('maha_apps.*,maha_installations.settings'))
    qb.innerJoin('maha_installations','maha_installations.app_id','maha_apps.id')
    qb.where('code', code)
  }).fetch({
    transacting: req.trx
  })

  next()

}

export default route
