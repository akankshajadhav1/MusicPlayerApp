import React from 'react'
import { BsEmojiHeartEyes, BsFillEmojiDizzyFill } from 'react-icons/bs'
import { motion } from 'framer-motion'
const Alert = ({ type }) => {
    return (
        <motion.div
            initial={{ translateX: 200, opacity: 0 }}
            animate={{ translateX: 0, opacity: 1 }}
            exit={{ translateX: 200, opacity: 0 }}
            key={type}
            className={`fixed top-12 px-4 py-2 right-12 p-4 rounded-md shadow-xl  backdrop-blur-md flex items-center justify-center
        
        ${type == "success" && "bg-green-500"}
        ${type == "danger" && "bg-red-500"}

        `}>
            {type == "success" && (
                <div className='flex items-center justify-center gap-4'>
                    <BsEmojiHeartEyes className='text-3xl text-primary' />
                    <p className='text-xl font-semibold  text-primary'>Data Saved</p>
                </div>
            )}

            {type == "danger" && (
                <div className='flex items-center justify-center gap-4'>
                    <BsFillEmojiDizzyFill className='text-3xl text-primary' />
                    <p className='text-xl font-semibold  text-primary'>Somthing went wrong... please try again.</p>
                </div>
            )}

        </motion.div>
    )
}

export default Alert