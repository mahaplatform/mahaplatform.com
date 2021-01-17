export const adjust = (element, container) => {
  if(container.width > container.height) {
    if((container.height / container.width) * element.width > element.height) {
      return {
        width: (container.width / container.height) * element.height,
        height: element.height
      }
    } else {
      return {
        width: element.width,
        height: (container.height / container.width) * element.width
      }
    }
  } else {
    if((container.width / container.height) * element.height > element.width) {
      return {
        width: element.width,
        height: (container.height / container.width) * element.width
      }
    } else {
      return {
        width: (container.width / container.height) * element.height,
        height: element.height
      }
    }
  }
}
