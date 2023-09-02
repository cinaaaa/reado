import './content.css'

const body = document.querySelector('body') as HTMLBodyElement
const section = document.createElement('section') as HTMLDivElement
section.classList.add('text-section-parent')

chrome.runtime.onMessage.addListener((message: { selectedText: string }, _) => {
  if (message.selectedText.length > 1) {
    body.appendChild(section)
    section.innerHTML = `
    <div class="text-selection-content">
      <p>${message.selectedText}</p>
    </div>
    `
    return true
  } else {
    return false
  }
})
