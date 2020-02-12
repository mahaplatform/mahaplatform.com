import { ModalPanel } from 'maha-admin'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Block from './block'
import React from 'react'
import _ from 'lodash'

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
    const { blocks } = this.props
    return (
      <ModalPanel { ...this._getPanel()}>
        <div className="flowchart-designer-blocks">
          { blocks.filter(block => {
            return !_.includes(['trigger','ending'], block.type)
          }).map((block, index) => (
            <Block { ...block } key={`type_${index}`} />
          )) }
        </div>
      </ModalPanel>
    )
  }

  _getPanel() {
    const { changes, status } = this.props
    return {
      title: 'Workflow',
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

  _handleSave() {
    this.props.onSave()
  }

}

const mapStateToProps = (state, props) => ({
  changes: state.crm.flowchart_designer[props.cid].changes,
  config: state.crm.flowchart_designer[props.cid].config
})

export default connect(mapStateToProps)(Content)
