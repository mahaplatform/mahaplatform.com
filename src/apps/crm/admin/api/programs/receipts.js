import ProgramReceipt from '@apps/crm/models/program_receipt'

const receiptsRoute = async (req, res) => {

  const receipts = await ProgramReceipt.query(qb => {
    qb.where('program_id', req.params.program_id)
  }).fetch({
    transacting: req.trx
  })

  if(!receipts) return res.status(404).respond({
    code: 404,
    message: 'Unable to load receipts'
  })

  await res.status(200).respond(receipts, (req, receipt) => ({
    unread_messages: receipt.get('unread_messages'),
    unheard_voicemails: receipt.get('unheard_voicemails')
  }))

}

export default receiptsRoute
