import Link from 'next/link';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const NavBar = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Link href="/" underline="none" sx={{ textDecoration: 'none' }}>
            <Typography variant="h6" sx={{ mx: 2, color: 'white', fontWeight: 'bold' }}>
                App Name
            </Typography>
        </Link>
        <Box sx={{ flexGrow: 1 }} />
        <Link href="/create-account" passHref>
          <Button color="inherit" sx={{ bgcolor: 'secondary.main', color: 'white' }}>Create Account</Button>
        </Link>
        <Box sx={{ width: 16 }} />
        <Link href="/login" passHref>
          <Button color="inherit" sx={{ bgcolor: 'secondary.main', color: 'white' }}>Login</Button>
        </Link>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;