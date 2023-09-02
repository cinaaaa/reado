chrome.runtime.onInstalled.addListener(function () {
  // Create one test item for each context type.
  chrome.contextMenus.create({
    title: 'Magnify with Reado',
    id: 'selection',
    contexts: ['selection'],
  })

  // Open a new search tab when the user clicks a context menu
  chrome.contextMenus.onClicked.addListener(async (item, tab) => {
    chrome.tabs.sendMessage(tab?.id as number, { selectedText: item.selectionText as string })
  })

  // Intentionally create an invalid item, to show off error checking in the
  // create callback.
  chrome.contextMenus.create({ title: 'Oops', parentId: 999, id: 'errorItem' }, function () {
    if (chrome.runtime.lastError) {
      console.log('Got expected error: ' + chrome.runtime.lastError.message)
    }
  })
})
