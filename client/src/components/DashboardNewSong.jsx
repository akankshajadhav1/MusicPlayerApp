import React, { useEffect, useRef, useState } from "react";
import {
    getStorage,
    ref,
    getDownloadURL,
    uploadBytesResumable,
    deleteObject,
} from "firebase/storage";
import { motion, progress } from "framer-motion";

import { BiCloudUpload } from "react-icons/bi";
import { MdDelete } from "react-icons/md";

import { storage } from "../config/firebaseConfig";
import { useStateValue } from "../context/StateProvider";
import FilterButtons from "./FilterButtons";
import {
    getAllAlbums,
    getAllArtist,
    getAllSongs,
    saveNewAlbum,
    saveNewArtist,
    saveNewSong,
} from "../api";
import { actionType } from "../context/reducer";
import { filterByLanguage, filters } from "../utils/supportfunctions";
import { IoMusicalNote } from "react-icons/io5";
//import AlertSuccess from "./AlertSuccess";
//import AlertError from "./AlertError";

const DashboardNewSong = () => {
    //Song
    const [songName, setSongName] = useState("");
    const [isImageLoading, setIsImageLoading] = useState(false)
    const [{ allArtists, allAlbums, artistFilter, albumFilter, languageFilter, filterTerm }, dispatch] = useStateValue()
    const [songImageCover, setSongImageCover] = useState(null)
    const [imageUploadProgress, setImageUploadProgress] = useState(0);

    //Audio

    const [audioImageCover, setAudioImageCover] = useState(null)
    const [audioUploadProgress, setAudioUploadProgress] = useState(0)
    const [isAudioLoading, setIsAudioLoading] = useState(false)
    const [audioName, setAudioName] = useState("")

    // //Artist
    const [isArtistUploading, setIsArtistUploading] = useState(false);
    const [artistImageCover, setArtistImageCover] = useState('');
    const [artistUploadProgress, setArtistUploadProgress] = useState(0);
    const [artistName, setArtistName] = useState("")
    const [twitter, setTwitter] = useState("")
    const [instagram, setInstagram] = useState("")

    // //Album
    const [albumImageCover, setAlbumImageCover] = useState(null)
    const [albumUploadProgress, setAlbumUploadProgress] = useState(0)
    const [isAlbumUploading, setIsAlbumUploading] = useState(false)
    const [albumName, setAlbumName] = useState("")
    useEffect(() => {
        if (!allArtists) {
            getAllArtist().then(data => {
                dispatch({
                    type: actionType.SET_ALL_ARTISTS,
                    allArtists: data.artist
                })
            })
        }

        if (!allAlbums) {
            getAllAlbums().then(data => {
                dispatch({
                    type: actionType.SET_ALL_ALBUMS,
                    allAlbums: data.album
                })
            })
        }

    }, [])

    const deleteFileObject = (url, isImage) => {
        if (isImage) {
            setIsImageLoading(true)
            setIsAudioLoading(true)
            setIsAlbumUploading(true)
            setIsArtistUploading(true)

        }

        const deleteRef = ref(storage, url);
        deleteObject(deleteRef).then(() => {

            setSongImageCover(null)
            setAudioImageCover(null)
            setAlbumImageCover(null)
            setArtistImageCover(null)
            setIsImageLoading(false)
            setIsAudioLoading(false)
            setIsAlbumUploading(false)
            setIsArtistUploading(false)

        })
    }
    const saveSong = () => {
        if (!songImageCover || !audioImageCover) {
            //throw alert
            dispatch({
                type: actionType.SET_ALERT_TYPE,
                alertType: "danger"
            })

            setInterval(() => {
                dispatch({
                    type: actionType.SET_ALERT_TYPE,
                    alertType: "null"
                })
            }, 3000)

        } else {
            setIsAudioLoading(true)
            setIsImageLoading(true)

            const data = {
                name: songName,
                imageURL: songImageCover,
                songURL: audioImageCover,
                album: albumFilter,
                artist: artistFilter,
                language: languageFilter,
                category: filterTerm
            }
            saveNewSong(data).then(() => {
                getAllSongs().then(song => {
                    dispatch({
                        type: actionType.SET_ALL_SONGS,
                        allSongs: song.song
                    })
                })
            })
            dispatch({
                type: actionType.SET_ALERT_TYPE,
                alertType: "success"
            })

            setInterval(() => {
                dispatch({
                    type: actionType.SET_ALERT_TYPE,
                    alertType: "null"
                })
            }, 3000)

            setSongName(null)
            setIsAudioLoading(false)
            setIsImageLoading(false)
            setSongImageCover(null)
            setAudioImageCover(null)
            dispatch({ type: actionType.SET_ARTIST_FILTER, artistFilter: null })
            dispatch({ type: actionType.SET_LANGUAGE_FILTER, languageFilter: null })
            dispatch({ type: actionType.SET_ALBUM_FILTER, albumFilter: null })
            dispatch({ type: actionType.SET_FILTER_TERM, filterTerm: null })
        }
    }

    const saveArtist = () => {
        if (!artistImageCover || !artistName || !twitter || !instagram) {
            dispatch({
                type: actionType.SET_ALERT_TYPE,
                alertType: "danger"
            })

            setInterval(() => {
                dispatch({
                    type: actionType.SET_ALERT_TYPE,
                    alertType: "null"
                })
            }, 3000)
        }
        else {
            setIsArtistUploading(true)
            const data = {
                name: artistName,
                imageURL: artistImageCover,
                twitter: twitter,
                instagram: instagram
            }
            saveNewArtist(data).then(() => {
                getAllArtist().then((data) => {
                    dispatch({
                        type: actionType.SET_ALL_ARTISTS,
                        allArtists: data.artist
                    })
                })
            })
            dispatch({
                type: actionType.SET_ALERT_TYPE,
                alertType: "success"
            })

            setInterval(() => {
                dispatch({
                    type: actionType.SET_ALERT_TYPE,
                    alertType: "null"
                })
            }, 3000)

            setIsArtistUploading(false)
            setArtistImageCover(null)
            setTwitter("")
            setInstagram("")
        }

    }

    const saveAlbum = () => {
        if (!albumImageCover || !albumName) {
            dispatch({
                type: actionType.SET_ALERT_TYPE,
                alertType: "danger"
            })

            setInterval(() => {
                dispatch({
                    type: actionType.SET_ALERT_TYPE,
                    alertType: "null"
                })
            }, 3000)
        } else {
            setIsAlbumUploading(true)
            const data = {
                name: albumName,
                imageURL: albumImageCover,
            }
            saveNewAlbum(data).then(() => {
                getAllAlbums().then((data) => {
                    dispatch({
                        type: actionType.SET_ALL_ALBUMS,
                        allAlbum: data.album
                    })
                })
            })
            dispatch({
                type: actionType.SET_ALERT_TYPE,
                alertType: "success"
            })

            setInterval(() => {
                dispatch({
                    type: actionType.SET_ALERT_TYPE,
                    alertType: "null"
                })
            }, 3000)

            setIsAlbumUploading(false)
            setAlbumImageCover(null)
            setAlbumName("")
        }
    }

    return (
        <div className='flex  flex-col items-center justify-center p-4 gap-4 border border-purple-300 rounded-md'>
            <input
                type="text"
                placeholder="Type your song name..."
                className="w-full p-3 rounded-md text-base  font-semibold text-textColor outline-none shadow-sm border border-purple-300 bg-transparent"
                onChange={(e) => setSongName(e.target.value)}
                value={songName}
            />
            <div className="flex w-full  justify-between flex-wrap items-center gap-4">
                <FilterButtons filterData={allArtists} flag={"Artist"} />
                <FilterButtons filterData={allAlbums} flag={"Album"} />
                <FilterButtons filterData={filterByLanguage} flag={"Language"} />
                <FilterButtons filterData={filters} flag={"Category"} />
            </div>

            <div className="bg-card backdrop-blur-md w-full h-300 rounded-md border-2 border-dotted border-purple-300 cursor-pointer">
                {isImageLoading && <FileLoader progress={imageUploadProgress} />}
                {!isImageLoading && (
                    <>
                        {!songImageCover ? (
                            <FileUploader
                                updateState={setSongImageCover}
                                setProgress={setImageUploadProgress}
                                isLoading={setIsImageLoading}
                                isImage={true}
                            />
                        ) : (
                            <div className="relative  w-full  h-full  overflow-hidden  rounded-md">
                                <img src={songImageCover} className="w-full  h-full object-cover i" />
                                <button onClick={() => deleteFileObject(songImageCover, "true")} type="button" className="absolute bottom-3  right-3 p-3 rounded-full bg-purple-500 text-xl cursor-pointer outline-none border-none hover:shadow-md duration-200 transation-all ease-in-out">
                                    <MdDelete className="text-white" />
                                </button>
                            </div>)}</>
                )}
            </div>

            {/* Audio file uploading */}

            <div className="bg-card backdrop-blur-md w-full h-300 rounded-md border-2 border-dotted border-purple-300 cursor-pointer">
                {isAudioLoading && <FileLoader progress={audioUploadProgress} />}
                {!isAudioLoading && (
                    <>
                        {!audioImageCover ? (
                            <FileUploader
                                updateState={setAudioImageCover}
                                setProgress={setAudioUploadProgress}
                                isLoading={setIsAudioLoading}
                                isImage={false}
                            />
                        ) : (
                            <div className="relative  w-full  h-full items-center justify-center flex overflow-hidden  rounded-md">
                                <audio controls src={audioImageCover} className="w-full  h-full object-cover i" />
                                <button
                                    onClick={() => deleteFileObject(audioImageCover, "false")}
                                    type="button"
                                    className="absolute bottom-3  right-3 p-3 rounded-full bg-purple-500 text-xl cursor-pointer outline-none border-none hover:shadow-md duration-200 transation-all ease-in-out">
                                    <MdDelete className="text-white" />
                                </button>
                            </div>)}</>
                )}
            </div>

            <div className=" flex items-center justify-center w-60 cursor-pointer p-4 ">
                {isImageLoading || isAudioLoading ? (
                    <DisabledButton />
                ) : (
                    <motion.button onClick={saveSong} whileTap={{ scale: 0.75 }} className="px-8 py-2 rounded-md  text-white bg-purple-600 hover:shadow-lg">
                        Save Song
                    </motion.button>
                )}
            </div>

            {/*  Image upload for Artist */}
            <p className="text-textColor font-semibold">Artist Details</p>
            <div className="bg-card backdrop-blur-md w-full h-300 rounded-md border-2 border-dotted border-purple-300 cursor-pointer">
                {isArtistUploading && <FileLoader progress={artistUploadProgress} />}
                {!isArtistUploading && (
                    <>
                        {!artistImageCover ? (
                            <FileUploader
                                updateState={setArtistImageCover}
                                setProgress={setArtistUploadProgress}
                                isLoading={setIsArtistUploading}
                                isImage={true}
                            />
                        ) : (
                            <div className="relative w-full h-full overflow-hidden rounded-md">
                                <img src={artistImageCover} className="w-full h-full object-cover" alt="Artist Cover" />
                                <button
                                    onClick={() => deleteFileObject(artistImageCover, true)}
                                    type="button"
                                    className="absolute bottom-3 right-3 p-3 rounded-full bg-purple-500 text-xl cursor-pointer outline-none border-none hover:shadow-md duration-200 transition-all ease-in-out"
                                >
                                    <MdDelete className="text-white" />
                                </button>
                            </div>
                        )}
                    </>
                )}
            </div>
            {/* Artist Name */}
            <input
                type="text"
                placeholder="Type artist name..."
                className="w-full p-3 rounded-md text-base  font-semibold text-textColor outline-none shadow-sm border border-purple-300 bg-transparent"
                onChange={(e) => setArtistName(e.target.value)}
                value={artistName}
            />
            {/* Twitter */}
            <div className="flex items-center rounded-md p-3 border w-full border-purple-300">
                <p className=" text-base font-semiold text-gray-400">www.twitter.com/</p>
                <input type="text" placeholder="your twitter id..."
                    className="w-full text-textColor font-semibold text-base  outline-none bg-transparent"
                    value={twitter}
                    onChange={(e) => setTwitter(e.target.value)}
                />
            </div>

            {/* Instagram */}
            <div className="flex items-center rounded-md p-3 border w-full border-purple-300">
                <p className=" text-base font-semiold text-gray-400">www.instagram.com/</p>
                <input type="text" placeholder="your instagram id..."
                    className="w-full text-textColor font-semibold text-base  outline-none bg-transparent"
                    value={instagram}
                    onChange={(e) => setInstagram(e.target.value)}
                />
            </div>

            <div className=" flex items-center justify-center w-60 cursor-pointer p-4 ">
                {isArtistUploading ? (
                    <DisabledButton />
                ) : (
                    <motion.button onClick={saveArtist} whileTap={{ scale: 0.75 }} className="px-8 py-2 rounded-md  text-white bg-purple-600 hover:shadow-lg">
                        Save Artist
                    </motion.button>
                )}
            </div>
            {/* Album Details */}
            <p className="text-textColor font-semibold">Album Details</p>
            <div className="bg-card backdrop-blur-md w-full h-300 rounded-md border-2 border-dotted border-purple-300 cursor-pointer">
                {isAlbumUploading && <FileLoader progress={albumUploadProgress} />}
                {!isAlbumUploading && (
                    <>
                        {!albumImageCover ? (
                            <FileUploader
                                updateState={setAlbumImageCover}
                                setProgress={setAlbumUploadProgress}
                                isLoading={setIsAlbumUploading}
                                isImage={true}
                            />
                        ) : (
                            <div className="relative w-full h-full overflow-hidden rounded-md">
                                <img src={albumImageCover} className="w-full h-full object-cover" alt="Artist Cover" />
                                <button
                                    onClick={() => deleteFileObject(albumImageCover, true)}
                                    type="button"
                                    className="absolute bottom-3 right-3 p-3 rounded-full bg-purple-500 text-xl cursor-pointer outline-none border-none hover:shadow-md duration-200 transition-all ease-in-out"
                                >
                                    <MdDelete className="text-white" />
                                </button>
                            </div>
                        )}
                    </>
                )}
            </div>
            {/* Album Name */}
            <input
                type="text"
                placeholder="Type album name..."
                className="w-full p-3 rounded-md text-base  font-semibold text-textColor outline-none shadow-sm border border-purple-300 bg-transparent"
                onChange={(e) => setAlbumName(e.target.value)}
                value={albumName}
            />
            {/* Save Album */}
            <div className=" flex items-center justify-center w-60 cursor-pointer p-4 ">
                {isAlbumUploading ? (
                    <DisabledButton />
                ) : (
                    <motion.button onClick={saveAlbum} whileTap={{ scale: 0.75 }} className="px-8 py-2 rounded-md  text-white bg-purple-600 hover:shadow-lg">
                        Save Album
                    </motion.button>
                )}
            </div>
        </div>
    )
}
export const DisabledButton = () => {
    return (
        <button
            disabled
            type="button"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 inline-flex items-center"
        >
            <svg
                role="status"
                className="inline w-4 h-4 mr-3 text-white animate-spin"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="#E5E7EB"
                />
                <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentColor"
                />
            </svg>
            Loading...
        </button>
    );
};
export const FileLoader = ({ progress }) => {

    return (
        <div className="w-full h-full flex flex-col items-center justify-center">
            <p className="text-xl  font-semibold text-textColor">
                {Math.round(progress) > 0 && <> {`${Math.round(progress)}%`}</>}
            </p>
            <div className="w-20 h-20 min-w-[40px] bg-purple-500 animate-ping rounded-full flex items-center justify-center relative">
                <div className=" absolute inset-0 rounded-full bg-purple-600 blur-xl"></div>
            </div>

        </div>
    )
}

export const FileUploader = ({ updateState, setProgress, isLoading, isImage }) => {
    const [{ alertType }, dispatch] = useStateValue()
    const uploadFile = (e) => {
        isLoading(true)
        const uploadedFile = e.target.files[0]
        const storageRef = ref(storage, `${isImage ? "Images" : "Audio"}/${Date.now()}=${uploadFile.name} `)
        const uploadTask = uploadBytesResumable(storageRef, uploadedFile)

        uploadTask.on("state_changed", (snapshot) => {
            setProgress((snapshot.bytesTransferred / snapshot.totalBytes) * 100)
        },
            (error) => {
                console.log(error);

            }, () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    updateState(downloadURL)
                    isLoading(false)
                })
                dispatch({
                    type: actionType.SET_ALERT_TYPE,
                    alertType: "success"
                })

                setInterval(() => {
                    dispatch({
                        type: actionType.SET_ALERT_TYPE,
                        alertType: "null"
                    })
                }, 3000)
            })
    }
    return (
        <label>
            <div className="flex  flex-col  items-center justify-center h-full ">
                <div className="flex flex-col justify-center items-center cursor-pointer">
                    <p className="font-bold text-2xl ">
                        <BiCloudUpload />
                    </p>
                    <p className="text-lg"> Click to upload {isImage ? "an image" : "an audio"}</p>
                </div>
            </div>
            <input type="file" name="upload-file" acccept={`${isImage ? "image/*" : "audio/*"}`}
                className="w-0 h-0"
                onChange={uploadFile}
            />
        </label>
    )
}

export default DashboardNewSong