import { Adb } from "@mui/icons-material"
import { AppBar, Container, Toolbar, Typography } from "@mui/material"
import CollapsableMenu from "./collapsable-menu"
import SettingsMenu from "./settings-menu"

import styles from './page.module.css'

export default function ResponsiveAppBar() {
  const display = { xs: 'none', md: 'flex' }

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Adb sx={ { display, mr: 1 } } />
          <Typography
            variant="h6"
            component="a"
            className={styles.logo}
            sx={ { display, mr: 2 } }
            href="/"
            noWrap
          >
            LOGO
          </Typography>

          <CollapsableMenu />
          <SettingsMenu />
        </Toolbar>
      </Container>
    </AppBar>
  )
}