import { sendMail } from '../../../../../../web/core/services/email'
import Template from '../../../../models/template'
import moment from 'moment'
import path from 'path'
import _ from 'lodash'
import ejs from 'ejs'
import fs from 'fs'

const previewRoute = async (req, res) => {

  const template = await Template.scope({
    team: req.team
  }).query(qb => {
    qb.where('program_id', req.params.program_id)
    qb.where('id', req.params.id)
  }).fetch({
    transacting: req.trx
  })

  if(!template) return res.status(404).respond({
    code: 404,
    message: 'Unable to load template'
  })

  const email = fs.readFileSync(path.resolve(__dirname, 'email.ejs'), 'utf8')

  const html = ejs.render(email, {
    config: req.body.config,
    ...req.body.config,
    moment,
    _
  })

  await sendMail({
    from: 'Maha <mailer@mahaplatform.com>',
    to: req.body.to,
    subject: 'preview of template',
    html
  })

  res.status(200).respond(true)

}

export default previewRoute
