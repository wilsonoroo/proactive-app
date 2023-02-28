import { Grid } from '@mui/material';
import * as Icons from 'react-feather';
import './CustomInputs.scss';

export default function CustomInput({ inputSearchValue, setInputSearchValue, placeholder }) {

  return (
    <>
      <Grid
        maxWidth="sm"
        container
        direction="column"
        justifyContent="flex-start"
        alignItems="flex-start"
      >
        <div className='input-group'>
          <input
            className="form-control"
            type="text"
            placeholder={placeholder}
            value={inputSearchValue}
            onChange={(e) => setInputSearchValue(e.target.value)}
          />
          <div className="input-group-text">
            <Icons.Search className='icon-custom-input' />
          </div>
        </div>
      </Grid>
    </>
  );
}