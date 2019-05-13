import getUserAccess from '../../../utils/get_user_access'

const accessRoute = async (req, res, next) => {

  const access = await getUserAccess(req.user, req.trx)

  req.apps = access.apps

  req.rights = access.rights

  next()

}

export default accessRoute
