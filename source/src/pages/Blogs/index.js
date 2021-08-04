import { Pagination } from 'antd';
import React, { useState } from 'react';
import { connect } from 'react-redux';
import NewPost from '../../components/NewPost';
import Post from '../../components/Post';

const Blogs = (props) => {
    const { postList, currentUser } = props;
    postList.sort( (a, b) => {
        return b.created_at - a.created_at;
    })

    const [state, setState] = useState({
        page: 1,
        pageSize: 3
    })
    const onChange = (page, pageSize) => {
        setState({ page, pageSize })
    }
    const indexLast = state.page * state.pageSize;
    const indexFirst = indexLast - state.pageSize;
    const currentPostList = postList.slice(indexFirst, indexLast);

    return (
        <div className="container">
            {currentUser ? <NewPost /> : ''}
            <div className="row">
                {currentPostList.map((post, index) => {
                    return <Post post={post} key={index} />
                })}
            </div>
            <Pagination className="text-center py-3" onChange={onChange} pageSize={state.pageSize} defaultCurrent={state.page} total={postList.length} />
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        postList: state.postsReducer.postList,
        currentUser: state.usersReducer.currentUser
    }
}
export default connect(mapStateToProps, null)(Blogs);
