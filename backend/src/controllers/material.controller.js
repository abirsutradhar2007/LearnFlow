import Material from "../models/material.model.js";
import { extractYouTubeVideoId } from "../utils/ytUrlValidator.util.js";
import { getTranscript } from "../services/transcript.service.js";
import { generateLearningMaterials } from "../services/ai.service.js";
import ApiError from "../utils/apiError.util.js";
import asyncHandler from "../utils/asyncHandler.util.js";



const generateMaterials = asyncHandler(async (req, res) => {

    // STEP 1: Get YouTube URL
    const { youtubeUrl } = req.body;

    if (!youtubeUrl || typeof youtubeUrl !== "string") {
        throw new ApiError(400, "YouTube URL is required");
    }


    // STEP 2: Extract video ID
    const videoId = extractYouTubeVideoId(youtubeUrl);

    if (!videoId) {
        throw new ApiError(400, "Invalid YouTube URL");
    }


    // STEP 3: Check MongoDB for existing materials
    const existingMaterial = await Material.findOne({ videoId });

    if (existingMaterial) {
        return res.status(200).json({
            success: true,
            message: "Existing learning materials found",
            cached: true,
            data: existingMaterial
        });
    }


    // STEP 4: Retrieve transcript
    const transcript = await getTranscript(videoId);

    if (!transcript || typeof transcript !== "string" || !transcript.trim()) {
        throw new ApiError(
            422,
            "Transcript unavailable for this video"
        );
    }


    // STEP 5: Generate materials using AI
    const generatedMaterials = await generateLearningMaterials(transcript);


    // STEP 6: Validate AI output
    const {
        title,
        summary,
        notes,
        flashcards,
        quiz
    } = generatedMaterials || {};

    if (
        typeof summary !== "string" ||
        !summary.trim() ||
        typeof title !== "string" ||
        !title.trim() ||
        !Array.isArray(notes) ||
        !Array.isArray(flashcards) ||
        !Array.isArray(quiz)
    ) {
        throw new ApiError(
            502,
            "AI returned an invalid learning materials format"
        );
    }


    // STEP 7: Save materials in MongoDB
    let savedMaterial;

    try {
        savedMaterial = await Material.create({
            videoId,
            videoUrl: youtubeUrl,
            title,
            summary,
            notes,
            flashcards,
            quiz
        });
    } catch (error) {

        // Handle simultaneous requests for the same video.
        // Another request may have saved it first.
        if (error.code === 11000) {
            const cachedMaterial = await Material.findOne({ videoId });

            if (cachedMaterial) {
                return res.status(200).json({
                    success: true,
                    message: "Existing learning materials found",
                    cached: true,
                    data: cachedMaterial
                });
            }
        }

        throw error;
    }


    // STEP 8: Return response
    return res.status(201).json({
        success: true,
        message: "Learning materials generated successfully",
        cached: false,
        data: savedMaterial
    });

});

export default generateMaterials;
