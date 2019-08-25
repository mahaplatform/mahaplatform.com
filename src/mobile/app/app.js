// import Authentication from './authentication'
// import Notifications from './notifications'
// import Geolocation from './geolocation'
import Contacts from './contacts'
// import Insomnia from './insomnia'
// import Browser from './browser'
// import Camera from './camera'

class App {

  services = {}
  iframe = null

  _handleReady = this._handleReady.bind(this)
  _handleRecieve = this._handleRecieve.bind(this)
  _handleSend = this._handleSend.bind(this)

  constructor() {
    document.addEventListener('deviceready', this._handleReady, false)
    document.addEventListener('message', this._handleRecieve, false)
    this.store = window.localforage.createInstance({
      name: 'local',
      storeName: 'starter'
    })
    const app = {
      store: this.store,
      send: this._handleSend
    }
    // this.services.authentication = new Authentication(app)
    // this.services.browser = new Browser(app)
    // this.services.camera = new Camera(app)
    this.services.contacts = new Contacts(app)
    // this.services.geolocation = new Geolocation(app)
    // this.services.insomnia = new Insomnia(app)
    // this.services.notifications = new Notifications(app)
  }

  _handleReady() {
    screen.orientation.lock('portrait')
    this.iframe = document.createElement('iframe')
    this.iframe.setAttribute('src', 'http://localhost:3000')
    this.iframe.setAttribute('border', 0)
    const body = document.getElementById('cordova')
    body.appendChild(this.iframe)
  }

  _handleRecieve(e) {
    const { service, action, data } = e.data
    this.services[service].recieve(action, data, this._handleSend.bind(this, service))
  }

  _handleSend(service, action, data) {
    this.iframe.contentWindow.postMessage({ service, action, data }, '*')
  }

}

export default App
