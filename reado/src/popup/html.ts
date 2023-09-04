const HTML_TEMPLATE = `<main id="reado--component">
  <h1 class="reado--h1">Reado</h1>
  <h2 class="reado--h2">Adjust your reading preferences</h2>
  <div class="reado--grid-container">
    <div class="reado--grid-item">
      <h3>Font Size</h3>
      <input type="range" min="1" max="100" value="40" class="reado--slider reado" id="fontSize">
      <span id="fontSizeValue" class="reado">40</span>
    </div>
    <div class="reado--grid-item">
      <h3>Font Family</h3>
      <select name="font-family" id="fontFamily">
        <option value="serif" selected>Serif</option>
        <option value="sans-serif">Sans-serif</option>
        <option value="monospace">Monospace</option>
        <option value="roboto">Roboto</option>
      </select>
    </div>
    <div class="reado--grid-item">
      <h3>Line Height</h3>
      <input type="range" min="1" max="100" value="66" class="reado--slider" id="lineHeight">
      <span id="lineHeightValue">66</span>
    </div>
    <div class="reado--grid-item">
      <h3>Word Spacing</h3>
      <input type="range" min="1" max="100" value="11" class="reado--slider" id="wordSpacing">
      <span id="wordSpacingValue">11</span>
    </div>
    <div class="reado--grid-item">
      <h3>Text Align</h3>
      <select name="text-align" id="textAlign">
        <option value="left" selected>Left</option>
        <option value="center">Center</option>
        <option value="right">Right</option>
      </select>
    </div>
    <div class="reado--grid-item">
      <h3>Opacity</h3>
      <input type="range" min="1" max="100" value="100" class="reado--slider" id="backgroundOpacity">
      <span id="backgroundOpacityValue">100</span>
    </div>
    <div class="reado--grid-item">
      <h3>Background Color</h3>
      <input type="color" id="textBackgroundColor" name="text-background-color" value="#ededed">
    </div>
    <div class="reado--grid-item">
      <h3>Text Color</h3>
      <input type="color" id="textColor" name="text-color" value="#222222">
    </div>
  </div>
</main>
`;

export default HTML_TEMPLATE;
