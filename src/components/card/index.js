import React from 'react'

import '../../../node_modules/font-awesome/css/font-awesome.min.css'
import './card_style.css'

import { COLORS } from '../../consts.js'

export default function Card({ character, seeDetails, handleCharacter }) {
    const series = character.series.items
    const events = character.events.items

    return (
        <div className='card' onClick={() => {seeDetails(); handleCharacter(character)}}>
            <div className='card-thumbnail-and-name'>
                <img className='card-thumbnail' src={`${character.thumbnail.path}.${character.thumbnail.extension}`} alt=''/>
                <p className='character-card-name' style={{color: COLORS.TEXT_COLOR}}>{character.name}</p>
            </div>
            
            <div className='character-card-series'>
                {series[0] && <p>{series[0].name}</p>}
                {series[1] && <p>{series[1].name}</p>}
                {series[2] && <p>{series[2].name}</p>}
            </div>
            <div className='character-card-events'>
                {events[0] && <p>{events[0].name}</p>}
                {events[1] && <p>{events[1].name}</p>}
                {events[2] && <p>{events[2].name}</p>}
            </div>
        </div>
    );
}