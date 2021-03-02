import knex from '@core/vendor/knex/analytics'
import onFinished from 'on-finished'

const withTransaction = (req, res, next) => {

  knex.transaction(analytics => {

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
