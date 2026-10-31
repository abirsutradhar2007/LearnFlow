import {
    fetchTranscript,
    YoutubeTranscriptNotAvailableLanguageError
} from "youtube-transcript";

// const { YoutubeTranscript } = require("youtube-transcript");

export const getTranscript = async (videoId, language = "en") => {
    if (!videoId || typeof videoId !== "string") {
        throw new Error("A valid YouTube video ID is required");
    }

    if (!/^[a-zA-Z0-9_-]{11}$/.test(videoId)) {
        throw new Error("Invalid YouTube video ID");
    }

    let transcript;

    try {
        transcript = await fetchTranscript(videoId, { lang: language });
    } catch (error) {
        if (language !== "en" || !(error instanceof YoutubeTranscriptNotAvailableLanguageError)) {
            console.error("Error fetching transcript:", error);
            throw new Error("Failed to fetch transcript");
        }

        try {
            transcript = await fetchTranscript(videoId);
        } catch (fallbackError) {
            console.error("Error fetching default transcript:", fallbackError);
            throw new Error("Failed to fetch transcript");
        }
    }

    if (!Array.isArray(transcript) || transcript.length === 0) {
        throw new Error("Transcript is unavailable for this video");
    }

    const transcriptText = transcript
        .map((segment) => segment.text)
        .join(" ")
        .trim();

    if (!transcriptText) {
        throw new Error("Transcript contains no readable text");
    }

    return transcriptText;
};
