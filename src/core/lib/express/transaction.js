import knex from '@core/vendor/knex/maha'
import onFinished from 'on-finished'

const withTransaction = (req, res, next) => {

  knex.transaction(maha => {

    req.trx = maha

    onFinished(res, function (err, res) {
      if (err || (res.statusCode && res.statusCode >= 400)) {
        maha.rollback()
      } else {
        maha.commit()
      }
    })

    next()

  }).catch(err => {})

}

export default withTransaction
