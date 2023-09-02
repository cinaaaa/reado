import './content.css'

const body = document.querySelector('body') as HTMLBodyElement
const section = document.createElement('section') as HTMLDivElement
section.classList.add('text-section-parent')

chrome.runtime.onMessage.addListener((message: { selectedText: string }, _) => {
  if (message.selectedText.length > 1) {
    // disable the page scroll
    body.style.overflow = 'hidden'

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

// remove the elmenet when clicked outside
body.addEventListener('click', (e) => {
  if (e.target === section) {
    const section = e.target as HTMLDivElement
    // check the clicked element class name
    if (section.className !== 'text-selection-content') {
      body.removeChild(section)
      body.style.overflow = 'auto'
    }
  }
})
