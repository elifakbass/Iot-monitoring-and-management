import React from 'react'

import SearchIcon from '@mui/icons-material/Search';
import { useState,useEffect } from 'react';
import TableGösterge from '../components/TableGösterge';
import {Search,SearchIconWrapper,StyledInputBase} from '../components/Search';



function Dashboard() {
  const [search,setSearch]=useState();

  return (
    <div className='home'>
      <div className='baslik'>Öge Görünümleri</div>
        <div className='Icons'> 
        <Search>
            <SearchIconWrapper>
              <SearchIcon sx={{color: "#595959"}} />
            </SearchIconWrapper>
            <StyledInputBase
            sx={{color: "#595959"}}
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
              onChange={(e) => setSearch(e.target.value)}    
            />
          </Search>
        </div>
        <TableGösterge parametre={search}/>
    </div>
  )
}

export default Dashboard
