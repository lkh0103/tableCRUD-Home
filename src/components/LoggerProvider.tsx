import React, { useContext } from "react";
import { createContext, PropsWithChildren, useEffect, useState } from "react";

interface LoggerProviderProps {
    handler: (...args: any) => void
}

const LoggerContext = createContext<any>(null)

export default function LoggerProvider(props: PropsWithChildren<LoggerProviderProps>) {
    const [lastError, setLastError] = useState<string>('')

    useEffect(() => {
        const listener = (event: ErrorEvent) => {
            const { message, filename, colno, lineno, error } = event
            const string = message.toLowerCase();
            const substring = 'script error';
            if (string.indexOf(substring) > -1) {
                alert('Script Error: See Browser Console for Detail');
            } else {
                const errorMessage = [
                    'Message: ' + message,
                    'URL: ' + filename,
                    'Line: ' + lineno,
                    'Column: ' + colno,
                    'Error object: ' + JSON.stringify(error)
                ].join(' - ');

                if (typeof props.handler === 'function') {
                    props.handler(errorMessage)
                    setLastError(errorMessage)
                }
            }
        }

        window.addEventListener('error', listener)

        return () => {
            window.removeEventListener('error', listener)
        }

    }, [])

    const contextValue = {
        lastError,
        setLastError
    }

    return (
        <LoggerContext.Provider value={contextValue}>
            {props.children}
        </LoggerContext.Provider>
    )

}

export const useLogger = () => useContext(LoggerContext)