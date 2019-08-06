import PropTypes from 'prop-types'
import React from 'react'

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
      <div className={ this._getClass() }>
        { cards.map((card, index) => (
          <div key={ `card_${index}` } className={ this._getCardClass(index) }>
            <card.component { ...card.props } active={ index === cards.length - 1} />
          </div>
        )) }
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
    const classes = ['maha-stack']
    if(slideBeneath) classes.push('maha-stack-slide-beneath')
    return classes.join(' ')
  }

  _getCardClass(index) {
    const classes = ['maha-stack-card']
    classes.push(this._getStatus(index))
    return classes.join(' ')
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
    setTimeout(() => this.setState({ mounted: this.state.mounted + 1 }), 100)
  }

  _handlePop() {
    const { cards } = this.props
    this.setState({ mounted: this.state.mounted - 1 })
    setTimeout(() => this.setState({ cards }), 300)
  }

}

export default Stack
