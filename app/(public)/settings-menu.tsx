"use client"

import { useState } from "react"

import {
  Avatar, Box, IconButton, Menu, MenuItem, Tooltip, Typography
} from "@mui/material"

import styles from './page.module.css'

const settings = ['Profile', 'Account', 'Dashboard', 'Logout']

export default function SettingsMenu() {
  const [anchorElUser, setAnchorElUser] =
    useState<null | HTMLElement>(null)

  const handleOpenUserMenu = (
    event: React.MouseEvent<HTMLElement>
  ) => setAnchorElUser(event.currentTarget)

  const handleCloseUserMenu = () => setAnchorElUser(null)

  return (
    <Box sx={ { flexGrow: 0 } }>
      <Tooltip title="Open settings">
        <IconButton onClick={handleOpenUserMenu} sx={ { p: 0 } }>
          <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
        </IconButton>
      </Tooltip>
      <Menu
        id="menu-appbar"
        anchorEl={anchorElUser}
        anchorOrigin={ { vertical: 'top', horizontal: 'right' } }
        transformOrigin={ { vertical: 'top', horizontal: 'right' } }
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
        className={styles.settingsMenu}
        keepMounted
      >
        {
          settings.map((setting) => (
            <MenuItem key={setting} onClick={handleCloseUserMenu}>
              <Typography textAlign="center">{setting}</Typography>
            </MenuItem>
          ))
        }
      </Menu>
    </Box>
  )
}
