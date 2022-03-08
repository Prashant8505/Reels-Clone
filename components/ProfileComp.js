import React from 'react'
import NavBar from './NavBar'
import Img from '../assets/PRASHANT.jpeg'

function ProfileComp() {
    return (
        <div>
            <NavBar />
            <div>
                <div className="profile_upper">
                    <img src="https://media-exp1.licdn.com/dms/image/C5603AQEGbE3TmVxqFQ/profile-displayphoto-shrink_100_100/0/1642241026608?e=1652313600&v=beta&t=rmoOprHayAHxidUsIJ2ai4OqK5OirTZDoBjeHjHfNMk"
                        style={{ width: '8rem', height: '8rem', borderRadius: '50%' }} />
                    <div style={{ flexBasis: '40%' }}>
                        <h1>Name</h1>
                        <h3>Posts</h3>
                    </div>
                </div>
                <hr />
                <div className="profile_videos">
                    <video src="https://www.instagram.com/p/CayTPNYlU7h/?utm_source=ig_web_copy_link" style={{ border: '2px solid black' }} />
                    <video src="" style={{ border: '2px solid black' }} />
                    <video src="" style={{ border: '2px solid red' }} />
                    <video src="" style={{ border: '2px solid green' }} />
                </div>
            </div>
        </div >
    )
}

export default ProfileComp