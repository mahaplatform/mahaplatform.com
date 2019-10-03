import { validate } from '../../../../../core/utils/validation'
import { transferItems } from '../../../services/items'

const transferRoute = async (req, res) => {

  await validate({
    from_user_id: ['required'],
    to_user_id: ['required'],
    strategy: ['required']
  }, req.body)

  await transferItems(req, {
    from_user_id: req.body.from_user_id,
    to_user_id: req.body.to_user_id,
    strategy: req.body.strategy
  })

  res.status(200).respond(true)

}

export default transferRoute
