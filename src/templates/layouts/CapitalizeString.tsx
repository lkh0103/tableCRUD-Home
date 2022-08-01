import React from 'react'

export default function capitalizeString(s: string): string {
    return s.charAt(0).toUpperCase() + s.slice(1);
}
