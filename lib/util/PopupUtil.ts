export const clickedElementIsPopupElement = (clickedElement: Element, actionElement: HTMLElement, popupElement: HTMLElement) => {
  return popupElement.contains(clickedElement) || actionElement.contains(clickedElement)
}