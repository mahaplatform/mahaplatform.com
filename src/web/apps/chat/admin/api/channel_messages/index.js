import { Segment } from '../../../../../core/backframe'
import destroy from './destroy'
import create from './create'
import list from './list'
import show from './show'

const messageSegment = new Segment({
  path: '/channels/:channel_id/messages',
  routes: [
    create,
    destroy,
    list,
    show
  ]
})

export default messageSegment
