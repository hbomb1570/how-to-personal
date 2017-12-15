import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getUser } from './../../ducks/users';
import './User.css'

class User extends Component {

    componentDidMount() {
        this.props.getUser();
    }

    render() {
        const loginJSX = (
            this.props.user ?
                <div className='info-container'>
                    <p>Username: {this.props.user.user_name}</p>
                    <a href={process.env.REACT_APP_LOGIN}><button>Logout</button></a>
                </div>
                :
                <div className='info-container'>
                    <Link to='/'><button>Log in</button></Link>
                </div>
        )

        return (
            <div>
                {loginJSX}
            </div>
        )
    }
}

function mapStateToProps(state){
    return {
        user: state.userData
    }
}

export default connect(mapStateToProps,{getUser})(User)