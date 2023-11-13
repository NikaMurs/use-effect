import { useEffect, useState } from 'react'
import { listProps, listItemType } from '../types'
import './list.css'

export default function List(props: listProps) {
    const {setSelect} = props;
    const [data, setData] = useState([])
    useEffect(() => {
        fetch('https://raw.githubusercontent.com/netology-code/ra16-homeworks/master/hooks-context/use-effect/data/users.json')
            .then(result => result.json())
            .then(data => setData((data)))
    }, [])

    useEffect(() => {
        const items = document.querySelectorAll('.listItem')

        function onClick(el: Event) {
            items.forEach((item) => {
                item.classList.remove('selected')
            })
            const target = el.target as Element;
            target.classList.add('selected')
            setSelect({
                id: target.id,
                name: target.textContent
            })
        }

        items.forEach((item) => {
            item.addEventListener('click', onClick)
        })

        return () => {
            items.forEach((item) => {
                item.removeEventListener('click', onClick)
            })
        }
    }, [data])

    return (
        <div className='List'>
            {data.map((item: listItemType) => {
                return (
                    <div className='listItem' id={item.id.toString()} key={item.id}>
                        {item.name}
                    </div>
                )
            })}
        </div>
    )
}