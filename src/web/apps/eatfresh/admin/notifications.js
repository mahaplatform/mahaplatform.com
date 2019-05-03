import Notifications from '../../../core/objects/notifications'

const notifications = new Notifications([
  {
    code: 'attraction_approved',
    title: 'Attraction Approved',
    description: 'a manager approves an attraction'
  }, {
    code: 'attraction_rejected',
    title: 'Attraction Rejected',
    description: 'a manager rejects an attraction'
  }, {
    code: 'attraction_suggested',
    title: 'Attraction Suggested',
    description: 'a visitor suggests an attraction'
  }
])

export default notifications
