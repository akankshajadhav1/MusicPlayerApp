
import { async } from "@firebase/util";
import axios from "axios";

const baseURL = "http://localhost:4000/"

export const validateUser = async (token) => {
    try {
        const res = await axios.get(`${baseURL}api/users/login`, {
            headers: {
                Authorization: "Bearer " + token,

            }
        })
        return res.data;

    } catch (error) {

    }
}
//fetch the data from mongoDb
export const getAllUsers = async (token) => {
    try {
        const res = await axios.get(`${baseURL}api/users/getUsers`)
        return res.data
    } catch (error) {
        return null;
    }
}

export const getAllArtist = async () => {
    try {
        const res = await axios.get(`${baseURL}api/artist/getAll`);
        return res.data;
    } catch (error) {
        return null;
    }
};

export const getAllAlbums = async () => {
    try {
        const res = await axios.get(`${baseURL}api/album/getAll`);
        return res.data;
    } catch (error) {
        return null;
    }
};
export const getAllSongs = async () => {
    try {
        const res = await axios.get(`${baseURL}api/song/getAll`);
        return res.data;

    } catch (error) {
        return null;
    }
};

export const changeUserRole = async (userId, role) => {
    try {
        const res = await axios.put(`${baseURL}api/users/updateRole/${userId}`, { data: { role: role } })
        return res;
    } catch (error) {
        return null;
    }

}
export const removeUser = async (userId) => {
    try {
        const res = axios.delete(`${baseURL}api/users/deleteUser/${userId}`)
        return res;
    } catch (error) {
        return null;
    }
}

export const saveNewSong = async (data) => {
    try {
        const res = axios.post(`${baseURL}api/song/save`, { ...data })
        return (await res).data.savedSong
    } catch (error) {
        return null;
    }
}

export const saveNewArtist = async (data) => {
    try {
        const res = axios.post(`${baseURL}api/artist/save`, { ...data })
        return (await res).data.savedArtist
    } catch (error) {
        return null;
    }
}

export const saveNewAlbum = async (data) => {
    try {
        const res = axios.post(`${baseURL}api/album/save`, { ...data })
        return (await res).data.savedAlbum
    } catch (error) {
        return null;
    }
}

export const deleteSongById = async (id) => {
    try {
        const res = axios.delete(`${baseURL}api/song/delete/${id}`)
        return res;
    } catch (error) {
        return null;
    }
}

export const deleteAlbumById = async (id) => {
    try {
        const res = axios.delete(`${baseURL}api/album/delete/${id}`)
        return res;
    } catch (error) {
        return null;
    }
}

export const deleteArtistById = async (id) => {
    try {
        const res = axios.delete(`${baseURL}api/artist/delete/${id}`)
        return res;
    } catch (error) {
        return null;
    }
}


