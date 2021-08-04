import { Button, Input, Form, Typography, DatePicker } from 'antd';
import React from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import { signupAction } from '../../redux/actions/userAction';
const { Title } = Typography;

const SignUp = (props) => {
    const {signup,currentUser} = props;

    if(currentUser){
        return <Redirect to="/" />;
    }

    const onFinish = (values: any) => {
        signup({...values,dob:values['dob'].format('DD/MM/YYYY')});
    };

    return (
        <div className="container">
            <Title className="text-center">Sign Up</Title>
            <Form
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
                <Form.Item
                    label="Name"
                    name="name"
                    rules={[{ required: true, message: 'Please input your name!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item name="dob" label="Dob" 
                rules={[{ required: true, message: 'Please input your birthday!' }]}
                >
                    <DatePicker />
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

const mapStateToProps = (state)=>{
    return{
        currentUser: state.usersReducer.currentUser
    }
}

const mapDispatchToProps =(dispatch)=>{
    return{
        signup: (user)=>{
            dispatch(signupAction(user));
        }
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(SignUp);
