import { createSelector } from 'reselect'

const tones = ['1f3fb','1f3fc','1f3fd','1f3fe','1f3ff']

const skinToneIndex  = (state, props) => state.skinToneIndex

export const skinTone = createSelector(
  skinToneIndex,
  (index) => index !== null ? tones[index] : null
)
