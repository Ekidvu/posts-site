import IconButton from '@mui/material/IconButton';
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import DataSaverOnIcon from '@mui/icons-material/DataSaverOn';

function AddPostButton() {

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
            <DataSaverOnIcon />
        </IconButton>
    );
}

export default AddPostButton;