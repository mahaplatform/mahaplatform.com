import { backupDataset } from '@apps/datasets/services/datasets'
import Dataset from '@apps/datasets/models/dataset'
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

const backupRoute = async (req, res) => {

  const dataset = await Dataset.query(qb => {
    qb.where('id', req.params.id)
  }).fetch({
    transacting: req.trx
  })

  const data = await backupDataset(req, {
    dataset_id: dataset.get('id'),
    format: req.query.format
  })

  const filename = getFilename(dataset, req.query.format)

  const type = getMimeType(req.query.format)

  res.setHeader('Content-disposition', `attachment; filename=${filename}`)

  res.type(type).send(data)

}

export default backupRoute
