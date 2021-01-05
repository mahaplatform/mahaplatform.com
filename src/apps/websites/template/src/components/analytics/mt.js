class MahaTracker {

  appId = null
  loaded = false
  queue = []

  _handleCheck = this._handleCheck.bind(this)
  _handleConfigure = this._handleConfigure.bind(this)
  _handleEvent = this._handleEvent.bind(this)
  _handleLoad = this._handleLoad.bind(this)

  initialize(appId) {
    if(this.loaded) return
    this.appId = appId
    this._handleLoad()
    this._handleCheck()
  }

  event(event, data) {
    this._handleEvent({ event, data })
  }

  pageview(pathname) {
    this._handleEvent({ event: 'trackPageView' })
  }

  _handleCheck() {
    if(!window.mt) return setTimeout(this._handleCheck, 250)
    this.loaded = true
    this._handleConfigure()
    this._handleDrainQueue()
  }

  _handleConfigure() {
    window.mt('newTracker', 'mt', 'analytics.mahaplatform.com', {
      appId: this.appId,
      cookieName: 'mt',
      postPath: '/mt/collect',
      contexts: {
        webPage: true,
        geolocation: true,
        clientHints: true
      }
    })
    window.mt('enableActivityTracking', 30, 10)
    window.mt('setUserId', 1456)
  }

  _handleDrainQueue() {
    if(this.queue.length === 0) return
    this.queue.map(this._handleEvent)
  }

  _handleEvent({ event, data }) {
    if(!this.loaded) return this.queue.push({ event, data })
    window.mt(event, data)
  }

  _handleLoad() {
    if(window.mt) return
    window.GlobalSnowplowNamespace = window.GlobalSnowplowNamespace || []
    window.GlobalSnowplowNamespace.push('mt')
    window.mt = function() {
      (window.mt.q = window.mt.q || []).push(arguments)
    }
    window.mt.q = window.mt.q || []
    const n = document.createElement('script')
    const g = document.getElementsByTagName('script')[0]
    n.async = 1
    n.src = 'https://analytics.mahaplatform.com/mt.js'
    g.parentNode.insertBefore(n,g)
  }

}

const mt = new MahaTracker()

export default mt
