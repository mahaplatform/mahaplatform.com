const set = async (req, { config }) => {

  const value = config.value

  return {
    action: {
      data: {
        [config.code]: value
      }
    }
  }

}

export default set
