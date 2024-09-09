import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../navbar";

const GroupHP = () => {
    const { groupName } = useParams();
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await fetch(`http://localhost:3001/groups/${groupName}/posts`);
                if (!response.ok) {
                    throw new Error('Failed to fetch posts');
                }
                const data = await response.json();
                setPosts(data);
                setLoading(false);
            } catch (error) {
                console.error("Failed to fetch posts:", error);
                setLoading(false); // Set loading to false even on error to stop showing the loading state
            }
        };

        fetchPosts();
    }, [groupName]);

    if (loading) {
        return <div>Loading posts...</div>;
    }

    if (!posts.length) {
        return <div>No posts found in this group.</div>;
    }

    return (
        <div>
            <Navbar />
            <div className="container">
                <h1>Posts in {groupName}</h1>
                {posts.map((post, index) => (
                    <div key={index}>
                        <h3>{post.title}</h3>
                        <p>{post.content}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default GroupHP;
