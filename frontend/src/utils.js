import axios from 'axios'
import Cookies from 'universal-cookie'
const cookies = new Cookies();
const checkToken = async ()=>{
    var token = false;
    await axios.get('/verify',{
        headers:{
            authorization:cookies.get('auth_token')
        }
    }).then(res =>{
        if(res.status==200)
        {
            token = true;
        }
    }).catch(err =>{
        token=false;
    })
    return token
}



export default checkToken