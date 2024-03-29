import React, { useContext } from 'react'
import ProfileComp from '../components/ProfileComp'
import { useRouter } from 'next/router'
import { AuthContext } from '../context/auth'

function Profile() {
    const { user } = useContext(AuthContext)

    const Redirect = () => {
        const router = useRouter()
        router.push('/login')
        return null
    }
    return (
        <div>
            {
                user?.uid ? <ProfileComp /> : <Redirect />
            }
        </div>
    )
}

export default Profile