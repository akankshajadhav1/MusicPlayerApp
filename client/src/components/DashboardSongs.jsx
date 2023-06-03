import React, { useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { IoAdd, IoPause, IoPlay, IoTrash } from "react-icons/io5"
import { useState } from 'react'
import { AiOutlineClear } from 'react-icons/ai'
import { useStateValue } from '../context/StateProvider'
import { getAllSongs } from '../api'
import { actionType } from '../context/reducer'
import SongCard from './SongCard'
const DashboardSongs = () => {

    const [songFilter, setSongFilter] = useState("")
    const [isFoucs, setIsFoucs] = useState(false)
    const [{ allSongs }, dispatch] = useStateValue()

    useEffect(() => {
        if (!allSongs) {
            getAllSongs().then((data) => {
                dispatch({
                    type: actionType.SET_ALL_SONGS,
                    allSongs: data.song,
                })
            })
        }

    }, [])

    return (
        <div className='w-full p-4 flex  items-center justify-center flex-col'>
            <div className="w-full flex  justify-center items-cente gap-20"

            >
                <NavLink className="flex items-center justify-center  px-4 py-3 border rounded-md border-purple-300 hover:border-purple-500 hover-shadow-md  cursor-pointer " to={"/dashboard/newSong"}>
                    <IoAdd />
                </NavLink>
                <input className={`w-52 py-2  px-2 border  ${isFoucs ? "border-purple-500 shadow-md" : "border-purple-300"}rounded-md bg-transparent outline-none duration-150 trasition-all ease-in-out  text-textColor font-semibold`}
                    placeholder='Serach Here....' value={songFilter}
                    onChange={(e) => setSongFilter(e.target.value)}
                    onBlur={() => { setIsFoucs(false) }}
                    onFocus={() => { setIsFoucs(true) }}
                />
                <i className='text-3xl text-textColor cursor-pointer'>
                    <AiOutlineClear />
                </i>
            </div>

            {/* Main container */}
            <div className='relative w-full my-4 py-16 p-4 border border-purple-300 rounded-md'>
                {/* The count */}
                <div className='absolute top-4 left-4'>
                    <p className='text-xl  font-bold'>
                        <span className='text-sm font-semibold text-textColor'>Count :</span>
                        {allSongs?.length}
                    </p>
                </div>
                <SongContainer data={allSongs} />
            </div>
        </div>
    )
}
export const SongContainer = ({ data }) => {
    return (
        <div className='w-full flex flex-wrap  gap-3 items-center justify-evenly '>
            {data && data.map((song, i) => (
                <SongCard key={song._id} data={song} index={i} type="song" />
            ))}
        </div>
    )
}

export default DashboardSongs