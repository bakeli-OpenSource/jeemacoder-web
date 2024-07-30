'use client'

export default function hackathonlogoLoader({src , width , quality} : {
    src : string , width : number , quality ?: number
}) {
    return `http://localhost:8000/storage/${src}?w=${width}&q=${quality || 75}`
}

