import SecurityQuestion from '../../../models/security_question'
import { Resources } from '../../../../../core/backframe'

const reviewResources = new Resources({
  ownedByTeam: false,
  model: SecurityQuestion,
  path: '/security_questions',
  serializer: (req, trx, result) => ({
    id: result.get('id'),
    text: result.get('text')
  })
})

export default reviewResources
