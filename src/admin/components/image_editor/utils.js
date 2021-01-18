export const fit = (element, container) => {
  const proportional = {
    width: (element.width / element.height) * container.height,
    height: (element.height / element.width) * container.width
  }
  if(proportional.width < container.width) {
    return {
      width: container.width,
      height: proportional.height
    }
  }
  if(proportional.height < container.height) {
    return {
      width: proportional.width,
      height: container.height
    }
  }
  return {
    width: container.width,
    height: container.height
  }
}
