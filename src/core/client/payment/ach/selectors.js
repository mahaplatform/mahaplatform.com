import { createSelector } from 'reselect'
import _ from 'lodash'

const status = (state, props) => state.status

const name = (state, props) => state.name

const account = (state, props) => state.account

export const ownershipType = createSelector(
  account,
  (account) => account ? account.split('_').shift() : null
)

export const accountType = createSelector(
  account,
  (account) => account ? account.split('_').pop() : null
)

export const firstName = createSelector(
  name,
  (name) => name ? name.split('_').shift() : null
)

export const lastName = createSelector(
  name,
  (name) => name ? name.split(' ').slice(1).join(' ') : null
)

export const isProcessing = createSelector(
  status,
  (status) => _.includes(['authorizing','authorized','submitting'],status)
)
