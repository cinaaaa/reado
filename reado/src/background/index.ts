chrome.runtime.onInstalled.addListener(function () {
  // Create one test item for each context type.
  chrome.contextMenus.create({
    title: 'Magnify with Reado',
    id: 'selection',
    contexts: ['selection'],
  })

  chrome.contextMenus.onClicked.addListener(async (item, tab) => {
    chrome.tabs.sendMessage(tab?.id as number, { selectedText: item.selectionText as string })
  })
})
