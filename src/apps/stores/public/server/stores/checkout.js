import Setting from '../../../../platform/models/setting'
import { encode } from '@core/services/jwt'
import Store from '../../../models/store'
import { readFile } from '../utils'
import moment from 'moment'
import path from 'path'
import ejs from 'ejs'

const checkoutRoute = async (req, res) => {

  const settings = await Setting.query(qb => {
    qb.where('id', 1)
  }).fetch({
    transacting: req.trx
  })

  const store = await Store.query(qb => {
    qb.where('code', req.params.code)
    qb.whereNull('deleted_at')
  }).fetch({
    withRelated: ['program.logo','program.fields','team.logo'],
    transacting: req.trx
  })

  if(!store) return res.status(404).respond({
    code: 404,
    message: 'Unable to load event'
  })

  req.team = store.related('team')

  const template = await readFile(path.join('stores','checkout','index.html'))

  const ipaddress = req.header('x-forwarded-for') || req.connection.remoteAddress

  const program = store.related('program')

  const { ach_enabled, googlepay_enabled, paypal_enabled, applepay_enabled } = settings.get('values')

  const content = ejs.render(template, {
    store: {
      starttime: parseInt(moment().format('YYYYMMDDHHmmss')),
      referer: req.header('referer'),
      ipaddress: ipaddress.replace(/\s/,'').split(',').shift(),
      code: store.get('code'),
      title: store.get('title'),
      program: {
        title: program.get('title'),
        logo: program.related('logo') ? program.related('logo').get('path') : null
      },
      settings: {
        card_enabled: true,
        ach_enabled,
        googlepay_enabled,
        paypal_enabled,
        applepay_enabled,
        door_enabled: false
      },
      contact_config: {
        fields: store.get('contact_config').fields.map(field => {
          if(!field.contactfield) return field
          const programfield = program.related('fields').find(programfield => {
            return programfield.get('code') === field.contactfield.code
          })
          return {
            ...field,
            ...programfield ? {
              config: programfield.get('config')
            } : {}
          }
        })
      }
    },
    program: {
      title: program.get('title'),
      logo: program.related('logo') ? program.related('logo').get('path') : null
    },
    team: {
      title: req.team.get('title'),
      logo: req.team.related('logo') ? req.team.related('logo').get('path') : null
    },
    token: encode({ code: store.get('code') }, 60 * 60 * 2)
  })

  res.status(200).send(content)

}

export default checkoutRoute
