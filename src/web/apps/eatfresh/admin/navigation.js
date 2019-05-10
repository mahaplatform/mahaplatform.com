const navigation = async (req, trx) => ({
  items: [
    { label: 'Attractions', route: '/attractions' },
    { label: 'Categories', route: '/categories' },
    { label: 'Counties', route: '/counties' },
    { label: 'Offerings', route: '/offerings' }
  ]
})

export default navigation
