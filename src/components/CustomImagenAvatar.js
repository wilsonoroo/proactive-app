import { Typography } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';

export default function CustomImagenAvatar({ width = 150, src = null, letras = "", fontSize = 60 }) {
  return (
    <Stack direction="row" spacing={2} justifyContent="center" className='my-3'>
      {src === null ? <Avatar
        alt="fotografia-perfil"
        sx={{ width: width, height: width }}
      ><Typography fontSize={fontSize}>{letras}</Typography> </Avatar> :
        <Avatar
          alt="fotografia-perfil"
          src={src}
          sx={{ width: width, height: width }}
        />}
    </Stack>
  );
}
