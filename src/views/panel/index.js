import React, { useEffect, useState } from 'react'
import { Redirect } from 'react-router-dom'
import md5 from 'js-md5'

import '../../../node_modules/font-awesome/css/font-awesome.min.css'
import './panel_style.css'

import { COLORS } from '../../consts.js'
import Header from '../../components/header'
import Card from '../../components/card'
import Pagination from '../../components/pagination'
import Modal from '../../components/modal'

import api from '../../service/api'

const PUBLIC_KEY = '3155ecd5f1a6b05400617458f4df0faa'
const PRIVATE_KEY = 'd51b473a6bc74fec7e9e82d0c58cae646304c40c'

export default function Panel() {
    const params = new URLSearchParams(window.location.search)

    const [characters, setCharacters] = useState(null)
    const [character, setCharacter] = useState(null)
    const [search, setSearch] = useState(params.get('search') ? params.get('search') : '')
    const [toRender, setToRender] = useState(false)
    const [page, setPage] = useState(1)
    const [pageArray, setPageArray] = useState([1, 2, 3, 4, 5])
    const [details, setDetails] = useState(false)

    const timestamp = Number(new Date())
    const hash = md5.create()
    hash.update(timestamp + PRIVATE_KEY + PUBLIC_KEY)

    useEffect(() => {
        handleCharacters()
    }, [page])

    const handleCharacters = () => {
        const uri = search === '' ?
            `/v1/public/characters?ts=${timestamp}&orderBy=name&limit=10&offset=${(page - 1) * 10}&apikey=${PUBLIC_KEY}&hash=${hash.hex()}`
            :
            `/v1/public/characters?ts=${timestamp}&name=${search}&orderBy=name&apikey=${PUBLIC_KEY}&hash=${hash.hex()}`
        api.get(uri)
            .then(characters => {
                let auxArrray = []
                characters.data.data.results.map(character => auxArrray.push(character))
                setCharacters(auxArrray)
                setToRender(true)
            })
    }

    const handleCharacter = (character) => {
        setCharacter(character)
    }

    const handleSearch = (event) => {
        setSearch(event.target.value)
    }

    const handleCards = (character) => {
        return <Card seeDetails={seeDetails} handleCharacter={handleCharacter} character={character} key={character.id} />
    }

    const selectPageButton = (value) => {
        setPage(value)
    }

    const subtractPageArray = () => {
        let auxArray = []
        if (page - 1 < pageArray[0]) {
            pageArray.map(value => auxArray.push(value - 1))
            setPageArray(auxArray)
        }
    }

    const addPageArray = () => {
        let auxArray = []
        if (page + 1 > pageArray[4]) {
            pageArray.map(value => auxArray.push(value + 1))
            setPageArray(auxArray)
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (search === '') {
            setPage(1)
        }
        handleCharacters()
    }

    const seeDetails = () => {
        document.documentElement.style.setProperty('--page-brightness', '80%')
        document.documentElement.style.setProperty('--overflow-bar', 'hidden')
        setDetails(true)
    }

    const closeDetails = () => {
        document.documentElement.style.setProperty('--page-brightness', '100%')
        document.documentElement.style.setProperty('--overflow-bar', 'auto')
        setDetails(false)
    }

    return (
        <div className='panel-page'>
            <Header />
            <div className="panel-content">
                <p style={{ color: COLORS.TEXT_COLOR }} className='search-title'>Busca de Personagens</p>
                <p style={{ color: COLORS.TEXT_COLOR }} className='search-subtitle'>Nome do personagem</p>

                <form onSubmit={e => handleSubmit(e)} >
                    <div className='input-form'>
                        <input
                            type="text"
                            placeholder="Search"
                            value={search}
                            onChange={handleSearch}
                        ></input>
                        <i className="fa fa-search icon" />
                    </div>
                </form>


                {toRender &&
                    <div style={{ marginTop: '30px' }}>
                        <div className='columns'>
                            <p className='character-column column'>Personagem</p>
                            <p className='series-column column'>Séries</p>
                            <p className='events-column column'>Eventos</p>
                        </div>
                        <div>
                            {characters.map(handleCards)}
                        </div>

                    </div>
                }
                {toRender && search === '' && characters.length > 1 &&
                    <div style={{ textAlign: 'center' }}>
                        <Pagination page={page} selectPageButton={selectPageButton} pageArray={pageArray}
                            singleLeft={() => { setPage(page - 1); subtractPageArray() }}
                            doubleLeft={() => { setPage(1); setPageArray([1, 2, 3, 4, 5]) }}
                            singleRight={() => { setPage(page + 1); addPageArray() }}
                            doubleRight={() => { setPage(150); setPageArray([146, 147, 148, 149, 150]) }} />
                    </div>
                }
            </div>
            {details && <Modal closeDetails={closeDetails} character={character} />}
        </div>
    )
}