import Ticket from '../../../models/ticket'
import Passbook from 'passbook'
import mkdirp from 'mkdirp'
import path from 'path'
import fs from 'fs'

const root = path.resolve('.','tmp','keys')

mkdirp.sync(root)

fs.writeFileSync(path.join(root,'wwdr.pem'), process.env.PASSBOOK_WWDR_PEM)

fs.writeFileSync(path.join(root,`${process.env.PASSBOOK_TYPE_IDENTIFIER}.pem`), process.env.PASSBOOK_PEM)

const showRoute = async (req, res) => {

  const ticket = await Ticket.query(qb => {
    qb.where('code', req.params.code)
  }).fetch({
    withRelated: ['registration.event.program.logo'],
    transacting: req. trx
  })

  if(!ticket) return res.status(404).respond({
    code: 404,
    message: 'Unable to load ticket'
  })

  const event = ticket.related('registration').related('event')

  const program = event.related('program')

  var template = Passbook('eventTicket', {
    organizationName: program.get('title'),
    passTypeIdentifier: `pass.${process.env.PASSBOOK_TYPE_IDENTIFIER}`,
    teamIdentifier: process.env.PASSBOOK_TEAM_IDENTIFIER,
    backgroundColor: 'rgb(0, 0, 0)',
    labelColor: 'rgb(200, 180, 180)',
    foregroundColor: 'rgb(255, 255, 255)',
    logoText: event.get('title'),
    location : {
      longitude : -122.3748889,
      latitude : 37.6189722
    }
  })

  template.keys(root, '')
  template.icon('https://mahaplatform.com/admin/images/maha.png')
  template.strip('http://cdn.sitemandala.com/assets/110192/bearcamp2017e1.jpg')

  const logo = program.related('logo') ? program.related('logo').get('signed_url') : 'https://mahaplatform.com/admin/images/maha.png'
  template.logo(logo)

  var pass = template.createPass({
    barcode: {
      message: ticket.get('code'),
      format: 'PKBarcodeFormatQR',
      messageEncoding: 'iso-8859-1'
    },
    serialNumber:  ticket.get('code'),
    expirationDate: '2020-05-07T10:30-05:00',
    voided: false,
    description: 'Ticket'
  })

  pass.headerFields.add({
    key: 'code',
    value: `#${ticket.get('code')}`
  })

  pass.secondaryFields.add({
    key: 'loc',
    label: 'Date',
    value: 'May 25, 2020, 10:00AM - 5:00PM'
  })

  pass.auxiliaryFields.add({
    key: 'loc',
    label: 'LOCATION',
    value: 'CCE Tompkins'
  })

  pass.backFields.add({
    numberStyle: 'PKNumberStyleSpellOut',
    label: 'spelled out',
    key: 'numberStyle',
    value: 200
  })

  pass.render(res, (error) => {
    if (error) console.error(error)
  })

}

export default showRoute
