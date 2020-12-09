import onFinished from 'on-finished'
import knex from '../../vendor/knex'

const withTransaction = (req, res, next) => {

  knex.transaction(trx => {

    req.trx = trx

    onFinished(res, function (err, res) {
      if (err || (res.statusCode && res.statusCode >= 400)) {
        trx.rollback()
      } else {
        trx.commit()
      }
    })

    next()

  }).catch(err => {})

}

export default withTransaction
