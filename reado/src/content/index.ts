import './content.css';
import { INPUT_MAP_TO_PROPERTIES } from '../constants';
import { EventTypes } from '../constants/enums';
import CONTENT_HTML from './content-html';

class ContentController {
  private section: HTMLDivElement;
  private body: HTMLBodyElement;

  constructor() {
    this.body = document.querySelector('body') as HTMLBodyElement;
    this.section = document.createElement('section') as HTMLDivElement;

    this.setupListeners();
  }

  private setupListeners(): void {
    this.body.addEventListener('click', (e) => this.handleCloseButtonClick(e));
    this.body.addEventListener('keydown', (e) => this.handleKeyPress(e));

    chrome.runtime.onMessage.addListener((request, _) => {
      if (request.message === EventTypes.STYLE_UPDATE) {
        const { cssPropertyName, className } = INPUT_MAP_TO_PROPERTIES[request.key];
        this.updateElementStyle(request.key, className, cssPropertyName, request.value);
      }
    });

    chrome.runtime.onMessage.addListener((message: { selectedText: string }, _) => {
      if (message.selectedText.length > 1) {
        this.buildSection(message.selectedText);
        this.updateStylesFromLocalStorage();
      }
    });
  }

  private handleCloseButtonClick(e: Event): void {
    if (e.target && (e.target as HTMLElement).classList.contains('close-button-content')) {
      this.destroySection();
    }
  }

  private handleKeyPress(e: KeyboardEvent): void {
    if (e.ctrlKey && e.code === 'KeyM') {
      const selection = window.getSelection();
      const selectedText = selection?.toString().trim();
      if (selectedText && selectedText.length > 1) {
        this.buildSection(selectedText);
        this.updateStylesFromLocalStorage();
      }
    }

    if (e.key === 'Escape') {
      this.destroySection();
    }
  }

  private updateElementStyle(
    key: string,
    className: string,
    cssPropertyName: string,
    value: string,
  ): void | string {
    const element = document.querySelector(`.${className}`) as HTMLElement;
    const unitMeasure = INPUT_MAP_TO_PROPERTIES[key].unitMeasure || '';

    if (cssPropertyName === 'opacity') {
      return (element.style[cssPropertyName as any] = (parseInt(value) / 100).toString());
    }

    element.style[cssPropertyName as any] = value + unitMeasure;
  }

  private async updateStylesFromLocalStorage(): Promise<void> {
    for (const key of Object.keys(INPUT_MAP_TO_PROPERTIES)) {
      const { cssPropertyName, className } = INPUT_MAP_TO_PROPERTIES[key];
      const value = await this.getItemFromStorage(key);
      this.updateElementStyle(key, className, cssPropertyName, value);
    }
  }

  private toggleHtmlBaseScroll(state: 'auto' | 'hidden'): void {
    // @ts-ignore
    const htmlElement = document.querySelector('html');
    if (!htmlElement) return;

    htmlElement.style.overflow = state;
  }

  private buildSection(text: string): void {
    this.toggleHtmlBaseScroll('hidden');
    this.section.classList.add('text-section-parent');
    this.body.appendChild(this.section);
    this.section.innerHTML = CONTENT_HTML.replace('{text}', text);
  }

  private clearListeners(): void {
    this.body.removeEventListener('click', (e) => this.handleCloseButtonClick(e));
    this.body.removeEventListener('keydown', (e) => this.handleKeyPress(e));
  }

  private destroySection(): void {
    this.toggleHtmlBaseScroll('auto');
    this.clearListeners();
    this.section.remove();
  }

  private async getItemFromStorage(key: string): Promise<string> {
    const result = await chrome.storage.local.get([key]);
    return result[key] || INPUT_MAP_TO_PROPERTIES[key].default;
  }

  public initialize(): void {
    this.setupListeners();
  }
}

const contentController = new ContentController();
contentController.initialize();
