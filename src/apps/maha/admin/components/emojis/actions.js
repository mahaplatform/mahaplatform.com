export const loadSkinTone = () => ({
  type: 'LOCAL_GET',
  key: 'skintone',
  request: 'LOAD_SKIN_TONE_REQUEST',
  success: 'LOAD_SKIN_TONE_SUCCESS',
  failure: 'LOAD_SKIN_TONE_FAILURE'
})

export const saveSkinTone = (value) => ({
  type: 'LOCAL_SET',
  key: 'skintone',
  value,
  request: 'SAVE_SKIN_TONE_REQUEST',
  success: 'SAVE_SKIN_TONE_SUCCESS',
  failure: 'SAVE_SKIN_TONE_FAILURE'
})

export const changeSkinTone = () => ({
  type: 'CHANGE_SKIN_TONE'
})
