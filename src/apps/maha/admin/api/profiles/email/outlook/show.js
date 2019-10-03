import { getClient } from '../../services/microsoft'

const show = async (req, profile) => {

  const client = await getClient(req, profile)

}

export default show
