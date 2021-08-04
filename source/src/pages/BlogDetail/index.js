import React from 'react';
import { connect } from 'react-redux';
import { useParams } from "react-router-dom";
import Post from '../../components/Post';
const BlogDetail = (props) => {
    const {postList} = props;
    const { id } = useParams();
    const currentPost =  postList.find(p => p.id === parseInt(id));
    return (
        <div className="container">
            <Post post={currentPost} showAll={true}/>
        </div>
    );
}
const mapStateToProps = (state) =>{
    return{
        postList: state.postsReducer.postList
    }
}
export default connect(mapStateToProps)(BlogDetail);
