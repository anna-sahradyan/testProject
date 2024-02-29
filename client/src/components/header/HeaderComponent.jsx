import React, { useState } from 'react'
import {
  Auth,
  Div,
  DivTop,
  HeaderPart,
  Hr,
  LiItem,
  ListItems,
  Logo,
  PopoverBody,
  PopoverBodySearchBag,
  Right,
  SearchDiv,
  Span, SpanIcon,
  StyledDivider,
  Title,
  Top,
  Ul,
} from './headerStyled'
import SearchBlock from '../../page/search/SearchBlock'
import { FaShopify } from 'react-icons/fa'
import { FaSignInAlt } from 'react-icons/fa'
import { SiGnuprivacyguard } from 'react-icons/si'
import { Popover } from '@mui/material'
import { IoIosArrowDown } from 'react-icons/io'
import { Link } from 'react-router-dom'
import { IoSearch } from 'react-icons/io5'
import MoreVertComponent from './MoreVertComponent'

const HeaderComponent = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));
  const userName = user ? user.result.name : null;
  console.log(userName)
  const [anchorEl, setAnchorEl] = React.useState(null)
  const [isPopoverOpen, setIsPopoverOpen] = useState(false)
  const [searchPopoverOpen, setSearchPopoverOpen] = useState(false)
  const handleClick = event => {
    setAnchorEl(event.currentTarget)
    setIsPopoverOpen(!isPopoverOpen)
  }
  const handleSearchClick = event => {
    setAnchorEl(event.currentTarget)
    setSearchPopoverOpen(!searchPopoverOpen)
  }
  const updateUserName = (newUserName) => {
    setUser(newUserName);
  };
  const handleClose = () => {
    setAnchorEl(null)
    setIsPopoverOpen(false)
    setSearchPopoverOpen(false)
  }

  const open = Boolean(anchorEl)
  const id = open ? 'simple-popover' : undefined

  return (
    <HeaderPart>
      <DivTop>
        <Top>
          <Logo>
            <Link to={'/'}>
              <Title>LuxeLoom</Title>
            </Link>
          </Logo>
        </Top>
        <Auth>
          {!user ?
            <Link to="/auth">
              <SpanIcon><FaSignInAlt size={20} /></SpanIcon>
               Sign Up
            </Link> :
            <Link to="/auth">
              <SpanIcon>{userName}</SpanIcon>

            </Link>
          }
          <MoreVertComponent user={user} updateUserName={updateUserName} />
        </Auth>
      </DivTop>
      <StyledDivider />
      <ListItems>
        <Ul>
          <Popover
            id={id}
            open={isPopoverOpen}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            PaperProps={{
              style: {
                width: '100%',
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                color: '#202020',
                height: 120,
              },
            }}
          >
            <PopoverBody>
              <Link to={'/'}>
                {' '}
                <Div>
                  All Shop All <Hr />
                </Div>
              </Link>
              <Div>
                Gold
                <Hr />
              </Div>
              <Div>
                Silver
                <Hr />
              </Div>
            </PopoverBody>
          </Popover>
          <LiItem onClick={handleClick}>
            Shop All <IoIosArrowDown size={20} />
          </LiItem>
          <LiItem>Rings</LiItem>
          <LiItem>Bracelets</LiItem>
          <LiItem>Blog</LiItem>
          <LiItem>Connect Us</LiItem>
        </Ul>
        <Right>
          <Popover
            id="searchPopover"
            open={searchPopoverOpen}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            PaperProps={{
              style: {
                width: '50%',
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                color: '#202020',
                height: '150px',
                margin: '15px 0',
              },
            }}
          >
            <PopoverBodySearchBag>
              <SearchDiv>
                <SearchBlock handleClose={handleClose} />
              </SearchDiv>
            </PopoverBodySearchBag>
          </Popover>
          <Span onClick={handleSearchClick}>
            <IoSearch size={20} />
          </Span>
          <Span>
            <FaShopify size={20} />
          </Span>
        </Right>
      </ListItems>
    </HeaderPart>
  )

}

export default HeaderComponent
