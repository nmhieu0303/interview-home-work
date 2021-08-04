import { Collapse, Comment, List } from 'antd';
import moment from 'moment';
import React from 'react';
import './index.css';
import { connect } from 'react-redux';
import Avatar from 'antd/lib/avatar/avatar';
import CommentEditor from '../CommentEditor';


const { Panel } = Collapse;


const Comments = (props) => {
    const { idPost, commentsList, usersList, currentUser } = props;
    const comments = commentsList.filter(comment => comment.post === idPost)
    comments.sort((a, b) => {
        return b.created_at - a.created_at;
    })
    const findUserName = (owner) => {
        return usersList.find(user => user.id === owner).name;
    }
    return (
        <div>
            <Collapse className="border-bottom rounded-0" expandIconPosition="right" ghost>
                <Panel header={<div className="px-0">{comments.length} comments</div>} key="1">
                    {comments.length >= 1 ?
                        (<List
                            className="comment-list"
                            itemLayout="horizontal"
                            dataSource={comments}
                            renderItem={item => (
                                <li>
                                    <Comment
                                        actions={[<span key="comment-list-reply-to-0">Reply to</span>]}
                                        author={findUserName(item.owner)}
                                        avatar={item.avatar || 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png'}
                                        content={item.content}
                                        datetime={moment(item.created_at).toNow(true)}
                                    />
                                </li>
                            )}
                        />) : ''}
                    {currentUser ?
                        <Comment
                            avatar={
                                <Avatar
                                    src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                                    alt="Han Solo"
                                />
                            }
                            content={
                                <CommentEditor idPost={idPost} />
                            }
                        /> : ''}
                </Panel>
            </Collapse>

        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        commentsList: state.commentsReducer.commentsList,
        usersList: state.usersReducer.usersList,
        currentUser: state.usersReducer.currentUser,
    }
}

export default connect(mapStateToProps)(Comments);
