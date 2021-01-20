const itemSerializer = (req, result) => ({
  id: result.get('id'),
  variant: variant(result.related('variant')),
  created_at: result.get('created_at'),
  updated_at: result.get('updated_at')
})

const variant = (variant) => {
  if(!variant.id) return null
  return {
    id: variant.get('id'),
    code: variant.get('code'),
    options: variant.get('options'),
    photos: variant.related('photos').map(photo),
    product: product(variant.related('product'))
  }
}

const product = (product) => {
  if(!product.id) return null
  return {
    id: product.get('id'),
    title: product.get('title')
  }
}

const photo = (photo) => {
  if(!photo.id) return null
  return {
    id: photo.get('id'),
    asset: asset(photo.related('asset'))
  }
}

const asset = (asset) => {
  if(!asset.id) return null
  return {
    id: asset.get('id'),
    path: asset.get('path'),
    signed_url: asset.get('signed_url')
  }
}

export default itemSerializer
