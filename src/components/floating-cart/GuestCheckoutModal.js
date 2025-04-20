import {
    Box,
    Button,
    IconButton,
    Stack,
    Typography,
    styled,
} from '@mui/material'

import { useRouter } from 'next/router'
import { t } from 'i18next'

import { useTheme } from '@emotion/react'
import CloseIcon from '@mui/icons-material/Close'
import CustomModal from '../custom-modal/CustomModal'
import { CustomStackFullWidth } from '@/styled-components/CustomStyles.style'
import GuestModalSvg from './GuestModalSvg'

const WrapperBox = styled(Stack)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    maxWidth: '480px',
    width: '100%',
    paddingBlock: '20px',
    textAlign: 'center',
}))
const ButtonWrapper = styled(Stack)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '20px',
    cursor: 'pointer',
}))

const GuestCheckoutModal = ({
    open,
    setOpen,
    setModalFor,
    setSideDrawerOpen,
    handleOpenAuthModal,
}) => {
    const router = useRouter()
    const theme = useTheme()

    const handleClick = () => {
        const queryParams = { page: 'cart' }

        // Check if "isDineIn" is present in the current route's query
        if (router.query.isDineIn) {
            queryParams.isDineIn = router.query.isDineIn
        }

        // Push the route with query parameters
        router.push(
            {
                pathname: '/checkout',
                query: queryParams,
            },
            undefined,
            { shallow: true }
        )

        // Close the side drawer
        setSideDrawerOpen(false)
    }

    const handleSignIn = () => {
        setModalFor('sign-in')
        handleOpenAuthModal()
        setSideDrawerOpen(false)
        setOpen(false)
    }
    const handleSignUp = () => {
        setModalFor('sign-up')
        handleOpenAuthModal()
        setSideDrawerOpen(false)
        setOpen(false)
    }
    return (
        <>
            <CustomModal openModal={open} setModalOpen={setOpen}>
                <WrapperBox>
                    <CustomStackFullWidth
                        direction="row"
                        alignItems="center"
                        justifyContent="flex-end"
                        sx={{ position: 'relative' }}
                    >
                        <IconButton
                            onClick={() => setOpen(false)}
                            sx={{
                                zIndex: '99',
                                position: 'absolute',
                                top: -5,
                                right: 15,
                                backgroundColor: (theme) =>
                                    theme.palette.neutral[100],
                                borderRadius: '50%',
                                [theme.breakpoints.down('md')]: {
                                    top: 10,
                                    right: 5,
                                },
                            }}
                        >
                            <CloseIcon
                                sx={{ fontSize: '16px', fontWeight: '500' }}
                            />
                        </IconButton>
                    </CustomStackFullWidth>
                    <GuestModalSvg />
                    <Box padding="30px 70px">
                        <Typography
                            color={theme.palette.neutral[1000]}
                            variant="h6"
                            marginBottom="20px"
                        >
                            {t('Do you want to login or continue as a guest?')}
                        </Typography>
                        <Typography color={theme.palette.neutral[1000]}>
                            {t(
                                "If you log in, your order history will be saved. However, if you continue as a guest, you won't be able to see your order history after completing your order."
                            )}
                        </Typography>
                    </Box>
                    <Box
                        display="flex"
                        justifyContent="space-around"
                        width="70%"
                    >
                        <Button
                            onClick={handleClick}
                            variant="outlined"
                            maxWidth="150px"
                            fullWidth
                            sx={{
                                marginInlineEnd: '10px',
                                borderColor: theme.palette.neutral[200],
                                color: theme.palette.neutral[400],
                            }}
                        >
                            {t('Guest')}
                        </Button>
                        <Button
                            onClick={handleSignIn}
                            variant="contained"
                            maxWidth="150px"
                            fullWidth
                        >
                            {t('Login')}
                        </Button>
                    </Box>
                    <ButtonWrapper onClick={handleSignUp}>
                        <Typography
                            color={theme.palette.primary.main}
                            textTransform="capitalize"
                            textAlign="center"
                            sx={{
                                '&:hover': {
                                    color: theme.palette.neutral[400],
                                },
                            }}
                        >
                            {t('Sign Up')}
                        </Typography>
                    </ButtonWrapper>
                </WrapperBox>
            </CustomModal>
        </>
    )
}

export default GuestCheckoutModal
