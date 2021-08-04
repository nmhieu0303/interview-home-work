import React, { useState } from 'react';
import { Link } from 'react-router-dom'
import './index.css';
import { Tag, Typography } from 'antd';
import { TagColors } from '../../utils/constants/TagColors';
import dataCommnets from './../../utils/constants/comments.json'
import moment from 'moment';
import Comments from '../Comments';
import { connect } from 'react-redux';
const { Title } = Typography;


const Post = (props) => {
    const { post, usersList, showAll } = props;
    const findUserName = (owner) => {
        return usersList.find(user => user.id === owner).name;
    }
    const [expand, setExpand] = useState(false)
    const time = moment(post.created_at).format('MMMM dd YYYY');
    const comments = dataCommnets.filter(comment => comment.post === post.id);

    const onExpand = (isExpanded) => {
        setExpand(isExpanded);
    }

    const renderConent = () => {
        if (post.content.length < 100) {
            return post.content;
        } else {
            return expand ? (
                <>
                    {post.content}
                    <i onClick={() => onExpand(false)}>
                        <strong> Show less</strong>
                    </i>
                </>
            ) : (
                <>
                    {post.content.slice(0, 99)}
                    <i onClick={() => onExpand(true)}>
                        <strong> ... Show more</strong>
                    </i>
                </>
            )
        }
    }



    return (
        <div className="post my-3" id={post.id}>
            <Link to={`/post/${post.id}`}>
                <Title level={2} className="text-center mb-1">{post.title}</Title>
            </Link>
            <div className="d-flex justify-content-between">
                <div className="info-post">
                    <p>Author: {findUserName(post.owner)}</p>
                    <p>Create at: {time}</p>
                </div>
                <div className="tag-group w-25 text-end">
                    {post.tags.map((tag, index) => {
                        const color = TagColors[Math.floor(Math.random() * 11)]
                        return <Tag color={color}>{tag}</Tag>
                    })}
                </div>
            </div>
            <div className="post-content">
                {showAll ? post.content : renderConent()}
            </div>
            <Comments data={comments} idPost={post.id}/>
            

        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        usersList: state.usersReducer.usersList
    }
}

export default connect(mapStateToProps)(Post);