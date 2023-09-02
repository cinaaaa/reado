import './content.css'

const body = document.querySelector('body') as HTMLBodyElement
const section = document.createElement('section') as HTMLDivElement

chrome.runtime.onMessage.addListener((message: { selectedText: string }, _) => {
  if (message.selectedText.length > 1) {
    buildSection(message.selectedText)
  }
})

// listen to click events on the body
body.addEventListener('click', (e) => {
  // check if the click is on the close button
  if (e.target && (e.target as HTMLElement).classList.contains('close-button-content')) {
    destroySection()
  }
})

body.addEventListener('keydown', (e) => {
  // and check that if the key is CTRL + M
  if (e.ctrlKey && e.key === 'm') {
    const selection = window.getSelection()
    const selectedText = selection?.toString().trim()
    if (selectedText && selectedText.length > 1) {
      buildSection(selectedText)
    }
  }
  // check if the key is ESC
  if (e.key === 'Escape') {
    destroySection()
  }
})

function buildSection(text: string) {
  // disable the page scroll
  section.classList.add('text-section-parent')

  body.style.overflow = 'hidden'
  body.appendChild(section)

  section.innerHTML = `
    <div class="text-selection-content">
      <svg class="close-button-content" x="0px" y="0px" width="25" height="25" viewBox="0 0 50 50">
      <path d="M 7.71875 6.28125 L 6.28125 7.71875 L 23.5625 25 L 6.28125 42.28125 L 7.71875 43.71875 L 25 26.4375 L 42.28125 43.71875 L 43.71875 42.28125 L 26.4375 25 L 43.71875 7.71875 L 42.28125 6.28125 L 25 23.5625 Z"></path>
      </svg>
      <p>${text}</p>
    </div>
    `
}

function destroySection() {
  body.removeChild(section)
  body.style.overflow = 'auto'
}
