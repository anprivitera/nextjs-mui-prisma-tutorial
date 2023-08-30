"use client"

import { useState } from "react"

import { Box, Button, IconButton, Menu, MenuItem, Typography } from "@mui/material"
import MenuIcon from '@mui/icons-material/Menu'
import { Adb } from "@mui/icons-material"

import styles from './page.module.css'

const pages = {
  Products: '/products',
  Pricing: '/pricing',
  Blog: 'https://blog.example.com',
}
export default function CollapsableMenu() {
  const [anchorElNav, setAnchorElNav] =
    useState<null | HTMLElement>(null)

  const handleOpenNavMenu = (
    event: React.MouseEvent<HTMLElement>
  ) => setAnchorElNav(event.currentTarget)

  const handleCloseNavMenu = () => setAnchorElNav(null)

  const display = { xs: 'flex', md: 'none' }
  return (
    <>
      <Box sx={ { flexGrow: 1, display } }>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="menu-appbar"
          aria-haspopup="true"
          onClick={handleOpenNavMenu}
          color="inherit"
        >
          <MenuIcon />
        </IconButton>
        <Menu
          id="menu-appbar"
          anchorEl={anchorElNav}
          anchorOrigin={ { vertical: 'bottom', horizontal: 'left' } }
          transformOrigin={ { vertical: 'top', horizontal: 'left' } }
          sx={ { display: { xs: 'block', md: 'none' } } }
          open={Boolean(anchorElNav)}
          onClose={handleCloseNavMenu}
          keepMounted
        >
          {Object.entries(pages).map(
            ([page, href]) => (
              <MenuItem key={page}>
                <Typography textAlign="center">
                  <Link href={href} underline="none" color="inherit">
                    {page}
                  </Link>
                </Typography>
              </MenuItem>
            )
          )}
        </Menu>
      </Box>
      <Adb sx={ { display, mr: 1 } } />
      <Typography
        variant="h5"
        component="a"
        className={styles.logo}
        sx={ { display, mr: 2, flexGrow: 1 } }
        href="/"
        noWrap
      >
        LOGO
      </Typography>
      <Box sx={ { flexGrow: 1, display: { xs: 'none', md: 'flex' } } }>
      {Object.entries(pages).map(
          ([page, href]) => (
            <Button
              key={page}
              href={href}
              sx=
            >
              {page}
            </Button>
          ))
        }
      </Box>
    </>
  )
}