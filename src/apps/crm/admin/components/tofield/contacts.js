import { Infinite, ModalPanel, Search } from 'maha-admin'
import RecipientToken from '../../tokens/recipient'
import PropTypes from 'prop-types'
import pluralize from 'pluralize'
import Results from './results'
import React from 'react'

class Picker extends React.PureComponent {

  static contextTypes = {
    form: PropTypes.object
  }

  static propTypes = {
    channel: PropTypes.string,
    defaultValue: PropTypes.object,
    endpoint: PropTypes.string,
    instructions: PropTypes.string,
    program_id: PropTypes.number,
    purpose: PropTypes.string,
    strategy: PropTypes.string,
    onDone: PropTypes.func
  }

  state = {
    contact_ids: null
  }

  _handleBack = this._handleBack.bind(this)
  _handleChoose = this._handleChoose.bind(this)
  _handleDone = this._handleDone.bind(this)

  render() {
    return (
      <ModalPanel { ...this._getPanel() }>
        <div className="tofield-picker">
          <div className="tofield-picker-filter">
            <Search { ...this._getContacts() } />
          </div>
          <div className="tofield-picker-main">
            <Infinite { ...this._getInfinite() } />
          </div>
        </div>
      </ModalPanel>
    )
  }

  _getContacts() {
    const { endpoint } = this.props
    return {
      endpoint,
      prompt: 'Find a contact',
      format: (recipient) => <RecipientToken recipient={ recipient } />,
      onChange: this._handleChange
    }
  }

  _getInfinite() {
    const { endpoint } = this.props
    return {
      empty: {
        icon: 'filter',
        title: 'Add Criteria',
        text: 'Add criteria to find records that match'
      },
      endpoint,
      filter: this._getFilter(),
      footer: ({ all, total }) => `Matching ${total} of ${pluralize('contact', all, true)}`,
      layout: Results
    }
  }

  _getPanel() {
    const { instructions } = this.props
    return {
      title: 'Choose Contacts',
      instructions,
      leftItems: [
        { icon: 'chevron-left', handler: this._handleBack }
      ]
    }
  }

  _handleBack() {
    this.context.form.pop()
  }

  _handleChange(contact_ids) {
    this.setState({ contact_ids })
  }

  _handleDone() {
    this.props.onDone()
    this.context.form.pop()
  }

}

export default Picker
