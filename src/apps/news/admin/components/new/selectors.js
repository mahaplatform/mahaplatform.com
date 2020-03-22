import { createSelector } from 'reselect'

const attachmentsSelector = (state, props) => state.attachments

export const links = createSelector(
  attachmentsSelector,
  (attachments) => attachments.filter((attachment) => {
    return attachment.type === 'link'
  })  
)

export const assets = createSelector(
  attachmentsSelector,
  (attachments) => attachments.filter((attachment) => {
    return attachment.type === 'asset' 
  })  
)

export const images = createSelector(
  assets,
  (attachments) => attachments.filter((attachment) => {
    return attachment.asset.content_type.match(/image/) !== null
  })  
)

export const files = createSelector(
  assets,
  (attachments) => attachments.filter((attachment) => {
    return attachment.asset.content_type.match(/image/) === null
  })  
)
