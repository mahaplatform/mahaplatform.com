import * as knex from '@core/vendor/knex'
import onFinished from 'on-finished'

const withTransaction = (req, res, next) => {

  knex.analytics.transaction(analytics => {

    req.analytics = analytics

    onFinished(res, function (err, res) {
      if (err || (res.statusCode && res.statusCode >= 400)) {
        analytics.rollback()
      } else {
        analytics.commit()
      }
    })

    next()

  }).catch(err => {})

}

export default withTransaction
