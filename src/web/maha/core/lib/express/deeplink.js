import { Router } from 'express'

const deeplinkMiddleware = new Router({ mergeParams: true })

deeplinkMiddleware.get('/apple-app-site-association', (req, res) => {

  res.status(200).json({
    applinks: {
      apps: [],
      details: [{
        appID: '43QQ9UNV9T.com.mahaplatform.app',
        paths: [ '/admin/*' ]
      }]
    }
  })

})

deeplinkMiddleware.get('/assetlinks.json', (req, res) => {

  res.status(200).json({
    relation: ['delegate_permission/common.handle_all_urls'],
    target: {
      namespace: 'android',
      package_name: 'com.example',
      sha256_cert_fingerprints: [
        '14:6D:E9:83:C5:73:06:50:D8:EE:B9:95:2F:34:FC:64:16:A0:83:42:E6:1D:BE:A8:8A:04:96:B2:3F:CF:44:E5'
      ]
    }
  })

})


export default deeplinkMiddleware
