const appleRoute = (req, res) => {

  res.status(200).json({
    applinks: {
      apps: [],
      details: [{
        appID: '43QQ9UNV9T.com.mahaplatform.app',
        paths: [ '/admin/*' ]
      }]
    }
  })

}

export default appleRoute
