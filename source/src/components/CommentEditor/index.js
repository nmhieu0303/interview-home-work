import React,{ useState} from 'react';
import {connect} from 'react-redux'
import {Form, Button, Input } from 'antd';
import { addCommentAction } from '../../redux/actions/commentActions';
import moment from 'moment';

const { TextArea } = Input;
const CommentEditor = (props) => {
    const{idPost,addComment} = props;
    const [state, setState] = useState('');
    const onChange = (event)=>{
        const {value} = event.target;
        setState(value)
    }
    const onSubmit = ()=>{
        addComment({
            owner: JSON.parse(localStorage.getItem('currentUser')).id,
            content:state,
            post:idPost,
            created_at: moment().valueOf(),
        })
        setState('');
    }
    return (
        <div>
            <Form.Item>
                <TextArea rows={3} onChange={onChange} value={state} />
            </Form.Item>
            <Form.Item>
                <Button htmlType="submit" onClick={onSubmit} type="primary">
                    Add Comment
                </Button>
            </Form.Item>
        </div>
    );
}
const mapDispatchToProps = (dispatch) =>{
    return{
        addComment:(comment) =>{
            dispatch(addCommentAction(comment))
        }
    }
}

export default connect(null,mapDispatchToProps)(CommentEditor);
