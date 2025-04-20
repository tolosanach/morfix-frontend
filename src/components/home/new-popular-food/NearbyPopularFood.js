import React, { memo, useState } from 'react'
import { Box, Grid, Stack, Typography, styled } from '@mui/material'
import fire_image from '../../../../public/static/fire.svg'
import FoodCard from '../../food-card/FoodCard'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import CustomImageContainer from '../../CustomImageContainer'
import {
    CustomStackFullWidth,
    CustomViewAll,
} from '@/styled-components/CustomStyles.style'
import { useTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'
import FoodCardHorizontalShimmer from '../../food-card/FoodCardHorizontalShimmer'
import { useRouter } from 'next/router'
import Slider from 'react-slick'
import { HandleNext, HandlePrev } from '../../CustomSliderIcon'

const SliderCustom1 = styled(Box)(({ theme, nopadding }) => ({
    position: 'relative',
    width: '100%',
    paddingY: '10px',
    '& .slick-slider': {
        '& .slick-slide': {
            padding: '6px',
        },
        '& .slick-list': {
            paddingY: nopadding !== 'true' && '8px',
            '& .slick-track': {
                float: theme.direction === 'ltr' ? 'left' : 'right',
                gap: '5px',
            },
        },
    },
}))

const NearbyPopularFood = ({ isLoading }) => {
    const { t } = useTranslation()
    const router = useRouter()
    const [hoverOn, setHoverOn] = useState(false)
    const { global } = useSelector((state) => state.globalSettings)
    const { popularFood } = useSelector((state) => state.storedData)
    const theme = useTheme()
    const isSmall = useMediaQuery(theme.breakpoints.down('md'))
    let languageDirection = undefined
    if (typeof window !== 'undefined') {
        languageDirection = localStorage.getItem('direction')
    }
    const handleClick = () => {
        window.scroll({
            top: 0,
            left: 0,
            behavior: 'smooth',
        })
        router.push(
            {
                pathname:
                    router.pathname === '/home'
                        ? window.location.pathname
                        : 'search',
                query: {
                    page: 'popular',
                },
            },
            undefined,
            { shallow: router.pathname === '/home' }
        )
    }
    const settings = {
        infinite: false,
        speed: 500,
        slidesPerRow: 1,
        rows: 2,
        slidesToShow: 3,
        slidesToScroll: 1,
        prevArrow: hoverOn && <HandlePrev />,
        nextArrow: hoverOn && <HandleNext />,
        cssEase: 'linear',
        rtl: languageDirection === 'rtl',
        responsive: [
            {
                breakpoint: 300,
                settings: {
                    slidesToShow: 0.8,
                    slidesPerRow: 1,
                    rows: 2,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 400,
                settings: {
                    slidesToShow: 1.05,
                    slidesPerRow: 1,
                    rows: 2,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 500,
                settings: {
                    slidesToShow: 1.2,
                    slidesPerRow: 1,
                    rows: 2,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1.5,
                    slidesPerRow: 1,
                    rows: 2,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 700,
                settings: {
                    slidesToShow: 1.6,
                    slidesPerRow: 1,
                    rows: 2,
                    slidesToScroll: 2,
                },
            },
            {
                breakpoint: 800,
                settings: {
                    slidesToShow: 1.8,
                    slidesPerRow: 1,
                    rows: 2,
                    slidesToScroll: 2,
                },
            },
            {
                breakpoint: 900,
                settings: {
                    slidesToShow: 2.1,
                    slidesPerRow: 1,
                    rows: 2,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 1150,
                settings: {
                    slidesToShow: 2.4,
                    slidesPerRow: 1,
                    rows: 2,
                    slidesToScroll: 3,
                },
            },
            {
                breakpoint: 1300,
                settings: {
                    slidesToShow: 2.7,
                    slidesPerRow: 1,
                    rows: 2,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 1500,
                settings: {
                    slidesToShow: 3,
                    slidesPerRow: 1,
                    rows: 2,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 1700,
                settings: {
                    slidesToShow: 3.5,
                    slidesPerRow: 1,
                    rows: 2,
                    slidesToScroll: 1,
                },
            },
        ],
    }
    return (
        <>
            <Grid
                container
                paddingTop={
                    popularFood.length > 0 && { xs: '0.5rem', sm: '1.4rem' }
                }
                gap={{ xs: '.3rem', sm: '1.4rem' }}
                onMouseEnter={() => setHoverOn(true)}
                onMouseLeave={() => setHoverOn(false)}
            >
                {popularFood.length > 0 && !isLoading && (
                    <Grid item xs={12} md={12} sm={12} lg={12}>
                        <CustomStackFullWidth
                            direction="row"
                            alignItems="center"
                            justifyContent="space-between"
                        >
                            <Stack
                                direction="row"
                                spacing={1}
                                alignItems="center"
                            >
                                <CustomImageContainer
                                    src={fire_image.src}
                                    width="26px"
                                    height="26px"
                                />
                                <Typography
                                    fontSize={{ xs: '16px', md: '20px' }}
                                    fontWeight={{ xs: '500', md: '700' }}
                                    color={theme.palette.neutral[1000]}
                                    component="h2"
                                >
                                    {t('Popular  Foods Nearby')}
                                </Typography>
                            </Stack>
                            <CustomViewAll
                                onClick={handleClick}
                                direction="row"
                                spacing={1}
                                alignItems="center"
                            >
                                <Typography fontSize="14px" fontWeight="500">
                                    {t('View all')}
                                </Typography>
                            </CustomViewAll>
                        </CustomStackFullWidth>
                    </Grid>
                )}
                {!isLoading ? (
                    <SliderCustom1
                        gap="12px"
                        paddingBottom={isSmall ? '10px' : '20px'}
                    >
                      {popularFood?.length > 0 && (  <CustomStackFullWidth>
                            <Slider {...settings}>
                                {popularFood?.map((product) => {
                                    if (
                                        product?.variations === null ||
                                        product?.variations[0]?.values ||
                                        product?.variations?.length === 0
                                    ) {
                                        return (
                                            <Stack pb="1rem" key={product?.id}>
                                                <FoodCard
                                                    product={product}
                                                    productImageUrl={
                                                        global?.base_urls
                                                            ?.product_image_url
                                                    }
                                                    horizontal="true"
                                                    hasBackGroundSection="true"
                                                />
                                            </Stack>
                                        )
                                    }
                                })}
                            </Slider>
                        </CustomStackFullWidth>
                      )}
                    </SliderCustom1>
                ) : (
                    <CustomStackFullWidth>
                        <SliderCustom1 nopadding="true">
                            <Slider {...settings}>
                                {[...Array(12)].map((item, index) => (
                                    <FoodCardHorizontalShimmer
                                        key={index}
                                        maxWidth="375px"
                                    />
                                ))}
                            </Slider>
                        </SliderCustom1>
                    </CustomStackFullWidth>
                )}
            </Grid>
        </>
    )
}

export default memo(NearbyPopularFood)
