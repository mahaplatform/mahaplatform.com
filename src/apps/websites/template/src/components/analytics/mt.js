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
        webPage: true
      }
    })
    window.mt('enableActivityTracking', 30, 10)
    window.mt('setUserId', 1456)
    window.mt('updatePageActivity')
    window.mt('addTrans',
      '1234',           // order ID - required
      'Acme Clothing',  // affiliation or store name
      '11.99',          // total - required
      '1.29',           // tax
      '5',              // shipping
      'San Jose',       // city
      'California',     // state or province
      'USA',            // country
      'USD'             // currency
    )
    window.mt('addItem',
      '1234',           // order ID - required
      'DD44',           // SKU/code - required
      'T-Shirt',        // product name
      'Green Medium',   // category or variation
      '11.99',          // unit price - required
      '1',              // quantity - required
      'USD'             // currency
    )
    window.mt('trackTrans')
    window.mt('trackSocialInteraction', 'like', 'facebook', 'pbz00123')
    const rnd = Math.random().toString(36).substring(2)
    window.mt('trackAdImpression:'+rnd,
      '67965967893',            // impressionId
      'cpm',                    // costModel - 'cpa', 'cpc', or 'cpm'
      5.5,                      // cost
      'http://www.example.com', // targetUrl
      '23',                     // bannerId
      '7',                      // zoneId
      '201',                    // advertiserId
      '12'                      // campaignId
    )
    window.mt('trackAdClick:' + rnd,
      'http://www.example.com',  // targetUrl
      '12243253',                // clickId
      'cpm',                     // costModel
      2.5,                       // cost
      '23',                      // bannerId
      '7',                       // zoneId
      '67965967893',             // impressionId - the same as in trackAdImpression
      '201',                     // advertiserId
      '12'                       // campaignId
    )
    window.mt('trackAdConversion',
      '743560297', // conversionId
      'cpa',       // costModel
      10,          // cost
      'ecommerce', // category
      'purchase',  // action
      '',          // property
      99,          // initialValue - how much the conversion is initially worth
      '201',       // advertiserId
      '12'         // campaignId
    )
    window.mt('trackSelfDescribingEvent', {
      schema: 'iglu:com.acme_company/viewed_product/jsonschema/2-0-0',
      data: {
        productId: 'ASO01043',
        category: 'Dresses',
        brand: 'ACME',
        returning: true,
        price: 49.95,
        sizes: ['xs', 's', 'l', 'xl', 'xxl'],
        availableSince: new Date(2013,3,7)
      }
    })
    window.mt('trackStructEvent', 'Mixes', 'Play', 'MrC/fabric-0503-mix', 'foobar', '0.0')
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
