import React, { useContext, useState, useEffect } from 'react'
import TextField from '@mui/material/TextField';
import Image from 'next/image'
import Insta from '../assets/insta.jpg'
import { Button } from '@mui/material';
import bg1 from '../assets/bg1.jpg';
import bg2 from '../assets/bg2.jpg';
import bg3 from '../assets/bg3.jpg'
import { Carousel } from 'react-responsive-carousel';
import { AuthContext } from '../context/auth';
import { useRouter } from 'next/router';



function ForgotPassword() {

    const router = useRouter()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    const { forgot, user } = useContext(AuthContext)

    const handleClick = async () => {
        try {
            setLoading(true)
            setError('')
            await forgot(email)
            console.log("Email sent")
            router.push('/login')
        } catch (error) {
            console.log(error)
            setError(error.message)
            setTimeout(() => {
                setError('')
            }, 2000);
        }
        setLoading(false)
    }

    //if there is some user then take him to login page
    //but How to take user to login page?
    //Answer is to use programmatic routing  
    useEffect(() => {
        if (user) {
            router.push('/')
        } else {
            console.log("user not loggedIn")
        }
    }, [user])


    return (
        <div className='login_container '>
            <div className="carbg">
                <div className='car'>
                    <Carousel
                        showIndicators={false}
                        showThumbs={false}
                        showStatus={false}
                        infiniteLoop={true}
                        interval={2000}
                        autoPlay={true}
                        showArrows={false}>
                        <div>
                            <Image src={bg1} />

                        </div>
                        <div>
                            <Image src={bg2} />

                        </div>
                        <div>
                            <Image src={bg3} />

                        </div>
                    </Carousel>
                </div>
            </div>
            <div className="login">
                <div className="login_card">
                    <Image src={Insta} />
                    <TextField id="outlined-basic" size='small' margin='dense' required
                        fullWidth label="Email" variant="outlined"
                        value={email} onChange={(e) => { setEmail(e.target.value) }} />

                    {/* <TextField id="outlined-basic" size='small' margin='dense' required
                        fullWidth label="Password" type="password" variant="outlined"
                        value={password} onChange={(e) => { setPassword(e.target.value) }} /> */}

                    {
                        error != '' && <div className="error" style={{ color: 'red' }}>{error}</div>
                    }


                    <Button variant="contained" component="label" fullWidth
                        style={{ marginTop: '0.5rem' }} onClick={handleClick} disabled={loading}>
                        Send Email
                    </Button>
                    {/* <div className="forgot" style={{ color: 'blue' }}>Forgot Password?</div> */}
                </div>
                <div className="bottom_card">
                    Dont have an account? <span style={{ color: 'blue' }}>Sign Up</span>
                </div>
            </div>
        </div>
    )
}

export default ForgotPassword