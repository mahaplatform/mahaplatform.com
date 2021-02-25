import { ModalPanel } from '@admin'
import PropTypes from 'prop-types'
import Item from './item'
import React  from 'react'

class Finder extends React.PureComponent {

  static propTypes = {
    items: PropTypes.array,
    selected: PropTypes.string
  }

  static defaultProps = {
    items: []
  }

  state = {
    selected: ''
  }

  _handleSelect = this._handleSelect.bind(this)

  render() {
    const { items } = this.props
    return (
      <ModalPanel { ...this._getPanel() }>
        <div className="maha-finder">
          { items.map((item, index) => (
            <Item { ...this._getItem(item, index)} key={`item_${index}`} />
          )) }
        </div>
      </ModalPanel>
    )
  }

  componentDidMount() {
    const { selected } = this.props
    if(selected) this.setState({ selected })
  }

  _getItem(item, index) {
    const { selected } = this.state
    return {
      ...item,
      index: `${index}`,
      selected,
      onSelect: this._handleSelect
    }
  }

  _getPanel() {
    return {}
  }

  _handleSelect(selected ) {
    this.setState({ selected  })
  }

}

export default Finder
