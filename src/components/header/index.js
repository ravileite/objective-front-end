import React from 'react'

import './header_style.css'
import Logo from '../../assets/objective.png'

export default function Header() {
    return (
        <header >
            <img onClick={() => window.location.reload()} className='header-image' src={Logo} alt='' />
            <div className='header-text'>
                <div className='name-and-test'>
                    <p className='name-text'><b>Ravi Leite Lopes</b> </p>
                    <p className='test-text'> Teste de Front-end</p>
                </div>
                <p className='CB'>CB</p>
            </div>
        </header>
    );
}