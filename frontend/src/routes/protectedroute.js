import React from 'react'
import { BrowserRouter, Switch, Route, NavLink, Redirect } from 'react-router-dom';
import checkToken from '../utils'
import Login from '../login';
import ReactLoading from 'react-loading';
import Loader from '../loader';
class ProtectedRoute extends React.Component{
    constructor(props)
    {
        super(props)
        this.state={token:false,loading:true}

    }

    componentDidMount()
    {
        checkToken().then((res)=>{
            console.log(res)
            if(res)
            {
                this.setState({
                    token:true,
                    loading:false
                })
            }
            else
            {
                this.setState({
                    token:false,
                    loading:false
                })
            }
        })
    }

    render()
    {
        const {component:Component,...rest} = this.props
        // console.log({...rest})
        if(this.state.loading)
        {
            return(
                <Route exact path="/Profile" component={Loader}/>
            )
        }
        else
        {
            return(
            <Route {...rest} render={(props)=> this.state.token ?<Component {...props} />:<Redirect to={{pathname:"/login",state:{from:props.location}}} />} />
            )
        }
    }
}

export default ProtectedRoute