import { Box, Container, CssBaseline, Fab, Fade, Toolbar } from '@mui/material';
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

export function App() {
    const [postBase, setPostBase] = useState(postData);
    const [modalOpenStatus, setModalOpenStatus] = useState(false);
    const [clickedPost, setClickedPost] = useState('622bdaa106c7d323b8ae4625');
    const [searchQuery, setSearchQuery] = useState("");
    const [searchpostBase, setSearchpostBase] = useState(postBase);

    const currentClickedPost = postBase.find(e => e._id === clickedPost);

    const onCloseModalPost = () => {
        setModalOpenStatus(false)
    }

    function handleEditKeyOnSearch(){
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
    
    useEffect(() => {
        handleEditKeyOnSearch()
    }, [searchQuery])

    return (
        <PostsContext.Provider value={{ changeOpenModal: setModalOpenStatus, setClickedPost: setClickedPost, handleFormSubmit:handleFormSubmit, handleInputChange: handleInputChange, posts: postBase}}>
            {/* <ModalPost postData={postBase} id={0}></ModalPost> */}

            <CssBaseline />
            <Header />

            <main className='cards_body'>
                <Container className='cards_body_container'>
                    <PostList className='cards_body_postlist' />
                </Container>
            </main>

            <Footer />
            <Modal isOpen={modalOpenStatus} onClose={onCloseModalPost}>
                <ModalPost postData={currentClickedPost} />
            </Modal>

        </PostsContext.Provider>
    );
}


// post.title.toLowerCase().includes(searchQuery.toLowerCase() || post.tags.toLowerCase().includes(searchQuery.toLowerCase()))