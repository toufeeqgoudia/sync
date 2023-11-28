import axios from "axios";

const baseUrl = "http://127.0.0.1:8000";
const token = localStorage.getItem("token");

export const instance = axios.create({
  baseURL: baseUrl,
});

/**
 * MEMBERSHIPS
 */

export const getMemberships = async () => {
  try {
    const response = await instance.get("/api/memberships/", {
      headers: { Authorization: `Token ${token}` },
    });

    return response.data;
  } catch (error) {
    console.log("Error fetcing memberships.");
    throw error;
  }
};

/**
 * BOARDS
 */

export const fetchBoards = async () => {
  try {
    const response = await instance.get("/api/boards/", {
      headers: { Authorization: `Token ${token}` },
    });

    return response.data;
  } catch (error) {
    console.log("Error fetching boards.");
    throw error;
  }
};

interface BoardData {
  title: string;
  description: string;
}

export const createBoard = async (data: BoardData) => {
  try {
    await instance.post("/api/boards/", data, {
      headers: { Authorization: `Token ${token}` },
    });
  } catch (error) {
    console.log("Error creating board.");
    throw error;
  }
};

interface BoardId {
  id: string;
}

export const getBoard = async (id: BoardData) => {
  try {
    const response = await instance.get(`/api/boards/${id}`, {
      headers: { Authorization: `Token ${token}` },
    });

    return response.data
  } catch (error) {
    console.log("Error fetching board.");
    throw error;
  }
};

export const deleteBoard = async (id: BoardId) => {
  try {
    await instance.delete(`/api/boards/${id}`, {
      headers: { Authorization: `Token ${token}` },
    });
  } catch (error) {
    console.log("Error deleting board.");
    throw error;
  }
};

/**
 * Lists
 */
