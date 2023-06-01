import { Button, Stack } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import s from "./styles.module.css";
import "./styles.css"

function CommentSendButton() {

    const handleProfileIconClick = (e) => {
        e.preventDefault();
        console.log(e);
    }

    return (
            <Button component="span" variant="contained" id="send_btn_id" className={s.send_btn}>
                <SendIcon className={s.send_icon} />
            </Button>
    );
}

export default CommentSendButton;


// {/* <Stack direction="row" className={s.send_stack}>
// <Button variant="contained" id="send_btn_id" className={s.send_btn}>
//     <SendIcon className={s.send_icon}/>
// </Button>
// </Stack> */}