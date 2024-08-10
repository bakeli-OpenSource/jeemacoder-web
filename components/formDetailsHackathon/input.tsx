"use client"
import { EyeOpenIcon } from '@radix-ui/react-icons'
import clsx from 'clsx'
import React, { ChangeEvent } from 'react'

export default function FormInput({
    id, type = "text", value, placeholder, className, label, required, onChange, readOnly 
} : {
    id?: string, 
    type?: string, 
    value: string | number, 
    placeholder: string, 
    className?: string, 
    label?: string, 
    required?: boolean,
    onChange: (e: ChangeEvent<HTMLInputElement>) => void,
    readOnly?: boolean
}) {
    return (
        <div className='w-full text-gray-700'>
            {label && (
                <label className='block text-sm font-medium text-gray-900 mb-1'>
                    {label} 
                    {required && <span className='text-red-500'>*</span>}
                </label>
            )}
            <div className='relative'>
                <input  
                    id={id}
                    type={type} 
                    value={value} 
                    onChange={onChange}
                    placeholder={placeholder}
                    readOnly={readOnly}
                    className={clsx('w-full placeholder-gray-400 focus:border-indigo-500 outline-none px-4 py-2 rounded-md border bg-gray-50 text-sm transition duration-300 ease-in-out hover:bg-white focus:bg-white'
                    , className)} 
                />
                {type === 'password' && (
                    <EyeOpenIcon className='absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer' />
                )}
            </div>
        </div>
    )
}
