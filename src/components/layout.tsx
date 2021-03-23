// Layout.tsx
import { ReactNode } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import NavBar from './navbar';
import theme from '../theme';

interface Props {
  children: ReactNode;
}

const Layout = ({ children }: Props) => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <NavBar />
      <Container>
        {children}
      </Container>
    </ThemeProvider>
  );
};

export default Layout;