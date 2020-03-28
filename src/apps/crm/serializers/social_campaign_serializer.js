const SocialCampaignSerializer = (req, result) => ({
  id: result.get('id'),
  title: result.get('title'),
  program: program(result.related('program')),
  profile: profile(result.related('profile')),
  code: result.get('code'),
  status: result.get('status'),
  config: result.get('config'),
  deleted_at: result.get('deleted_at'),
  created_at: result.get('created_at'),
  updated_at: result.get('updated_at')
})

const program = (program) => {
  if(!program.id) return
  return {
    id: program.get('id'),
    title: program.get('title')
  }
}

const profile = (profile) => {
  if(!profile.id) return
  return {
    id: profile.get('id')
  }
}

export default SocialCampaignSerializer
