import { clickedElementIsPopupElement } from "lib/util/PopupUtil"

export const handlePopupClick = (id: string, activatorId: string, closeFunction: Function, event: MouseEvent): void => {
  const clickedElement = document.elementFromPoint(event.clientX, event.clientY)
  const activatorElements = document.getElementsByClassName(activatorId)
  const popupElement = document.getElementById(id)

  if (clickedElement && popupElement && activatorElements) {
    if (!popupElement.contains(clickedElement) && Array.from(activatorElements).filter(element => element.contains(clickedElement)).length === 0) {
      console.log('close')
      closeFunction(false)
    }
  }
}