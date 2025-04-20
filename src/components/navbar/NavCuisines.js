import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import React, { useEffect, useState } from 'react'
import { Button, Grid, Menu, Stack } from '@mui/material'
import { makeStyles } from '@mui/styles'
import { useRouter } from 'next/router'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { useGetCuisines } from '@/hooks/react-query/cuisines/useGetCuisines'
import { setCuisines } from '@/redux/slices/storedData'
import NavCuisinesList from '../cuisines-page/NavCuisinesList'
import { NavMenuLink } from './Navbar.style'
const useStyles = makeStyles((theme) => ({
    popover: {
        pointerEvents: 'none',
    },
    paper: {
        pointerEvents: 'auto',
    },
}))
const NavCuisines = ({ setRestaurantModal, languageDirection }) => {
    const classes = useStyles()
    const { cuisines } = useSelector((state) => state.storedData)
    const { t } = useTranslation()
    const router = useRouter()
    const { global } = useSelector((state) => state.globalSettings)
    const cuisinesImageUrl = `${global?.base_urls?.cuisine_image_url}`
    const [anchorEl, setAnchorEl] = useState(null)
    const dispatch = useDispatch()
    const opendrop = Boolean(anchorEl)

    const { data, refetch } = useGetCuisines()
    useEffect(() => {
        if (cuisines?.length === 0) {
            refetch()
        }
    }, [])

    const handledropClick = (event) => {
        setAnchorEl(event.currentTarget)
        setRestaurantModal(false)
    }
    const handledropClose = () => {
        setAnchorEl(null)
    }
    const handleClick = () => {
        router.push('/cuisines')
        handledropClose()
    }

    useEffect(() => {
        if (data) {
            dispatch(setCuisines(data?.Cuisines))
        }
    }, [data])

    return (
        <div
            onMouseEnter={(e) => handledropClick(e)}
            onMouseLeave={handledropClose}
        >
            <NavMenuLink
                id="fade-button"
                aria-controls={opendrop ? 'fade-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={opendrop ? 'true' : undefined}
                underline="none"
                fontSize="14px"
                alignItems="center"
            >
                {t('Cuisines')}{' '}
                <KeyboardArrowDownIcon
                    style={{ width: '16px', marginLeft: '5px' }}
                />
            </NavMenuLink>
            <Menu
                disableScrollLock={true}
                id="mouse-over-popover"
                open={opendrop}
                anchorEl={anchorEl}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: languageDirection === 'rtl' ? 'right' : 'left',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: languageDirection === 'rtl' ? 'right' : 'left',
                }}
                className={classes.popover}
                classes={{
                    paper: classes.paper,
                }}
            >
                <Stack width="420px">
                    <Grid container p="1rem" spacing={1}>
                        {cuisines?.length > 12 ? (
                            <>
                                {cuisines?.slice(0, 12)?.map((item, index) => {
                                    return (
                                        <React.Fragment key={item?.id}>
                                            {index % 2 === 0 ? (
                                                <Grid item md={6}>
                                                    <NavCuisinesList
                                                        item={item}
                                                        handledropClose={
                                                            handledropClose
                                                        }
                                                        cuisinesImageUrl={
                                                            cuisinesImageUrl
                                                        }
                                                    />
                                                </Grid>
                                            ) : (
                                                <Grid
                                                    item
                                                    md={6}
                                                    key={item?.id}
                                                >
                                                    <NavCuisinesList
                                                        item={item}
                                                        handledropClose={
                                                            handledropClose
                                                        }
                                                        cuisinesImageUrl={
                                                            cuisinesImageUrl
                                                        }
                                                    />{' '}
                                                </Grid>
                                            )}
                                        </React.Fragment>
                                    )
                                })}
                            </>
                        ) : (
                            <>
                                {cuisines?.map((item, index) => {
                                    return (
                                        <>
                                            {index % 2 === 0 ? (
                                                <Grid
                                                    item
                                                    md={6}
                                                    key={item?.id}
                                                >
                                                    <NavCuisinesList
                                                        item={item}
                                                        handledropClose={
                                                            handledropClose
                                                        }
                                                        cuisinesImageUrl={
                                                            cuisinesImageUrl
                                                        }
                                                    />
                                                </Grid>
                                            ) : (
                                                <Grid
                                                    item
                                                    md={6}
                                                    key={item?.id}
                                                >
                                                    <NavCuisinesList
                                                        item={item}
                                                        handledropClose={
                                                            handledropClose
                                                        }
                                                        cuisinesImageUrl={
                                                            cuisinesImageUrl
                                                        }
                                                    />{' '}
                                                </Grid>
                                            )}
                                        </>
                                    )
                                })}
                            </>
                        )}
                    </Grid>
                    {cuisines?.length > 0 && (
                        <Grid
                            container
                            md={12}
                            justifyContent="center"
                            alignItems="center"
                            p=".8rem"
                        >
                            <Button
                                sx={{
                                    background: (theme) =>
                                        theme.palette.primary.main,
                                    color: (theme) =>
                                        `${theme.palette.neutral[100]} !important`,
                                    padding: '9px 25px',
                                    borderRadius: '5px',
                                    '&:hover': {
                                        background: (theme) =>
                                            theme.palette.primary.dark,
                                    },
                                }}
                                size="medium"
                                onClick={handleClick}
                            >
                                {t('View all')}
                            </Button>
                        </Grid>
                    )}
                </Stack>
            </Menu>
        </div>
    )
}

export default NavCuisines
