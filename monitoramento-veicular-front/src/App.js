
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Dashboard from './pages/dashboard';
import MapPage from './pages/mapPage';
import ProblemsPage from './pages/problemsPage';
import { AppBar, Toolbar, Typography, IconButton, Menu, MenuItem, Container, Box } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { ProblemsProvider } from './contexts/problemsContext'; 

function App() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);

  const pages = [
    { name: 'Dashboard', path: '/' },
    { name: 'Mapa', path: '/map' },
    { name: 'Problemas', path: '/problems' },
  ];

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <ProblemsProvider>
    <Router>
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            {/* Logo ou título grande, visível em telas maiores */}
            <Typography
              variant="h6"
              noWrap
              component={Link}
              to="/"
              sx={{
                mr: 2,
                display: { xs: 'none', md: 'flex' },
                fontWeight: 700,
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              Monitoramento Veicular
            </Typography>

            {/* Ícone do menu hambúrguer, visível em telas menores */}
            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                size="large"
                aria-label="menu de navegação"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>

              {/* Menu dropdown */}
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: 'block', md: 'none' },
                }}
              >
                {pages.map((page) => (
                  <MenuItem key={page.name} onClick={handleCloseNavMenu} component={Link} to={page.path}>
                    <Typography textAlign="center">{page.name}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>

            {/* Logo ou título pequeno, visível em telas menores */}
            <Typography
              variant="h6"
              noWrap
              component={Link}
              to=""
              sx={{
                flexGrow: 1,
                display: { xs: 'flex', md: 'none' },
                fontWeight: 700,
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              Monitoramento
            </Typography>

            {/* Botões de navegação, visíveis em telas maiores */}
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              {pages.map((page) => (
                <Typography
                  key={page.name}
                  variant="button"
                  component={Link}
                  to={page.path}
                  onClick={handleCloseNavMenu}
                  sx={{
                    my: 2,
                    color: 'inherit',
                    display: 'block',
                    textDecoration: 'none',
                    marginLeft: 2,
                  }}
                >
                  {page.name}
                </Typography>
              ))}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      {/* Rotas */}
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/map" element={<MapPage />} />
        <Route path="/problems" element={<ProblemsPage />} />
      </Routes>
    </Router>
    </ProblemsProvider>
  );
}

export default App;
