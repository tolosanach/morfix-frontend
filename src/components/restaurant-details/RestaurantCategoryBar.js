import React, { useEffect, useRef, useState } from 'react'
import {
    alpha,
    Grid,
    IconButton,
    Popover,
    Typography,
    Box,
    Stack,
} from '@mui/material'
import { CustomStackFullWidth } from '@/styled-components/CustomStyles.style'
import { CategoryButton } from './restaurant-details.style'
import { styled, useTheme } from '@mui/material/styles'
import FilterButton from '../Button/FilterButton'
import RestaurantFilterCard from '../home/restaurant/RestaurantFilterCard'
import { filterData } from '../home/restaurant/FilterData'
import { RTL } from '../RTL/RTL'
import SearchIcon from '@mui/icons-material/Search'
import { t } from 'i18next'
import CustomSearch from '../custom-search/CustomSearch'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'

const CustomBox = styled(Box)(({ theme }) => ({
    width: '100%',
    overflowX: 'none',
    overflowY: 'auto',
    cursor: 'pointer',
    '&::-webkit-scrollbar': {
        height: '2px',
    },
    [theme.breakpoints.down('md')]: {
        '&::-webkit-scrollbar': {
            height: '0px',
        },
    },
    '&::-webkit-scrollbar-track': {
        backgroundColor: theme.palette.whiteContainer.main,
        borderRadius: 10,
        opacity: 0,
        zIndex: -1,
    },
    '&::-webkit-scrollbar-thumb': {
        backgroundColor: theme.palette.neutral[300],
        borderRadius: 10,
        opacity: 0,
        transition: 'opacity 0.2s',
    },
    '&::-webkit-scrollbar-thumb:hover': {
        backgroundColor: theme.palette.neutral[400],
    },
    '&:hover': {
        '&::-webkit-scrollbar-thumb': {
            opacity: 1,
        },
    },
}))

const RestaurantCategoryBar = (props) => {
    const {
        data,
        selectedId,
        handleClick,
        setFilterKey,
        handleFilter,
        isSmall,
        handleSearchResult,
        searchKey,
    } = props
    const [checkedFilterKey, setCheckedFilterKey] = useState(filterData)
    const [searchBoxOpen, setSearchBoxOpen] = useState(false)
    const theme = useTheme()

    const [anchorEl, setAnchorEl] = useState(null)
    const open = Boolean(anchorEl)
    const refs = useRef([])
    const scrollerRef = useRef(null)
    const handleDropClick = (event) => {
        setAnchorEl(event.currentTarget)
    }
    const handleDropClose = () => {
        setAnchorEl(null)
    }
    useEffect(() => {
        if (selectedId && refs.current[selectedId]) {
            const selectedButton = refs.current[selectedId]
            const scrollerLeft =
                scrollerRef.current.getBoundingClientRect().left
            const buttonLeft = selectedButton.getBoundingClientRect().left
            const offset =
                buttonLeft -
                scrollerLeft +
                (selectedButton.offsetWidth - scrollerRef.current.offsetWidth) /
                    2
            scrollerRef.current.scrollLeft = offset
        }
    }, [selectedId])

    const handleFilterData = (event, id) => {
        const activeFilters = checkedFilterKey.filter(
            (filter) => filter.isActive === true
        )

        const filteredData = {
            veg:
                activeFilters.find((filter) => filter.value === 'veg') !==
                undefined,
            nonVeg:
                activeFilters.find((filter) => filter.value === 'nonVeg') !==
                undefined,
            currentlyAvailable:
                activeFilters.find(
                    (filter) => filter.value === 'currentlyAvailable'
                ) !== undefined,
            discount:
                activeFilters.find((filter) => filter.value === 'discount') !==
                undefined,
        }
        setFilterKey(filteredData)
        handleFilter()
    }

    useEffect(() => {
        handleFilterData()
    }, [checkedFilterKey])
    let languageDirection = undefined
    if (typeof window !== 'undefined') {
        languageDirection = localStorage.getItem('direction')
    }

    const handleSearchBox = () => {
        setSearchBoxOpen(!searchBoxOpen)
    }
    const isActiveCategoryBar = (item, index) => {
        if (selectedId !== null) {
            if (selectedId === item?.id) {
                return 'true'
            } else {
                return 'false'
            }
        } else {
            if (index === 0) {
                return 'true'
            }
        }
    }
    const handleReset = () => {
        const data = checkedFilterKey?.map((item) => ({
            ...item,
            isActive: false,
        }))
        setCheckedFilterKey(data)
    }
    return (
        <RTL direction={languageDirection}>
            <Grid
                container
                sx={{
                    position: 'sticky',
                    top: { xs: '168px', sm: '200px', md: '231px' },
                    background: (theme) => theme.palette.neutral[1800],
                    padding: {
                        xs: '5px 5px 7px 10px',
                        sm: '4px 5px 0px 0px',
                        md: '4px 5px 0px 0px',
                    },
                    zIndex: 999,
                    boxShadow: `0px 4px 15px 0px ${alpha(
                        theme.palette.primary.main,
                        0.1
                    )}`,
                }}
                alignItems="center"
            >
                <Grid item xs={8} sm={10} md={10} sx={{ position: 'relative' }}>
                    {isSmall && searchBoxOpen ? (
                        <Stack sx={{ animation: 'fadeInRight 1s  1' }}>
                            <CustomSearch
                                borderRadius="5px"
                                handleSearchResult={handleSearchResult}
                                label={t('Search foods')}
                                searchFrom="restaurantDetails"
                                selectedValue={searchKey}
                            />
                        </Stack>
                    ) : (
                        <CustomBox ref={scrollerRef}>
                            <CustomStackFullWidth direction="row">
                                {data?.map((item, index) => {
                                    return (
                                        <CategoryButton
                                            key={item?.id}
                                            id={item?.id}
                                            ref={(el) =>
                                                (refs.current[item?.id] = el)
                                            }
                                            onClick={() =>
                                                handleClick(item?.id)
                                            }
                                            active={isActiveCategoryBar(
                                                item,
                                                index
                                            )}
                                        >
                                            <Typography
                                                fontSize={{
                                                    xs: '12px',
                                                    sm: '14px',
                                                    md: '14px',
                                                }}
                                                fontWeight={
                                                    selectedId === item?.id
                                                        ? '500'
                                                        : '400'
                                                }
                                                color={
                                                    theme.palette.neutral[900]
                                                }
                                            >
                                                {item?.name}
                                            </Typography>
                                        </CategoryButton>
                                    )
                                })}
                            </CustomStackFullWidth>
                        </CustomBox>
                    )}
                </Grid>

                <Grid
                    item
                    xs={4}
                    sm={2}
                    md={2}
                    align={languageDirection === 'rtl' ? 'left' : 'right'}
                    marginBottom={{ xs: '0px', md: '8px' }}
                >
                    <Stack
                        direction="row"
                        spacing={0.5}
                        justifyContent={
                            searchBoxOpen
                                ? 'flex-end'
                                : isSmall
                                ? 'space-between'
                                : 'flex-end'
                        }
                        alignItems="center"
                        paddingLeft="15px"
                    >
                        <Stack
                            direction="row"
                            spacing={1}
                            justifySelf="flex-end"
                        >
                            {isSmall && (
                                <IconButton
                                    onClick={handleSearchBox}
                                    sx={{
                                        background: (theme) =>
                                            alpha(
                                                theme.palette.primary.main,
                                                0.3
                                            ),
                                        borderRadius: '3px',
                                        padding: '6px',
                                        fontSize: '1.4rem',
                                    }}
                                >
                                    {!searchBoxOpen ? (
                                        <SearchIcon
                                            fontSize="1.3rem"
                                            sx={{
                                                color: (theme) =>
                                                    theme.palette.primary.main,
                                            }}
                                        />
                                    ) : (
                                        <ArrowForwardIosIcon
                                            fontSize="14px"
                                            sx={{
                                                color: (theme) =>
                                                    theme.palette.primary.main,
                                            }}
                                        />
                                    )}
                                </IconButton>
                            )}

                            <FilterButton handleClick={handleDropClick} />
                        </Stack>
                    </Stack>
                </Grid>
            </Grid>
            <Popover
                onClose={() => handleDropClose()}
                id="fade-button"
                open={open}
                anchorEl={anchorEl}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                sx={{
                    zIndex: 999,
                }}
            >
                <RestaurantFilterCard
                    homeRestaurant="true"
                    checkboxData={checkedFilterKey}
                    handleDropClose={handleDropClose}
                    anchorEl={anchorEl}
                    handleFilterData={handleFilterData}
                    setCheckedFilterKey={setCheckedFilterKey}
                    setFilterKey={setFilterKey}
                    handleReset={handleReset}
                />
            </Popover>
        </RTL>
    )
}

export default RestaurantCategoryBar
