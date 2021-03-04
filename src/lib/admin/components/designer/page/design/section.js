import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import React from 'react'

class Section extends React.Component {

  static propTypes = {
    cid: PropTypes.string,
    code: PropTypes.string,
    components: PropTypes.object,
    config: PropTypes.object,
    label: PropTypes.string,
    index: PropTypes.number,
    onPop: PropTypes.func,
    onPush: PropTypes.func,
    onUpdate: PropTypes.func
  }

  render() {
    const { components } = this.props
    const Component = components.section
    return <Component { ...this._getComponent() } />
  }

  _getComponent() {
    const { code, config, label, index, onPop, onPush } = this.props
    return {
      config,
      label,
      index,
      onPop,
      onPush,
      onUpdate: this._handleUpdate.bind(this, code)
    }
  }

  _handleUpdate(key, value) {
    this.props.onUpdate(key, value)
  }
  
}

const mapStateToProps = (state, props) => ({
  config: state.maha.designer[props.cid].config[props.code]
})

export default connect(mapStateToProps)(Section)
