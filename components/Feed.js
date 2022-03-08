import React from 'react'
import NavBar from './NavBar'
import Upload from './Upload'
import Avatar from '@mui/material/Avatar';
import FavoriteIcon from '@mui/icons-material/Favorite';

function Feed() {
    return (
        <div className='feed-container'>
            <NavBar />
            <Upload />

            <div className="video_container">

                <div className="post_container">
                    <video />
                    <div className="video_info">
                        <div className='avatar'>
                            <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg"
                                sx={{ margin: '0.5rem' }} />
                            <p>Name</p>
                        </div>
                        <div className='post_like' >
                            <FavoriteIcon fontSize='large' />
                            <p>10</p>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Feed