import { getClient } from '../../services/microsoft'

const list = (type) => async (req, profile) => {

  const outlookcontacts = await getClient(req, profile)

}

export default list
