import AssigneeToken from '../../../tokens/assignee'
import ModalPanel from '../../modal_panel'
import Loader from '../../loader'
import PropTypes from 'prop-types'
import React from 'react'

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
              <div className="maha-assignment-unassigned">
                <div className="maha-assignment-list">
                  <div className="maha-assignment-unassigned-items">
                    { unassigned.map((assignee, index) => (
                      <div className="maha-assignment-unassigned-item" key={ `unassigned_${assignee.id}` }>
                        <AssigneeToken { ...assignee } key={`assignee_${index}`} />
                      </div>
                    )) }
                  </div>
                </div>
              </div>
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

  _handleCancel() {
    this.context.form.pop()
  }

  _handleDone() {
    this.context.form.pop()
  }

}

export default Assign
