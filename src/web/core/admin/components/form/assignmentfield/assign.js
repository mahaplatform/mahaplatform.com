import { assigned, unassigned } from './selectors'
import ModalPanel from '../../modal_panel'
import Unassigned from './unassigned'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Loader from '../../loader'
import Assigned from './assigned'
import React from 'react'
import Unassigned from './unassigned'

class Assign extends React.Component {

  static contextTypes = {
    form: PropTypes.object
  }

  static propTypes = {
    assigned: PropTypes.array,
    unassigned: PropTypes.array,
    onAdd: PropTypes.func,
    onQuery: PropTypes.func,
    onRemove: PropTypes.func
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
              <Assigned { ...this._getAssigned() } />
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

  _getAssigned() {
    const { assigned, onRemove } = this.props
    return {
      assigned,
      onRemove
    }
  }

  _getUnassigned() {
    const { unassigned, onAdd, onQuery } = this.props
    return {
      unassigned,
      onAdd,
      onQuery
    }
  }

  _handleCancel() {
    this.context.form.pop()
  }

  _handleDone() {
    this.context.form.pop()
  }

}

const mapStateToProps = (state, props) => ({
  assigned: assigned(state.maha.assignmentfield[props.cid], props),
  q: state.maha.assignmentfield[props.cid].q,
  unassigned: unassigned(state.maha.assignmentfield[props.cid], props)
})

export default connect(mapStateToProps)(Assign)
