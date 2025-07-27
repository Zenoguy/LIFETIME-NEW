// Video handler for responsive YouTube embedding
document.addEventListener('DOMContentLoaded', function() {
    const videoContainer = document.getElementById('videoContainer');
    const videoId = 'h2nPN_AYfhI';
    
    if (!videoContainer) {
        console.error('Video container not found');
        return;
    }
    
    // Function to hide loading spinner
    function hideLoadingSpinner() {
        // Find the loading container (div with bg-gray-900 class)
        const loadingContainer = videoContainer.querySelector('.bg-gray-900');
        if (loadingContainer) {
            // Immediately remove the loading container
            loadingContainer.remove();
            console.log('Loading spinner removed successfully');
        }
        
        // Also try to find any remaining animate-spin elements
        const spinners = videoContainer.querySelectorAll('.animate-spin');
        spinners.forEach(spinner => {
            if (spinner.parentElement) {
                spinner.parentElement.remove();
            }
        });
    }
    
    // Try to hide spinner immediately on load
    hideLoadingSpinner();
    
    // Check if device is mobile (including tablets)
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth <= 768;
    
    if (isMobile) {
        // For mobile: Try iframe first, fallback to thumbnail
        console.log('Setting up mobile video...');
        
        // Clear any existing content first
        videoContainer.innerHTML = '';
        
        // Try to embed iframe first for mobile
        const iframe = document.createElement('iframe');
        iframe.className = 'absolute top-0 left-0 w-full h-full rounded-2xl';
        iframe.src = `https://www.youtube.com/embed/${videoId}?si=XLxGYgfp0K3FeZ6a&autoplay=0&rel=0&modestbranding=1`;
        iframe.title = 'YouTube video player';
        iframe.frameBorder = '0';
        iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
        iframe.referrerPolicy = 'strict-origin-when-cross-origin';
        iframe.allowFullscreen = true;
        
        // Create fallback thumbnail
        const createThumbnail = () => {
            const videoLink = document.createElement('a');
            videoLink.href = `https://www.youtube.com/watch?v=${videoId}`;
            videoLink.target = '_blank';
            videoLink.className = 'block relative w-full h-full group cursor-pointer';
            videoLink.style.cssText = 'display: block !important; width: 100% !important; height: 100% !important; background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);';
            
            const thumbnailImg = document.createElement('img');
            thumbnailImg.src = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
            thumbnailImg.alt = 'Mind Management Video';
            thumbnailImg.className = 'absolute top-0 left-0 w-full h-full object-cover rounded-2xl';
            thumbnailImg.style.cssText = 'display: block !important; opacity: 1 !important; visibility: visible !important; z-index: 1 !important;';
            
            const overlay = document.createElement('div');
            overlay.className = 'absolute inset-0 bg-black/30 rounded-2xl flex items-center justify-center';
            overlay.style.zIndex = '2';
            overlay.innerHTML = `
                <div class="text-center">
                    <div class="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center shadow-xl mb-2">
                        <svg class="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z"/>
                        </svg>
                    </div>
                    <p class="text-white text-sm font-medium">Watch on YouTube</p>
                </div>
            `;
            
            videoLink.appendChild(thumbnailImg);
            videoLink.appendChild(overlay);
            return videoLink;
        };
        
        // Try iframe first, fallback to thumbnail after timeout
        videoContainer.appendChild(iframe);
        
        // Set a timeout to check if iframe loaded properly
        setTimeout(() => {
            // If iframe didn't load properly, replace with thumbnail
            try {
                if (!iframe.contentDocument && !iframe.contentWindow) {
                    console.log('Iframe blocked, using thumbnail fallback');
                    videoContainer.innerHTML = '';
                    videoContainer.appendChild(createThumbnail());
                }
            } catch (e) {
                console.log('Iframe access denied, using thumbnail fallback');
                videoContainer.innerHTML = '';
                videoContainer.appendChild(createThumbnail());
            }
        }, 2000);
        
        // Also handle iframe errors
        iframe.onerror = () => {
            console.log('Iframe failed to load, using thumbnail');
            videoContainer.innerHTML = '';
            videoContainer.appendChild(createThumbnail());
        };
        
        hideLoadingSpinner();
        console.log('✅ Mobile video setup complete');
    } else {
        // For desktop: Embed YouTube iframe
        videoContainer.innerHTML = `
            <iframe 
                class="absolute top-0 left-0 w-full h-full rounded-2xl" 
                src="https://www.youtube.com/embed/${videoId}?si=XLxGYgfp0K3FeZ6a&autoplay=0&rel=0&modestbranding=1" 
                title="YouTube video player" 
                frameborder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                referrerpolicy="strict-origin-when-cross-origin" 
                allowfullscreen>
            </iframe>
        `;
        
        // Hide loading spinner for desktop
        hideLoadingSpinner(); // Remove immediately  
        setTimeout(hideLoadingSpinner, 50); // Also try after 50ms as backup
        console.log('Desktop YouTube iframe loaded');
    }
    
    // Handle window resize to switch between mobile and desktop
    let resizeTimeout;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(function() {
            const newIsMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth <= 768;
            if (newIsMobile !== isMobile) {
                location.reload(); // Simple reload to reinitialize
            }
        }, 250);
    });
});