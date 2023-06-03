import IconButton from '@mui/material/IconButton';
import HomeIcon from '@mui/icons-material/Home';

function HomeButton() {

const handleProfileIconClick = (e) => {
    // e.preventDefault();
    // console.log(e);
}

    return (
        <IconButton
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