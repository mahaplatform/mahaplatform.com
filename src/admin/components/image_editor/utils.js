export const adjust = (element, container) => {
  const proportional = {
    width: (element.width / element.height) * container.height,
    height: (element.height / element.width) * container.width
  }
  if(container.width >= container.height) {
    if(element.height > container.height) {
      return {
        width: proportional.width,
        height: container.height
      }
    }
  } else {
    if(element.width > container.width) {
      return {
        width: container.width,
        height: proportional.height
      }
    }
  }
  return {
    width: element.width,
    height: element.height
  }

}
