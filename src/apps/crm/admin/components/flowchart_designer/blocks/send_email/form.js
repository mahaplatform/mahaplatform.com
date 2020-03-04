import { Container, ModalPanel, Search } from 'maha-admin'
import PropTypes from 'prop-types'
import React from 'react'
import _ from 'lodash'

class Email extends React.PureComponent {

  static propTypes = {
    config: PropTypes.object,
    emails: PropTypes.array,
    onChange: PropTypes.func,
    onDone: PropTypes.func
  }

  state = {
    email: null
  }

  _handleChange = this._handleChange.bind(this)
  _handleDone = this._handleDone.bind(this)
  _handleUpdate = this._handleUpdate.bind(this)

  constructor(props) {
    super(props)
    const { config } = props
    this.state = {
      email: config ? config.email : null
    }
  }

  render() {
    return (
      <ModalPanel { ...this._getPanel() }>
        <div className="flowchart-designer-form">
          <div className="flowchart-designer-form-body">
            <Search { ...this._getSearch() } />
          </div>
        </div>
      </ModalPanel>
    )
  }

  componentDidUpdate(prevProps, prevState) {
    const { email } = this.state
    if(!_.isEqual(email, prevState.email)) {
      this._handleChange()
    }
  }

  _getPanel() {
    return {
      title: 'Send Email',
      leftItems: [
        { icon: 'chevron-left', handler: this._handleDone }
      ],
      buttons: [
        { label: 'Done', color: 'red', handler: this._handleDone }
      ]
    }
  }

  _getSearch() {
    const { emails } = this.props
    const { email } = this.state
    return {
      options: emails,
      multiple: false,
      text: 'title',
      search: false,
      value: 'id',
      defaultValue: email ? email.id : null,
      onChange: this._handleUpdate
    }
  }

  _handleChange(config) {
    const { email } = this.state
    const value = email ? { email } : {}
    this.props.onChange(value)
  }

  _handleDone() {
    this.props.onDone()
  }

  _handleUpdate(id) {
    const { emails } = this.props
    if(!id) return this.setState({ email: null })
    const email = _.find(emails, { id })
    this.setState({
      email: {
        id: email.id,
        title: email.title
      }
    })
  }

}

const mapResources = (props, context) => ({
  emails: '/api/admin/crm/emails'
})

export default Container(mapResources)(Email)
