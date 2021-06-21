import React from 'react'

import { COLORS } from '../../consts'

export default function PageButton({ page, selected, changePage }) {
    return (
        <button className='page-button'
            onClick={() => changePage(page)}
            style={{color: `${selected ? '#FFF' : COLORS.TEXT_COLOR}`, 
                    backgroundColor: `${selected ? '#007db8' : 'transparent'}`,
                    borderWidth: '0px', borderRadius: '3px',
                    fontSize: '14px', outline: 'none', cursor: 'pointer'
            }}>
        {page}
        </button>
    )
}