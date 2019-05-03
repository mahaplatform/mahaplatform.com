import Navigation from '../../../core/objects/navigation'

const navigation = new Navigation(async (req, trx) => ({
  items: [
    { label: 'Attractions', route: '/attractions' },
    { label: 'Categories', route: '/categories' },
    { label: 'Counties', route: '/counties' },
    { label: 'Offerings', route: '/offerings' }
  ]
}))

export default navigation
