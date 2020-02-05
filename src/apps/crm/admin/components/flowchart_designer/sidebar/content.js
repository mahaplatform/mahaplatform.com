import { ModalPanel } from 'maha-admin'
import PropTypes from 'prop-types'
import Block from './block'
import React from 'react'
import _ from 'lodash'

class Content extends React.Component {

  static propTypes = {
    blocks: PropTypes.array,
    cid: PropTypes.string,
    config: PropTypes.object,
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
    return {
      title: 'Workflow',
      buttons: [
        { label: 'Save', color: 'red', handler: this._handleSave }
      ]
    }
  }

  _handleSave() {
    this.props.onSave()
  }

}

export default Content
