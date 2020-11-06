import { Menu } from '@admin'
import PropTypes from 'prop-types'
import Question from './question'
import User from './user'
import React from 'react'

class QuizResults extends React.PureComponent {

  static contextTypes = {}

  static propTypes = {
    administrations: PropTypes.array
  }

  static defaultProps = {}

  state = {
    active: 0
  }

  render() {
    return (
      <div className="quiz-results">
        <Menu { ...this._getMenu() }/>
      </div>
    )
  }

  _getMenu() {
    const { administrations } = this.props
    return {
      items: [
        { label: 'By User', component: () => <User administrations={ administrations } /> },
        { label: 'By Question', component: () => <Question administrations={ administrations } /> }
      ]
    }
  }

}

export default QuizResults
