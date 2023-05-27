import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import cn from 'classnames'
import s from './styles.module.css'
import { useContext } from 'react';
import { PostsContext } from '../../contexts/post-context';

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
    },
    marginBottom: '15px',
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    // height: '100%',
    position: 'absolute',
    top: '8px',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '14ch',
            '&:focus': {
                width: '25ch',
            },
        },
    },
}));

export function Header() {
    const { handleFormSubmit, handleInputChange } = useContext(PostsContext)

    return (
        <>
            <Box sx={{ flexGrow: 1 }} className={s.header}>
                <AppBar position="static">
                    <Toolbar className={s.div_box}>
                        <div className={s.div_menu}>
                            <IconButton
                                size="large"
                                edge="start"
                                color="inherit"
                                aria-label="open drawer"
                                sx={{ mr: 3, mt: 1 }}
                            >
                                <MenuIcon />
                            </IconButton>
                        </div>
                        <div className={s.div_title_box}>
                            <div className={s.div_title_box_text}>
                                Ну и __@<span>▲</span>@<br /> __шуточки
                            </div>
                        </div>
                        <div className={s.search_area}>
                            <Search>
                                <SearchIconWrapper>
                                    <SearchIcon />
                                </SearchIconWrapper>
                                <form className='search' onSubmit={handleFormSubmit}>
                                    <StyledInputBase
                                        placeholder="Поиск…"
                                        inputProps={{ 'aria-label': 'search' }}
                                        onChange={(e) => {
                                            handleInputChange(e.target.value)
                                        }}
                                    />
                                </form>
                            </Search>
                        </div>
                    </Toolbar>
                </AppBar>
            </Box>
        </>
    );
}


// {/* <Typography
// variant="h6"
// noWrap
// component="div"
// sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
// >
// Ну и шуточки
// </Typography> */}
