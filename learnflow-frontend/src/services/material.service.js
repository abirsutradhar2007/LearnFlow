const API_URL = import.meta.env.VITE_API_URL;

export const generateMaterials = async (youtubeUrl) => {
  const response = await fetch(`${API_URL}/materials`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ youtubeUrl }),
  });

  const result = await response.json();

  if (!response.ok || !result.success) {
    throw new Error(
      result.message || "Failed to generate learning materials."
    );
  }

  return result;
};

export const getMaterialById = async (videoId) => {
  const response = await fetch(
    `${API_URL}/materials/${encodeURIComponent(videoId)}`
  );

  const result = await response.json();

  if (!response.ok || !result.success) {
    throw new Error(result.message || "Failed to fetch materials");
  }

  return result.data;
};

// Get all stored videos with pagination
export const getAllMaterials = async (page = 1, limit = 10) => {
  const response = await fetch(
    `${API_URL}/materials?page=${page}&limit=${limit}`
  );

  const result = await response.json();

  if (!response.ok || !result.success) {
    throw new Error(result.message || "Failed to fetch videos");
  }

  return result.data;
};