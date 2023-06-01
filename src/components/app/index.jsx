import { Container, CssBaseline } from '@mui/material';
import { postData } from '../../posts';
import { PostList } from '../post-list';
// import s from './styles.module.css';
import { Header } from '../app-header';
import { Footer } from '../app-footer';
import { useEffect, useState } from 'react';
import { Modal } from '../modal';
import { ModalPost } from '../modal-post';
import { PostsContext } from '../../contexts/post-context';
import { isLiked, pageSize } from '../utils/global-funcs';
import api from '../utils/api';
import { UserContext } from '../../contexts/current-user-context';
import { BackToTop } from '../btn-to-top';
import { PostsPagination } from '../pagination';
import { NewPostPage } from '../../pages/new-post-page';

export function App() {
    const [postBase, setPostBase] = useState(postData);
    const [currentUser, setCurrentUser] = useState([]);
    const [currentPost, setCurrentPost] = useState(postBase[0]);
    const [changedPost, setChangedPost] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [modalOpenStatus, setModalOpenStatus] = useState(false);
    const [isLoadingModal, setIsLoadingModal] = useState(false)
    // const [clickedPostId, setClickedPostId] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [searchpostBase, setSearchpostBase] = useState(postBase);
    const [pagination, setPagination] = useState({count: 0, from: 0, to: pageSize});


    function handleClickOpenPost(currentPost) {
        setIsLoadingModal(true);
        // console.log(currentPost._id);
        api.getPostById(currentPost._id)
            .then(post=> setCurrentPost(post))
            .then(setModalOpenStatus(true))
            .catch(err => console.log(err))
            .finally(() => setIsLoadingModal(false))
    }

    const onCloseModalPost = () => {
        setModalOpenStatus(false)
    }

    const handlePageChange = (e, page) => {
        const from = (page - 1) * pageSize;
        const to = (page - 1) * pageSize + pageSize;

        setPagination({...pagination, from: from, to: to})
    }

    // function changePost(comment, id) {

    // }

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
        api.changeLikePostStatus(post._id, like)
            .then((updatePost) => {
                const newListOfPosts = postBase.map(post => post._id === updatePost._id ? updatePost : post)
                setPostBase(newListOfPosts)
                // setCurrentPost(updatePost)
                console.log(updatePost);
            })
            .catch(err => console.log(err))
    }

    useEffect(() => {
        setIsLoading(true)
        api.getAllInfo()
            .then(([posts, userData]) => {
                setCurrentUser(userData);
                setPostBase(posts);
                setPagination({...pagination, count: posts.length})
            })
            // .then(() => {
            //     setPagination({...pagination, count: postBase.length})
            // })
            .catch(err => console.log(err))
            .finally(() => setIsLoading(false))
    }, [])

    useEffect(() => {
        !!changedPost && api.changeCommentById(changedPost.id, changedPost.data)
            .then((updatedPost) => {
                setCurrentPost(updatedPost)
                console.log(updatedPost);
            })
            .then(() => setChangedPost(null))
            .catch(err => console.log(err))
    }, [changedPost])

    useEffect(() => {
        handleEditKeyOnSearch()
    }, [searchQuery])

    return (
        <PostsContext.Provider value={{
            handleClickOpenPost,
            changeOpenModal: setModalOpenStatus,
            setCurrentPost,
            setChangedPost,
            handleFormSubmit,
            handleInputChange,
            handlePostLike,
            posts: postBase, setPosts: setPostBase, 
            pagination, handlePageChange,
            isLoading, setIsLoading,
            isLoadingModal,
        }}>
            <UserContext.Provider value={{ currentUser }}>
             
                <CssBaseline />
                <NewPostPage />

                <Header />
                <div id="back-to-top-anchor" />

                <main className='cards_body'>
                    <Container className='cards_body_container'>
                        <PostList className='cards_body_postlist' />
                    </Container>
                </main>

                <Footer />
                <Modal isOpen={modalOpenStatus} onClose={onCloseModalPost}>
                    <ModalPost post={currentPost} />
                </Modal>

                <BackToTop anchorID="#back-to-top-anchor"/>
                <PostsPagination />

            </UserContext.Provider>
        </PostsContext.Provider>
    );
}

// const [changedPost, setChangedPost] = useState({ id: null, data: null });


    // useEffect(() => {
    //     setIsLoading(true)
    //     api.getAllInfo()
    //         .then(([posts, userData]) => {
    //             setCurrentUser(userData);
    //             setPostBase(posts)
    //         })
    //         .catch(err => console.log(err))
    //         .finally(() => setIsLoading(false))
    // }, [])
// useEffect(() => {
//     api.getPostsList()
//         .then((posts) => setPostBase(posts))
//         .catch((err) => console.log(err))
//     api.getUserInfo()
//         .then((user) => setCurrentUser(user))
//         .catch((err) => console.log(err))
//     console.log(currentUser);
// }, [])


    // useEffect(() => {
    //     api.getPostById(clickedPostId)
    //         .then((post) => setCurrentPost(post))
    //         .catch(err => console.log(err))
    // }, [clickedPostId])

        // useEffect(() => {
    //     setIsLoading(true);
    //     console.log(isLoading);
    //     api.getPostById(currentPost._id)
    //         .then(post=> {
    //             setCurrentPost(post);
                
    //         } )
    //         .catch(err => console.log(err))
    //         .finally(() => setIsLoading(false))
    // }, [])