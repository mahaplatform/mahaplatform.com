import Header from '../../embedded/components/form/header'
import Footer from '../../embedded/components/form/footer'
import Layout from '../../embedded/components/form/layout'
import PropTypes from 'prop-types'
import Body from './body'
import React from 'react'

class Form extends React.Component {

  static propTypes = {
    active: PropTypes.number,
    config: PropTypes.object,
    onAction: PropTypes.func
  }

  state = {
    moving: {
      isMoving: false,
      target: null,
      position: null
    }
  }

  _handleHover = this._handleHover.bind(this)
  _handleMove = this._handleMove.bind(this)
  _handleReordering = this._handleReordering.bind(this)

  render() {
    const { config } = this.props
    return (
      <Layout { ...this._getLayout() }>
        <div className="maha-form">
          { config.header &&
            <Header { ...this._getHeader() } />
          }
          <Body { ...this._getBody() } />
          { config.footer &&
            <Footer { ...this._getFooter() } />
          }
        </div>
      </Layout>
    )
  }

  _getBody() {
    const { active, config, onAction } = this.props
    const { moving } = this.state
    return {
      active,
      config,
      moving,
      onAction,
      onHover: this._handleHover,
      onMove: this._handleMove,
      onReordering: this._handleReordering
    }
  }

  _getFooter() {
    const { config } = this.props
    return { config }
  }

  _getHeader() {
    const { config } = this.props
    return { config }
  }

  _getLayout() {
    const { config } = this.props
    return { config }
  }

  _handleHover(from, to, position) {
    console.log('hovering')
    this.setState({
      moving: {
        isMoving: true,
        target: { from, to },
        position
      }
    })
  }

  _handleMove(from, to) {
    this.props.onAction('move', { from, to })
  }

  _handleReordering(isMoving) {
    this.setState({
      moving: {
        isMoving,
        target: null,
        position: null
      }
    })
  }

}

export default Form
