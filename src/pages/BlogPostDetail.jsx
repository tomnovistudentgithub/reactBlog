import {NavLink, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import formatDate from "../helper/formatDate.js";
import {getPostById} from "../api/endpointsFakeBlog.js";
function BlogPostDetail() {

const { id } = useParams();
const [post, setPost] = useState(null);



    useEffect(() => {

        getPostById(id)
            .then((foundPost) => {
                console.log(foundPost);
                setPost(foundPost);
            })
            .catch((error) => {
                console.error('Failed to fetch post:', error);
            });
    }, [id]);


    return (
        post ? (
        <div className="blogPostDetail">
            <h1>{post.title}</h1>
            <h2>{post.subtitle}</h2>
            <p>Geschreven door {post['author-name']} op {formatDate(new Date(post.created))}</p>
            <p>{post.content}</p>
            <p>Post ID: {id}</p>
            <p>{post.comments + " reacties - " + post.shares + " keer gedeeld"}</p>
            <NavLink to="/allposts" className={({ isActive }) => isActive ? 'active-link' : 'default-link'}>
                Terug naar overzichtspagina</NavLink>
        </div>
        ) : (
            <div>Loading...</div>
        )
    )

}

export default BlogPostDetail;




