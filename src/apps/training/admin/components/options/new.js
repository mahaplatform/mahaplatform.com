import { ModalPanel, ToggleList } from '@admin'
import PropTypes from 'prop-types'
import React from 'react'

class New extends React.PureComponent {

  static contextTypes = {
    form: PropTypes.object
  }

  static propTypes = {
    trainings: PropTypes.array,
    onSubmit: PropTypes.func
  }

  static defaultProps = {}

  state = {
    ids: []
  }

  _handleChange = this._handleChange.bind(this)
  _handleDone = this._handleDone.bind(this)

  render() {
    return (
      <ModalPanel { ...this._getPanel() }>
        <ToggleList { ...this._getToggleList() } />
      </ModalPanel>
    )
  }

  _getPanel() {
    return {
      title: 'Training Option',
      rightItems: [
        { label: 'Done', handler: this._handleDone }
      ]
    }
  }

  _getToggleList() {
    const { trainings } = this.props
    return {
      options: trainings,
      label: 'Training',
      value: 'id',
      text: 'title',
      multiple: true,
      onChange: this._handleChange
    }
  }

  _handleChange(ids) {
    this.setState({ ids })
  }

  _handleDone() {
    const { ids } = this.state
    this.props.onSubmit(ids)
    this.context.form.pop()
  }

}

export default New
