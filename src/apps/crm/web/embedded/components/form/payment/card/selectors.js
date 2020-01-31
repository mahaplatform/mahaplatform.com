import { createSelector } from 'reselect'
import _ from 'lodash'

const status = (state, props) => state.status

export const isProcessing = createSelector(
  status,
  (status) => _.includes(['authorizing','authorized','submitting'],status)
)
