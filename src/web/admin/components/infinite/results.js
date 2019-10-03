import Message from '../message'
import React from 'react'

export const Appending = () => (
  <div className="maha-infinite-border-loader">
    <div className="maha-infinite-border-loader-progress" />
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
