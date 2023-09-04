import './index.css';
import HTML_TEMPLATE from './html';

class StyleEditor {
  private inputs: string[];

  constructor(inputs: string[]) {
    this.inputs = inputs;
  }

  private async setItem(key: string, value: string): Promise<void> {
    await chrome.storage.local.set({ [key]: value });
    console.log(`${key} = ${value}`);
  }

  private async getItem(key: string): Promise<string | undefined> {
    const result = await chrome.storage.local.get([key]);
    return result[key];
  }

  private updateValues(): void {
    this.inputs.forEach((inputId) => {
      const input = document.getElementById(inputId) as HTMLInputElement;
      const preview = document.getElementById(`${inputId}Value`) as HTMLSpanElement;

      if (input) {
        this.setItem(inputId, input.value).then(() =>
          chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            chrome.tabs.sendMessage(tabs[0].id!, {
              message: 'update_style',
              key: inputId,
              value: input.value,
            });
          }),
        );
      }

      if (preview) {
        preview.innerHTML = input.value;
      }
    });
  }

  private updateSingleValueAndPreview(inputId: string): void {
    const input = document.getElementById(inputId) as HTMLInputElement;
    const preview = document.getElementById(`${inputId}Value`) as HTMLSpanElement;

    this.getItem(inputId).then((value) => {
      if (!value) return;
      if (input) {
        input.value = value;
      }
      if (preview) {
        preview.innerHTML = value;
      }
    });
  }

  private initialize(): void {
    document.addEventListener('change', (e) => {
      if (e.target && this.inputs.includes((e.target as HTMLElement).id)) {
        this.updateValues();
      }
    });

    document.addEventListener('DOMContentLoaded', () => {
      this.inputs.forEach((inputId) => {
        this.updateSingleValueAndPreview(inputId);
      });
    });

    chrome.runtime.onMessage.addListener((request, _) => {
      if (request.message === 'clicked_browser_action') {
        this.inputs.forEach((inputId) => {
          this.updateSingleValueAndPreview(inputId);
        });
      }
    });
  }

  public start(): void {
    this.initialize();
  }
}

const inputs: string[] = [
  'fontSize',
  'fontFamily',
  'lineHeight',
  'wordSpacing',
  'textAlign',
  'backgroundOpacity',
  'textBackgroundColor',
  'textColor',
];

const styleEditor = new StyleEditor(inputs);

document.querySelector<HTMLDivElement>('#app')!.innerHTML = HTML_TEMPLATE;

styleEditor.start();
