import { alpha, Stack, styled, Typography } from '@mui/material'
import Button from '@mui/material/Button'
import { useTheme } from '@mui/material/styles'
import React from 'react'
import { useTranslation } from 'react-i18next'

import {
    setSelectedName,
    setSelectedValue,
} from '@/redux/slices/searchTagSlice'
import { useDispatch } from 'react-redux'
export const PrimaryButton = styled(Button)(
    ({
        backgroundColor,
        hoverBackgroundColor,
        borderRadius,
        theme,
        padding,
    }) => ({
        backgroundColor: backgroundColor,
        borderRadius: borderRadius ? borderRadius : '8px',
        color: theme.palette.neutral[100],
        '&:hover': {
            backgroundColor: alpha(theme.palette.primary.main, 0.8),
            color: hoverBackgroundColor,
        },
        [theme.breakpoints.down('sm')]: {
            padding: padding ? padding : '',
        },
    })
)

export default function FoodOrRestaurant({
    foodOrRestaurant,
    setFoodOrRestaurant,
    filterData,
}) {
    const { t } = useTranslation()
    const theme = useTheme()
    const dispatch = useDispatch()
    const isProduct = foodOrRestaurant === 'products'
    const isRestaurant = foodOrRestaurant === 'restaurants'
    const [languageDirection, setLanguageDirection] = React.useState('ltr')
    React.useEffect(() => {
        if (localStorage.getItem('direction')) {
            setLanguageDirection(localStorage.getItem('direction'))
        }
    }, [])
    const handleClick = (value) => {
        dispatch(setFoodOrRestaurant(value))
        dispatch(setSelectedValue(''))
        dispatch(setSelectedName(''))
    }
    return (
        <>
            {languageDirection && (
                <Stack
                    alignItems="center"
                    justifyContent="flex-start"
                    direction="row"
                    spacing={{ xs: 3, sm: 4, md: 5 }}
                    gap={languageDirection === 'rtl' && '10px'}
                    marginTop={{ xs: '10px', sm: '10px', md: '0px' }}
                >
                    <Typography
                        onClick={() => handleClick('products')}
                        fontSize={{ xs: '14px', sm: '16px', md: '16px' }}
                        fontWeight={isProduct ? '600' : '400'}
                        sx={{
                            color: isProduct
                                ? (theme) => theme.palette.neutral[1000]
                                : (theme) => theme.palette.neutral[500],
                            cursor: 'pointer',
                        }}
                    >
                        {t('Foods')}
                        <Typography
                            sx={{
                                borderBottom: isProduct
                                    ? `5px solid ${theme.palette.primary.main}`
                                    : '',
                                borderRadius: '20px',
                                marginTop: '4px',
                            }}
                        ></Typography>
                    </Typography>
                    {filterData?.sortBy !== 'low' &&
                        filterData?.sortBy !== 'high' && (
                            <Typography
                                onClick={() => handleClick('restaurants')}
                                fontSize={{
                                    xs: '14px',
                                    sm: '16px',
                                    md: '16px',
                                }}
                                fontWeight={isRestaurant ? '600' : '400'}
                                sx={{
                                    color: isRestaurant
                                        ? (theme) => theme.palette.neutral[1000]
                                        : (theme) => theme.palette.neutral[500],
                                    cursor: 'pointer',
                                }}
                            >
                                {t('Restaurants')}
                                <Typography
                                    sx={{
                                        borderBottom: isRestaurant
                                            ? `5px solid ${theme.palette.primary.main}`
                                            : '',
                                        borderRadius: '20px',
                                        marginTop: '4px',
                                    }}
                                />
                            </Typography>
                        )}
                </Stack>
            )}
        </>
    )
}
