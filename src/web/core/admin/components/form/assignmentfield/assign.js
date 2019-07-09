import AssigneeToken from '../../../tokens/assignee'
import ModalPanel from '../../modal_panel'
import Loader from '../../loader'
import PropTypes from 'prop-types'
import React from 'react'
import Unassigned from './unassigned'

class Assign extends React.Component {

  static contextTypes = {
    form: PropTypes.object
  }

  static propTypes = {
    unassigned: PropTypes.array,
    assignments: PropTypes.array
  }

  static defaultProps = {
  }

  state = {
    ready: false
  }

  _handleCancel = this._handleCancel.bind(this)
  _handleDone = this._handleDone.bind(this)

  render() {
    const { unassigned } = this.props
    return (
      <ModalPanel { ...this._getPanel() }>
        { !this.state.ready && <Loader /> }
        { this.state.ready &&
          <div className="maha-assignment">
            <div className="maha-assignment-body">
              <Unassigned { ...this._getUnassigned() } />
            </div>
          </div>
        }
      </ModalPanel>
    )
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        ready: true
      })
    }, 350)
  }

  _getPanel() {
    return {
      title: 'Assign Users',
      leftItems: [
        { label: 'Cancel', handler: this._handleCancel.bind(this) }
      ],
      rightItems: [
        { label: 'Done', handler: this._handleDone.bind(this) }
      ]
    }
  }

  _getUnassigned() {
    const { unassigned } = this.props
    return {
      unassigned
    }
  }

  _handleCancel() {
    this.context.form.pop()
  }

  _handleDone() {
    this.context.form.pop()
  }

}

export default Assign
