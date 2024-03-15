import './App.css'
import { Routes, Route } from 'react-router-dom'
import NewPost from "./pages/NewPost.jsx";
import AllPosts from "./pages/AllPosts.jsx";
import NotFound from "./pages/NotFound.jsx";
import NavBar from "./components/NavBar/NavBar.jsx";
import HomePage from "./pages/HomePage.jsx";
import BlogPostDetail from "./pages/BlogPostDetail.jsx";


function App() {



    return (
<>
        <NavBar />
    <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/newpost" element={<NewPost />} />
        <Route path="/allposts" element={<AllPosts />} />
        <Route path="/post/:id" element={<BlogPostDetail />} />
        <Route path="*" element={<NotFound />} />
    </Routes>

</>
    )
}

export default App;
