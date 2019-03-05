import { Resources, Segment } from '../../../server'
import Asset from '../../../models/asset'
import AssetSerializer from '../../../serializers/asset_serializer'
import download from './download'
import preview from './preview'
import test from './test'
import upload from './upload'
import processAsset from './process'
import imp from './import'
import url from './url'

const assetResources = new Resources({
  model: Asset,
  only: ['list','show'],
  path: '/assets',
  serializer: AssetSerializer,
  withRelated: ['source','user.photo']
})

const assetsSegment = new Segment({
  routes: [
    imp,
    url,
    preview,
    test,
    download,
    upload,
    processAsset, 
    assetResources
  ]
})

export default assetsSegment
