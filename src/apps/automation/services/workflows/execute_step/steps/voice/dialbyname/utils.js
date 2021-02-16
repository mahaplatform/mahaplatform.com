const dialpad = ['abc','def','ghi','jkl','mno','pqrs','tuv','wxyz']
import User from '@apps/maha/models/user'

const getUserByNumber = (last_name) => {
  return last_name.toLowerCase().substr(0, 3).split('').map(letter => {
    return dialpad.findIndex(cluster => {
      return cluster.search(letter) >= 0
    }) + 2
  }).join('')
}

export const getMatchingUsers = (digits, users) => {
  return users.filter(user => {
    return getUserByNumber(user.get('last_name')) === digits
  })
}

export const getUsers = async (req, recipients) => {
  return await Promise.mapSeries(recipients, async (recipient) => {
    return await User.query(qb => {
      qb.where('id', recipient.user_id)
    }).fetch({
      transacting: req.trx
    })
  }).then(results => {
    return results.map((user, index) => {
      user.set('index', index)
      return user
    })
  })
}
