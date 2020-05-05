import { Infinite, ModalPanel, Search } from 'maha-admin'
import ContactToken from '../../tokens/contact'
import PropTypes from 'prop-types'
import pluralize from 'pluralize'
import Results from './results'
import React from 'react'
import _ from 'lodash'

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
  _handleRemove = this._handleRemove.bind(this)
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

  componentDidMount() {
    const { defaultValue } = this.props
    if(!defaultValue) return
    const { contact_ids } = defaultValue
    this.setState({ contact_ids })
  }

  _getContacts() {
    const { contact_ids } = this.state
    const { endpoint } = this.props
    return {
      endpoint,
      excludeIds: contact_ids,
      prompt: 'Find a contact',
      value: 'id',
      format: (recipient) => <ContactToken { ...recipient.contact } />,
      onChange: this._handleChoose
    }
  }

  _getInfinite() {
    const { contact_ids } = this.state
    const { endpoint } = this.props
    return {
      empty: {
        icon: 'filter',
        title: 'Add Criteria',
        text: 'Add criteria to find records that match'
      },
      endpoint,
      query: {
        contact_ids
      },
      footer: ({ all, total }) => `Matching ${total} of ${pluralize('contact', all, true)}`,
      layout: Results,
      props: {
        onRemove: this._handleRemove
      }
    }
  }

  _getPanel() {
    const { instructions } = this.props
    const { contact_ids } = this.state
    return {
      title: 'Choose Contacts',
      instructions,
      leftItems: [
        { icon: 'chevron-left', handler: this._handleBack }
      ],
      rightItems: contact_ids ? [
        { label: 'Done', handler: this._handleDone }
      ] : null
    }
  }

  _handleBack() {
    this.context.form.pop()
  }

  _handleChoose(contact_id) {
    this.setState({
      contact_ids: [
        ...this.state.contact_ids || [],
        contact_id
      ]
    })
  }

  _handleDone() {
    const { contact_ids } = this.state
    this.props.onDone({ contact_ids })
    this.context.form.pop()
  }

  _handleRemove(id) {
    this.setState({
      contact_ids: _.without(this.state.contact_ids, id)
    })
  }

}

export default Picker
