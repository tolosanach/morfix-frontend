import React, { useRef, useState } from 'react'
import {
    CustomStackFullWidth,
    CustomViewAll,
    SliderCustom,
} from '@/styled-components/CustomStyles.style'
import CustomShimmerCategories from '../../CustomShimmer/CustomShimmerCategories'
import { Grid, Stack, Typography } from '@mui/material'
import { t } from 'i18next'
import { useRouter } from 'next/router'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import CuisinesCard from './CuisinesCard'
import CustomImageContainer from '../../CustomImageContainer'
import cuisine_image from '../../../../public/static/cuisine_image.svg'
import { useTheme } from '@emotion/react'
import Skeleton from '@mui/material/Skeleton'
import { HandleNext, HandlePrev } from '../../CustomSliderIcon'
import { useSelector } from 'react-redux'

const Cuisines = () => {
    const [hoverOn, setHoverOn] = useState(false)
    const theme = useTheme()
    const router = useRouter()
    const sliderRef = useRef(null)
    const { cuisines } = useSelector((state) => state.storedData)
    const settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 8,
        slidesToScroll: 1,
        nextArrow: hoverOn && <HandleNext overLay={true} />,
        prevArrow: hoverOn && <HandlePrev />,
        responsive: [
            {
                breakpoint: 1450,
                settings: {
                    slidesToShow: 8,
                    slidesToScroll: 5,
                    infinite: false,
                },
            },
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 6,
                    slidesToScroll: 5,
                    infinite: false,
                },
            },
            {
                breakpoint: 850,
                settings: {
                    slidesToShow: 5,
                    slidesToScroll: 5,
                    infinite: true,
                },
            },
            {
                breakpoint: 790,
                settings: {
                    slidesToShow: 4.5,
                    slidesToScroll: 5,
                    infinite: false,
                },
            },

            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 7,
                    slidesToScroll: 5,
                    initialSlide: 2,
                },
            },
            {
                breakpoint: 500,
                settings: {
                    slidesToShow: 5,
                    slidesToScroll: 5,
                },
            },
        ],
    }

    return (
        <>
            {cuisines?.length > 0 && (
                <>
                    {!cuisines ? (
                        <CustomStackFullWidth
                            spacing={1}
                            paddingTop={{ xs: '1rem', sm: '1.9rem' }}
                        >
                            <Skeleton
                                width={120}
                                height="30px"
                                variant="rectangular"
                            />
                            <CustomShimmerCategories
                                noSearchShimmer="true"
                                itemCount="7"
                                smItemCount="5"
                            />
                        </CustomStackFullWidth>
                    ) : (
                        cuisines?.length > 0 && (
                            <Grid
                                container
                                sx={{
                                    paddingTop: { xs: '1rem', sm: '1.9rem' },
                                }}
                                gap="1.2rem"
                            >
                                <Grid item xs={12} md={12}>
                                    <CustomStackFullWidth
                                        direction="row"
                                        alignItems="center"
                                        justifyContent="space-between"
                                    >
                                        <Stack
                                            direction="row"
                                            justifyContent="space-between"
                                            width="100%"
                                        >
                                            <Stack direction="row" spacing={1}>
                                                <CustomImageContainer
                                                    src={cuisine_image.src}
                                                    width="26px"
                                                    height="26px"
                                                />
                                                <Typography
                                                    fontSize={{
                                                        xs: '16px',
                                                        md: '20px',
                                                    }}
                                                    fontWeight={{
                                                        xs: '500',
                                                        md: '700',
                                                    }}
                                                    color={
                                                        theme.palette
                                                            .neutral[1000]
                                                    }
                                                    component="h2"
                                                >
                                                    {t('Cuisines')}
                                                </Typography>
                                            </Stack>

                                            <CustomViewAll
                                                onClick={() =>
                                                    router.push('/cuisines')
                                                }
                                                sx={{ marginInlineEnd: '10px' }}
                                            >
                                                {t('Explore More')}
                                            </CustomViewAll>
                                        </Stack>
                                    </CustomStackFullWidth>
                                </Grid>
                                <Grid
                                    item
                                    container
                                    xs={12}
                                    sm={12}
                                    md={12}
                                    sx={{
                                        position: 'relative',
                                        transition:
                                            'height 0.5s linear, width 0.5s linear',
                                    }}
                                    onMouseEnter={() => setHoverOn(true)}
                                    onMouseLeave={() => setHoverOn(false)}
                                >
                                    {cuisines && cuisines?.length > 0 && (
                                        <Grid item xs={12} md={12}>
                                            <SliderCustom>
                                                <Slider
                                                    {...settings}
                                                    ref={sliderRef}
                                                >
                                                    {cuisines?.map(
                                                        (item, index) => {
                                                            return (
                                                                <CuisinesCard
                                                                    item={item}
                                                                    key={index}
                                                                />
                                                            )
                                                        }
                                                    )}
                                                </Slider>
                                            </SliderCustom>
                                        </Grid>
                                    )}
                                </Grid>
                            </Grid>
                        )
                    )}
                </>
            )}
        </>
    )
}

export default Cuisines
