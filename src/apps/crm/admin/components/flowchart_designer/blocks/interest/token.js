import { actions } from './variables'
import PropTypes from 'prop-types'
import React from 'react'
import _ from 'lodash'

const Token = ({ action, topic }) => {
  if(!action || !topic) return null
  const description = _.find(actions, { value: action })
  return (
    <div>
      { _.capitalize(description.value) } { topic &&
        <span>{ topic.title }</span>
      }
    </div>
  )
}

Token.propTypes = {
  action: PropTypes.string,
  topic: PropTypes.object
}

export default Token
