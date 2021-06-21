import React from 'react'

import './header_style.css'
import Logo from '../../assets/marvel-logo.png'

export default function Header() {
    return (
        <header >
                <img onClick={() => window.location.reload()} className='header-image' src={Logo} alt='' />
                <div className='header-text'>  
                    <p className='name-text'><b>Ravi Leite Lopes</b> </p>
                    <p> Teste de Front-end</p>
                </div>
                
        </header>
    );
}