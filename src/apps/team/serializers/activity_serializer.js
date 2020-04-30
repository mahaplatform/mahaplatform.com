const activitySerializer = (req, result) => {

  const user = userData(req.user)

  const subject = userData(result.related('user'))

  const object = objectData(result)

  const subject_text = subjectText(subject, user)

  const article_text = articleText(subject, object, user)

  const object_text = objectText(subject, object, user)

  const story = result.related('story').get('text')

  const description = `${subject_text} ${story ? story.replace('{object}', `${article_text}${object_text}`) : ''}`

  return {
    id: result.get('id'),
    url: result.get('url'),
    app: app(result.related('app')),
    user,
    subject,
    object,
    subject_text,
    article_text,
    story,
    object_text,
    description,
    created_at: result.get('created_at'),
    updated_at: result.get('updated_at')
  }

}

const app = (app) => ({
  id: app.get('id'),
  ...app.get('data')
})

const userData = (result) => ({
  id: result.get('id'),
  first_name: result.get('first_name'),
  last_name: result.get('last_name'),
  full_name: result.get('full_name'),
  initials: result.get('initials'),
  rfc822: result.get('rfc822'),
  photo: result.related('photo').get('path')
})

const objectData = (result) => {
//  if(!result.get('object_text')) return null
  return {
    id: result.get('object_id'),
    owner_id: result.get('object_owner_id'),
    owner_full_name: result.related('object_owner').get('full_name'),
    type: result.get('object_type'),
    text: result.get('object_text')
  }
}

const subjectText = (subject, user) => {
  return (subject.id === user.id) ? 'You' : subject.full_name
}

const articleText = (subject, object, user) => {
  if(!object) return ''
  const type = object.type ? ` ${object.type}` : ''
  if(!object.text) {
    return `a${type} `
  } else if(object.owner_id === null) {
    return `the${type} `
  } else if(object.owner_id === user.id) {
    return `your${type} `
  } else if(object.owner_id !== user.id && subject.id !== object.owner_id ) {
    return `${object.owner_full_name}'s${type} `
  } else {
    return `the${type} `
  }
}

const objectText = (subject, object, user) => {
  if(!object) return ''
  if(object.type === 'user' && object.id === user.id) {
    return 'yourself'
  } else if(object.type === 'user' && object.id === subject.id) {
    return 'themself'
  } else if(!object.text) {
    return ''
  }
  return object.text
}

export default activitySerializer
