// Copyright 2023 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     https://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

// A generic onclick callback function.
chrome.contextMenus.onClicked.addListener(genericOnClick)

// A generic onclick callback function.
function genericOnClick(info: any) {
  switch (info.menuItemId) {
    case 'radio':
      // Radio item function
      console.log('Radio item clicked. Status:', info.checked)
      break
    case 'checkbox':
      // Checkbox item function
      console.log('Checkbox item clicked. Status:', info.checked)
      break
    default:
      // Standard context menu item function
      console.log('Standard context menu item clicked.')
  }
}
chrome.runtime.onInstalled.addListener(function () {
  // Create one test item for each context type.
  chrome.contextMenus.create({
    title: 'Reado',
    id: 'selection',
    contexts: ['selection'],
  })

  // Open a new search tab when the user clicks a context menu
  chrome.contextMenus.onClicked.addListener(async (item, tab) => {
    // const tld = item.menuItemId
    // const url = new URL(`https://google.${tld}/search`)
    // url.searchParams.set('q', item.selectionText as string)
    // chrome.tabs.create({ url: url.href, index: tab.index + 1 })
    // const [tab] = await chrome.tabs.query({ active: true, lastFocusedWindow: true })
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
