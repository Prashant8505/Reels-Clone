import React, { useState } from 'react'
import { Button } from '@mui/material';
import LocalMoviesIcon from '@mui/icons-material/LocalMovies';
import LinearProgress from '@mui/material/LinearProgress';
import Alert from '@mui/material/Alert';
import { v4 as uuidv4 } from 'uuid'
import { arrayUnion, serverTimestamp, setDoc, updateDoc } from 'firebase/firestore';
import { storage } from '../firebase'
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { SelectUnstyledContext } from '@mui/base';

import { doc } from 'firebase/firestore';
import { db } from '../firebase';

function Upload({ userData }) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [progress, setProgress] = useState(0);

    const handleChange = (e) => {
        const file = e.target.files[0];
        if (file == null) {
            setError("Please select a file");
            setTimeout(() => {
                setError('')
            }, 2000)

            return
        }
        if ((file.size / (1024 * 1024)) > 40) {
            setError("Please select a smaller file");
            setTimeout(() => {
                setError('')
            }, 2000)

            return
        }
        let uid = uuidv4()
        setLoading(true)


        const storageRef = ref(storage, `${userData.uid}/posts/${uid}`);

        const uploadTask = uploadBytesResumable(storageRef, file);

        // Register three observers:
        // 1. 'state_changed' observer, called any time the state changes
        // 2. Error observer, called on failure
        // 3. Completion observer, called on successful completion
        uploadTask.on('state_changed',
            (snapshot) => {
                // Observe state change events such as progress, pause, and resume
                // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                const prog = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                setProgress(prog)
                console.log('Upload is ' + progress + '% done');
                switch (snapshot.state) {
                    case 'paused':
                        console.log('Upload is paused');
                        break;
                    case 'running':
                        console.log('Upload is running');
                        break;
                }
            },
            (error) => {
                // Handle unsuccessful uploads
                console.log(error)
                setError(error.message);
                setTimeout(() => {
                    setError('')
                }, 2000)

            },
            () => {
                // Handle successful uploads on complete
                // For instance, get the download URL: https://firebasestorage.googleapis.com/...
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    console.log('File available at', downloadURL);
                    let obj = {
                        likes: [],
                        postId: uid,
                        postUrl: downloadURL,
                        profileName: userData.name,
                        profileUrl: userData.photoURL,
                        uid: userData.uid,
                        timeStamp: serverTimestamp()
                    }
                    console.log(obj)
                    setDoc(doc(db, 'posts', uid), obj)
                    console.log("post added in collection")
                    updateDoc(doc(db, "users", userData.uid), { posts: arrayUnion(uid) })



                    console.log("doc added")
                    setLoading(false)
                    setProgress(0)
                });
            }
        );
    }

    return (
        <div className='upload-btn'>
            {
                error != '' ? <Alert severity="error">{error}</Alert> :
                    <Button variant="contained" component="label" fullWidth
                        style={{ marginTop: '0.5rem' }}
                        startIcon={<LocalMoviesIcon />}>
                        <input type='file' accept="video/*"
                            style={{ display: 'none' }}
                            onChange={handleChange} ></input>
                        Upload
                    </Button>
            }


            {
                loading &&
                <LinearProgress variant='determinate'
                    value={progress} style={{ marginTop: '0.5rem' }} />
            }
        </div>
    )
}

export default Upload