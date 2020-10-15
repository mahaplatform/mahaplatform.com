import PropTypes from 'prop-types'
import React from 'react'

class Stack extends React.Component {

  static childContextTypes = {
    stack: PropTypes.object
  }

  static propTypes = {
    cards: PropTypes.array
  }

  static defaultProps = {
    cards: []
  }

  constructor(props) {
    super(props)
    this.state = {
      cards: props.cards,
      mounted: 0
    }
  }

  render() {
    const { cards } = this.state
    return (
      <div className="stack">
        { cards.map((card, index) => (
          <div key={ `card_${index}` } className={ `stack-card ${this._getStatus(index)}` }>
            <card.component params={ card.params } pathname={ card.pathname } cards={ cards } cardIndex={ index } />
          </div>
        )) }
      </div>
    )
  }

  componentDidUpdate(prevProps) {
    const { cards } = this.props
    if(prevProps.cards.length > cards.length) {
      this.setState({ mounted: this.state.mounted - 1 })
      setTimeout(() => this.setState({ cards }), 500)
    } else if(prevProps.cards.length < cards.length) {
      this.setState({ cards })
      setTimeout(() => this.setState({ mounted: this.state.mounted + 1 }), 100)
    }
  }

  getChildContext() {
    const { cards } = this.props
    return {
      stack: {
        cards
      }
    }
  }

  _getStatus(index) {
    const { mounted } = this.state
    const { cards } = this.state
    const mountedIndexes = mounted - 1
    const cardIndexes = cards.length - 1
    if(mounted === 0) return 'active'
    if(index > mountedIndexes && index === cardIndexes) return 'mounting'
    if(index === mountedIndexes && index === cardIndexes ) return 'active'
    if(index === mountedIndexes && index < cardIndexes ) return 'covering'
    if(index < cardIndexes ) return 'covered'
  }
}

export default Stack
