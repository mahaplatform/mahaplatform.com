import { createSelector } from 'reselect'

const parsed = (state) => state.parsed

const headers = (state) => state.headers

const index = (state) => state.index

export const record = createSelector(
  parsed,
  index,
  (parsed, index) => {
    if(!parsed) return null
    return parsed.headers.map((key, i) => ({
      key,
      value: parsed.rows[index][i]
    }))
  }
)

export const rowNumber = createSelector(
  headers,
  index,
  (headers, index) => {
    return (headers ? 1 : 0) + index + 1
  }
)
