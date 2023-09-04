chrome.runtime.onInstalled.addListener(function () {
  chrome.contextMenus.create({
    title: 'Magnify with Reado 🔎',
    id: 'selection',
    contexts: ['selection'],
  });

  chrome.contextMenus.onClicked.addListener(async (item, tab) => {
    chrome.tabs.sendMessage(tab?.id as number, { selectedText: item.selectionText as string });
  });
});

chrome.runtime.onMessage.addListener(function (request, _) {
  if (request.message === 'clicked_browser_action') {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.sendMessage(tabs[0].id as number, { message: 'clicked_browser_action' });
    });
  }
});
