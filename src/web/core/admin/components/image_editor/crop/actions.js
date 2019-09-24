export const zoom = (zoom) => ({
  type: 'ZOOM',
  zoom
})

export const moving = (origin) => ({
  type: 'MOVING',
  origin
})

export const move = (drift) => ({
  type: 'MOVE',
  drift
})
