import ModalPanel from '../../modal_panel'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Options from './options'
import React from 'react'

class Search extends React.Component {

  static contextTypes = {
    form: PropTypes.object
  }

  static propTypes = {
    label: PropTypes.string,
    selected: PropTypes.number,
    onCancel: PropTypes.func,
    onEnd: PropTypes.func
  }

  _handleCancel = this._handleCancel.bind(this)

  render() {
    return (
      <ModalPanel { ...this._getPanel() }>
        <Options { ...this.props } />
      </ModalPanel>
    )
  }

  _getPanel() {
    const { label } = this.props
    return {
      title: `Choose ${label}`,
      leftItems: [
        { label: 'Cancel', handler: this._handleCancel }
      ]
    }
  }

  _handleCancel() {
    this.props.onEnd()
    this.context.form.pop()
  }

}

const mapStateToProps = (state, props) => ({
  q: state.maha.lookup[props.cid].q
})

export default connect(mapStateToProps)(Search)
