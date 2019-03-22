import collectObjects from './collect_objects'

const loadNavigation = async (req, trx) => {

  const navigations = collectObjects('admin/navigation.js')

  return await Promise.reduce(navigations, async (navigations, navigation) => ({
    ...navigations,
    [navigation.config.code]: await navigation.default(req, trx)
  }), {})

}

export default loadNavigation
