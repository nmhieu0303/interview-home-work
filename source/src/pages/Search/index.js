import { Alert } from 'antd';
import React from 'react';
import { connect } from 'react-redux';
import { useParams } from "react-router-dom";
import Post from '../../components/Post';
const Search = (props) => {
    const { postList } = props;
    const { keyword } = useParams();
    const resultsPost = postList.filter(p => p.title.includes(keyword));
    return (
        <div className="container">
            {resultsPost ?
                <>
                    <Alert className="my-5 text-center" message={`Found ${resultsPost.length} results`} type="success" />
                    {resultsPost.map(post => {
                        return <Post post={post} />
                    })}
                </> :
                <Alert className="my-5 text-center" message={`Can't find posts with keyword ${keyword}!!`} type="warning" />
            }
        </div>
    );
}
const mapStateToProps = (state) => {
    return {
        postList: state.postsReducer.postList
    }
}
export default connect(mapStateToProps)(Search);
