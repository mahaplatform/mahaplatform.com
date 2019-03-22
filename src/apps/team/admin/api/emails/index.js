import { Resources, Email } from 'maha'
import EmailSerializer from '../../../serializers/email_serializer'
import resend from './resend'

const emailResources = new Resources({
  defaultSort: '-created_at',
  filterParams: ['user_id','sent_at'],
  memberActions: [
    resend    
  ],
  model: Email,
  only: ['list','show'],
  path: '/emails',
  rights: ['team:manage_team'],
  serializer: EmailSerializer,
  sortParams: ['id','to','subject','status','sent_at','created_at'],
  withRelated: [
    {
      activities: qb => qb.orderBy('created_at','asc')
    },
    'activities.link','user.photo'
  ]
})

export default emailResources
