import IconButton from '@mui/material/IconButton';
import HomeIcon from '@mui/icons-material/Home';
import s from './styles.module.css'

function HomeButton() {

const handleProfileIconClick = (e) => {
    // e.preventDefault();
    // console.log(e);
}

    return (
        <IconButton
            id='homebutton'
            size="large"
            edge="end"
            aria-label="account of current user"
            aria-haspopup="true"
            onClick={handleProfileIconClick}
            color="inherit"
        >
            <HomeIcon />
        </IconButton>
    );
}

export default HomeButton;