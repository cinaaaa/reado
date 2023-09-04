(function () {
  'use strict';

  (async () => {
    await import(
      /* @vite-ignore */
      chrome.runtime.getURL("assets/chunk-f557ce1e.js")
    );
  })().catch(console.error);

})();
