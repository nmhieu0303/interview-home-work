import React from 'react';
import { connect } from 'react-redux';
import { Link,useHistory  } from "react-router-dom";
import { Avatar, Input } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { logoutAction } from '../../redux/actions/userAction';
import Swal from 'sweetalert2'
import './index.css';

const { Search } = Input;


const Header = (props) => {
    const { logout, currentUser } = props;
    const history  = useHistory();
    const onLogOut = () => {
        Swal.fire({
            title: 'Do you want to logout?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, I do!'
        }).then((result) => {
            if (result.isConfirmed) {
                logout();
                localStorage.removeItem("currentUser")
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Successful logout',
                    showConfirmButton: false,
                    timer: 1500
                })
                history.push('/');
            }
        })

    }

    const onSearch = value => {
        history.push(`/search/${value}`);
    }
    return (
        <nav className="navbar navbar-expand navbar-light bg-light">
            <div className="container">
                <Link className="navbar-brand" to="/">
                    Zigvy Blogs
                </Link>
                <Search className="w-50" placeholder="Input search text" onSearch={onSearch} enterButton />
                <nav className="menu navbar-nav">
                    <div className="nav-item">
                        <Link className="nav-link" to="/blogs">
                            Blogs
                        </Link>
                    </div>
                </nav>

                <div className="navbar-left d-flex">
                    {currentUser ? (
                        <>

                            <Link to="/profile">
                                <div className="user-info">
                                    <Avatar className="border border-dark border-1" shape="square" icon={<UserOutlined />} />
                                    <span className="user-name mx-2">{currentUser.name}</span>
                                </div>
                            </Link>

                            <button
                                className=" btn btn-primary"
                                type="button"
                                onClick={onLogOut}
                            >
                                SIGN OUT
                            </button>
                        </>
                    ) : (
                        <>
                            <Link to="/login">
                                <button className="btn btn-primary" type="button">
                                    SIGN IN
                                </button>
                            </Link>
                            <Link to="/signup">
                                <button className="btn btn-primary" type="button">
                                    SIGN UP
                                </button>
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
}



const mapStateToProps = (state) => {
    return {
        currentUser: state.usersReducer.currentUser
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        logout: () => {
            dispatch(logoutAction())
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
