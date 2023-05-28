import { Container, CssBaseline } from '@mui/material';
import { postData } from '../../posts';
import { PostList } from '../post-list';
import s from './styles.module.css';
import { Header } from '../app-header';
import { Footer } from '../app-footer';
import { useEffect, useState } from 'react';
import { Modal } from '../modal';
import { ModalPost } from '../modal-post';
import { PostsContext } from '../../contexts/post-context';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { currentPost, isLiked } from '../utils/global-funcs';
import api from '../utils/api';
import { UserContext } from '../../contexts/current-user-context';
import { BackToTop } from '../btn-to-top';

export function App() {
    const [postBase, setPostBase] = useState(postData);
    const [currentUser, setCurrentUser] = useState([])
    const [modalOpenStatus, setModalOpenStatus] = useState(false);
    const [clickedPost, setClickedPost] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [searchpostBase, setSearchpostBase] = useState(postBase);

    const currentClickedPost = currentPost(postBase, clickedPost);

    const onCloseModalPost = () => {
        setModalOpenStatus(false)
    }

    function handleEditKeyOnSearch() {
        const filteredList = postBase.filter(post => post?.title.toLowerCase().includes(searchQuery.toLowerCase()));

        setPostBase(filteredList)
    }

    function handleFormSubmit(e) {
        e.preventDefault();
        handleEditKeyOnSearch()
    }

    function handleInputChange(input) {
        setSearchQuery(input);
        // console.log(searchQuery, postBase[0].title.toLowerCase().includes(searchQuery.toLowerCase));
    }

    function handlePostLike(post) { 
        const like = isLiked(post.likes, currentUser._id)
        api.changeLikePostStatus(post.id, like)
            .then((updatePost) => {
                const newListOfPosts = postBase.map(post => post._id === updatePost._id ? updatePost : post)
                setPostBase(newListOfPosts)
                console.log(updatePost.likes);
            })
            .catch(err => console.log(err))
    }

    useEffect(() => {
        api.getPostsList()
            .then((posts) => setPostBase(posts))
            .catch((err) => console.log(err))
        api.getUserInfo()
            .then((user) => setCurrentUser(user))
            .catch((err) => console.log(err))
        console.log(currentUser);
    }, [])

    useEffect(() => {
        handleEditKeyOnSearch()
    }, [searchQuery])

    return (
        <PostsContext.Provider value={{
            changeOpenModal: setModalOpenStatus,
            setClickedPost: setClickedPost,
            handleFormSubmit: handleFormSubmit,
            handleInputChange: handleInputChange,
            handlePostLike,
            posts: postBase
        }}>
            <UserContext.Provider value={{ currentUser }}>

                <CssBaseline />
                <Header />
                <div id="back-to-top-anchor"/>

                <main className='cards_body'>
                    <Container className='cards_body_container'>
                        <PostList className='cards_body_postlist' />
                    </Container>
                </main>

                <Footer />
                <Modal isOpen={modalOpenStatus} onClose={onCloseModalPost}>
                    <ModalPost postInfo={currentClickedPost} />
                </Modal>

                <BackToTop/>

            </UserContext.Provider>
        </PostsContext.Provider>
    );
}


// post.title.toLowerCase().includes(searchQuery.toLowerCase() || post.tags.toLowerCase().includes(searchQuery.toLowerCase()))

                // {/* <Modal isOpen={modalOpenStatus} onClose={onCloseModalPost}>
                //     <ModalPost postData={currentClickedPost} />
                // </Modal> */}