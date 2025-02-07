document.addEventListener("DOMContentLoaded", function() {
    const videoContainers = document.querySelectorAll(".video-container");
    const videoModal = document.getElementById("videoModal");
    const videoFrame = document.getElementById("videoFrame");
    const closeModal = document.getElementById("closeModal");

    videoContainers.forEach(container => {
        container.addEventListener("click", function(event) {
            if (event.target.classList.contains("play-video")) {
                const videoId = container.getAttribute("data-video-id");
                videoFrame.src = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
                videoModal.classList.remove("hidden");
            }
        });
    });

    closeModal.addEventListener("click", function() {
        videoFrame.src = "";
        videoModal.classList.add("hidden");
    });
});

document.addEventListener('click', function(event) {
    if (event.target.classList.contains('share-button')) {
        const videoCard = event.target.closest('.video-container'); // Find the closest video container
        if (videoCard) {
            const videoId = videoCard.getAttribute('data-video-id'); // Get video ID
            const videoUrl = `https://www.youtube.com/watch?v=${videoId}`; // Construct the full video URL

            // Copy to clipboard
            navigator.clipboard.writeText(videoUrl).then(() => {
                showToast("📋 Video link copied to clipboard!");
            }).catch(err => {
                console.error('Failed to copy:', err);
            });
        }
    }
});

// Function to show a toast notification
function showToast(message) {
    let toast = document.createElement("div");
    toast.innerText = message;
    toast.style.position = "fixed";
    toast.style.bottom = "20px";
    toast.style.left = "50%";
    toast.style.transform = "translateX(-50%)";
    toast.style.background = "#0A4040";
    toast.style.color = "#fff";
    toast.style.padding = "10px 20px";
    toast.style.borderRadius = "5px";
    toast.style.boxShadow = "0 2px 10px rgba(0,0,0,0.2)";
    toast.style.zIndex = "9999";
    document.body.appendChild(toast);

    setTimeout(() => {
        toast.remove();
    }, 3000);
}
