import React from 'react'
import { BrowserRouter, Switch, Route, NavLink, Redirect } from 'react-router-dom';
import checkToken from '../utils'
import Login from '../login';
import ReactLoading from 'react-loading';
import Loader from '../loader';
class PublicRoute extends React.Component{
    constructor(props)
    {
        super(props)
        this.state={token:false,loading:true}

    }

    componentDidMount()
    {
        var checkingToken  = checkToken();
        // console.log(checkingToken)
        checkingToken.then((res)=>{
            if(res)
            {
                // console.log(res)
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
                <Route {...rest} component={Loader}/>
            )
        }
        else
        {
            return(
                    <Route {...rest} render={(props)=> !this.state.token ?<Component {...props} />:<Redirect to={{pathname:"/Profile",state:{from:props.location}}} />} />
            )
        }
    }
}

export default PublicRoute