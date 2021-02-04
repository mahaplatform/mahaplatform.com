import User from '@apps/maha/models/user'

const getUser = async(req, { user_id }) => {
  const user = await User.query(qb => {
    qb.where('id', user_id)
  }).fetch({
    transacting: req.trx
  })
  return [
    { client: user.get('client') },
    { number: user.get('cell_phone') }
  ]
}

const dial = async (req, { steps, step }) => {
  const recipients = await Promise.reduce(step.config.recipients, async(recipients, recipient) => {
    const { strategy, user_id, number } = recipient
    return [
      ...recipients,
      ...strategy === 'user' ? await getUser(req, { user_id }) : [],
      ...strategy === 'number' ? [{ number }] : []
    ]
  }, [])
  return { verb: 'dial', recipients }
}

export default dial
