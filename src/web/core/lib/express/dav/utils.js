import Team from '../../../../apps/maha/models/team'

export const rawParser = (req, res, next) => {
  if(req.method !== 'PUT') return next()
  const chunks = []
  req.on('data', function(chunk) {
    chunks.push(chunk)
  })
  req.on('end', function(chunk) {
    req.rawBody = Buffer.concat(chunks)
    next()
  })
}

export const loadHeaders = (req, res, next) => {
  if(req.headers['if']) {
    const if_token = req.headers['if'].match(/urn:uuid:([^>]*)/)
    if(if_token) req.if_token = if_token[1]
  }
  if(req.headers['lock-token']) {
    const token = req.headers['lock-token'].match(/urn:uuid:([^>]*)/)
    if(token) req.lock_token = token[1]
  }
  next()
}

export const loadTeam = async (req, res, next) => {
  req.team = await Team.query(qb => {
    qb.where('subdomain', req.params.subdomain)
  }).fetch({
    transacting: req.trx
  })
  next()
}
