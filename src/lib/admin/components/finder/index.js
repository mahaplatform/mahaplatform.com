import { ModalPanel } from '@admin'
import PropTypes from 'prop-types'
import React  from 'react'
import Item from './item'
import _  from 'lodash'

class Finder extends React.PureComponent {

  static propTypes = {
    items: PropTypes.array,
    selected: PropTypes.string
  }

  static defaultProps = {
    items: []
  }

  state = {
    expanded: [],
    selected: ''
  }

  _handleExpand = this._handleExpand.bind(this)
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
    const { expanded, selected } = this.state
    return {
      ...item,
      expanded,
      index: `${index}`,
      selected,
      onExpand: this._handleExpand,
      onSelect: this._handleSelect
    }
  }

  _getPanel() {
    return {}
  }

  _handleExpand(index) {
    const { expanded } = this.state
    this.setState({
      expanded: _.xor(expanded, [index])
    })
  }

  _handleSelect(selected ) {
    this.setState({ selected  })
  }

}

export default Finder
