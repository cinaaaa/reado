import './index.css';

const inputsToStore = [
  'fontSize',
  'fontFamily',
  'lineHeight',
  'letterSpacing',
  'wordSpacing',
  'textAlign',
  'backgroundOpacity',
  'textBackgroundColor',
  'textColor',
];

// Listen to changes in input values and update the preview
function updateValues() {
  const inputsToPreview = [
    'fontSize',
    'fontFamily',
    'lineHeight',
    'letterSpacing',
    'wordSpacing',
    'textAlign',
    'backgroundOpacity',
    'textBackgroundColor',
    'textColor',
  ];

  for (let inputId of inputsToPreview) {
    try {
      let inputElement = document.getElementById(inputId) as HTMLInputElement;
      let previewElement = document.getElementById(`${inputId}Value`) as HTMLSpanElement;

      // if not previewElement, skip
      if (previewElement) {
        previewElement.innerHTML = inputElement.value;
      }

      // persist the value to the local storage
      localStorage.setItem(inputId, inputElement.value);
      console.log('updated ' + inputId);
      console.log('value is  => ' + inputElement.value);
    } catch (e) {
      console.log(inputId + ' not found');
    }
  }
}

function initialValuesFromStorage() {
  for (let inputId of inputsToStore) {
    let inputElement = document.getElementById(inputId) as HTMLInputElement;
    let previewElement = document.getElementById(`${inputId}Value`) as HTMLSpanElement;
    let storedValue = localStorage.getItem(inputId) || null;

    try {
      if (storedValue) {
        inputElement.value = storedValue;
        previewElement.innerHTML = storedValue;
      }
    } catch (e) {
      console.log(inputId + ' not found');
    }
  }
}

// listen to reado-component load and update preview
document.addEventListener('change', function (e) {
  if (e.target && inputsToStore.includes((e.target as HTMLElement).id)) {
    updateValues();
  }
});

// listen to reado-component load and update preview
document.addEventListener('DOMContentLoaded', function () {
  initialValuesFromStorage();
});

// listen to extension open and update preview
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.message === 'clicked_browser_action') {
    initialValuesFromStorage();
  }
});

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <main id="reado--component">
  <h1 class="reado--h1">Reado</h1>
  <h2 class="reado--h2">Adjust your reading preferences</h2>
  <div class="reado--grid-container">
    <div class="reado--grid-item">
      <h3>Font Size</h3>
      <input type="range" min="1" max="100" value="50" class="reado--slider reado" id="fontSize">
      <span id="fontSizeValue" class="reado">50</span>
    </div>
    <div class="reado--grid-item">
      <h3>Font Family</h3>
      <select name="font-family" id="fontFamily">
        <option value="sans-serif">Sans-serif</option>
        <option value="serif">Serif</option>
        <option value="monospace">Monospace</option>
        <option value="roboto">Roboto</option>
      </select>
    </div>
    <div class="reado--grid-item">
      <h3>Line Height</h3>
      <input type="range" min="1" max="100" value="50" class="reado--slider" id="lineHeight">
      <span id="lineHeightValue">50</span>
    </div>
    <div class="reado--grid-item">
      <h3>Letter Spacing</h3>
      <input type="range" min="1" max="100" value="50" class="reado--slider" id="letterSpacing">
      <span id="letterSpacingValue">50</span>
    </div>
    <div class="reado--grid-item">
      <h3>Word Spacing</h3>
      <input type="range" min="1" max="100" value="50" class="reado--slider" id="wordSpacing">
      <span id="wordSpacingValue">50</span>
    </div>
    <div class="reado--grid-item">
      <h3>Text Align</h3>
      <select name="text-align" id="textAlign">
        <option value="left">Left</option>
        <option value="center">Center</option>
        <option value="right">Right</option>
      </select>
    </div>
    <div class="reado--grid-item">
      <h3>Background Opacity</h3>
      <input type="range" min="1" max="100" value="50" class="reado--slider" id="backgroundOpacity">
      <span id="backgroundOpacityValue">50</span>
    </div>
    <div class="reado--grid-item">
      <h3>Text Background Color</h3>
      <input type="color" id="textBackgroundColor" name="text-background-color" value="#ffffff">
    </div>
    <div class="reado--grid-item">
      <h3>Text Color</h3>
      <input type="color" id="textColor" name="text-color" value="#000000" onchange="alert('test')">
    </div>
  </div>
</main>
`;
