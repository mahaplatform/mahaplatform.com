import React from 'react'
import PropTypes from 'prop-types'

class Carousel extends React.Component {

  static propTypes = {
    infinite: PropTypes.bool,
    slides: PropTypes.array
  }

  static defaultProps = {
    infinite: true,
    slides: []
  }

  _swipe = {}

  state = {
    direction: 'left',
    curr: 0,
    next: 0,
    total: 0,
    transitioning: false
  }

  _handleNext = this._handleNext.bind(this)
  _handlePrevious = this._handlePrevious.bind(this)
  _handleTouchEnd = this._handleTouchEnd.bind(this)
  _handleTouchMove = this._handleTouchMove.bind(this)
  _handleTouchStart = this._handleTouchStart.bind(this)

  render() {
    const { infinite, slides } = this.props
    const { next } = this.state
    return (
      <div className="maha-carousel">
        { slides.length > 0 &&
          <div { ...this._getTheatre() }>
            { slides.length > 1 && (infinite || next > 0) &&
              <div className="maha-carousel-previous" onClick={ this._handlePrevious }>
                <i className="fa fa-fw fa-chevron-left" />
              </div>
            }
            <div className="maha-carousel-slides">
              { slides.map((slide, index) => (
                <div key={`slide_${index}`} className={ this._getSlideClass(index) }>
                  { slide }
                </div>
              ))}
            </div>
            { slides.length > 1 && (infinite || next < slides.length - 1) &&
              <div className="maha-carousel-next" onClick={ this._handleNext }>
                <i className="fa fa-fw fa-chevron-right" />
              </div>
            }
          </div>
        }
        { slides.length > 1 &&
          <div className="maha-carousel-pagination">
            { [...Array(slides.length)].map((i, index) => (
              <div key={`button_${index}`} className={ this._getButtonClass(index) } onClick={ this._handleGoto.bind(this, index) } />
            ))}
          </div>
        }
      </div>
    )
  }

  componentDidUpdate(prevProps, prevState) {
    const { next } = this.state
    if(next != prevState.next) {
      setTimeout(() => this.setState({ transitioning: true }), 100)
      setTimeout(() => this.setState({ curr: next, transitioning: false }), 600)
    }
  }

  _getSlideClass(index) {
    const { curr, direction, next } = this.state
    const { transitioning } = this.state
    const classes = ['maha-carousel-slide']
    const right = next !== curr && direction === 'right'
    const left = next !== curr && direction === 'left'
    if(index === curr) classes.push('active')
    if(left && index === next) classes.push('next')
    if(right && index === next) classes.push('prev')
    if(transitioning && left && (index === next || index === curr)) classes.push('left')
    if(transitioning && right && (index === next || index === curr)) classes.push('right')
    return classes.join(' ')
  }

  _getButtonClass(index) {
    const { curr } = this.state
    const classes = ['maha-carousel-pagination-button']
    if(index === curr) classes.push('active')
    return classes.join(' ')
  }

  _getTheatre() {
    return {
      className: 'maha-carousel-theatre',
      onTouchStart: this._handleTouchStart,
      onTouchMove: this._handleTouchMove,
      onTouchEnd: this._handleTouchEnd
    }
  }

  _handlePrevious() {
    const { slides } = this.props
    const { curr } = this.state
    this.setState({
      direction: 'right',
      next: curr === 0 ? slides.length - 1 :  curr - 1
    })
  }

  _handleNext() {
    const { slides } = this.props
    const { curr } = this.state
    this.setState({
      direction: 'left',
      next: curr === slides.length - 1 ? 0 : curr + 1
    })
  }

  _handleGoto(index) {
    const { slides } = this.props
    const { curr } = this.state
    this.setState({
      direction: (index > curr || (curr === slides.length  && index === 0)) ? 'left' : 'right',
      next: index
    })
  }

  _handleTouchStart(e) {
    this._swipe = { x: e.touches[0].clientX }
  }

  _handleTouchMove(e) {
    if (e.changedTouches && e.changedTouches.length) {
      this._swipe.swiping = true
    }
  }

  _handleTouchEnd(e) {
    const touch = e.changedTouches[0]
    const dist = touch.clientX - this._swipe.x
    if (this._swipe.swiping && Math.abs(dist) > 30 ) {
      if(dist > 0) this._handlePrevious()
      if(dist < 0) this._handleNext()
    }
    this._swipe = {}
  }

}

export default Carousel
