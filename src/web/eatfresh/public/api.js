import { Segment } from 'maha'
import attractions from './api/attractions'
import categories from './api/categories'
import categoryAttractions from './api/category_attractions'
import counties from './api/counties'
import offerings from './api/offerings'

const api = new Segment({
  routes: [
    attractions,
    categories,
    categoryAttractions,
    counties,
    offerings
  ]
})

export default api
