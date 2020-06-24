import React from 'react'
import Loader from './loader'
import axios from 'axios'
import Cookies from 'universal-cookie';

class Login extends React.Component{
    constructor(props)
    {
        super(props)
        this.state = {username:'',password:'',usernameerr:'',passworderr:'',loading:false,autherr:''}
    }
    changeInput = (e,no)=>{
        e.persist()
        switch(no){
            case 0:
                this.setState((prev_state)=>{
                    return(
                        {
                            ...prev_state,
                            username:e.target.value
                        }
                    )
                })
                break;
            case 1:
                this.setState((prev_state)=>{
                    return(
                        {
                            ...prev_state,
                            password:e.target.value
                        }
                    )
                })
                break;
        }
    }
    login = ()=>{
        if(this.state.username==='')
        {
            this.setState({usernameerr:'Enter Username'})
        }
        else if(this.state.password==='')
        {
            this.setState({password:'Enter Password'})
        }
        else
        {
            this.setState({
                loading:true
            })
            axios.post('/sign-in', {username:this.state.username,password:this.state.password}).then((res)=>{
                // console.log(res);
                // console.log(this.props.history)
                const cookies = new Cookies();
                cookies.set('auth_token',res.data.token,{path:"/"})
                this.props.history.push('/Profile')
            }).catch(err=>{
                // console.log(err.response.data)
                this.setState({
                    loading:false,
                    autherr:err.response.data.message
                })
            })
        }
    }
    render()
    {
        if(this.state.loading)
        {
            return(
                <Loader />
            )
        }
        
        return(
            <div>
                <p>UserName</p>
                <input type="text" name="username" required placeholder="enter username"  onChange={e=>this.changeInput(e,0)} value={this.state.username}/>
                <p>{this.state.usernameerr}</p>
                <p>UserName</p>
                <input type="password" name="password" required placeholder="enter password" onChange={e=>this.changeInput(e,1)} value={this.state.password}/>
                <p>{this.state.passworderr}</p>
                <button onClick={()=>{this.login()}}>Submit</button>
                <h2>{this.state.autherr}</h2>
            </div>
        )
    }
}

export default Login