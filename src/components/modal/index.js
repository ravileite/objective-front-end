import React, { useEffect, useState } from 'react'
import md5 from 'js-md5'

import '../../../node_modules/font-awesome/css/font-awesome.min.css'
import './modal_style.css'

import Slide from '../../components/slide'
import api from '../../service/api'

const PUBLIC_KEY = '3155ecd5f1a6b05400617458f4df0faa'
const PRIVATE_KEY = 'd51b473a6bc74fec7e9e82d0c58cae646304c40c'

export default function Modal({ character, closeDetails }) {
    const [comics, setComics] = useState(null)
    const [series, setSeries] = useState(null)
    const [toRenderComics, setToRenderComics] = useState(false)
    const [toRenderSeries, setToRenderSeries] = useState(false)
    console.log(character)

    const timestamp = Number(new Date())
    const hash = md5.create()
    hash.update(timestamp + PRIVATE_KEY + PUBLIC_KEY)

    useEffect(() => {
        handleComics()
        handleSeries()
    }, [])

    const checkClassName = (e) => {
        if (e.target.className === 'modal') closeDetails()
    }

    const handleComics = () => {
        api.get(`/v1/public/characters/${character.id}/comics?ts=${timestamp}&apikey=${PUBLIC_KEY}&hash=${hash.hex()}`)
            .then(comics => {
                setComics(comics)
                setToRenderComics(true)
            })
    }

    const handleSeries = () => {
        api.get(`/v1/public/characters/${character.id}/series?ts=${timestamp}&apikey=${PUBLIC_KEY}&hash=${hash.hex()}`)
            .then(series => {
                setSeries(series)
                setToRenderSeries(true)
            })
    }

    const handleItems = (item, i) => {
        return <p key={i} className='details-text'>{i + 1} - {item.name}</p>
    }

    return (
        <div className='modal' onClick={e => checkClassName(e)}>
            {toRenderComics && toRenderSeries &&
                <div className='modal-card'>
                    <div className='row-1'>
                        <div className='details-character-thumbnail'>
                            <h2 className='details-text'>{character.name}</h2>
                            <img className='character-image' src={`${character.thumbnail.path}.${character.thumbnail.extension}`} />
                        </div>
                        <div className='character-comics' >
                            <h2 className='details-text'>Quadrinhos</h2>
                            <Slide itens={comics.data.data.results.filter(comic => !comic.thumbnail.path.includes('image_not_available'))} />
                        </div>
                        <div className='character-series' >
                            <h2 className='details-text'>Series</h2>
                            <Slide itens={series.data.data.results.filter(serie => !serie.thumbnail.path.includes('image_not_available'))} />
                        </div>
                    </div>
                    <div className='row-2'>
                        <div className='card-stories'>
                            <h2 className='details-text'>Todos as Histórias</h2>
                            <div className='items-list'>
                                {character.stories.items.map(handleItems)}
                            </div>
                        </div>  
                        <div className='card-comics'>
                            <h2 className='details-text'>Todos os Quadrinhos</h2>
                            <div className='items-list'>
                                {character.comics.items.map(handleItems)}
                            </div>
                        </div>  
                        <div className='card-events'>
                            <h2 className='details-text'>Todos os Eventos</h2>
                            <div className='items-list'>
                                {character.events.items.map(handleItems)}
                            </div>
                        </div>  
                        <div className='card-series'>
                            <h2 className='details-text'>Todos as Séries</h2>
                            <div className='items-list'>
                                {character.series.items.map(handleItems)}
                            </div>
                        </div>  
                    </div>
                    {character.urls[1].type === 'wiki' &&
                        <div className='character-bio'>
                            <h2>Clique <a style={{color: 'red'}} href={character.urls[1].url} target='_blank' >
                                    aqui
                                </a> e conheça mais sobre o personagem.</h2>
                        </div>
                    }
                </div>
            }
        </div>
    )
}