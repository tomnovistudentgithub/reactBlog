import React, {useEffect, useRef, useState} from "react";
import { deletePostById } from '../api/endpointsFakeBlog';
import {Link} from "react-router-dom";
import {getPosts} from "../api/endpointsFakeBlog.js";
    function AllPosts() {
        const [posts, setPosts] = useState([]);
        const [isLoading, setIsLoading] = useState(true);
        const [error, setError] = useState(null);
        const [deleteMessage, setDeleteMessage] = useState('');
        const [showPopup, setShowPopup] = useState(false);
        const timeoutId = useRef(null);


        useEffect(() => {
            return () => {
                if (timeoutId.current) {
                    clearTimeout(timeoutId.current);
                }
            };
        }, []);

        useEffect(() => {
            const fetchPosts = async () => {
                try {
                    const data = await getPosts();
                    console.log(data);
                    setPosts(data);
                    setIsLoading(false);
                } catch (error) {
                    console.error('Failed to fetch posts:', error);
                    setError(error);
                    setIsLoading(false);
                }
            };
            fetchPosts();
        }, []);

        function presentPosts() {
            return posts.map(post => {
                return (

                    <div className="posts-overview" key={post.id}>
                        <Link className="title-to-post" to={`/post/${post.id}`}>{post.title}</Link>
                        <p className="commentsAndShares">{post.comments + " reacties - " + post.shares + " keer gedeeld"}</p>
                        <button onClick={() => handleDelete(post.id)}>Delete</button>

                    </div>

                )
            })
        }

        const handleDelete = (id) => {
            deletePostById(id)
                .then(() => {
                    console.log('Post deleted:', id);
                 setPosts(posts.filter(post => post.id !== id));
                 setDeleteMessage('Post ' + id + ' is verwijderd');
                 setShowPopup(true);
                    const timeoutId = setTimeout(() => setShowPopup(false), 2000);

                    return () => clearTimeout(timeoutId);

                })
                .catch((error) => {
                    console.error('Failed to delete post:', error);
                });
        };


        return (
            <>
            {isLoading ? (
                <div className="page-container">Loading...</div>
            ) : (
                <>
                {error && <div>Error: {error.message}</div>}

                <div className="nr-summary-block">Er zijn {posts.length} blogberichten</div>

                    <div className="page-container-all-posts">

                    <div className="inner-container-all-posts">
                        {presentPosts()}

                    </div>
                </div>

                    {showPopup && deleteMessage && <div className="deleted-message">{deleteMessage}</div>}
            </>

        )}
                </>
        );
    }

export default AllPosts;
