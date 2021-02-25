export const handleModalInteraction = (event: MouseEvent, activatorElement: Element, modalElement: Element, hideFunction: Function): void => {
  const clickedElement: Element = document.elementFromPoint(event.clientX, event.clientY)

  if (clickedElement) { // Check if its null
    if (!modalElement.contains(clickedElement) && !activatorElement.contains(clickedElement)) { // If the clicked element isn't the activator element AND the the activator element doesn't include the clicked element
      hideFunction(false)
    }
  }
}