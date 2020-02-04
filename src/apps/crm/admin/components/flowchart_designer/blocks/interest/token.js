import { actions } from './variables'
import PropTypes from 'prop-types'
import React from 'react'
import _ from 'lodash'

const Token = ({ action, topic }) => {
  const description = _.find(actions, { value: action })
  return (
    <div>
      { topic &&
        <div>
          { _.capitalize(description.value) } { topic.title }
        </div>
      }
    </div>
  )
}

Token.propTypes = {
  action: PropTypes.string,
  topic: PropTypes.object
}

export default Token
