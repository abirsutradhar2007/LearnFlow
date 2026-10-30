const extractYouTubeVideoId = (url) => {
    if (typeof url !== "string" || !url.trim()) {
        throw new Error("YouTube URL is required");
    }

    let parsedUrl;

    try {
        parsedUrl = new URL(url.trim());
    } catch {
        throw new Error("Invalid URL format");
    }

    const hostname = parsedUrl.hostname.toLowerCase();

    // Accept only recognized YouTube domains
    const allowedHosts = [
        "youtube.com",
        "www.youtube.com",
        "m.youtube.com",
        "music.youtube.com",
        "youtu.be",
        "www.youtube-nocookie.com",
        "youtube-nocookie.com"
    ];

    if (!allowedHosts.includes(hostname)) {
        throw new Error("Please provide a valid YouTube URL");
    }

    let videoId;

    // Format: https://youtu.be/VIDEO_ID
    if (hostname === "youtu.be") {
        videoId = parsedUrl.pathname.split("/").filter(Boolean)[0];
    }

    // Format: https://www.youtube.com/watch?v=VIDEO_ID
    else if (
        hostname === "youtube.com" ||
        hostname === "www.youtube.com" ||
        hostname === "m.youtube.com" ||
        hostname === "music.youtube.com"
    ) {
        if (parsedUrl.pathname === "/watch") {
            videoId = parsedUrl.searchParams.get("v");
        }

        // Format: https://www.youtube.com/embed/VIDEO_ID
        else if (parsedUrl.pathname.startsWith("/embed/")) {
            videoId = parsedUrl.pathname.split("/")[2];
        }

        // Format: https://www.youtube.com/live/VIDEO_ID
        else if (parsedUrl.pathname.startsWith("/live/")) {
            videoId = parsedUrl.pathname.split("/")[2];
        }
    }

    // Format: https://www.youtube-nocookie.com/embed/VIDEO_ID
    else if (
        hostname === "youtube-nocookie.com" ||
        hostname === "www.youtube-nocookie.com"
    ) {
        if (parsedUrl.pathname.startsWith("/embed/")) {
            videoId = parsedUrl.pathname.split("/")[2];
        }
    }

    // YouTube video IDs contain exactly 11 valid characters
    const videoIdPattern = /^[a-zA-Z0-9_-]{11}$/;

    if (!videoId || !videoIdPattern.test(videoId)) {
        throw new Error("Invalid YouTube video URL or video ID");
    }

    return videoId;
};

export default extractYouTubeVideoId;