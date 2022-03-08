import React from 'react'
import { Button } from '@mui/material';
import LocalMoviesIcon from '@mui/icons-material/LocalMovies';
import LinearProgress from '@mui/material/LinearProgress';

function Upload() {


    return (
        <div className='upload-btn'>
            <Button variant="contained" component="label" fullWidth
                style={{ marginTop: '0.5rem' }}
                startIcon={<LocalMoviesIcon />}>
                <input type='file' accept="image/*"
                    style={{ display: 'none' }}></input>
                Upload
            </Button>
            <LinearProgress variant='determinate' value={50} style={{ marginTop: '0.5rem' }} />
        </div>
    )
}

export default Upload