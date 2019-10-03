import AppraisalsSerializer from '../../../../serializers/appraisal_serializer'
import { generatePDF } from '../../../../../../web/core/services/puppeteer'
import Appraisal from '../../../../models/appraisal'
import moment from 'moment'
import path from 'path'
import _ from 'lodash'
import ejs from 'ejs'
import fs from 'fs'

const templatePath  = path.join(__dirname, 'report.html.ejs')

const downloadRoute = async (req, res) => {

  const appraisal = await Appraisal.scope({
    team: req.team
  }).query(qb => {
    qb.where('id', req.params.id)
  }).fetch({
    withRelated: ['supervisor','employee','responsibilities.responsibility_type'],
    transacting: req.trx
  })

  if(!appraisal) return res.status(404).respond({
    code: 404,
    message: 'Unable to load appraisal'
  })

  const template  = fs.readFileSync(templatePath, 'utf8')

  const html = ejs.render(template, {
    moment, _,
    appraisal: AppraisalsSerializer(req, appraisal)
  })

  const output = await generatePDF({ html })

  const employee = appraisal.related('employee').get('full_name').replace(' ','-').toLowerCase()

  const timestamp = moment(appraisal.get('created_at')).format('MMDDYYYY')

  const filename = `${employee}-appraisal-${timestamp}.pdf`

  res.setHeader('Content-disposition', `attachment; filename=${filename}`)

  res.status(200).type('application/pdf').send(output)

}

export default downloadRoute
