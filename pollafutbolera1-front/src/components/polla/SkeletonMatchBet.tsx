import React from 'react'

function SkeletonMatchBet() {
    return (
        <li className='bg-gray-200 rounded-xl px-10 py-4 shadow-md border border-gray-300 animate-pulse'>
            <div className="flex items-center align-middle justify-between space-x-16">
                <div className="flex flex-row items-center align-middle justify-center space-x-2">
                    <div className='h-6 w-10 bg-gray-300 rounded-full'></div>
                    <div className='h-4 w-20 bg-gray-300 rounded'></div>
                    <div className="h-6 w-10 bg-gray-300 rounded-4xl"></div>
                </div>
                <div className="flex flex-col align-middle justify-center items-center space-x-2">
                    <div className='h-6 w-16 bg-gray-300 rounded-3xl'></div>
                </div>
                <div className="flex flex-row items-center align-middle justify-center space-x-2">
                    <div className="h-6 w-10 bg-gray-300 rounded-4xl"></div>
                    <div className='h-4 w-20 bg-gray-300 rounded'></div>
                    <div className='h-6 w-10 bg-gray-300 rounded-full'></div>
                </div>
                <div className='h-6 w-20 bg-gray-300 rounded-lg'></div>
                <div className='h-4 w-32 bg-gray-300 rounded'></div>
                <div className='h-4 w-10 bg-gray-300 rounded'></div>
            </div>
        </li>
    )
}

export default SkeletonMatchBet