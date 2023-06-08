import React from 'react'
import './SearchBar.sass'
import logo from '../../assets/logo.png';
import { useSearchParams } from 'react-router-dom'


function SearchBar() {

  const [searchParams] = useSearchParams()
  const search = searchParams.get('search');

  return (
    <div className='search-bar'>
      <img src={logo} alt='Logo Meli' className='logo' />
      <form method='GET' action='/items' className='form'>
        <input type='search' className='search-input' name='search' placeholder='Nunca dejes de buscar' defaultValue={search} />
        <button type='submit' className='search-button'>
          <i className='fa fa-search search-icon'></i>
        </button>
      </form>
    </div>
  )
}

export default SearchBar