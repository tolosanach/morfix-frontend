import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined'
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined'
import { Button, Popover, Stack, Tab, Tabs, Typography } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { t } from 'i18next'
import { useEffect, useState } from 'react'
import { handleFilterData } from '../../category/helper'
import RestaurantFilterCard from './RestaurantFilterCard'

const RestaurantTab = (props) => {
    const {
        filterType,
        handleChange,
        mockData,
        setFilterByData,
        setOffSet,
        setForFilter,
        forFilter,
        scrollToSection5,
        checkedFilterKey,
        setCheckedFilterKey,
    } = props
    const [anchorEl, setAnchorEl] = useState(null)
    const open = Boolean(anchorEl)
    const theme = useTheme()
    const iconColor = theme.palette.customColor?.six
    const handleDropClick = (event) => {
        setAnchorEl(event.currentTarget)
    }
    const handleDropClose = () => {
        setAnchorEl(null)
    }

    useEffect(() => {
        if (forFilter) {
            scrollToSection5()
        }

        handleFilterData(
            checkedFilterKey,
            setFilterByData,
            setOffSet,
            setForFilter
        )
    }, [checkedFilterKey])

    const handleClearAll = () => {
        handleDropClose()
    }
    const handleReset = () => {
        const data = checkedFilterKey?.map((item) => ({
            ...item,
            isActive: false,
        }))
        setCheckedFilterKey(data)
        handleDropClose()
    }
    return (
        <div>
            <Stack direction="row" justifyContent="flex-end" spacing={3}>
                <Tabs
                    value={filterType}
                    onChange={handleChange}
                    textColor={iconColor}
                    indicatorColor="primary"
                    variant="scrollable"
                    allowScrollButtonsMobile
                    aria-label="scrollable prevent tabs example"
                    sx={{
                        zIndex: 999,
                        '& .MuiButtonBase-root': {
                            paddingInlineEnd: '10px',
                            paddingInlineStart: '10px',
                            '& .MuiTabScrollButton-root': {
                                width: '20px ',
                            },
                        },
                        '& .MuiTabs-flexContainer': {
                            gap: '10px',
                        },
                        '& .MuiTabScrollButton-root': {
                            width: 20, // Change the width value to your desired size
                        },
                    }}
                >
                    {mockData?.map((item) => {
                        return (
                            <Tab
                                key={item?.id}
                                value={item.value}
                                sx={{
                                    color: (theme) =>
                                        theme.palette.customColor?.six,
                                }}
                                label={t(item?.category_name)}
                            />
                        )
                    })}
                </Tabs>
                <Button onClick={handleDropClick}>
                    <Stack
                        direction="row"
                        alignItems="center"
                        spacing={0.5}
                        justifyContent="center"
                    >
                        <FilterAltOutlinedIcon
                            style={{
                                width: '16px',
                                height: '16px',
                            }}
                            color="primary"
                        />
                        <Typography
                            fontSize="14px"
                            fontWeight="500"
                            color={theme.palette.customColor?.six}
                        >
                            {t('Filter')}
                        </Typography>
                        <KeyboardArrowDownOutlinedIcon
                            style={{
                                width: '18px',
                                height: '18px',
                                color: iconColor,
                            }}
                        />
                    </Stack>
                </Button>
            </Stack>
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
                    top: '5px',
                }}
            >
                <RestaurantFilterCard
                    handleReset={handleReset}
                    homeRestaurant="true"
                    checkboxData={checkedFilterKey}
                    handleDropClose={handleDropClose}
                    anchorEl={anchorEl}
                    setFilterByData={setFilterByData}
                    handleClearAll={handleClearAll}
                    setCheckedFilterKey={setCheckedFilterKey}
                />
            </Popover>
        </div>
    )
}

export default RestaurantTab
