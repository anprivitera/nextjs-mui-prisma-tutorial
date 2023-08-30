Developing a WebApp using NextJS 13 & Material UI
-------------------------------------------------

[#React, NodeJS, NextJS, Material UI](/tags/#React, NodeJS, NextJS, Material UI)    
  
August 29, 2023   Fábio Miranda

This tutorial shows how to set up a project and build a home page skeleton using NextJS 13 and MUI components.

[Next.js](https://nextjs.org) enables the creation of full-stack Web applications by extending the latest [React](https://react.dev/) features. Some of the features explored in this article are: Route Groups to organize public and protected routes; Server-side rendering and Client-side hydration; Layout composition; and organizing CSS into page modules.

[MUI](https://mui.com/) offers a comprehensive suite of free UI tools to help you ship new features faster. Learning MUI is an exercise of selecting an existing example of their amazing [components library](https://mui.com/material-ui/getting-started/), copying the code, and customizing them for the app purposes. An [AppBar](https://mui.com/material-ui/react-app-bar/) component is used to build a simple home page skeleton with responsive menu and links.

1\. Create new NextJS project
-----------------------------

[https://nextjs.org/docs/getting-started/installation](https://nextjs.org/docs/getting-started/installation)

    npx create-next-app@latest
    
    ✔ What is your project named? … nextjs-mui-prisma-tutorial
    ✔ Would you like to use TypeScript? … Yes
    ✔ Would you like to use ESLint? … Yes
    ✔ Would you like to use Tailwind CSS? … No
    ✔ Would you like to use `src/` directory? … No
    ✔ Would you like to use App Router? (recommended) … Yes
    ✔ Would you like to customize the default import alias? … Yes
    ✔ What import alias would you like configured? … @/*
    

Change the directory and run the project:

    cd nextjs-mui-prisma-tutorial
    
    npm run dev
    > nextjs-mui-prisma-tutorial@0.1.0 dev
    > next dev
    
    - ready started server on [::]:3000, url: http://localhost:3000
    - event compiled client and server successfully in 101 ms (20 modules)
    - wait compiling...
    - event compiled client and server successfully in 75 ms (20 modules)
    

### 1.1. Remove all the NextJS boilerplate code

Delete the contents of these files (only the contents, not the files themselves):

*   globals.css: leave it blank for awhile
*   page.modules.css: keep only this code

    .main {
      margin: 0 auto;
    }
    

*   page.tsx: keep this code

    import styles from './page.module.css'
    
    export default function Home() {
      return (
        <main className={styles.main}>
          Main Page
        </main>
      )
    }
    

Commit the changes

    $ git commit -am "Removed the NextJS boilerplate code"
    

### 1.2. Create different Route Groups for protected and public pages

[https://nextjs.org/docs/app/building-your-application/routing/route-groups](https://nextjs.org/docs/app/building-your-application/routing/route-groups)

#### 1.2.1. Protected Route Group

The `(protected)` route group will host a Dashboard-like app only accessible after proper authentication.

    mkdir -p app/\(protected\)/dashboard
    
    # This will create a copy of the blank page and css module to the (protected) route group
    cp app/page* app/\(protected\)/dashboard
    

Now edit the Dashboard page to:

    export default function DashboardPage() {
      return (
        <main className={styles.main}>
          Dashboard Page
        </main>
      )
    }
    

Test it on [http://localhost:3000/dashboard](http://localhost:3000/dashboard).

#### 1.2.2. Public Route Group

Finally, permanently move the home page to the (public) route group

    mkdir app/\(public\)
    git mv app/page* app/\(public\)
    

It must still work on [http://localhost:3000](http://localhost:3000).

Commit.

    git commit -m "Created (protected) and (public) route groups"
    

2\. Set up Material UI dependencies
-----------------------------------

[https://mui.com/material-ui/getting-started/installation/](https://mui.com/material-ui/getting-started/installation/)

    npm install @mui/material @emotion/react @emotion/styled @fontsource/roboto @mui/icons-material
    
    git commit -am "Installed Material UI dependencies"
    

### 2.1. Set up the CSS Baseline

Open the `app/layout.tsx` file.

Import the MUI Baseline

    import CssBaseline from '@mui/material/CssBaseline'
    

Then and the `<CssBaseline>` component to the page layout:

    <html lang="en">
      <CssBaseline />
      <body className={inter.className}>{children}</body>
    </html>
    

    git commit -am "Added CssBaseline"
    

### 2.2. Import the Roboto font

In the `app.layout.tsx`, replace the Inter font:

    import { Inter } from 'next/font/google'
    
    const inter = Inter({ subsets: ['latin'] })
    

Material UI uses the Roboto font by default, this is how you achieve it via NextJS layout.

    import { Roboto } from 'next/font/google'
    
    const roboto = Roboto({
      weight: ['300', '400', '500', '700'],
      subsets: ['latin'],
    })
    

Fix the page font:

          <body className={roboto.className}>{children}</body>
    

Commit

    git commit -am "Set the Roboto font as it's preferred for use with MUI"
    

3\. Build a simple Home page using MUI AppBar with responsive menu
------------------------------------------------------------------

[https://mui.com/material-ui/react-app-bar/#app-bar-with-responsive-menu](https://mui.com/material-ui/react-app-bar/#app-bar-with-responsive-menu)

Copy and paste the TSX version of the code into `app/(public)/responsive-app-bar.tsx`, then add the component to the Home page:

    import styles from './page.module.css'
    import ResponsiveAppBar from './responsive-app-bar'
    
    export default function Home() {
      return (
        <main className={styles.main}>
          <ResponsiveAppBar />
          Home Page
        </main>
      )
    }
    

This error will happen when you open the home page:

    Unhandled Runtime Error
    Error: useState only works in Client Components.
    Add the "use client" directive at the top of the file to use it.
    Read more: https://nextjs.org/docs/messages/react-client-hook-in-server-component
    

In NextJS 13, by default, the pages are rendered in the server side for each request. Client-side code, like React State Management logic and client-side event handlers, runs only in the browser. A quick-and-ugly workaround: simply add this directive to the top of the app bar component.

    "use client"
    

![home-app-bar.png](assets/img/posts/2023-08-28-home-app-bar.png)

However, we can better use the capabilities of NextJS 13 by isolating the client components, in a way that most of the page structure can be rendered in the server side, letting only the client-side code to be hydrated when the browser renders the DOM.

### Extract client components

The client components are those who implement some sort of interactive behaviors. It’s easy to spot them on the code: you only need to comment out the State Management and the event handlers codes:

      // const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null)
      // const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null)
    
      // const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
      //   setAnchorElNav(event.currentTarget)
      // }
      // const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
      //   setAnchorElUser(event.currentTarget)
      // }
    
      // const handleCloseNavMenu = () => {
      //   setAnchorElNav(null)
      // }
      // const handleCloseUserMenu = () => {
      //   setAnchorElUser(null)
      // }
    

After commenting out these lines VS Code will display errors in the buttons, menus, and tooltips components. Now we can extract them to client components files. Following you can see the final structure of the components. For convenience, the CSS related codes were also extracted to `app/(public)/page.module.css`.

### 3.1. Responsive App Bar

This file won’t depend on the `"use client"` directive anymore.

    import { Adb } from "@mui/icons-material"
    import { AppBar, Container, Toolbar, Typography } from "@mui/material"
    import CollapsibleMenu from "./collapsible-menu"
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
    
              <CollapsibleMenu />
              <SettingsMenu />
            </Toolbar>
          </Container>
        </AppBar>
      )
    }
    

### 3.2. Collapsible Menu

    "use client"
    
    import { useState } from "react"
    
    import { Box, Button, IconButton, Menu, MenuItem, Typography } from "@mui/material"
    import MenuIcon from '@mui/icons-material/Menu'
    import { Adb } from "@mui/icons-material"
    
    import styles from './page.module.css'
    
    const pages = ['Products', 'Pricing', 'Blog']
    
    export default function CollapsibleMenu() {
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
              {
                pages.map((page) => (
                  <MenuItem key={page} onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">{page}</Typography>
                  </MenuItem>
                ))
              }
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
            {
              pages.map((page) => (
                <Button key={page} sx={ { my: 2 } } className={styles.appLink}>
                  {page}
                </Button>
              ))
            }
          </Box>
        </>
      )
    }
    

### 3.3. Settings Menu

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
    

### 3.4. page.module.css

    .main {
      margin: 0 auto;
    }
    
    .logo {
      color: inherit;
      font-weight: 700;
      font-family: monospace;
      letter-spacing: .3rem;
      text-decoration: none;
    }
    
    .appLink {
      color: white;
      display: block;
    }
    
    .settingsMenu {
      margin-top: 45px;
    }
    

4\. Products and Pricing pages
------------------------------

Now let’s add more pages. First we need to link the Collapsible Menu buttons to these pages:

    const pages = {
      Products: '/products',
      Pricing: '/pricing',
      Blog: 'https://blog.example.com',
    }
    
    ...
    
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
    
    ...
    
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
    

And then add the pages below and test navigating between the Home, Products, and Pricing pages.

### 4.1. Products Page

Create a file named `app/(public)/products/page.tsx`.

    import styles from '../page.module.css'
    import ResponsiveAppBar from '../responsive-app-bar'
    
    export default function Products() {
      return (
        <main className={styles.main}>
          <ResponsiveAppBar />
          Products Page
        </main>
      )
    }
    

### 4.2. Pricing Page

Create a file named `app/(public)/pricing/page.tsx`

    import styles from '../page.module.css'
    import ResponsiveAppBar from '../responsive-app-bar'
    
    export default function Pricing() {
      return (
        <main className={styles.main}>
          <ResponsiveAppBar />
          Pricing Page
        </main>
      )
    }
    

Commit

     git commit -m "Link to products and pricing pages"
    

### 4.3. Extracting the Home layout

You can see we’re copying and pasting most of the code. In order to avoid it, we can create an `app/(public)/layout.tsx` component to centralize all the repetitive code. This internal layout component will nest inside the outer layout component at `app/layout.tsx` where we had set up the font and the CSS Base line. This is a useful technique to compose complex layout structures.

#### Layout

    import styles from './page.module.css'
    import ResponsiveAppBar from "./responsive-app-bar"
    
    export default function PublicLayout({
      children,
    }: {
      children: React.ReactNode
    }) {
      return (
        <main className={styles.main}>
          <ResponsiveAppBar />
          { children }
        </main>
      )
    }
    

#### Home page

    export default function Home() {
      return (
        <>
          Home Page
        </>
      )
    }
    

#### Products Page

    export default function Home() {
      return (
        <>
          Products Page
        </>
      )
    }
    

#### Pricing Page

    export default function Pricing() {
      return (
        <>
          Pricing Page
        </>
      )
    }
    

5\. Conclusion
--------------

This introductory article presented a step-by-step guide to

*   create a NextJS 13 project
*   set up Material UI
*   design Route Groups for public / authentication protected pages
*   understand how to organize server-side and client-side code
*   understand how to organize page layouts

The next article on this series will focus on building the Authentication and the protected Dashboard pages.