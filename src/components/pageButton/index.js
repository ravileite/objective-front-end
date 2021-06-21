import React from 'react'

import { COLORS } from '../../consts'

export default function PageButton({ page, selected, changePage }) {
    return (
        <button 
            onClick={() => changePage(page)}
            style={{width: `${window.screen.width <= 375 ? '32px' : '40px'}`,
                height: '32px',
                backgroundColor: `${!selected ? '#F5F5F5' : '#167ABC'}`,
                border: '1px solid #E5E5E5',
                color: '#555555',
                borderRadius: '4px', outline: 'none', 
                cursor: 'pointer', marginLeft: `${window.screen.width <= 375 ? '4px' : '8px'}`, 
                marginRight: `${window.screen.width <= 375 ? '4px' : '8px'}`, fontFamily: 'PTSans-Regular'}}>
            {page}
        </button>
    )
}