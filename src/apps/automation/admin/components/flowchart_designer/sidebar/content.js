import { ModalPanel } from 'maha-admin'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Types from './types'
import React from 'react'

class Content extends React.Component {

  static propTypes = {
    blocks: PropTypes.array,
    changes: PropTypes.number,
    cid: PropTypes.string,
    config: PropTypes.object,
    status: PropTypes.string,
    onSave: PropTypes.func
  }

  _handleSave = this._handleSave.bind(this)

  render() {
    return (
      <ModalPanel { ...this._getPanel()}>
        <Types { ...this._getTypes() } />
      </ModalPanel>
    )
  }

  _getPanel() {
    const { changes, status } = this.props
    return {
      title: 'Steps',
      buttons: [
        {
          label: status === 'ready' ? 'Save' : <i className="fa fa-circle-o-notch fa-spin" />,
          color: 'red',
          disabled: changes === 0,
          handler: this._handleSave
        }
      ]
    }
  }

  _getTypes() {
    const { blocks } = this.props
    return {
      blocks,
      onCancel: () => {},
      onChoose: () => {}
    }
  }

  _handleSave() {
    this.props.onSave()
  }

}

const mapStateToProps = (state, props) => ({
  changes: state.automation.flowchart_designer[props.cid].changes,
  config: state.automation.flowchart_designer[props.cid].config
})

export default connect(mapStateToProps)(Content)
