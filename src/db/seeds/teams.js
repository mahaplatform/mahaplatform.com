import { fixtures } from 'maha'

const Team = fixtures({
  tableName: 'maha_teams',
  records: [
    {
      id: 1,
      title: 'CCE Tompkins',
      subdomain: 'ccetompkins',
      color: 'red',
      email_template: '<html></body><style>.email-button { text-align:center; }.email-button table{ display:inline; }.email-button td { background-color: #21BA45; padding:10px 20px; }.email-button a { font-weight:bold;color:#FFFFFF; }</style><%= content %></body></html>',
      logo_id: 1
    }
  ]
})

export default Team
