import { apiRequest } from "./api.service.js";

export const generateMaterials = async (youtubeUrl) => {
  return apiRequest("/materials", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ youtubeUrl }),
    notifyUnauthorized: true,
    refreshOnUnauthorized: true,
  });
};

export const getMaterialById = async (videoId) => {
  const result = await apiRequest(
    `/materials/${encodeURIComponent(videoId)}`,
    { notifyUnauthorized: true, refreshOnUnauthorized: true }
  );
  return result.data;
};

// Get all stored videos with pagination
export const getAllMaterials = async (page = 1, limit = 10) => {
  const result = await apiRequest(
    `/materials?page=${page}&limit=${limit}`,
    { notifyUnauthorized: true, refreshOnUnauthorized: true }
  );
  return {
    materials: result.data,
    pagination: result.pagination,
  };
};