import React, { useRef, useState } from 'react'
import { Card, Stack } from '@mui/material'
import { LandingPageTypography } from './landingPageStyle'
import ImageNotFound from '../../../public/static/no-image-found.png'
import Skeleton from '@mui/material/Skeleton'
import CustomContainer from '../container'
import {
    CustomStackFullWidth,
    SliderCustom,
} from '@/styled-components/CustomStyles.style'
import 'simplebar/dist/simplebar.min.css'
import { RTL } from '../RTL/RTL'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { HandleNext, HandlePrev } from '../CustomSliderIcon'
import { useTheme } from '@emotion/react'

const BannerSection = ({ banner_section_half, isLoading }) => {
    const [hoverOn, setHoverOn] = useState(false)
    const discountRef = useRef(null)
    const theme = useTheme()
    let languageDirection = undefined
    if (typeof window !== 'undefined') {
        languageDirection = localStorage.getItem('direction')
    }
    const settings = {
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        initialSlide: 0,
        autoplay: 'true',
        infinite: 'true',
        nextArrow: hoverOn && <HandleNext />,
        prevArrow: hoverOn && <HandlePrev />,
        responsive: [
            {
                breakpoint: 3600,
                settings: {
                    slidesToShow: 4.7,
                    slidesToScroll: 1,
                    infinite: false,
                },
            },
            {
                breakpoint: 3200,
                settings: {
                    slidesToShow: 4.7,
                    slidesToScroll: 1,
                    infinite: false,
                },
            },
            {
                breakpoint: 2800,
                settings: {
                    slidesToShow: 4.7,
                    slidesToScroll: 1,
                    infinite: false,
                },
            },
            {
                breakpoint: 2400,
                settings: {
                    slidesToShow: 4.7,
                    slidesToScroll: 1,
                    infinite: false,
                },
            },
            {
                breakpoint: 2000,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    infinite: false,
                },
            },
            {
                breakpoint: 1600,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    infinite: true,
                },
            },
            {
                breakpoint: 1340,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    infinite: true,
                },
            },
            {
                breakpoint: 1075,
                settings: {
                    slidesToShow: 2.5,
                    slidesToScroll: 1,
                    infinite: true,
                },
            },
            {
                breakpoint: 999,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    infinite: true,
                },
            },
            {
                breakpoint: 800,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    infinite: true,
                },
            },
            {
                breakpoint: 670,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    initialSlide: 0,
                    infinite: true,
                },
            },
            {
                breakpoint: 540,
                settings: {
                    slidesToShow: 1.2,
                    slidesToScroll: 1,
                    infinite: true,
                },
            },
            {
                breakpoint: 450,
                settings: {
                    className: 'center',
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    centerMode: true,
                    centerPadding: '20px',
                    initialSlide: 0,
                    infinite: true,
                    dots: true,
                },
            },
        ],
    }

    return (
        <RTL direction={languageDirection}>
            <CustomContainer>
                <Stack width="100%" direction="row" sx={{ marginTop: '25px' }}>
                    <CustomStackFullWidth
                        onMouseEnter={() => setHoverOn(true)}
                        onMouseLeave={() => setHoverOn(false)}
                    >
                        {!isLoading ? (
                            <SliderCustom
                                languageDirection={languageDirection}
                                gap="0px"
                            >
                                <Slider ref={discountRef} {...settings}>
                                    {banner_section_half?.map((item, index) => {
                                        return (
                                            <>
                                                <Stack
                                                    height={{
                                                        xs: '131px',
                                                        sm: '155px',
                                                    }}
                                                    key={index}
                                                    sx={{
                                                        paddingInlineEnd: {
                                                            xs: '12px',
                                                            sm: '20px',
                                                            md: '20px',
                                                        },
                                                    }}
                                                >
                                                    <Card
                                                        elevation={0}
                                                        sx={{
                                                            backgroundImage: `url(${
                                                                typeof item.image_full_url ===
                                                                'string'
                                                                    ? `${item?.image_full_url}`
                                                                    : ImageNotFound.src
                                                            })`,
                                                            height: '100%',
                                                            width: '100%',
                                                            backgroundSize:
                                                                'cover',
                                                            backgroundRepeat:
                                                                'no-repeat',
                                                            borderRadius: '4px',
                                                            backgroundPosition:
                                                                'center',
                                                            transition:
                                                                'transform .3s ease-in-out',
                                                            '&:hover': {
                                                                transform:
                                                                    'scale(1.03)',
                                                            },
                                                        }}
                                                    >
                                                        <Stack
                                                            width="250px"
                                                            padding="20px 26px 20px 26px"
                                                            justifyContent="center"
                                                            alignItems="flex-start"
                                                            height="100%"
                                                        >
                                                            <LandingPageTypography
                                                                fontWeight="700"
                                                                color={
                                                                    theme
                                                                        .palette
                                                                        .customColor
                                                                        .seven
                                                                }
                                                                fontSize="19px"
                                                                sx={{
                                                                    textTransform:
                                                                        'capitalize',
                                                                }}
                                                            >
                                                                {item.title}
                                                            </LandingPageTypography>
                                                            <LandingPageTypography
                                                                color={
                                                                    theme
                                                                        .palette
                                                                        .customColor
                                                                        .seven
                                                                }
                                                                sx={{
                                                                    mt: 1,

                                                                    textAlign:
                                                                        'left',
                                                                }}
                                                                fontWeight="400"
                                                                fontSize="16px"
                                                            >
                                                                {
                                                                    item.description
                                                                }
                                                            </LandingPageTypography>
                                                        </Stack>
                                                    </Card>
                                                </Stack>
                                            </>
                                        )
                                    })}
                                </Slider>
                            </SliderCustom>
                        ) : (
                            <Slider ref={discountRef} {...settings}>
                                {[...Array(3)].map((item) => {
                                    return (
                                        <Stack
                                            maxWidth="375px"
                                            width="100%"
                                            height="155px"
                                        >
                                            <Skeleton
                                                variant="rectangular"
                                                width="100%"
                                                height="200px"
                                            />
                                        </Stack>
                                    )
                                })}
                            </Slider>
                        )}
                    </CustomStackFullWidth>
                </Stack>
            </CustomContainer>
        </RTL>
    )
}

export default BannerSection
