import { EventTypes } from '../constants/enums';

chrome.runtime.onInstalled.addListener(function () {
  chrome.contextMenus.create({
    title: 'Magnify with Reado 🔎',
    id: 'selection',
    contexts: ['selection'],
  });

  chrome.contextMenus.onClicked.addListener(async (item, _) => {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.sendMessage(tabs[0].id as number, { selectedText: item.selectionText as string });
    });
  });
});

chrome.runtime.onMessage.addListener(function (request, _) {
  if (request.message === EventTypes.CLICKED_ON_CONTEXT_MENU) {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.sendMessage(tabs[0].id as number, { message: 'clicked_browser_action' });
    });
  }
});
