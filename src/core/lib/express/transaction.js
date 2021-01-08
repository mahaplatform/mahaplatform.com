import onFinished from 'on-finished'
import * as knex from '../../vendor/knex'

const withTransaction = (req, res, next) => {

  knex.maha.transaction(maha => {
    knex.analytics.transaction(analytics => {

      req.analytics = analytics
      req.maha = maha
      req.trx = maha

      onFinished(res, function (err, res) {
        if (err || (res.statusCode && res.statusCode >= 400)) {
          analytics.rollback()
          maha.rollback()
        } else {
          analytics.commit()
          maha.commit()
        }
      })

      next()

    }).catch(err => {})
  }).catch(err => {})

}

export default withTransaction
