import './content.css';

const INPUT_MAP_TO_PROPERTIES: {
  [key: string]: {
    cssPropertyName: string;
    className: string;
    unitMeasure: string | null;
    default: string | number;
  };
} = {
  fontSize: {
    cssPropertyName: 'font-size',
    className: 'text-selection-content-p',
    unitMeasure: 'px',
    default: '40',
  },
  fontFamily: {
    cssPropertyName: 'font-family',
    className: 'text-selection-content-p',
    unitMeasure: '',
    default: 'serif',
  },
  lineHeight: {
    cssPropertyName: 'line-height',
    className: 'text-selection-content-p',
    unitMeasure: 'px',
    default: '66',
  },
  wordSpacing: {
    cssPropertyName: 'word-spacing',
    className: 'text-selection-content-p',
    unitMeasure: 'px',
    default: '11',
  },
  textAlign: {
    cssPropertyName: 'text-align',
    className: 'text-selection-content-p',
    unitMeasure: '',
    default: 'left',
  },
  backgroundOpacity: {
    cssPropertyName: 'opacity',
    className: 'text-section-parent',
    unitMeasure: '',
    default: '100',
  },
  textColor: {
    cssPropertyName: 'color',
    className: 'text-selection-content-p',
    unitMeasure: '',
    default: '#222222',
  },
  textBackgroundColor: {
    cssPropertyName: 'background-color',
    className: 'text-section-parent',
    unitMeasure: '',
    default: '#ededed',
  },
};

const body = document.querySelector('body') as HTMLBodyElement;
const section = document.createElement('section') as HTMLDivElement;

chrome.runtime.onMessage.addListener((message: { selectedText: string }, _) => {
  if (message.selectedText.length > 1) {
    buildSection(message.selectedText);
    updateStylesFromLocalStorage();
  }
});

// Close button listener
body.addEventListener('click', (e) => {
  if (e.target && (e.target as HTMLElement).classList.contains('close-button-content')) {
    destroySection();
  }
});

body.addEventListener('keydown', (e) => {
  // and check that if the key is CTRL + M
  if (e.ctrlKey && e.code === 'KeyM') {
    const selection = window.getSelection();
    const selectedText = selection?.toString().trim();
    if (selectedText && selectedText.length > 1) {
      buildSection(selectedText);
      updateStylesFromLocalStorage();
    }
  }
  // check if the key is ESC
  if (e.key === 'Escape') {
    destroySection();
  }
});

// listen to update preview message from popup
chrome.runtime.onMessage.addListener(function (request, _) {
  if (request.message === 'update_style') {
    // map through INPUT_MAP_TO_PROPERTIES keys and update the css styles and class names
    console.log(request.key);
    console.log(request.value);
    // Object.keys(INPUT_MAP_TO_PROPERTIES).forEach((key) => {
    const value = request.value;
    const { cssPropertyName, className } = INPUT_MAP_TO_PROPERTIES[request.key];
    updateElementStyle(request.key, className, cssPropertyName, value);
    // });
  }
});

function updateStylesFromLocalStorage() {
  // map through INPUT_MAP_TO_PROPERTIES keys and update the css styles and class names
  Object.keys(INPUT_MAP_TO_PROPERTIES).forEach((key) => {
    const { cssPropertyName, className } = INPUT_MAP_TO_PROPERTIES[key];
    getItemFromStorage(key).then((value) => {
      console.log(key + ' = ' + value + ' ' + cssPropertyName + ' ' + className);
      updateElementStyle(key, className, cssPropertyName, value);
    });
  });
}

function buildSection(text: string) {
  // disable the page scroll
  section.classList.add('text-section-parent');
  body.style.overflow = 'hidden';
  body.appendChild(section);
  section.innerHTML = `
    <div class="text-selection-content">
      <svg class="close-button-content" x="0px" y="0px" width="25" height="25" viewBox="0 0 50 50">
      <path d="M 7.71875 6.28125 L 6.28125 7.71875 L 23.5625 25 L 6.28125 42.28125 L 7.71875 43.71875 L 25 26.4375 L 42.28125 43.71875 L 43.71875 42.28125 L 26.4375 25 L 43.71875 7.71875 L 42.28125 6.28125 L 25 23.5625 Z"></path>
      </svg>
      <p class="text-selection-content-p">${text}</p>
    </div>
    `;
}

function updateElementStyle(
  key: string,
  className: string,
  cssPropertyName: string,
  value: string,
) {
  const element = document.querySelector(`.${className}`) as HTMLElement;
  const unitMeasure = INPUT_MAP_TO_PROPERTIES[key].unitMeasure || '';

  // if the property is opacity then we need to divide the value by 100
  if (cssPropertyName === 'opacity') {
    return (element.style[cssPropertyName as any] = (parseInt(value) / 100).toString());
  }

  element.style[cssPropertyName as any] = value + unitMeasure;
  // console.log('updated style => ' + cssPropertyName + ` -- ${value} ${unitMeasure}`);
}

function destroySection() {
  body.removeChild(section);
  body.style.overflow = 'auto';
}

async function getItemFromStorage(key: string): Promise<string> {
  return chrome.storage.local.get([key]).then((result) => {
    if (result[key]) {
      return result[key];
    } else {
      return INPUT_MAP_TO_PROPERTIES[key].default;
    }
  });
}
