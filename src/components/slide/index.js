import React, { useState } from 'react'
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa'

import '../../../node_modules/font-awesome/css/font-awesome.min.css'
import './slide_style.css'

import { COLORS } from '../../consts.js'

export default function Slide({ itens }) {
    const [coverNumber, setCoverNumber] = useState(0)

    const prevCover = () => {
        if (coverNumber - 1 === -1) {
            setCoverNumber(itens.length - 1)
        } else {
            setCoverNumber(coverNumber - 1)
        }
    }

    const nextCover = () => {
        if (coverNumber + 1 === itens.length) {
            setCoverNumber(0)
        } else {
            setCoverNumber(coverNumber + 1)
        }
    }

    return (
        <div className='slide'>
            {itens.length > 0 &&
                <div className='slide-arrow' onClick={prevCover}>
                    {itens.length > 0 && <FaAngleLeft />}
                </div>
            }
            {itens.length > 0 ?
                <img className='cover-image'
                    src={`${itens[coverNumber].thumbnail.path}.${itens[coverNumber].thumbnail.extension}`} />
                :
                <img className='cover-image'
                    src={`http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg`} />
            }
            {itens.length > 0 &&
                <div className='slide-arrow' onClick={nextCover}>
                    <FaAngleRight />
                </div>
            }
        </div>
    );
}