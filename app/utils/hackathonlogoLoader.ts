'use client'

export default function hackathonlogoLoader({src , width , quality} : {
    src : string , width : number , quality ?: number
}) {
    return `https://api.jeemacoder.fewnu.app/storage/${src}?w=${width}&q=${quality || 75}`
}

