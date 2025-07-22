// Video handler for responsive YouTube embedding
document.addEventListener('DOMContentLoaded', function() {
    const videoContainer = document.getElementById('videoContainer');
    const videoId = 'h2nPN_AYfhI';
    
    // Check if device is mobile
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    if (isMobile) {
        // For mobile: Show thumbnail with link to YouTube
        videoContainer.innerHTML = `
            <a href="https://www.youtube.com/watch?v=${videoId}" target="_blank" class="block relative w-full pb-[56.25%] overflow-hidden rounded-2xl">
                <img src="https://img.youtube.com/vi/${videoId}/maxresdefault.jpg" alt="Mind Management Video" class="absolute top-0 left-0 w-full h-full object-cover rounded-2xl">
                <div class="absolute inset-0 flex items-center justify-center">
                    <div class="w-16 h-16 md:w-20 md:h-20 bg-red-600 rounded-full flex items-center justify-center shadow-lg hover:bg-red-700 transition-colors">
                        <div class="w-0 h-0 border-t-8 border-b-8 border-l-12 border-t-transparent border-b-transparent border-l-white ml-1"></div>
                    </div>
                </div>
                <div class="absolute bottom-4 left-4 right-4 bg-black/50 text-white text-sm md:text-base p-2 rounded">
                    <p>Click to watch: Mind Management Techniques</p>
                </div>
            </a>
        `;
    } else {
        // For desktop: Embed YouTube iframe
        videoContainer.innerHTML = `
            <iframe 
                class="absolute top-0 left-0 w-full h-full rounded-2xl" 
                src="https://www.youtube.com/embed/${videoId}?si=XLxGYgfp0K3FeZ6a&autoplay=1" 
                title="YouTube video player" 
                frameborder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                referrerpolicy="strict-origin-when-cross-origin" 
                allowfullscreen>
            </iframe>
        `;
    }
});