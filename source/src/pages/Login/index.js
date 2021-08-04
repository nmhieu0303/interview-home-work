import { Button, Input, Form, Typography } from 'antd';
import Checkbox from 'antd/lib/checkbox/Checkbox';
import React from 'react';
import {Redirect} from 'react-router-dom'
import { connect } from 'react-redux';
import { loginAction } from '../../redux/actions/userAction';
import Swal from 'sweetalert2'

const { Title } = Typography;

const Login = (props) => {
    const {usersList,login,currentUser} = props;
    const [form] = Form.useForm();

    if (currentUser) {
        return <Redirect to="/" />;
    }

    const findUser = (username,password) => {
        return usersList.find(user => user.username === username && user.password === password);
    }


    const onFinish = (values) => {
        const user = findUser(values.username, values.password)
        if(user){
           
            login(user);
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Successful login',
                showConfirmButton: false,
                timer: 1500
            })
        }else{
            Swal.fire({
                icon: 'error',
                title: 'Login failed',
                text: 'User not exists!!',
              })
        }
    };

    return (
        <div className="container">
            <Title className="text-center">Login</Title>
            <Form
                form={form}
                className="w-75"
                name="basic"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                initialValues={{ remember: true }}
                onFinish={onFinish}
            >
                
                <Form.Item
                    label="Username"
                    name="username"
                    rules={[{ required: true, message: 'Please input your username!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Password"
                    name="password"
                    rules={[{ required: true, message: 'Please input your password!' }]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 8, span: 16 }}>
                    <Checkbox>Remember me</Checkbox>
                </Form.Item>

                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        usersList: state.usersReducer.usersList,
        currentUser: state.usersReducer.currentUser
    }
}

const mapDispatchToProps = (dispatch) =>{
    return{
        login:(user)=>{
            dispatch(loginAction(user))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
