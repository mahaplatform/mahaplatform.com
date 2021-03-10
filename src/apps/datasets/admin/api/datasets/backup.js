import { backupDataset } from '@apps/datasets/services/datasets'
import Dataset from '@apps/datasets/models/dataset'
import { sendMail } from '@core/services/email'
import moment from 'moment'

const getExtension = (format) => {
  if(format === 'excel') return 'xlsx'
  return 'zip'
}

const getFilename = (dataset, format) => {
  const datasetname = dataset.get('title').toLowerCase().replace(' ', '_')
  const timestamp = moment().format('YYYYMMDDhhmmss')
  const extension = getExtension(format)
  return `${datasetname}-backup-${timestamp}.${extension}`
}

const getMimeType = (format) => {
  if(format === 'excel') return 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
  return 'application/zip'
}

const getParams = (req) => {
  return req.method === 'POST' ? req.body : req.query
}

const backupRoute = async (req, res) => {

  const dataset = await Dataset.query(qb => {
    qb.where('id', req.params.id)
  }).fetch({
    transacting: req.trx
  })

  if(!dataset) return res.status(404).respond({
    code: 404,
    message: 'Unable to load dataset'
  })

  const params = getParams(req)

  console.log({
    dataset_id: dataset.get('id'),
    type_ids: params.type_ids,
    format: params.format
  })

  const content = await backupDataset(req, {
    dataset_id: dataset.get('id'),
    type_ids: params.type_ids,
    format: params.format
  })

  const filename = getFilename(dataset, params.format)

  if(params.strategy === 'download') {
    const type = getMimeType(params.format)
    res.setHeader('Content-disposition', `attachment; filename=${filename}`)
    return res.type(type).send(content)
  }

  await sendMail({
    from: req.team.get('rfc822'),
    to: params.to,
    subject: params.subject,
    html: params.message,
    attachments: [{
      filename,
      content
    }]
  })

  await res.status(200).respond(true)

}

export default backupRoute
