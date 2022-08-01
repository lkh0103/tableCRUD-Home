import React, { useEffect, useRef, useState } from 'react'
import { api, EMethod } from '../../hooks/useRequest'
import useTitle from '../../hooks/useTitle'

export default function Home() {

    const [search, setSearch] = useState('')
    const [param, setParam] = useState('posts')

    useEffect(() => {
        loadUser()
    }, [param])

    useTitle('React project')

    const loadUser = () => {
        api(EMethod.GET, "https://jsonplaceholder.typicode.com/posts")
            .then(() => {
                console.log('success')
            })
            .catch(console.error)
    }

    // if (loading) return <div>Loading</div>
    // if (error) return <h1>{error}</h1>

    return (
        <div>
            <h2>Home</h2>
            <input value={search} onChange={(e) => {
                setSearch(e.target.value)
            }} />
            <button onClick={(e) => {
                setParam(search)
            }}>Search</button>
        </div>
    )
}

// export default function Test() {
    
//     const [input, setInput] = useState("");
//     const [propperties, setPropperties] = useState<any>([]);
//     const [data, setData] = useState<any>([]);
//     const [inputLabel, setInputLabel] = useState<any>()
//     const tuKhoaVuaTim = useRef('')
//     const inputData = useRef<any>(null)

//     const handlePropperties = () => {
//         const newArray = [...propperties, input];
//         setPropperties(newArray);
//     };

//     const handleSaveData = () => {
//         tuKhoaVuaTim.current = inputLabel
//         console.log('inputData ', inputData.current.value);
//     }

//     return (
//         <div className="test">
//             <input value={input} onChange={(e) => setInput(e.target.value)} />
//             <button onClick={handlePropperties}>Add Fill</button>
//             <form>
//                 {propperties.map((pr: any, index: number) => (<div key={index}>
//                     <label >{pr}</label>
//                     <input ref={inputData} onChange={e => setInputLabel(e.target.value)} />
//                 </div>
//                 ))}
//             </form>
//             <button onClick={handleSaveData}>Save</button></div>)
// }



