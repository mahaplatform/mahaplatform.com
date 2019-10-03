import { createSelector } from 'reselect'

const attachments = (state, props) => props.attachments

const _getType = (attachment) => {
  if(!attachment.asset) return 'files'
  if(attachment.asset.content_type.match(/(jpeg|jpg|gif|png)/)) return 'images'
  if(attachment.asset.content_type.match(/video/)) return 'media'
  if(attachment.asset.content_type.match(/audio/)) return 'media'
  return 'files'
}

const sorted = createSelector(
  attachments,
  (attachments) => attachments.reduce((sorted, attachment) => {
    const type = _getType(attachment)
    return {
      ...sorted,
      [type]: [
        ...sorted[type],
        attachment
      ]
    }
  }, { files: [], images: [], media: [] })
)

export const files = createSelector(
  sorted,
  (attachments) => attachments.files
)

export const images = createSelector(
  sorted,
  (attachments) => attachments.images
)

export const media = createSelector(
  sorted,
  (attachments) => attachments.media
)
