document.addEventListener('DOMContentLoaded', () => {
    // Initialize Pannellum viewer
    const viewer = pannellum.viewer('panorama', {
        "type": "equirectangular",
        "panorama": "street.jpg", // The 360 image provided by user
        "autoLoad": true,
        "compass": false,
        "showFullscreenCtrl": true,
        "showControls": true,
        "mouseZoom": true,
        "keyboardZoom": true,
        "pitch": 0,
        "yaw": 0,
        "hfov": 100, // Starting Field of View
        "minHfov": 50,
        "maxHfov": 120,
    });

    const loader = document.getElementById('loader');

    // Hide loader when Pannellum finishes loading the panorama
    viewer.on('load', () => {
        // Add a slight delay for aesthetic purposes
        setTimeout(() => {
            loader.classList.add('loader-hidden');
        }, 500);
    });

    // Fallback if load event doesn't fire for some reason
    setTimeout(() => {
        if (!loader.classList.contains('loader-hidden')) {
            loader.classList.add('loader-hidden');
        }
    }, 4000);
});
