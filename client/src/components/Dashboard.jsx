import React from 'react'
import { NavLink, Route, Routes } from 'react-router-dom'
import Header from './Header'
import { IoHome } from "react-icons/io5";
import { isActiveStyles, isNotActiveStyles } from '../utils/styles';
import DashboardHome from './DashboardHome'
import DashboardAlbums from './DashboardAlbums';
import DashboardArtists from './DashboardArtists';
import DashboardSongs from './DashboardSongs'
import DashboardUsers from './DashboardUsers'
import DashboardNewSong from './DashboardNewSong';
import { useStateValue } from "../context/StateProvider";
import Alert from './Alert';
const Dashboard = () => {

    const [{
        alertType
    }, dispatch
    ] = useStateValue()

    return (
        <div className='w-full h-auto flex flex-col items-center justify-center bg-primary'>
            <Header />

            <div className='w-[60%] my-2 p-4 flex items-center justify-evenly'>
                <NavLink to={"/dasboard/home"} className={({ isActive }) => isActive ? isActiveStyles : isNotActiveStyles}><IoHome className="text-2xl text-textColor" /></NavLink>
                <NavLink to={"/dashboard/user"} className={({ isActive }) => isActive ? isActiveStyles : isNotActiveStyles}>Users</NavLink>
                <NavLink to={"/dashboard/song"} className={({ isActive }) => isActive ? isActiveStyles : isNotActiveStyles}>Songs</NavLink>
                <NavLink to={"/dashboard/artist"} className={({ isActive }) => isActive ? isActiveStyles : isNotActiveStyles}>Artists</NavLink>
                <NavLink to={"/dashboard/album"} className={({ isActive }) => isActive ? isActiveStyles : isNotActiveStyles}>Albums</NavLink>


            </div>
            <div className='my-4 w-full p-4'>
                <Routes>
                    <Route path='/home' element={<DashboardHome />} />
                    <Route path='/user' element={<DashboardUsers />} />
                    <Route path='/song' element={<DashboardSongs />} />
                    <Route path='/artist' element={<DashboardArtists />} />
                    <Route path='/album' element={<DashboardAlbums />} />
                    <Route path='/newSong' element={<DashboardNewSong />} />

                </Routes>
            </div>

            {alertType && (
                <Alert type={alertType} />
            )}

        </div>
    )
}

export default Dashboard