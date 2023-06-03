import React from 'react'
import { motion } from 'framer-motion'
import { IoTrash } from 'react-icons/io5'
import { useState } from 'react'
import { deleteSongById, deleteAlbumById, deleteArtistById, getAllAlbums, getAllArtist } from '../api'
import { useStateValue } from '../context/StateProvider'
import { actionType } from '../context/reducer'
import { getAllSongs } from '../api'
import { storage } from '../config/firebaseConfig'
import { ref } from 'firebase/storage'
import { deleteObject } from 'firebase/storage'
const SongCard = ({ data, index, type }) => {


    const [isDelete, setIsDelete] = useState(false)
    const [{ alertType, allAlbums, allArtists, allSongs, songIndex, isSongPlaying }, dispatch] = useStateValue();

    const deleteData = (data) => {
        console.log("Called data", data);
        const deleteRef = ref(storage, data.imageURL);
        deleteObject(deleteRef).then(() => { })

        deleteSongById(data._id).then((res) => {
            if (res.data) {
                console.log("Called Song Deleted");
                getAllSongs().then((data) => {
                    dispatch({
                        type: actionType.SET_ALL_SONGS,
                        allSongs: data.song,
                    })
                })
            }
        })
        //Artist
        deleteArtistById(data._id).then((res) => {
            if (res.data) {
                console.log("Called Artist Deleted");
                getAllArtist().then((data) => {
                    dispatch({
                        type: actionType.SET_ALL_ARTISTS,
                        allArtists: data.artist,
                    })
                })
            }
        })
        //Album
        deleteAlbumById(data._id).then((res) => {
            if (res.data) {
                console.log("Called Albums Deleted");
                getAllAlbums().then((data) => {
                    dispatch({
                        type: actionType.SET_ALL_ALBUMS,
                        allAlbums: data.album,
                    })
                })
            }
        })

    }
    const addToContext = () => {
        if (!isSongPlaying) {
            dispatch({
                type: actionType.SET_ISSONG_PLAYING,
                isSongPlaying: true
            })
        }

        if (songIndex !== index) {
            dispatch({
                type: actionType.SET_SONG_INDEX,
                songIndex: index
            })
        }
    }




    return (
        <motion.div
            onClick={type === 'song' && addToContext}
            className='relative py-4 w-40 min-w-210 px-2  cursor-pointer hover:bg-card bg-purple-100 shadow-md rounded-lg flex  flex-col items-center'>
            <div className='w-40 min-w-[160px] h-40 min-h-[ 160px]  rounded-lg drop drop-shadow-lg  relative overflow-hidden' >
                <motion.img whileHover={{ scale: 1.05 }} src={data.imageURL} className="w-full  h-full rounded-lg  object-cover" />
            </div>

            <p className='text-base text-center text-headingColor font-semibold my-2'>
                {data.name.length > 25 ? `${data.name.slice(0, 25)}..` : data.name}
                {data.artist && (
                    <span className=' block text-sm text-gray-400 my-1'>{data.artist.length > 25 ? `${data.artist.slice(0, 25)}....` : data.artist}</span>
                )}

            </p>

            <div className='w-full absoulte bottom-2 right-2 flex items-center justify-between px-4'>
                <motion.i
                    onClick={() => setIsDelete(true)}
                    whileTap={{ scale: 0.75 }}
                    className=' text-base  text-gray-400  drop-shadow-md hover:text-gray-600'

                >
                    <IoTrash />
                </motion.i>
            </div>
            {isDelete && (
                <motion.div className='absolute px-4   py-2 inset-8 backdrop-blur-md bg-cardOverlay flex flex-col items-center justify-center gap-0'
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                >

                    <p className='text-lg  text-headingColor font-semibold text-center '>
                        Are you sure do you want to delete it?
                    </p>
                    <div className='flex items-center gap-4'>
                        <motion.button
                            whileTap={{ scale: 0.7 }}
                            onClick={() => deleteData(data)}
                            className='bg-red-200 rounded-md hover:bg-red-500 px-2 py-1 text-sm uppercase'>Yes</motion.button>
                        <motion.button
                            whileTap={{ scale: 0.7 }}
                            onClick={() => setIsDelete(false)}
                            className='px-2 py-1 text-sm uppercase bg-green-200 rounded-md hover:bg-green-500'>No</motion.button>
                    </div>

                </motion.div>
            )}

        </motion.div>
    )
}



export default SongCard