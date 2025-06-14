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
console.log( 'Hello World! (from create-block-video-search block)' );
/* eslint-enable no-console */

document.addEventListener('DOMContentLoaded', function() {
    const searchBlocks = document.querySelectorAll('.video-search-block');
    
    searchBlocks.forEach(block => {
        const searchInput = block.querySelector('.video-search-input');
        const searchButton = block.querySelector('.video-search-button');
        const modal = block.querySelector('.video-search-modal');
        const modalInput = block.querySelector('.modal-search-input');
        const modalButton = block.querySelector('.modal-search-button');
        const closeButton = block.querySelector('.video-search-modal-close');
        const resultsContainer = block.querySelector('.video-search-results');
        const postTypes = JSON.parse(block.dataset.postTypes || '["post", "page"]');
        const searchText = block.dataset.searchText || 'Search';

        // Function to perform search
        const performSearch = async (searchTerm) => {
            try {
                resultsContainer.innerHTML = '<p>Searching...</p>';
                
                // Get posts directly using the posts endpoint
                const postsResponse = await fetch(`/wp-json/wp/v2/posts?search=${encodeURIComponent(searchTerm)}&per_page=10&_embed`);
                
                if (!postsResponse.ok) {
                    throw new Error('Search failed');
                }

                const posts = await postsResponse.json();
                
                if (posts.length === 0) {
                    resultsContainer.innerHTML = '<p>No results found.</p>';
                    return;
                }

                displayResults(posts);
            } catch (error) {
                console.error('Search error:', error);
                resultsContainer.innerHTML = '<p>Error performing search. Please try again.</p>';
            }
        };

        // Function to display results
        const displayResults = (posts) => {
            if (posts.length === 0) {
                resultsContainer.innerHTML = '<p>No results found.</p>';
                return;
            }

            const resultsHTML = posts.map(post => `
                <div class="search-result-item">
                    <h3><a href="${post.link}">${post.title.rendered}</a></h3>
                    <div class="search-result-content">
                        ${post.excerpt.rendered}
                    </div>
                    <div class="search-result-meta">
                        <span class="post-type">${post.type}</span>
                        <span class="post-date">${new Date(post.date).toLocaleDateString()}</span>
                    </div>
                </div>
            `).join('');

            resultsContainer.innerHTML = resultsHTML;
        };

        // Function to handle search
        const handleSearch = (input) => {
            const searchTerm = input.value.trim();
            if (searchTerm) {
                performSearch(searchTerm);
            }
        };

        // Event Listeners for main search
        searchButton.addEventListener('click', () => {
            handleSearch(searchInput);
            if (searchInput.value.trim()) {
                modal.style.display = 'block';
                modalInput.value = searchInput.value;
            }
        });

        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                handleSearch(searchInput);
                if (searchInput.value.trim()) {
                    modal.style.display = 'block';
                    modalInput.value = searchInput.value;
                }
            }
        });

        // Event Listeners for modal search
        modalButton.addEventListener('click', () => {
            handleSearch(modalInput);
        });

        modalInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                handleSearch(modalInput);
            }
        });

        // Close modal
        closeButton.addEventListener('click', () => {
            modal.style.display = 'none';
        });

        window.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.style.display = 'none';
            }
        });
    });
});
