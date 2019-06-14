const notFound = (req, res) => res.status(404).json({
  message: 'Unable to locate resource'
})

export default notFound
