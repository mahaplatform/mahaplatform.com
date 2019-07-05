const offeringSerializer = (req, result) => ({
  id: result.get('id'),
  training: training(result.related('training')),
  offering: offering(result.related('offering')),
  assigned_by: user(result.related('assigned_by')),
  employee: user(result.related('employee')),
  is_complete: result.get('is_complete'),
  created_at: result.get('created_at'),
  updated_at: result.get('updated_at')
})

const training = (training) => {
  if(!training.get('id')) return null
  return {
    id: training.get('id'),
    title: training.get('title'),
    description: training.get('description'),
    materials: training.related('materials').map(material => {
      return asset(material.related('asset'))
    })
  }
}

const asset = (asset) => ({
  id: asset.get('id'),
  original_file_name: asset.get('original_file_name'),
  file_name: asset.get('file_name'),
  content_type: asset.get('content_type'),
  file_size: asset.get('file_size'),
  status: asset.get('text'),
  has_preview: asset.get('has_preview'),
  path: asset.get('path'),
  signed_url: asset.get('signed_url'),
  source: asset.related('source').get('text'),
  source_url: asset.get('source_url'),
  created_at: asset.get('created_at'),
  updated_at: asset.get('updated_at')
})

const offering = (offering) => {
  if(!offering.get('id')) return null
  return {
    id: offering.get('id'),
    date: offering.get('date'),
    starts_at: offering.get('starts_at'),
    ends_at: offering.get('ends_at'),
    facilitator: offering.get('facilitator'),
    location: offering.get('location')
  }
}

const offering = (offering) => {
  if(!offering.get('id')) return null
  return {
    id: offering.get('id'),
    date: offering.get('date'),
    starts_at: offering.get('starts_at'),
    ends_at: offering.get('ends_at'),
    facilitator: offering.get('facilitator'),
    location: offering.get('location')
  }
}

const user = (user) => {
  if(!user.get('id')) return null
  return {
    id: user.get('id'),
    full_name: user.get('full_name'),
    initials: user.get('initials'),
    photo: user.related('photo').get('path')
  }
}

export default offeringSerializer
