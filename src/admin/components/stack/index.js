import PropTypes from 'prop-types'
import React from 'react'
import _ from 'lodash'

class Stack extends React.Component {

  static propTypes = {
    cards: PropTypes.array,
    slideBeneath:PropTypes.bool,
    slideFirst: PropTypes.bool
  }

  static defaultProps = {
    cards: [],
    slideBeneath: true,
    slideFirst: true
  }

  constructor(props) {
    super(props)
    this.state = {
      cards: props.cards,
      mounted: props.cards.length
    }
  }

  render() {
    const { cards } = this.state
    if(cards.length === 0) return null
    return (
      <div className="maha-stack">
        <div className={ this._getClass() }>
          { cards.map((card, index) => (
            <div key={ `card_${index}` } className={ this._getCardClass(index) }>
              { _.isFunction(card.component) ?
                <card.component { ...this._getProps(index) } active={ index === cards.length - 1} /> :
                card.component
              }
            </div>
          )) }
        </div>
      </div>
    )
  }

  componentDidUpdate(prevProps) {
    const { cards } = this.props
    if(prevProps.cards.length < cards.length) this._handlePush()
    if(prevProps.cards.length > cards.length) this._handlePop()
  }

  _getClass() {
    const { slideBeneath } = this.props
    const classes = ['maha-stack-inner']
    if(slideBeneath) classes.push('maha-stack-slide-beneath')
    return classes.join(' ')
  }

  _getCardClass(index) {
    const classes = ['maha-stack-card']
    classes.push(this._getStatus(index))
    return classes.join(' ')
  }

  _getProps(index) {
    const card = this.props.cards[index] || this.state.cards[index]
    const { props } = card
    if(_.isFunction(props)) return props()
    if(_.isPlainObject(props)) return props
    return {}
  }

  _getStatus(index) {
    const { slideFirst } = this.props
    const mountedIndexes = this.state.mounted - 1
    const cardIndexes = this.state.cards.length - 1
    if(!slideFirst && mountedIndexes === -1) return 'active'
    if(index > mountedIndexes && index === cardIndexes) return 'mounting'
    if(index === mountedIndexes && index === cardIndexes ) return 'active'
    if(index === mountedIndexes && index < cardIndexes) return 'covering'
    if(index < cardIndexes ) return 'covered'
  }

  _handlePush() {
    const { cards } = this.props
    this.setState({ cards })
    const scalar = cards.length - this.state.cards.length
    setTimeout(() => this.setState({ mounted: this.state.mounted + scalar }), 250)
  }

  _handlePop() {
    const { cards } = this.props
    const scalar = this.state.cards.length - cards.length
    this.setState({ mounted: this.state.mounted - scalar })
    setTimeout(() => this.setState({ cards }), 250)
  }

}

export default Stack
