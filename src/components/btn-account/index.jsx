import IconButton from '@mui/material/IconButton';
import AccountCircle from '@mui/icons-material/AccountCircle';

function ProfileButton() {

const handleProfileIconClick = (e) => {
    e.preventDefault();
    console.log(e);
}

    return (
        <IconButton
            size="large"
            edge="end"
            aria-label="account of current user"
            // aria-controls={menuId}
            aria-haspopup="true"
            onClick={handleProfileIconClick}
            color="inherit"
        >
            <AccountCircle />
        </IconButton>
    );
}

export default ProfileButton;