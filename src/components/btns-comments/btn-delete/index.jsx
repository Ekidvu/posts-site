import { Button, Stack } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';

function CommentDeleteButton() {

    const handleProfileIconClick = (e) => {
        e.preventDefault();
        console.log(e);
    }

    return (
        <Stack direction="row" spacing={2}>
            <Button variant="outlined" startIcon={<DeleteIcon />}>
                Delete
            </Button>
        </Stack>
    );
}

export default CommentDeleteButton;