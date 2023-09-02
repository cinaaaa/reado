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

  chrome.contextMenus.create({ title: 'Oops', parentId: 999, id: 'errorItem' }, function () {
    if (chrome.runtime.lastError) {
      console.log('Got expected error: ' + chrome.runtime.lastError.message)
    }
  })
})
