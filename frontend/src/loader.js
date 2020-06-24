import React from 'react'
import ReactLoading from 'react-loading';

class Loader extends React.Component{
    render()
    {
        return(
            <div className="loader">
                <ReactLoading type="spin" color='black' width={100} height={100} />
                <p>Authenticating.....</p>
            </div>
        )
    }
}

export default Loader