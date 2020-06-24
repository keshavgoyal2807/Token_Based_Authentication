import React from 'react'
import Cookies from 'universal-cookie';

class Profile extends React.Component{
    logout=()=>{
        const cookies = new Cookies()
        cookies.remove('auth_token');
        this.props.history.push('/login')
    }
    render()
    {
        return(
            <div>
                <p>You are Logged In</p>
                <button onClick={this.logout}>Logout</button>
            </div>
        )
    }
}

export default Profile