import { createSelector } from 'reselect'

const unmerged = (state, props) => props.routes

const collapseRoutes = (routes, prefix = '') => {
  return routes.children.reduce((routes, route) => {
    const path = (route.path !== '/') ? route.path : ''
    if(route.children) {
      return {
        ...routes,
        ...collapseRoutes(route, `${prefix}${path}`)
      }
    }
    return {
      ...routes,
      [`${prefix}${path}`]: route.component
    }
  }, {})
}

export const routes = createSelector(
  unmerged,
  (unmerged) => collapseRoutes({
    path: '',
    children: unmerged
  })
)
