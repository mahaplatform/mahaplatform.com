const FolderSerializer = (req, trx, result) => ({

  id: result.get('id'),

  item_id: result.get('id'),

  code: result.get('code'),

  label: result.get('label'),

  type: 'Folder',

  folder: folder(result.related('folder')),

  accesses: result.related('accesses').map(access),

  created_at: result.get('created_at'),

  updated_at: result.get('updated_at')

})

const folder = (folder) => {

  if(!folder.get('id')) return null

  return {

    id: folder.get('id'),

    code: folder.get('code'),

    label: folder.get('label'),

    created_at: folder.get('created_at'),

    updated_at: folder.get('updated_at')

  }

}

const access = (access) => ({

  is_everyone: access.get('is_everyone'),

  user: user(access.related('user')),

  group: group(access.related('group')),

  access_type: access.related('access_type').get('text')

})

const group = (group) => {

  if(!group.id) return null

  return {

    id: group.get('id'),

    title: group.get('title')

  }

}

const user = (user) => {

  if(!user.id) return null

  return {

    id: user.get('id'),

    full_name: user.get('full_name'),

    initials: user.get('initials'),

    photo: user.related('photo') ? user.related('photo').get('path') : null

  }

}

export default FolderSerializer
