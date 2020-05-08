const set = async (req, { config }) => {

  const { name } = config

  // TODO: set with dynamic value
  const value = config.value

  return {
    data: {
      data: {
        name: name.value,
        value
      }
    }
  }

}

export default set
