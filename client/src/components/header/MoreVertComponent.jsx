import React, { useState } from 'react'
import { IconButton, Menu, MenuItem } from '@mui/material'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { logOutAsyncThunk } from '../../redux/features/authSlice'
import { useNavigate } from 'react-router'
import { useDispatch } from 'react-redux'
const MoreVertComponent = ({user,updateUserName}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  let options = ['Delete', 'Edit', user ? 'Log Out' : 'Log In'];
  const ITEM_HEIGHT = 48;
  const handleClose = (selectedOption) => {
    setAnchorEl(null);
    if (selectedOption === 'Log Out') {
      dispatch(logOutAsyncThunk());
      navigate('/');
      updateUserName(null)
    }
    if (selectedOption === 'Log In') {
      navigate('/auth')

    }
    if (selectedOption === 'Delete') {

    }

  };
  return (
    <>
      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={open ? 'long-menu' : undefined}
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup="true"
        onClick={handleClick}
        style={{ color: '#fff' }}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="long-menu"
        MenuListProps={{
          'aria-labelledby': 'long-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: '20ch',

          },
        }}
      >
        {options.map((option) => (
          <MenuItem key={option} onClick={() => handleClose(option)}>
            {option}
          </MenuItem>
        ))}
      </Menu>
    </>
  )
}

export default MoreVertComponent