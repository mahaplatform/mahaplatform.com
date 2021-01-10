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

  addItem(orderId, sku, name, category, price, quantity, currency) {
    this._handleEvent('addItem', orderId, sku, name, category, price, quantity, currency)
  }

  addTrans(orderId, storeName, total, tax, shipping, city, state, country, currency) {
    this._handleEvent('addTrans', orderId, storeName, total, tax, shipping, city, state, country, currency)
  }

  enableLinkClickTracking() {
    this._handleEvent('enableLinkClickTracking')
  }

  setUser(userid) {
    this._handleEvent('setUserId', userid)
  }

  trackAdImpression(impressionId, costModel, cost, targetUrl, bannerId, zoneId, advertiserId, campaignId) {
    this._handleEvent('trackAdImpression', impressionId, costModel, cost, targetUrl, bannerId, zoneId, advertiserId, campaignId)
  }

  trackAdClick(targetUrl, clickId, costModel, cost, bannerId, zoneId, advertiserId, campaignId) {
    this._handleEvent('trackAdClick', targetUrl, clickId, costModel, cost, bannerId, zoneId, advertiserId, campaignId)
  }

  trackAdConversion(conversionId, costModel, cost, category, action, property, initialValue, advertiserId, campaignId) {
    this._handleEvent('trackAdConversion', conversionId, costModel, cost, category, action, property, initialValue, advertiserId, campaignId)
  }

  trackStructEvent(category, action, label, property, value) {
    this._handleEvent('trackStructEvent', category, action, label, property, value)
  }

  trackPageView() {
    this._handleEvent('trackPageView')
  }

  trackSocialInteraction(action, network, target) {
    this._handleEvent('trackSocialInteraction', action, network, target)
  }

  trackTrans() {
    this._handleEvent('trackTrans')
  }

  updatePageActivity() {
    this._handleEvent('updatePageActivity')
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
        webPage: true
      }
    })
    window.mt('enableActivityTracking', 30, 10)
    this.setUser(1234)
    this.trackStructEvent('category', 'action', 'label', 'property', 12.2)
    this.trackSocialInteraction('action', 'network', 12.2)
    this.addItem('12345', 'sku', 'name', 'category', 10.00, 1, 'USD')
    this.addItem('12345', 'sku2', 'name2', 'category2', 15.00, 1, 'USD')
    this.addTrans('12345', 'store', 25.00, 0.00, 0.00, 'Ithaca', 'NY', 'USA', 'USD')
    this.trackTrans()
  }

  _handleDrainQueue() {
    if(this.queue.length === 0) return
    this.queue.map(event => {
      this._handleEvent(...event)
    })
  }

  _handleEvent() {
    const args = Array.prototype.slice.call(arguments)
    const event = args[0]
    const data = args.slice(1)
    if(!this.loaded) return this.queue.push([ event, ...data ])
    if(data.length > 0) return window.mt(event, ...data)
    window.mt(event)
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
