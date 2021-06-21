import React from 'react'
import { FaAngleDoubleLeft, FaAngleLeft, FaAngleDoubleRight, FaAngleRight } from 'react-icons/fa'

import './pagination_style.css'

import PageButton from '../../components/pageButton'
import { COLORS } from '../../consts'

export default function Pagination({ page, selectPageButton, 
        doubleLeft, singleLeft, doubleRight, singleRight, pageArray }) {
    return (
        <div className='pages'>
            <button className='arrow-button' disabled={!(page > 2)}
                onClick={doubleLeft}>
                <FaAngleDoubleLeft style={{ color: `${page > 2 ? '#8E8E8E' : 'transparent'}`}} />
            </button>
            <button className='arrow-button' disabled={!(page > 1)}
                onClick={singleLeft}>
                <FaAngleLeft style={{ color: `${page > 1 ? '#8E8E8E' : 'transparent'}`}} />
            </button>
            <PageButton page={pageArray[0]} changePage={selectPageButton} selected={pageArray[0] === page} />
            <PageButton changePage={selectPageButton} page={pageArray[1]} selected={pageArray[1] === page} />
            <PageButton changePage={selectPageButton} page={pageArray[2]} selected={pageArray[2] === page} />
            <PageButton changePage={selectPageButton} page={pageArray[3]} selected={pageArray[3] === page} />
            <PageButton changePage={selectPageButton} page={pageArray[4]} selected={pageArray[4] === page} />
            <button className='arrow-button' disabled={!(page < 150)}
                onClick={singleRight}>
                <FaAngleRight style={{ color: `${page < 150 ? '#8E8E8E' : 'transparent'}`}} />
            </button>
            <button className='arrow-button' disabled={!(page < 149)}
                onClick={doubleRight}>
                <FaAngleDoubleRight style={{ color: `${page < 149 ? '#8E8E8E' : 'transparent'}`}} />
            </button>
        </div>
    )
}