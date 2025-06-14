/******/ (() => { // webpackBootstrap
/*!**********************************!*\
  !*** ./src/video-search/view.js ***!
  \**********************************/
/**
 * Use this file for JavaScript code that you want to run in the front-end
 * on posts/pages that contain this block.
 *
 * When this file is defined as the value of the `viewScript` property
 * in `block.json` it will be enqueued on the front end of the site.
 *
 * Example:
 *
 * ```js
 * {
 *   "viewScript": "file:./view.js"
 * }
 * ```
 *
 * If you're not making any changes to this file because your project doesn't need any
 * JavaScript running in the front-end, then you should delete this file and remove
 * the `viewScript` property from `block.json`.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-metadata/#view-script
 */

/* eslint-disable no-console */
console.log('Hello World! (from create-block-video-search block)');
/* eslint-enable no-console */

document.addEventListener('DOMContentLoaded', function () {
  const searchBlocks = document.querySelectorAll('.video-search-block');
  searchBlocks.forEach(block => {
    const searchInput = block.querySelector('.video-search-input');
    const searchButton = block.querySelector('.video-search-button');
    const modal = block.querySelector('.video-search-modal');
    const closeButton = block.querySelector('.video-search-modal-close');
    const resultsContainer = block.querySelector('.video-search-results');
    const postTypes = JSON.parse(block.dataset.postTypes || '["post", "page"]');

    // Function to perform search
    const performSearch = async searchTerm => {
      try {
        const response = await fetch('/wp-json/wp/v2/search', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          },
          params: {
            search: searchTerm,
            type: postTypes.join(','),
            per_page: 10
          }
        });
        if (!response.ok) {
          throw new Error('Search failed');
        }
        const results = await response.json();
        displayResults(results);
      } catch (error) {
        console.error('Search error:', error);
        resultsContainer.innerHTML = '<p>Error performing search. Please try again.</p>';
      }
    };

    // Function to display results
    const displayResults = results => {
      if (results.length === 0) {
        resultsContainer.innerHTML = '<p>No results found.</p>';
        return;
      }
      const resultsHTML = results.map(result => `
                <div class="search-result-item">
                    <h3><a href="${result.url}">${result.title}</a></h3>
                    <p>${result.subtype}</p>
                </div>
            `).join('');
      resultsContainer.innerHTML = resultsHTML;
    };

    // Event Listeners
    const handleSearch = () => {
      const searchTerm = searchInput.value.trim();
      if (searchTerm) {
        performSearch(searchTerm);
        modal.style.display = 'block';
      }
    };
    searchButton.addEventListener('click', handleSearch);
    searchInput.addEventListener('keypress', e => {
      if (e.key === 'Enter') {
        handleSearch();
      }
    });
    closeButton.addEventListener('click', () => {
      modal.style.display = 'none';
    });
    window.addEventListener('click', e => {
      if (e.target === modal) {
        modal.style.display = 'none';
      }
    });
  });
});
/******/ })()
;
//# sourceMappingURL=view.js.map