import React, { useState } from 'react'
import SearchIcon from '@mui/icons-material/Search';
import RefreshIcon from '@mui/icons-material/Refresh';
import TableCihaz from '../components/TableCihaz';
import { Link } from '@mui/material';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import {Search,SearchIconWrapper,StyledInputBase} from '../components/Search';

function Device() {
  const [search,setSearch]=useState();
  return (
    <div className='home'>
        <div className='baslik'>Cihazlar</div>
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
        <TableCihaz parametre={search}/>
    </div>
    
  )
}

export default Device
