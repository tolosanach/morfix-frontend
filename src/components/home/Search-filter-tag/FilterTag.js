import CustomGroupCheckbox from '@/components/custom-group-checkboxs/CustomGroupCheckbox'
import {
    setCuisineData,
    setSearchTagData,
    setSelectedName,
    setSelectedValue,
} from '@/redux/slices/searchTagSlice'
import { useTheme } from '@emotion/react'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import SearchIcon from '@mui/icons-material/Search'
import {
    Box,
    Chip,
    FormControlLabel,
    IconButton,
    Popover,
    Stack,
    Typography,
    alpha,
} from '@mui/material'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import { styled } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'
import { t } from 'i18next'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import FilterButton from '../../Button/FilterButton'
import FilterCard from '../../products-page/FilterCard'
import SearchBox from '../hero-section-with-search/SearchBox'
import { WrapperForSideDrawerFilter } from '@/styled-components/CustomStyles.style'

export const CustomChip = styled(Chip)(({ theme, query, value, isSticky }) => ({
    padding: isSticky ? '2px 3px' : '10px 10px',
    alignItems: 'center',
    color: value ? theme.palette.neutral[100] : '#767E8F',
    fontSize: '14px',
    fontWeight: '400',
    height: isSticky ? '38px' : '40px',
    cursor: 'pointer',
    background: value && theme.palette.primary.main,
    transition: `all ease .3s`,
    '&:hover': {
        color: `${theme.palette.whiteContainer.main}`,
    },
    '& .MuiChip-label': {
        paddingLeft: isSticky ? '5px 6px' : '8px 8px',
        paddingRight: isSticky ? '5px 6px' : '8px 8px',
        maxWidth: '110px',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
    },
    [theme.breakpoints.down('md')]: {
        fontSize: '12px',
        padding: '4px 4px',
        height: '31px',
    },
}))

export const SearchIconButton = styled(IconButton)(({ theme }) => ({
    backgroundColor: theme.palette.borderBottomBg,
    padding: '6px',
    borderRadius: '4px',
}))
const FilterTag = ({
    handleClick,
    query,
    storeData,
    setStoreData,
    handleSort,
    activeFilters,
    tags,
    page,
    restaurantType,
}) => {
    const [scrollPosition, setScrollPosition] = useState(0)
    const [open, setOpen] = useState(false)
    const [anchorEl, setAnchorEl] = useState(null)
    const [cuisineOrSort, setCuisineOrSort] = useState('sort')
    const [anchorElCard, setAnchorElCard] = useState(null)
    const { filterData, foodOrRestaurant } = useSelector(
        (state) => state.searchFilterStore
    )
    const { global } = useSelector((state) => state.globalSettings)
    const { searchTagData, selectedValue, selectedName, cuisineData } =
        useSelector((state) => state.searchTags)
    const { isSticky } = useSelector((state) => state.scrollPosition)
    const { cuisines } = useSelector((state) => state.storedData)
    const [cuisineState, setCuisineState] = useState([])
    const dispatch = useDispatch()
    const theme = useTheme()
    const iconColor = theme.palette.neutral[1000]
    const isSmall = useMediaQuery(theme.breakpoints.down('sm'))
    const handleCuisineData = () => {
        dispatch(
            setCuisineData(
                cuisines?.map((item) => {
                    return {
                        ...item,
                        isActive: false,
                    }
                })
            )
        )
    }
    useEffect(() => {
        if (cuisines) {
            handleCuisineData()
        }
    }, [cuisines])

    useEffect(() => {
        if (cuisineData) {
            setCuisineState(cuisineData)
        }
    }, [cuisineData])

    const getData = () => {
        if (global?.toggle_veg_non_veg === false) {
            const tempData = searchTagData?.filter(
                (item) => item.id !== 0 && item.id !== 2
            )
            dispatch(setSearchTagData(tempData))
        } else {
            dispatch(setSearchTagData(storeData))
        }
    }
    useEffect(() => {
        getData()
    }, [global])

    const handlePopOverOpen = (event, value) => {
        setCuisineOrSort(value)
        setAnchorEl(event.currentTarget)
    }
    const handleClose = () => {
        setAnchorEl(null)
    }

    useEffect(() => {
        const handleScroll = () => {
            setScrollPosition(window.scrollY) // Update scroll position
        }

        window.addEventListener('scroll', handleScroll)

        // Cleanup on component unmount
        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, [])

    const handleDropClick = (event) => {
        setAnchorElCard(event.currentTarget)
    }
    const handleDropClose = () => {
        setAnchorElCard(null)
    }

    useEffect(() => {
        if (scrollPosition > 55) {
            setAnchorElCard(null)
        }
    }, [scrollPosition])

    useEffect(() => {
        if (activeFilters?.length === 0) {
            setAnchorElCard(null)
        }
    }, [searchTagData])
    let languageDirection = undefined
    if (typeof window !== 'undefined') {
        languageDirection = localStorage.getItem('direction')
    }
    const handleChange = (e) => {
        dispatch(setSelectedValue(e.target.value))
        dispatch(setSelectedName(e.target.labels[0].innerText))
        handleSort(e.target.value)
    }
    useEffect(() => {
        setAnchorElCard(null)
    }, [query, tags])
    useEffect(() => {
        if (cuisines) {
            setCuisineState(cuisines)
        }
    }, [cuisines])
    return (
        <>
            <Stack
                direction="row"
                alignItems={{ xs: 'center', md: 'flex-end' }}
                spacing={{ xs: 1.5, md: 0 }}
                gap="1rem"
            >
                {!open ? (
                    <Stack
                        sx={{
                            width: '100%',
                            overflowX: 'auto',
                            '&::-webkit-scrollbar': {
                                width: '0',
                                height: '0',
                            },
                            '&::-webkit-scrollbar-thumb': {
                                background: 'transparent',
                            },
                        }}
                    >
                        <Stack
                            direction="row"
                            spacing={isSmall ? 1 : isSticky ? 1 : 2}
                        >
                            {searchTagData?.map((item) => {
                                if (item?.id === 1) {
                                    return (
                                        <CustomChip
                                            sx={{
                                                marginInlineEnd:
                                                    languageDirection ===
                                                        'rtl' &&
                                                    '10px !important',
                                            }}
                                            onClick={(event) =>
                                                handlePopOverOpen(event, 'sort')
                                            }
                                            isSticky={isSticky}
                                            value={item?.isActive}
                                            label={
                                                selectedName
                                                    ? t(selectedName)
                                                    : t(item?.name)
                                            }
                                            variant="outlined"
                                            onDelete={(event) =>
                                                handlePopOverOpen(event, 'sort')
                                            }
                                            deleteIcon={
                                                <IconButton
                                                    sx={{ padding: '0px' }}
                                                    size="medium"
                                                >
                                                    <KeyboardArrowDownIcon
                                                        style={{
                                                            color: iconColor,
                                                        }}
                                                    />
                                                </IconButton>
                                            }
                                        />
                                    )
                                } else {
                                    if (item?.id === 3 || item?.id === 5) {
                                        return null
                                    } else if (
                                        item?.id === 9 &&
                                        restaurantType !== 'dine-in'
                                    ) {
                                        return null
                                    } else {
                                        return (
                                            <CustomChip
                                                isSticky={isSticky}
                                                value={item?.isActive}
                                                label={t(item?.name)}
                                                variant="outlined"
                                                onClick={() =>
                                                    handleClick(item?.value)
                                                }
                                                //onDelete={() => handleDelete(item)}
                                            />
                                        )
                                    }
                                }
                            })}
                            {(query || tags || restaurantType === 'dine-in') &&
                                !isSticky && (
                                    <FilterButton
                                        id="fade-button"
                                        handleClick={handleDropClick}
                                        activeFilters={activeFilters}
                                        forSearch={true}
                                    />
                                )}
                        </Stack>
                    </Stack>
                ) : (
                    <Box
                        sx={{
                            width: '100%',
                            marginTop: '8px',
                            animation: 'fadeInRight 1s  1',
                        }}
                    >
                        <SearchBox query={query} />
                    </Box>
                )}
                {isSticky && !isSmall && (
                    <Box
                        sx={{
                            minWidth: '400px',
                            marginTop: '8px',
                            animation: 'fadeInRight 1s  1',
                        }}
                    >
                        <SearchBox query={query} />
                    </Box>
                )}
                {isSmall && (
                    <>
                        {open ? (
                            <SearchIconButton onClick={() => setOpen(false)}>
                                <ChevronRightIcon />
                            </SearchIconButton>
                        ) : (
                            <SearchIconButton onClick={() => setOpen(true)}>
                                <SearchIcon />
                            </SearchIconButton>
                        )}
                    </>
                )}
            </Stack>
            <Popover
                open={Boolean(anchorEl)}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
            >
                {cuisineOrSort === 'sort' ? (
                    <List sx={{ paddingInline: '8px' }}>
                        <RadioGroup
                            value={selectedValue}
                            onChange={(e) => handleChange(e)}
                        >
                            <ListItem
                                sx={{
                                    fontSize: '13px',
                                    paddingInline: '1rem',
                                    cursor: 'pointer',
                                    color: (theme) =>
                                        theme.palette.neutral[600],
                                    borderBottom: '1px solid',
                                    borderBottomColor: (theme) =>
                                        alpha(theme.palette.neutral[300], 0.3),
                                    paddingTop: '4px',
                                    paddingBottom: '4px',
                                }}
                            >
                                <FormControlLabel
                                    value="asc"
                                    control={<Radio />}
                                    label={
                                        <ListItemText
                                            primary={
                                                <Typography fontSize="13px">
                                                    {t('Sort by: A to Z')}
                                                </Typography>
                                            }
                                        />
                                    }
                                />
                            </ListItem>
                            <ListItem
                                sx={{
                                    fontSize: '13px',
                                    paddingInline: '1rem',
                                    cursor: 'pointer',
                                    color: (theme) =>
                                        theme.palette.neutral[600],
                                    borderBottom: '1px solid',
                                    borderBottomColor: (theme) =>
                                        alpha(theme.palette.neutral[300], 0.3),
                                    paddingTop: '4px',
                                    paddingBottom: '4px',
                                }}
                            >
                                <FormControlLabel
                                    value="desc"
                                    control={<Radio />}
                                    label={
                                        <ListItemText
                                            primary={
                                                <Typography fontSize="13px">
                                                    {t('Sort by: Z to A')}
                                                </Typography>
                                            }
                                        />
                                    }
                                />
                            </ListItem>

                            {restaurantType === 'dine-in' && (
                                <ListItem
                                    sx={{
                                        fontSize: '13px',
                                        paddingInline: '1rem',
                                        cursor: 'pointer',
                                        color: (theme) =>
                                            theme.palette.neutral[600],
                                        borderBottom: '1px solid',
                                        borderBottomColor: (theme) =>
                                            alpha(
                                                theme.palette.neutral[300],
                                                0.3
                                            ),
                                        paddingTop: '4px',
                                        paddingBottom: '4px',
                                    }}
                                >
                                    <FormControlLabel
                                        value="distance"
                                        control={<Radio />}
                                        label={
                                            <ListItemText
                                                primary={
                                                    <Typography fontSize="13px">
                                                        {t('Sort by: Distance')}
                                                    </Typography>
                                                }
                                            />
                                        }
                                    />
                                </ListItem>
                            )}
                            {restaurantType === 'dine-in' && (
                                <ListItem
                                    sx={{
                                        fontSize: '13px',
                                        paddingInline: '1rem',
                                        cursor: 'pointer',
                                        color: (theme) =>
                                            theme.palette.neutral[600],
                                        borderBottom: '1px solid',
                                        borderBottomColor: (theme) =>
                                            alpha(
                                                theme.palette.neutral[300],
                                                0.3
                                            ),
                                        paddingTop: '4px',
                                        paddingBottom: '4px',
                                    }}
                                >
                                    <FormControlLabel
                                        value="rating"
                                        control={<Radio />}
                                        label={
                                            <ListItemText
                                                primary={
                                                    <Typography fontSize="13px">
                                                        {t('Sort by: Rating')}
                                                    </Typography>
                                                }
                                            />
                                        }
                                    />
                                </ListItem>
                            )}

                            {foodOrRestaurant !== 'restaurants' && (
                                <>
                                    <ListItem
                                        sx={{
                                            fontSize: '13px',
                                            paddingInline: '1rem',
                                            cursor: 'pointer',
                                            color: (theme) =>
                                                theme.palette.neutral[600],
                                            borderBottom: '1px solid',
                                            borderBottomColor: (theme) =>
                                                alpha(
                                                    theme.palette.neutral[300],
                                                    0.3
                                                ),
                                            paddingTop: '4px',
                                            paddingBottom: '4px',
                                        }}
                                    >
                                        <FormControlLabel
                                            value="high"
                                            control={<Radio />}
                                            label={
                                                <ListItemText
                                                    primary={
                                                        <Typography fontSize="13px">
                                                            {t(
                                                                'Price: High to Low'
                                                            )}
                                                        </Typography>
                                                    }
                                                />
                                            }
                                        />
                                    </ListItem>
                                    <ListItem
                                        sx={{
                                            fontSize: '13px',
                                            paddingInline: '1rem',
                                            cursor: 'pointer',
                                            color: (theme) =>
                                                theme.palette.neutral[600],
                                            paddingTop: '4px',
                                            paddingBottom: '4px',
                                        }}
                                    >
                                        <FormControlLabel
                                            value="low"
                                            control={<Radio />}
                                            label={
                                                <ListItemText
                                                    primary={
                                                        <Typography fontSize="13px">
                                                            {t(
                                                                'Price: Low to High'
                                                            )}
                                                        </Typography>
                                                    }
                                                />
                                            }
                                        />
                                    </ListItem>
                                </>
                            )}
                        </RadioGroup>
                    </List>
                ) : (
                    <Box>
                        <WrapperForSideDrawerFilter smminwith="270px">
                            <Stack spacing={3}>
                                <Stack direction="row">
                                    <CustomGroupCheckbox
                                        forcuisine="true"
                                        checkboxData={cuisines}
                                        setCuisineState={setCuisineState}
                                        cuisineState={cuisineState}
                                    />
                                </Stack>
                            </Stack>
                        </WrapperForSideDrawerFilter>
                    </Box>
                )}
            </Popover>
            <Popover
                onClose={() => handleDropClose()}
                id="fade-button"
                open={Boolean(anchorElCard)}
                anchorEl={anchorElCard}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                sx={{
                    zIndex: 999,
                    top: '12px',
                }}
            >
                <FilterCard
                    restaurantType={restaurantType}
                    handleDropClose={handleDropClose}
                    stateData={storeData}
                    setStateData={setStoreData}
                    forcuisine="true"
                    setCuisineState={setCuisineState}
                    cuisineState={cuisineState}
                />
            </Popover>
        </>
    )
}

export default FilterTag
