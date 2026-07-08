document.addEventListener('DOMContentLoaded', () => {
    const loader = document.getElementById('loader');

    // Fetch configuration from API
    fetch('/api/config')
        .then(response => response.json())
        .then(config => {
            // Initialize Pannellum viewer with fetched configuration
            const viewer = pannellum.viewer('panorama', config);

            // Hide loader when Pannellum finishes loading the initial scene
            viewer.on('load', () => {
                // Add a slight delay for aesthetic purposes
                setTimeout(() => {
                    if (!loader.classList.contains('loader-hidden')) {
                        loader.classList.add('loader-hidden');
                    }
                }, 500);
            });
        })
        .catch(error => {
            console.error('Error loading configuration:', error);
            loader.innerHTML = '<p>Error loading virtual tour.</p>';
        });
});
    // Fallback if load event doesn't fire for some reason
    setTimeout(() => {
        if (!loader.classList.contains('loader-hidden')) {
            loader.classList.add('loader-hidden');
        }
    }, 4000);
});
