import { Container, useTheme } from "@mui/material";
import useMediaQuery from '@mui/material/useMediaQuery';
import { useEffect } from "react";
function useWidth() {
  const theme = useTheme();
  const keys = [...theme.breakpoints.keys].reverse();
  return (
    keys.reduce((output, key) => {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const matches = useMediaQuery(theme.breakpoints.up(key));
      return !output && matches ? key : output;
    }, null) || 'xs'
  );
}


export default function MainContainer({ titulo = "Proactive App", children }) {

  const width = useWidth();

  useEffect(() => {
    document.title = `${titulo} | Proactive`;
  }, []);

  return (

    <Container style={{ paddingTop: 50, paddingLeft: 10, paddingRight: 10 }} maxWidth={width} >
      {children}
    </Container>


  );
}