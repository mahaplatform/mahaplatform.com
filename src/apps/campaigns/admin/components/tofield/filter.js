import { Infinite, ModalPanel, Search } from 'maha-admin'
import PropTypes from 'prop-types'
import pluralize from 'pluralize'
import Results from './results'
import React from 'react'

class Filter extends React.PureComponent {

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
    onDone: PropTypes.func
  }

  state = {
    filter_id: null
  }

  _handleBack = this._handleBack.bind(this)
  _handleChoose = this._handleChoose.bind(this)
  _handleDone = this._handleDone.bind(this)

  render() {
    return (
      <ModalPanel { ...this._getPanel() }>
        <div className="tofield-picker">
          <div className="tofield-picker-filter">
            <Search { ...this._getFilters() } />
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
    const { filter_id } = defaultValue
    this.setState({ filter_id })
  }

  _getFilters() {
    const { defaultValue } = this.props
    return {
      defaultValue: defaultValue ? defaultValue.filter_id : null,
      endpoint: '/api/admin/admin-crm-contacts/filters',
      prompt: 'Find a filter',
      value: 'id',
      text: 'title',
      onChange: this._handleChoose
    }
  }

  _getInfinite() {
    const { endpoint } = this.props
    const { filter_id } = this.state
    return {
      empty: {
        icon: 'filter',
        title: 'Choose a saved filter',
        text: 'Choose a saved filter to find contacts that match'
      },
      endpoint,
      query: {
        filter_id
      },
      footer: ({ all, total }) => `Matching ${total} of ${pluralize('contact', all, true)}`,
      layout: Results
    }
  }

  _getPanel() {
    const { instructions } = this.props
    const { filter_id } = this.state
    return {
      title: 'Choose a Filter',
      instructions,
      leftItems: [
        { icon: 'chevron-left', handler: this._handleBack }
      ],
      rightItems: filter_id ? [
        { label: 'Done', handler: this._handleDone }
      ] : null
    }
  }

  _handleBack() {
    this.context.form.pop()
  }

  _handleChoose(filter_id) {
    this.setState({ filter_id })
  }

  _handleDone() {
    const { filter_id } = this.state
    this.props.onDone({ filter_id })
    this.context.form.pop()
  }

}

export default Filter
