import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { forwardRef, useState } from 'react';
import s from './styles.module.css'
import { useLocation } from 'react-router-dom';
import { Button } from '@mui/material';

const Alert = forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function UpdateStateButton({ textAlert, severity }) {
    const [open, setOpen] = useState(false);
    // const location = useLocation();

    const handleClick = () => {
        setOpen(true);
        console.log(Alert);
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };


    return (
        <Stack spacing={2} sx={{ width: '100%' }}>
            <Button variant="outlined" onClick={handleClick} id='updateAlertButton' sx={{ display: 'none' }} />
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
                    {textAlert}
                </Alert>
            </Snackbar>
        </Stack>
    );
}

export default UpdateStateButton;

// {/* <Alert severity="error">This is an error message!</Alert>
// <Alert severity="warning">This is a warning message!</Alert>
// <Alert severity="info">This is an information message!</Alert>
// <Alert severity="success">This is a success message!</Alert> */}