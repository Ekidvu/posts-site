import IconButton from '@mui/material/IconButton';
import StarsIcon from '@mui/icons-material/Stars';

function FavButton() {

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
            <StarsIcon />
        </IconButton>
    );
}

export default FavButton;