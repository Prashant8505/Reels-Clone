import React, { useContext, useEffect, useRef, useState } from 'react'
import Avatar from '@mui/material/Avatar';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { AuthContext } from '../context/auth';
import { arrayRemove, arrayUnion, doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';

function Post({ postData, userData }) {

    console.log(postData)
    console.log(userData)

    const { user } = useContext(AuthContext)
    const [like, setLike] = useState(false)
    const [isVideoPlaying, setIsVideoPlaying] = useState(false)
    const videoRef = useRef(null)

    const onVideoPress = () => {
        if (isVideoPlaying) {
            videoRef.current.pause()
            setIsVideoPlaying(false)
        } else {
            videoRef.current.play()
            setIsVideoPlaying(true)
        }
    }

    useEffect(() => {
        if (postData.likes.includes(user.uid)) {
            setLike(true)
        } else {
            setLike(false)
        }
    }, [postData])

    const handleLike = () => {
        if (!like) {
            updateDoc(doc(db, "posts", postData.postId), {
                likes: arrayUnion(user.uid)
            })
        }
        else {
            updateDoc(doc(db, "posts", postData.postId), {
                likes: arrayRemove(user.uid)
            })
        }
    }

    return (
        <div>
            <div className="post_container">
                <video src={postData.postUrl} style={{ objectFit: 'fill' }}
                    ref={videoRef}
                    onClick={onVideoPress}
                />
                <div className="video_info">v
                    <div className='avatar'>
                        <Avatar alt="Remy Sharp" src={postData.profileUrl}
                            sx={{ margin: '0.5rem' }} />
                        <p style={{ color: 'white', fontWeight: 'bold' }}> {postData.profileName}</p>
                    </div>
                    <div className='post_like' >
                        <FavoriteIcon fontSize='large' style={like ? { color: 'red' } : { color: 'white' }}
                            onClick={() => { handleLike() }} />
                        {postData.likes.length > 0 && postData.likes.length}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Post