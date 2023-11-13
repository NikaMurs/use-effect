import './detail.css'
import { detailProps } from '../types'
import { useEffect, useRef, useState } from 'react'

export default function Detail(props: detailProps) {
    const { info } = props

    const [data, setData] = useState({
        id: -1,
        name: "",
        avatar: "",
        details: {
            city: "",
            company: "",
            position: ""
        }
    })

    const flag = useRef('/')
    const [isLoading, setLoad] = useState(false)
    useEffect(() => {
        if (info.id === -1) return
        flag.current === '/' ? flag.current = '' : flag.current = '/'
        document.querySelector('.Detail')?.classList.add('hide')
        setLoad(true)
        fetch(`https://raw.githubusercontent.com/netology-code/ra16-homeworks/master/hooks-context/use-effect/data/${info.id}.json`)
            .then(result => result.json())
            .then((data) => {
                document.querySelector('.Detail')?.classList.remove('hide')
                data.avatar = data.avatar + flag.current
                setData(data)
                setLoad(false)
            })
    }, [info])


    return (
        <>
            {isLoading && <p className='detailLoad'>Loading...</p>}
            <div className='Detail hide'>
                <img className='detailImg' src={data.avatar} alt="" />
                <p className='detailName'>{data.name}</p>
                <p>City: {data.details.city}</p>
                <p>Company: {data.details.company}</p>
                <p>Position: {data.details.position}</p>
            </div>

        </>
    )
}