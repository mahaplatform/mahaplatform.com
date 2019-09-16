import { getClient } from '../../services/microsoft'

const show = async (req, profile) => {

  const outlook = await getClient(req, profile)

}

export default show
