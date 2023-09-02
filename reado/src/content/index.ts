import './content.css'

const body = document.querySelector('body') as HTMLBodyElement
const section = document.createElement('section') as HTMLDivElement

chrome.runtime.onMessage.addListener((message: { selectedText: string }, _) => {
  if (message.selectedText.length > 1) {
    buildSection(message.selectedText)
  }
})

// remove the elmenet when clicked outside
body.addEventListener('click', (e) => {
  if (e.target === section) {
    const section = e.target as HTMLDivElement
    // check the clicked element class name
    if (section.className !== 'text-selection-content') {
      destroySection()
    }
  }
})

// listen to the keydown event
// and check that if the key is CTRL + M
body.addEventListener('keydown', (e) => {
  if (e.ctrlKey && e.key === 'm') {
    const selection = window.getSelection()
    const selectedText = selection?.toString().trim()
    if (selectedText && selectedText.length > 1) {
      buildSection(selectedText)
    }
  }
})

function buildSection(text: string) {
  // disable the page scroll
  section.classList.add('text-section-parent')

  body.style.overflow = 'hidden'
  body.appendChild(section)

  section.innerHTML = `
    <div class="text-selection-content">
      <p>${text}</p>
    </div>
    `
}

function destroySection() {
  body.removeChild(section)
  body.style.overflow = 'auto'
}
