import Message from '../message'
import React from 'react'

export const Appending = () => (
  <div className="maha-infinite-loader">
    <div className="ui active inverted dimmer">
      <div className="ui small loader"></div>
    </div>
  </div>
)

export const Empty = () => {

  const message = {
    icon: 'times',
    title: 'No records',
    text: 'There are no records'
  }

  return <Message { ...message } />

}

export const NotFound = () => {

  const message = {
    icon: 'times',
    title: 'No Results Found',
    text: 'No records matched your query'
  }

  return <Message { ...message } />

}

export const Failure = () => {

  const message = {
    icon: 'exclamation-triangle ',
    title: 'Unable to load records',
    text: 'There was a problem with fetching your data'
  }

  return <Message { ...message } />

}
