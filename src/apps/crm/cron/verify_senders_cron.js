import socket from '../../../core/services/routes/emitter'
import cron from '../../../core/objects/cron'
import ses from '../../../core/services/ses'
import Sender from '../models/sender'

export const processor = async (req) => {

  const unverified = await Sender.query(qb => {
    qb.where('is_verified', false)
  }).fetchAll({
    transacting: req.trx
  }).then(results => results.toArray())

  if(unverified.length === 0) return

  const attributes = await ses.getIdentityVerificationAttributes({
    Identities: unverified.map(sender => sender.get('email'))
  }).promise().then(result => result.VerificationAttributes)

  await Promise.mapSeries(unverified, async(sender) => {
    const { VerificationStatus } = attributes[sender.get('email')]
    if(VerificationStatus !== 'Success') return
    await sender.save({
      is_verified: true
    }, {
      patch: true,
      transacting: req.trx
    })
  })

}

export const afterCommit = async (req, result) => {
  await socket.refresh(req, [
    '/admin/crm/senders'
  ])
}

const verifySendersCron = cron({
  name: 'verify_senders',
  schedule: '0 * * * * *',
  processor,
  afterCommit
})

export default verifySendersCron
