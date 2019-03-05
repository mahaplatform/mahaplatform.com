import { createSelector } from 'reselect'

const attachments = (state, props) => props.attachments

const selected = (state, props) => state.selected

export const attachment = createSelector(
  attachments,
  selected,
  (attachments, selected) => attachments[selected]
)

export const saveable = createSelector(
  attachments,
  (attachments) => attachments.reduce((saveable, attachment) => {
    return !saveable ? false : attachment.asset.status === 'processed'
  }, true)
)
