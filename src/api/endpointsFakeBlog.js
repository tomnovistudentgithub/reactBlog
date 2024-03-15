import baseUri from "./baseUri.js";
import axios from "axios";


export async function getPosts() {
    try {
        const response = await axios.get(baseUri() + '/posts');
        return response.data;
    } catch (error) {
        console.error('Failed to fetch posts:', error);
        throw error;
    }
}

export async function getPostById(id) {
    try {
        const response = await axios.get(baseUri() + '/posts/' + id);
        return response.data;
    } catch (error) {
        console.error(`Failed to fetch post with id ${id}:`, error);
        throw error;
    }
}

export async function createPost(post) {
    try {
        const response = await axios.post(baseUri() + '/posts', post);
        return response.data;
    } catch (error) {
        console.error('Failed to create post:', error);
        throw error;
    }

}

    export async function updatePost(post) {
        try {
            const response = await axios.put(baseUri() + '/posts/' + post.id, post);
            return response.data;
        } catch (error) {
            console.error('Failed to update post:', error);
            throw error;
        }

    }

    export async function deletePostById(id) {
        try {
            const response = await axios.delete(baseUri() + '/posts/' + id);
            return response.data;
        } catch (error) {
            console.error('Failed to delete post:', error);
            throw error;

        }

    }


