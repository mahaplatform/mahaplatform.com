const ActivitySerializer = (req, result) => ({
  id: result.get('id'),
  type: result.get('type'),
  user: user(result.related('user')),
  story: result.related('story').get('text'),
  data: data(result),
  created_at: result.get('created_at'),
  updated_at: result.get('updated_at')
})

const user = (user) => {
  if(!user.id) return null
  return {
    id: user.get('id'),
    full_name: user.get('full_name'),
    initials: user.get('initials'),
    photo: user.related('photo').get('path')
  }
}

const data = (activity) => {
  if(activity.get('type') === 'call') return call(activity.related('call'))
  if(activity.get('type') === 'note') return note(activity.related('note'))
  return activity.get('data')
}

const call = (call) => {
  if(!call.id) return null
  return {
    id: call.get('id'),
    date: call.get('date'),
    time: call.get('time'),
    description: call.get('description')
  }
}

const note = (note) => {
  if(!note.id) return null
  return {
    id: note.get('id'),
    text: note.get('text')
  }
}

export default ActivitySerializer
