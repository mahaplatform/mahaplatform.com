import { createAsset } from '@apps/maha/services/assets'
import Agreement from '@apps/maha/models/agreement'
import moment from 'moment'
import path from 'path'

const webhookRoute = async (req, res) => {

  if(Object.keys(req.body).length === 0) {
    const clientid = req.headers['x-adobesign-clientid']
    // console.log(clientid)
    // if(clientid !== process.env.ADOBE_SIGN_CLIENT_ID) return res.status(403).respond({
    //   code: 403,
    //   message: 'Invalid clientid'
    // })
    res.header('X-AdobeSign-ClientId', clientid)
    return res.status(200).respond(true)
  }

  const agreement = await Agreement.query(qb => {
    qb.where('adobe_agreement_id', req.body.agreement.id)
  }).fetch({
    withRelated: ['unsigned'],
    transacting: req.trx
  })

  req.team = agreement.related('team')

  if(!agreement) return res.status(404).respond({
    code: 404,
    message: 'Unable to load agreement'
  })

  if(req.body.event === 'AGREEMENT_WORKFLOW_COMPLETED') {

    const unsigned = agreement.related('unsigned')

    const filename = unsigned.get('original_file_name')

    const extension = path.extname(filename)

    const basename = path.basename(filename, extension)

    const signed = await createAsset(req, {
      team_id: unsigned.get('team_id'),
      source: 'adobesign',
      file_name: `${basename}-signed-${moment().format('YYYYMMDDHHMMSS')}.pdf`,
      file_data: new Buffer(req.body.agreement.signedDocumentInfo.document, 'base64'),
      content_type: 'application/pdf'
    }, req.trx)

    await agreement.save({
      signed_id: signed.get('id')
    },{
      transacting: req.trx
    })

  }

  res.status(200).respond(true)

}

export default webhookRoute
