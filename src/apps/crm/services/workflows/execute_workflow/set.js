const set = async (req, { config }) => {

  const value = config.value

  return {
    data: {
      data: {
        [config.code]: value
      }
    }
  }

}

export default set
