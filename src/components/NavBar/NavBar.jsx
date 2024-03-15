import { NavLink } from 'react-router-dom';
import './NavBar.css';

    function NavBar() {
        return (
            <nav>
                <ul>
                    <li><NavLink
                        to="/"
                        className={({ isActive }) => isActive ? 'active-link' : 'default-link'}>
                        Home</NavLink></li>
                    <li><NavLink
                        to="/newpost"
                        className={({ isActive }) => isActive ? 'active-link' : 'default-link'}>
                        New Post</NavLink></li>
                    <li><NavLink
                        to="/allposts"
                        className={({ isActive }) => isActive ? 'active-link' : 'default-link'}>
                        All Posts</NavLink></li>
                </ul>
            </nav>
        );
    }


export default NavBar;