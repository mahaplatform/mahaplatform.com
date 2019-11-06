const deliveriesRoute = async (req, res) => {

  const data = [
    { id: 1, contact: { id: 1, display_name: 'Greg Kops', photo: '/assets/48/gmk8.jpg' } },
    { id: 2, contact: { id: 2, display_name: 'Greg Kops', photo: '/assets/48/gmk8.jpg' } },
    { id: 3, contact: { id: 3, display_name: 'Greg Kops', photo: '/assets/48/gmk8.jpg' } },
    { id: 4, contact: { id: 4, display_name: 'Greg Kops', photo: '/assets/48/gmk8.jpg' } }
  ]

  data.pagination = {
    all: 4,
    total: 4
  }

  res.status(200).respond(data)

}

export default deliveriesRoute
