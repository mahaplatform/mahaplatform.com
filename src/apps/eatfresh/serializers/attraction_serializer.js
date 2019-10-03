const attractionSerializer = (req, result) => ({
  id: result.get('id'),
  slug: result.get('slug'),
  contact_name: result.get('contact_name'),
  contact_email: result.get('contact_email'),
  contact_phone: result.get('contact_phone'),
  title: result.get('title'),
  description: result.get('description'),
  photo: result.related('photo').get('path'),
  county: result.related('county').get('name'),
  address_1: result.get('address_1'),
  address_2: result.get('address_2'),
  city: result.get('city'),
  state: result.get('state'),
  zip: result.get('zip'),
  phone: result.get('phone'),
  hours_of_operation: result.get('hours_of_operation'),
  is_free_range: result.get('is_free_range'),
  is_vegetarian: result.get('is_vegetarian'),
  is_organic: result.get('is_organic'),
  is_accessible: result.get('is_accessible'),
  is_family_friendly: result.get('is_family_friendly'),
  is_senior: result.get('is_senior'),
  is_military: result.get('is_military'),
  is_family_owned: result.get('is_family_owned'),
  facebook: result.get('facebook'),
  twitter: result.get('twitter'),
  website: result.get('website'),
  is_approved: result.get('is_approved'),
  categories: result.related('categories').map(category),
  offerings: result.related('offerings').map(offering),
  photos: result.related('photos').map(photo),
  created_at: result.get('created_at'),
  updated_at: result.get('updated_at')
})

const offering = (offering) => ({
  photo: offering.related('photo').get('path'),
  title: offering.get('title')
})

const category = (category) => ({
  photo: category.related('photo').get('path'),
  title: category.get('title')
})

const photo = (photo) => ({
  path: photo.related('asset').get('path')
})

export default attractionSerializer
