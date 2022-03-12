import React, { useState, useContext, useEffect } from 'react'
import NavBar from './NavBar'
import Upload from './Upload'
import { query } from 'firebase/firestore';
import { AuthContext } from '../context/auth';
import { collection, doc, onSnapshot, orderBy } from 'firebase/firestore';
import { db } from '../firebase';
import Post from './Post';



function Feed() {

    const { user } = useContext(AuthContext)
    const [userData, setUserData] = useState({})
    const [posts, setPosts] = useState([])

    useEffect(() => {
        console.log(user.uid)
        const unsub = onSnapshot(doc(db, "users", user.uid), (doc) => {
            console.log(doc.data())
            setUserData(doc.data())
        })

        return () => {
            unsub()
        }
    }, [user])

    useEffect(() => {
        console.log(user.uid)
        const unsub = onSnapshot(query(collection(db, "posts"), orderBy("timeStamp", "desc")), (snapshot) => {
            let tempArray = []
            snapshot.docs.map((doc) => {
                tempArray.push(doc.data())
            })
            setPosts([...tempArray])
            console.log(tempArray)
        })

        return () => {
            unsub()
        }
    }, [user])

    return (
        <div className='feed-container'>
            <NavBar userData={userData} />
            <Upload userData={userData} />

            <div className="video_container">
                {
                    posts.map((post) => (
                        <Post postData={post} userData={userData} />
                    ))
                }
            </div>

        </div>

    )
}

export default Feed