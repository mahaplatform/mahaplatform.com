class Contacts {

  app = null

  _handleGetPermission = this._handleGetPermission.bind(this)
  _handleGetContacts = this._handleGetContacts.bind(this)

  constructor(app) {
    this.app = app
  }

  recieve(action, data) {
    if(action === 'getPermission') this._handleGetPermission()
    if(action === 'getContacts') this._handleGetContacts()
  }

  _handleGetPermission() {
    this.app.store.getItem('contacts', (err, value) => {
      if(value !== true) {
        return this.app.store.setItem('contacts', true, (err, value) => {
          this.app.send('contacts', 'getPermission', 'unknown')
        })
      }
      navigator.contacts.find(['*'], (contacts) => {
        this.app.send('contacts', 'getPermission', 'granted')
      }, (err) => {
        this.app.send('contacts','getPermission', 'denied')
      }, {
        desiredFields: [],
        filter: '',
        hasPhoneNumber: false,
        multiple: true
      })
    })
  }

  _handleGetContacts() {
    navigator.contacts.find(['*'], (contacts) => {
      this.app.send('contacts', 'getContacts', contacts)
    }, (err) => {})
  }

}

export default Contacts
