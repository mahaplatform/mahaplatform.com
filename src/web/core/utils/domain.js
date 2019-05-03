import Team from '../../apps/maha/models/team'
import Domain from '../../apps/maha/models/domain'

export const withDomain = (middleware) => async (req, res, next) => {

  const [,hostname] = req.headers.host.match(/^([\w.]*):?(\d*)?$/)

  const matches = hostname.match(new RegExp(`^(.*).${process.env.DOMAIN}$`))

  if(matches) {

    const team = await Team.where({ subdomain: matches[1] }).fetch()

    if(!team) return res.status(404).send('invalid domain')

    req.team = team

  } else {

    const domain = await Domain.where({ name: hostname }).fetch()

    if(!domain) return res.status(404).send('invalid domain')

    req.domain = domain

  }

  middleware(req, res, next)

}
