import React, { useContext, useEffect, useRef, useState } from 'react'
import Avatar from '@mui/material/Avatar';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { AuthContext } from '../context/auth';
import { arrayRemove, arrayUnion, doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { PlayArrow } from '@mui/icons-material';
import { Pause } from '@mui/icons-material';
import { VolumeOff } from '@mui/icons-material';

function Post({ postData, userData }) {

    console.log(postData)
    console.log(userData)

    const { user } = useContext(AuthContext)
    const [like, setLike] = useState(false)
    const [isVideoPlaying, setIsVideoPlaying] = useState(true)
    const [mute, setMute] = useState(false)
    const videoRef = useRef(null)

    useEffect(() => {
        let options = {
            rootMargin: "0px",
            threshold: [0.25, 0.75]
        };

        let handlePlay = (entries, observer) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {

                    videoRef.current.play();
                } else {
                    setMute(false)
                    videoRef.current.pause();
                }
            });
        };

        let observer = new IntersectionObserver(handlePlay, options);

        observer.observe(videoRef.current);
    });
    // const onVideoPress = () => {
    //     if (isVideoPlaying) {
    //         setIsVideoPlaying(false)
    //     } else {
    //         setIsVideoPlaying(true)
    //     }
    // }

    // const handleScroll = (e) => {
    //     if (isVideoPlaying) {
    //         videoRef.current.pause()
    //         setIsVideoPlaying(false)
    //     }
    // }

    const handleMute = () => {
        if (!mute) {
            setMute(true)
        } else {
            setMute(false)
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
                    onClick={handleMute}
                    muted={mute}
                />
                <div className="video_info">

                    <div className='avatar'>
                        <Avatar alt="Remy Sharp" src={postData.profileUrl}
                            sx={{ margin: '0.5rem' }} />
                        <p style={{ color: 'white', fontWeight: 'bold' }}> {postData.profileName}</p>
                    </div>
                    <div>
                        {mute && <VolumeOff className='mute' />}
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