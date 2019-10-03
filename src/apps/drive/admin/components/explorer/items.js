import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Item from './item'
import React from 'react'
import DnD from './dnd'
import _ from 'lodash'

class Items extends React.Component {

  static propTypes = {
    folder: PropTypes.object,
    preview: PropTypes.object,
    records: PropTypes.array,
    selected: PropTypes.array,
    onAddSelected: PropTypes.func,
    onClearSelected: PropTypes.func,
    onChangeFolder: PropTypes.func,
    onCreateFile: PropTypes.func,
    onMove: PropTypes.func,
    onPreview: PropTypes.func,
    onReplaceSelected: PropTypes.func,
    onTasks: PropTypes.func,
    onUpdateFile: PropTypes.func
  }

  _handleSelect = this._handleSelect.bind(this)

  render() {
    const { records } = this.props
    return (
      <DnD { ...this._getDnD() }>
        <div className="drive-items">
          <div className="drive-head">
            <div className="drive-head-item drive-name">
              Name
            </div>
            <div className="drive-head-item drive-owner">
              Owner
            </div>
            <div className="drive-head-item drive-updated">
              Updated
            </div>
            <div className="drive-head-item drive-size">
              Size
            </div>
            <div className="drive-head-item drive-action" />
            <div className="drive-head-item drive-action" />
          </div>
          { records.map((item, index) => (
            <Item key={`item_${item.code}`} { ...this._getItem(item) } />
          )) }
        </div>
      </DnD>
    )
  }

  _getDnD() {
    const { records, selected, onMove } = this.props
    return {
      items: records,
      selected,
      onMove,
      onSelect: this._handleSelect
    }
  }

  _getItem(item) {
    const { folder, preview, records, selected, onChangeFolder, onClearSelected, onCreateFile, onMove, onPreview, onTasks, onUpdateFile } = this.props
    return {
      folder,
      items: records,
      item,
      preview,
      selected,
      onChangeFolder,
      onClearSelected,
      onCreateFile,
      onMove,
      onPreview,
      onSelect: this._handleSelect,
      onTasks,
      onUpdateFile
    }
  }

  _handleSelect(item, shiftKey, metaKey, ctrlKey) {
    const { records, selected, onAddSelected, onReplaceSelected } = this.props
    if(shiftKey && selected.length > 0) {
      const item_index = _.findIndex(records, { code: item.code })
      const first_index = _.findIndex(records, { code: selected.slice(0,1)[0].code })
      const last_index = _.findIndex(records, { code: selected.slice(-1)[0].code })
      const all = records.filter((item, index) => {
        if(item_index <= first_index && index >= item_index && index <= last_index) return true
        if(item_index >= last_index && index >= first_index && index <= item_index) return true
        return false
      })
      return onReplaceSelected(all)
    }
    if(metaKey || ctrlKey) return onAddSelected(item)
    const isSelected = _.findIndex(selected, { code: item.code }) >= 0
    if(isSelected && selected.length > 1) return
    onReplaceSelected([item])
  }

}

const mapStateToProps = (state, props) => ({
  preview: state.drive.explorer.preview,
  selected: state.drive.explorer.selected
})

Items = connect(mapStateToProps)(Items)

export default Items
