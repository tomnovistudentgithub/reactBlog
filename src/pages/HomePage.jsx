import logo from "../assets/logo-white.png";
import {useEffect, useState} from "react";
import {getPostById} from "../api/endpointsFakeBlog.js";

function HomePage() {

    const [post, setPost] = useState(0);



    useEffect(() => {
        const fetchPost = async () => {
            try {
                const data = await getPostById(2);
                console.log(data);
                setPost(data);
            } catch (error) {
                console.error('Failed to fetch posts:', error);
            }
        };

        fetchPost();
    }, []);



return (
    <div className="page-container">
        <div className="inner-container">
            <img src={logo} alt="Company logo"/>
            <h1>Blog post {+ post.id}</h1>
<h2>{post.title}</h2>
<p>{post.content}</p>
<p>{post.comments + " reacties - " + post.shares + " keer gedeeld"}</p>


        </div>

    </div>
)
}

export default HomePage;