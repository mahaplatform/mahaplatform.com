import { ModalPanel } from '@admin'
import ProgramToken from '../../tokens/program'
import PropTypes from 'prop-types'
import List from '../list'
import React from 'react'

class Programs extends React.PureComponent {

  static propTypes = {
    programs: PropTypes.array,
    onCancel: PropTypes.func,
    onChoose: PropTypes.func
  }

  _handleCancel = this._handleCancel.bind(this)
  _handleChoose = this._handleChoose.bind(this)

  render() {
    return (
      <ModalPanel { ...this._getPanel() }>
        <List { ...this._getList() } />
      </ModalPanel>
    )
  }

  _getList() {
    const { programs } = this.props
    return {
      format: ProgramToken,
      items: programs,
      handler: this._handleChoose
    }
  }

  _getPanel() {
    return {
      title: 'Choose a Progam',
      leftItems: [
        { label: 'Cancel', handler: this._handleCancel}
      ]
    }
  }

  _handleCancel() {
    this.props.onCancel()
  }

  _handleChoose(program) {
    this.props.onChoose(program)
  }

}

export default Programs
