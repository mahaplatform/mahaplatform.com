import WorkflowRecording from '@apps/automation/models/workflow_recording'
import { readFile } from '../utils'
import path from 'path'
import ejs from 'ejs'

const showRoute = async (req, res) => {

  const template = await readFile(path.join('crm','recording','index.html'))

  const recording = await WorkflowRecording.query(qb => {
    qb.where('code', req.params.code)
  }).fetch({
    withRelated: ['action.enrollment.contact','action.enrollment.call.from','asset','team'],
    transacting: req.trx
  })

  req.team = recording.related('team')

  const enrollment = recording.related('action').related('enrollment')

  const contact = enrollment.related('contact')

  const from = enrollment.related('call').related('from')

  const content = ejs.render(template, {
    recording: {
      display_name: contact.get('display_name'),
      from: from.get('formatted'),
      duration: recording.get('duration'),
      url: recording.related('asset').get('signed_url'),
      created_at: recording.get('created_at')
    }
  })

  res.status(200).send(content)

}

export default showRoute
