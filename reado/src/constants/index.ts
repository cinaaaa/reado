export const INPUT_MAP_TO_PROPERTIES: {
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

export const INPUT_NAMES: string[] = [
  'fontSize',
  'fontFamily',
  'lineHeight',
  'wordSpacing',
  'textAlign',
  'backgroundOpacity',
  'textBackgroundColor',
  'textColor',
];

export const ROOT_ELEMENT = '#app';
