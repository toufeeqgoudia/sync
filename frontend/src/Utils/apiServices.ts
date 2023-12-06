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
      headers: {
        Authorization: `Token ${token}`,
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });

    return response.data;
  } catch (error) {
    console.log("Error fetching memberships.");
    throw error;
  }
};

// interface User {
//   id: number;
//   fullname: string;
//   username: string;
//   email: string;
//   colour: string;
// }

// interface Board {
//   id: number;
//   title: string;
//   description: string;
//   created_at: string;
//   user: User;
// }

interface Membership {
  user: number | undefined;
  board: number | undefined;
}

export const addMembership = async (data: Membership) => {
  try {
    const response = await instance.post("/api/memberships/", data, {
      headers: {
        Authorization: `Token ${token}`,
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });

    return response.data;
  } catch (error) {
    console.log("Error adding memberships.");
    throw error;
  }
};

/**
 * BOARDS
 */

export const fetchBoards = async () => {
  try {
    const response = await instance.get("/api/boards/", {
      headers: {
        Authorization: `Token ${token}`,
        "Content-Type": "application/json",
      },
      withCredentials: true,
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
  user: number | undefined;
}

export const createBoard = async (data: BoardData) => {
  try {
    await instance.post("/api/boards/", data, {
      headers: {
        Authorization: `Token ${token}`,
        "Content-Type": "application/json",
      },
      withCredentials: true,
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
      headers: {
        Authorization: `Token ${token}`,
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });

    return response.data;
  } catch (error) {
    console.log("Error fetching board.");
    throw error;
  }
};

export const deleteBoard = async (id: BoardId) => {
  try {
    await instance.delete(`/api/boards/${id}`, {
      headers: {
        Authorization: `Token ${token}`,
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });
  } catch (error) {
    console.log("Error deleting board.");
    throw error;
  }
};

/**
 * Lists
 */

export const fetchLists = async () => {
  try {
    const response = await instance.get('/api/lists/', {
      headers: {
        Authorization: `Token ${token}`,
        'Content-Type': 'application/json'
      },
      withCredentials: true,
    })

    return response.data
  } catch (error) {
    console.log("Error fetching cards.")
    throw error;
  }
}

/**
 * Cards
 */

export const fetchCards = async () => {
  try {
    const response = await instance.get('/api/cards/', {
      headers: {
        Authorization: `Token ${token}`,
        'Content-Type': 'application/json'
      },
      withCredentials: true,
    })

    return response.data
  } catch (error) {
    console.log("Error fetching cards.")
    throw error;
  }
}

/**
 * Search Users
 */

export const searchUsers = async () => {
  try {
    const response = await instance.get(`/api/allusers/`, {
      headers: {
        Authorization: `Token ${token}`,
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.log("Error fetching users.");
    throw error;
  }
};
