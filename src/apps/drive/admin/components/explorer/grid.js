import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Item from './grid_item'
import React from 'react'
import DnD from './dnd'
import _ from 'lodash'

class Grid extends React.Component {

  static propTypes = {
    folder: PropTypes.object,
    info: PropTypes.bool,
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
        <div className={ this._getClass() }>
          { records.map((item, index) => (
            <Item key={`item_${item.code}`} { ...this._getItem(item) } />
          )) }
        </div>
      </DnD>
    )
  }

  _getClass() {
    const { info } = this.props
    const classes = ['drive-grid-items']
    if(info) classes.push('info')
    return classes.join(' ')
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
    const { folder, info, preview, records, selected, onChangeFolder, onClearSelected, onCreateFile, onMove, onPreview, onTasks, onUpdateFile } = this.props
    return {
      folder,
      info,
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
  info: state.drive.explorer.info,
  preview: state.drive.explorer.preview,
  selected: state.drive.explorer.selected
})

export default connect(mapStateToProps)(Grid)
