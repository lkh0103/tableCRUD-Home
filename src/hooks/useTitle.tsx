import React from 'react'

export default function useTitle (title: string) {
    document.title = 'ABC | ' + title
}