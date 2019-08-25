var iframe, body, iframe = null

var store = localforage.createInstance({
  name: 'local',
  storeName: 'electron'
})

var app = {

  initialize: function() {
    document.addEventListener('deviceready', this.onDeviceReady.bind(this), false)
  },

  onDeviceReady: function() {

    var platform = window.cordova.platformId

    document.addEventListener('pause', pause, false)
    document.addEventListener('resume', resume, false)

    iframe = document.createElement('iframe')
    iframe.setAttribute('src', 'http://192.168.0.2:3000/admin')
    iframe.setAttribute('border', 0)

    body = document.getElementById('cordova')
    body.appendChild(iframe)

    function sendMessage(action, data) {
      iframe.contentWindow.postMessage({
        action,
        data
      }, '*')
    }

    function pause() {
      sendMessage('pause')
    }

    function resume() {
      sendMessage('resume')
    }

    function loadPermission() {
      store.getItem('permission', function (err, value) {
        if(value) return loadPermissionSuccess(value)
        if(platform === 'android') return loadPermissionSuccess('unknown')
        window.FirebasePlugin.hasPermission(function(data) {
          const permission = data.isEnabled ? 'granted' : (value === null ? 'unknown' : 'denied')
          return loadPermissionSuccess(permission)
        })
      })
    }

    function loadPermissionSuccess(permission) {
      sendMessage('loadPermission', { permission })
    }

    function requestPermission() {
      if(platform === 'android') return requestPermissionSuccess('granted')
      window.FirebasePlugin.hasPermission(function(data) {
        if(data.isEnabled) return requestPermissionSuccess('granted')
        window.FirebasePlugin.grantPermission(function(data) {
          requestPermissionSuccess('granted')
        }, function(err) {
          requestPermissionSuccess('denied')
        })
      })
    }

    function requestPermissionSuccess(permission) {
      store.setItem('permission', permission, function (err, value) {
        sendMessage('requestPermission', { permission })
      })
    }

    function getToken() {
      window.FirebasePlugin.getToken(function(token) {
        sendMessage('getToken', { token })
      }, function(err) {
        console.log('unable to get token')
      })
    }

    function getVersion() {
      cordova.getAppVersion.getVersionNumber(function(version){
        sendMessage('setVersion', { version })
      })
    }

    function updateBadge(count) {
      window.FirebasePlugin.setBadgeNumber(count)
    }

    window.FirebasePlugin.onTokenRefresh(function(token) {
      sendMessage('getToken', { token })
    }, function(error) {
      console.log(error)
    })

    function pushRoute(pathname) {
      var doc = iframe.contentWindow.document
      const sessions = doc.getElementsByClassName('maha-session')
      if(sessions.length === 0) return setTimeout(() => {
        pushRoute(pathname)
      }, 1000)
      sendMessage('pushRoute', {
        route: {
          pathname
        }
      })
    }

    window.FirebasePlugin.onNotificationOpen(function(notification) {
      if(!notification.tap) return
      return pushRoute(notification.route)
    }, function(error) {
      console.error(error)
    })

    window.addEventListener('message', function (e) {
      var message = e.data
      if(message.action === 'loadPermission') return loadPermission()
      if(message.action === 'requestPermission') return requestPermission()
      if(message.action === 'getToken') return getToken()
      if(message.action === 'getVersion') return getVersion()
      if(message.action === 'updateBadge') return updateBadge(message.data.count)
    }, false)

    window.handleOpenURL = function(target) {
      const url = new URL(target)
      setTimeout(() => sendMessage('pushRoute', {
        route: {
          pathname: url.pathname,
          search: url.search ? url.search.slice(1) : null,
          hash: url.hash ? url.hash.slice(1) : null
        }
      }), 1000)
    }

  }

}

app.initialize()
