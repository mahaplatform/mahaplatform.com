import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import React from 'react'

class Section extends React.Component {

  static propTypes = {
    cid: PropTypes.string,
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
    const { config, label, index, onPop, onPush } = this.props
    return {
      config,
      label,
      index,
      onPop,
      onPush,
      onUpdate: this._handleUpdate.bind(this, `sections[${index}]`)
    }
  }

  _handleUpdate(key, value) {
    this.props.onUpdate(key, value)
  }

}

const mapStateToProps = (state, props) => ({
  config: state.crm.designer[props.cid].config.sections[props.index]
})

export default connect(mapStateToProps)(Section)
