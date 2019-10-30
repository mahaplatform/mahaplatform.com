const listRoute = async (req, res) => {

  const program = {
    id: 1,
    title: 'Primitive Pursuits',
    logo: '/assets/9331/primitivepursuits.jpg'
  }

  const data = [
    { id: 1, config: { label: 'Custom Field 1', name: 'values.abcdef', type: 'textfield' }, program },
    { id: 2, config: { label: 'Custom Field 2', name: 'values.abcdef', type: 'textfield' }, program },
    { id: 3, config: { label: 'Custom Field 3', name: 'values.abcdef', type: 'textfield' }, program }
  ]

  res.status(200).respond(data)

}

export default listRoute
