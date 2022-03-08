import React, { useState, useEffect, useContext } from 'react'
import TextField from '@mui/material/TextField';
import Image from 'next/image'
import Insta from '../../assets/insta.jpg'
import { Button } from '@mui/material';
import Link from 'next/link';
import { AuthContext } from '../../context/auth';
import { useRouter } from 'next/router';
import { storage } from '../../firebase'
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { SelectUnstyledContext } from '@mui/base';
import { setDoc } from 'firebase/firestore';
import { doc } from 'firebase/firestore';
import { db } from '../../firebase';

function Index() {

  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [file, setFile] = useState(null)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const { signup, user } = useContext(AuthContext)

  const handleClick = async () => {
    console.log(file)
    console.log(email)
    try {

      setLoading(true)
      setError('')
      const user = await signup(email, password)
      console.log("Signed Up")
      const storageRef = ref(storage, `${user.uid}/Profile`);

      const uploadTask = uploadBytesResumable(storageRef, file);

      // Register three observers:
      // 1. 'state_changed' observer, called any time the state changes
      // 2. Error observer, called on failure
      // 3. Completion observer, called on successful completion
      uploadTask.on('state_changed',
        (snapshot) => {
          // Observe state change events such as progress, pause, and resume
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
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
        },
        () => {
          // Handle successful uploads on complete
          // For instance, get the download URL: https://firebasestorage.googleapis.com/...
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            console.log('File available at', downloadURL);
            let obj = {
              name: name,
              email: email,
              uid: user.user.uid,
              photoURL: downloadURL
            }
            setDoc(doc(db, "users", user.user.uid), obj)
            console.log("doc added")
          });
        }
      );
    } catch (error) {
      console.log(error)
      setError(error.message)
      setTimeout(() => {
        setError('err')
      }, 2000);
    }
    setLoading(false)
  }

  useEffect(() => {
    if (user) {
      router.push('/')
    } else {
      console.log("user not loggedIn")
    }
  }, [user])

  return (
    <div className='signup_container'>
      <div className="signup_card">
        <Image src={Insta} />
        <TextField id="outlined-basic" size='small' margin='dense' required
          fullWidth label="Email" variant="outlined" value={email} onChange={(e) => setEmail(e.target.value)} />
        <TextField id="outlined-basic" size='small' margin='dense' required
          fullWidth label="Password" type="password" variant="outlined" value={password} onChange={(e) => setPassword(e.target.value)} />
        <TextField id="outlined-basic" size='small' margin='dense' required
          fullWidth label="Full Name" variant="outlined" value={name} onChange={(e) => setName(e.target.value)} />
        <Button variant="contained" component="label" fullWidth
          style={{ marginTop: '0.5rem' }} >
          <input type='file' accept="image/*"
            style={{ display: 'none' }} onChange={(e) => setFile(e.target.files[0])}></input>
          Upload
        </Button>
        <Button variant="contained" component="label" fullWidth
          style={{ marginTop: '0.5rem' }} onClick={handleClick} disabled={loading}>
          Sign Up
        </Button>
      </div>
      <div className="bottom_card">
        Already have an account? <Link href="/login"><span style={{ color: 'blue', cursor: 'pointer' }}>Log in</span></Link>
      </div>
    </div>
  )
}

export default Index