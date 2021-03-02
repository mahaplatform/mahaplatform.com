import onFinished from 'on-finished'
import knex from '@core/vendor/knex'

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
