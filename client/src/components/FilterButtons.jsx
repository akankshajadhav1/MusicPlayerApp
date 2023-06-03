import { MotionConfig } from 'framer-motion'
import React from 'react'
import { useState } from 'react'
import { IoChevronDown } from 'react-icons/io5'
import { motion } from 'framer-motion'
import { useStateValue } from '../context/StateProvider'
import { actionType } from '../context/reducer'
const FilterButtons = ({ filterData, flag }) => {
    const [filterName, setFilterName] = useState(null)
    const [filterMenu, setFilterMenu] = useState(false)
    const [{ artistFilter, albumFilter, languageFilter, filterTerm }, dispatch] = useStateValue()
    const updateFilterButton = (name) => {
        setFilterName(name)
        setFilterMenu(false)
        if (flag === "Artist") {
            dispatch({ type: actionType.SET_ARTIST_FILTER, artistFilter: name })
        }

        if (flag === "Album") {
            dispatch({ type: actionType.SET_ALBUM_FILTER, albumFilter: name })
        }

        if (flag === "Language") {
            dispatch({ type: actionType.SET_LANGUAGE_FILTER, languageFilter: name })
        }

        if (flag === "Category") {
            dispatch({ type: actionType.SET_FILTER_TERM, filterTerm: name })
        }
    }
    return (
        <div className='border  border-purple-300   rounded-md px-4 py-1 relative  cursor-pointer hover:border-purple-400'>
            <p className='text-base tracking-wide text-textColor flex items-center gap-2' onClick={() => setFilterMenu(!filterMenu)}>
                {!filterName && flag}
                {filterName && (
                    <>
                        {filterName.length > 15 ? `${filterName.slice(0, 14)}...` : filterName}
                    </>
                )}
                <IoChevronDown className={`text-base text-textColor duration-150 transition-all ease-in-out ${filterMenu ? "rotate-180" : "rotate-0"}`} />
            </p>
            {filterData && filterMenu && (
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 50 }}
                    className="w-48 z-50 backdrop-blur-sm max-h-44 overflow-y-scroll scrollbar-thin scrollbar-track-purple-200 scrollbar-thumb-purple-400 py-2 flex flex-col rounded-md shadow-md absolute top-8 left-0">
                    {filterData?.map(data => (
                        <div key={data.name} className="flex  items-center gap-2 px-4 py-1 hover:bg-purple-200"
                            onClick={() => updateFilterButton(data.name)}
                        >
                            {(flag === "Artist" || flag === "Album") && (
                                <img
                                    src={data.imageURL} className="w-8 min-w-[32px] h-8 rounded-full object-cover"
                                />
                            )}
                            <p className='w-full'>
                                {data.name.length > 15 ? `${data.name.slice(0, 15)}...` : data.name}
                            </p>
                        </div>
                    ))}
                </motion.div>
            )}
        </div>
    )
}

export default FilterButtons