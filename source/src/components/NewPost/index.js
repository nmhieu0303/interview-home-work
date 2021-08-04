import { Form, Input, Button, Typography } from 'antd';
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { addPostAction } from '../../redux/actions/postActions';
import EditableTagGroup from '../EditableTagGroup';
import Swal from 'sweetalert2';

const { Title } = Typography;

const NewPost = (props) => {
    const {addPost} = props;
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const [form] = Form.useForm();

    const layout = {
        wrapperCol: { span: 12, offset: 6 },
    };

    const handleChangeTags = (tags) => {
        form.setFieldsValue({
            tags: tags
          });
    }

    const onFinish = (values) => {
        addPost({owner:currentUser.id,...values})
        form.resetFields();
        Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Successful add new post',
            showConfirmButton: false,
            timer: 1500
        })
    };

    return (
        <div className="my-5">
            <Title className="text-center">New post</Title>
            <Form form={form} {...layout} name="nest-messages" onFinish={onFinish} >
                <Form.Item name='title'>
                    <Input placeholder="Input title..." />
                </Form.Item>
                <Form.Item name='content'>
                    <Input.TextArea
                        // value={value}
                        // onChange={onChange}
                        placeholder="What are you thinking?"
                        autoSize={{ minRows: 3, maxRows: 5 }} />
                </Form.Item>
                <Form.Item name='tags'>
                    <EditableTagGroup name='tags' handleChangeTags={handleChangeTags} />
                </Form.Item>

                <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 6 }}>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
}

const mapDispatchToProps = (dispatch)=>{
    return{
        addPost: (post)=>{
            dispatch(addPostAction(post))
        }
    }
}

export default connect(null,mapDispatchToProps)(NewPost);
