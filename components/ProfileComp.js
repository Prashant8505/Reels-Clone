import React, { useEffect, useContext, useState } from 'react'
import NavBar from './NavBar'
import Img from '../assets/PRASHANT.jpeg'
import { AuthContext } from '../context/auth';
import { collection, doc, onSnapshot, orderBy } from 'firebase/firestore';
import { db } from '../firebase';

function ProfileComp() {
    const { user } = useContext(AuthContext)
    const [userData, setUserData] = useState({})
    const [postIds, setPostIds] = useState([])
    const [posts, setPosts] = useState([])

    useEffect(() => {
        console.log(user.uid)
        const unsub = onSnapshot(doc(db, "users", user.uid), (doc) => {
            console.log(doc.data())
            setUserData(doc.data())
            setPostIds(doc.data().posts)
        })

        return () => {
            unsub()
        }
    }, [user])

    useEffect(async () => {
        let tempArray = []
        postIds.map(async (postid, idx) => {
            const unsub = onSnapshot(doc(db, "posts", postid), (doc) => {
                tempArray.push(doc.data())
                console.log(tempArray)
                setPosts([...tempArray])
            })
        })
    }, [postIds])

    return (
        <div>
            <NavBar />
            <div>
                <div className="profile_upper">
                    <img src={userData.photoURL}
                        style={{ width: '8rem', height: '8rem', borderRadius: '50%' }} />
                    <div style={{ flexBasis: '40%' }}>
                        <h1>{userData.name}</h1>
                        <h3>Posts : {userData?.posts?.length}</h3>
                    </div>
                </div>
                <hr />
                <div className="profile_videos">
                    {
                        posts.map((post) => (
                            <video src={post.postUrl} key={post.postId} />
                        ))
                    }

                </div>
            </div>
        </div >
    )
}

export default ProfileComp