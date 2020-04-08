import collectObjects from '../../../../../core/utils/collect_objects'

const queueFiles = collectObjects('queues/*')

export const getQueueFiles = () => queueFiles.reduce((files, file) => ({
  ...files,
  [file.default.name]: file.default
}), {})
