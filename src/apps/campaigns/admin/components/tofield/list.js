import { Infinite, ModalPanel, Search } from '@admin'
import PropTypes from 'prop-types'
import pluralize from 'pluralize'
import Results from './results'
import React from 'react'

class List extends React.PureComponent {

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
    list_id: null
  }

  _handleBack = this._handleBack.bind(this)
  _handleChoose = this._handleChoose.bind(this)
  _handleDone = this._handleDone.bind(this)

  render() {
    return (
      <ModalPanel { ...this._getPanel() }>
        <div className="tofield-picker">
          <div className="tofield-picker-filter">
            <Search { ...this._getLists() } />
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
    const { list_id } = defaultValue
    this.setState({ list_id })
  }

  _getInfinite() {
    const { endpoint } = this.props
    const { list_id } = this.state
    return {
      empty: {
        icon: 'filter',
        title: 'Choose a list',
        text: 'Choose a list to find contacts that match'
      },
      endpoint,
      query: {
        list_id
      },
      footer: ({ all, total }) => `Matching ${total} of ${pluralize('contact', all, true)}`,
      layout: Results
    }
  }


  _getLists() {
    const { defaultValue, program_id } = this.props
    return {
      defaultValue: defaultValue ? defaultValue.list_id : null,
      endpoint: `/api/admin/crm/programs/${program_id}/lists`,
      prompt: 'Find a list',
      value: 'id',
      text: 'title',
      onChange: this._handleChoose
    }
  }

  _getPanel() {
    const { instructions } = this.props
    const { list_id } = this.state
    return {
      title: 'Choose a List',
      instructions,
      leftItems: [
        { icon: 'chevron-left', handler: this._handleBack }
      ],
      rightItems: list_id ? [
        { label: 'Done', handler: this._handleDone }
      ] : null
    }
  }

  _handleBack() {
    this.context.form.pop()
  }

  _handleChoose(list_id) {
    this.setState({ list_id })
  }

  _handleDone() {
    const { list_id } = this.state
    this.props.onDone({ list_id })
    this.context.form.pop()
  }

}

export default List
