import EmailActivities from '@apps/maha/models/email_activity'
import Email from '@apps/maha/models/email'

const services = {
  fa: { name: 'facebook', url: 'https://www.facebook.com/sharer/sharer.php?u=' },
  tw: { name: 'twitter', url: 'https://twitter.com/home?status=' },
  li: { name: 'linkedin', url: 'https://www.linkedin.com/shareArticle?mini=true&url=' },
  pi: { name: 'pinterest', url: 'https://pinterest.com/pin/create/button/?url=' }
}

const socialRoute = async (req, res) => {

  const email = await Email.query(qb => {
    qb.where('code', req.params.email_code)
  }).fetch({
    transacting: req.trx
  })

  const service = services[req.params.service]

  await EmailActivities.forge({
    team_id: email.get('team_id'),
    email_id: email.get('id'),
    type: 'share',
    service: service.name
  }).save(null, {
    transacting: req.trx
  })

  res.redirect(301, `${service.url}${process.env.ADMIN_HOST}/w${email.get('code')}`)

}

export default socialRoute
