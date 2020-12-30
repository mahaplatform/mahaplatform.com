import _ from 'lodash'

const showRoute = async (req, res) => {

  res.status(200).respond({
    id: 1,
    code: _.random(0, 99),
    title: 'Staff'
  })

}

export default showRoute
