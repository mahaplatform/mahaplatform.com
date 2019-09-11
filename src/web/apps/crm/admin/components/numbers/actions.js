export const lookup = (areacode, latitude, longitude) => ({
  type: 'API_REQUEST',
  method: 'GET',
  endpoint: '/api/admin/crm/numbers/lookup',
  query: {
    areacode,
    latitude,
    longitude
  },
  request: 'LOOKUP_REQUEST',
  success: 'LOOKUP_SUCCESS',
  failure: 'LOOKUP_FAILURE'
})
