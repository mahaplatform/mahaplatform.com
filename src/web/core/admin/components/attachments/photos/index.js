import Infinite from '../../infinite'
import Message from '../../message'
import ModalPanel from '../../modal_panel'
import Authorized from '../../authorized'
import PropTypes from 'prop-types'
import Items from './items'
import React from 'react'

class Photos extends React.Component {

  static propTypes = {
    network: PropTypes.string,
    files: PropTypes.array,
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
        <Authorized { ...this._getAuthorized() }>
          <Infinite { ...this._getInfinite() } />
        </Authorized>
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

  _getAuthorized() {
    const { network } = this.props
    return {
      network,
      image: `/admin/images/${network}.png`
    }
  }

  _getInfinite() {
    const { network } = this.props
    const empty = {
      icon: 'times-circle',
      title: 'No Results',
      text: 'There are no files that matched your query'
    }
    return {
      endpoint: `/api/admin/sources/${network}/photos`,
      empty: <Message { ...empty } />,
      notFound: <Message { ...empty } />,
      layout: (props) => <Items { ...this._getItems() } { ...props } />
    }
  }

  _getItems() {
    const { files, network, onCreate, onRemoveFile } = this.props
    return {
      files,
      network,
      onCreate,
      onRemoveFile
    }
  }

}

export default Photos
