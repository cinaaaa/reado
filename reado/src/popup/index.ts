import './index.css';
import HTML_TEMPLATE from './html';
import { INPUT_NAMES, ROOT_ELEMENT } from '../constants';
import { EventTypes } from '../constants/enums';

class PopupController {
  private inputs: string[];

  constructor(inputs: string[]) {
    this.inputs = inputs;
  }

  private async setItem(key: string, value: string): Promise<void> {
    await chrome.storage.local.set({ [key]: value });
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
              message: EventTypes.STYLE_UPDATE,
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
    document.querySelector<HTMLDivElement>(ROOT_ELEMENT)!.innerHTML = HTML_TEMPLATE;

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
      if (request.message === EventTypes.CLICKED_ON_CONTEXT_MENU) {
        this.inputs.forEach((inputId) => {
          this.updateSingleValueAndPreview(inputId);
        });
      }
    });
  }

  public intial(): void {
    this.initialize();
  }
}

const popupController = new PopupController(INPUT_NAMES);
popupController.intial();
