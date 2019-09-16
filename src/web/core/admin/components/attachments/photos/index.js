import Infinite from '../../infinite'
import Message from '../../message'
import ModalPanel from '../../modal_panel'
import PropTypes from 'prop-types'
import Items from './items'
import React from 'react'

class Photos extends React.Component {

  static propTypes = {
    files: PropTypes.array,
    source: PropTypes.object,
    onAddAsset: PropTypes.func,
    onAddFile: PropTypes.func,
    onBack: PropTypes.func,
    onCreate: PropTypes.func,
    onDone: PropTypes.func,
    onRemoveFile: PropTypes.func
  }

  render() {
    return (
      <ModalPanel { ...this._getPanel() }>
        <Infinite { ...this._getInfinite() } />
      </ModalPanel>
    )
  }

  _getPanel() {
    return {
      title: 'Choose File(s)',
      leftItems: [
        { icon: 'chevron-left', handler: this.props.onBack  }
      ],
      rightItems: [
        { label: 'Done', handler: this.props.onDone }
      ]
    }
  }

  _getInfinite() {
    const { files, source, onCreate, onRemoveFile } = this.props
    const empty = {
      icon: 'times-circle',
      title: 'No Results',
      text: 'There are no files that matched your query'
    }
    return {
      endpoint: `/api/admin/profiles/${source.id}/photos`,
      empty: <Message { ...empty } />,
      notFound: <Message { ...empty } />,
      layout: Items,
      props: {
        files,
        source,
        onCreate,
        onRemoveFile
      }
    }
  }

}

export default Photos
