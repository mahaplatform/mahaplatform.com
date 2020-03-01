export const conditional = async (req, params) => {

  const { contact, enrollment, step } = params

  return {
    condition: {
      parent: step.get('code'),
      answer: 'answer',
      delta: 0
    }
  }

}
