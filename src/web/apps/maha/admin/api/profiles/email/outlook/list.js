import { getClient } from '../../services/microsoft'

const list = (type) => async (req, profile) => {

  const outlook = await getClient(req, profile)

}

export default list
