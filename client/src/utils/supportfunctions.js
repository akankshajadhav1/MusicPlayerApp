import { deleteObject, ref } from "firebase/storage";
import { storage } from "../config/firebaseConfig";

export const filters = [
    { id: 2, name: "Pop", value: "pop" },
    { id: 3, name: "Rock", value: "rock" },
    { id: 4, name: "Melody", value: "melody" },
    { id: 5, name: "Chill", value: "chill" },
];

export const filterByLanguage = [
    { id: 1, name: "Marathi", value: "marathi" },
    { id: 2, name: "English", value: "english" },
    { id: 3, name: "Panjabi", value: "Panjabi" },
    { id: 4, name: "Tamil", value: "Tamil" },
    { id: 5, name: "Hindi", value: "hindi" },
];

export const deleteAnObject = (referenceUrl) => {
    const deleteRef = ref(storage, referenceUrl);
    deleteObject(deleteRef)
        .then(() => {
            return true;
        })
        .catch((error) => {
            return false;
        });
};