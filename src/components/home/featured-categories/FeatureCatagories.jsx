import React, { memo, useRef, useState } from 'react'
import { Grid, Typography, Stack } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import Slider from 'react-slick'

import FeaturedCategoryCard from '../../featured-category-item/FeaturedCategoryCard'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import CustomShimmerCategories from '../../CustomShimmer/CustomShimmerCategories'
import { useRouter } from 'next/router'
import { CustomViewAll } from '@/styled-components/CustomStyles.style'
import useScrollSticky from '../Search-filter-tag/useScrollSticky'
import Card from '@mui/material/Card'
import CustomContainer from '../../container'
import { HandleNext, HandlePrev } from '@/components/CustomSliderIcon'

const FeatureCatagories = () => {
    const { t } = useTranslation()
    const router = useRouter()
    const [hoverOn, setHoverOn] = useState(false)
    const { catOffsetElementRef } = useScrollSticky()
    const { global } = useSelector((state) => state.globalSettings)
    const { featuredCategories } = useSelector((state) => state.storedData)
    const { categoryIsSticky, foodTypeIsSticky } = useSelector(
        (state) => state.scrollPosition
    )
    const sliderRef = useRef(null)
    const settings = {
        dots: false,
        infinite: categoryIsSticky
            ? featuredCategories?.length > 12
            : featuredCategories?.length > 7,
        speed: 700,
        slidesToShow: categoryIsSticky ? 12 : 7,
        slidesToScroll: 3,
        autoplay: true,
        nextArrow: hoverOn && <HandleNext />,
        prevArrow: hoverOn && <HandlePrev />,
        responsive: [
            {
                breakpoint: 1450,
                settings: {
                    slidesToShow: 8,
                    slidesToScroll: 3,
                    infinite: featuredCategories?.length > 8 && true,
                },
            },
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 6,
                    slidesToScroll: 3,
                    infinite: featuredCategories?.length > 6 && true,
                },
            },
            {
                breakpoint: 850,
                settings: {
                    slidesToShow: 5,
                    slidesToScroll: 3,
                    infinite: featuredCategories?.length > 5 && true,
                },
            },
            {
                breakpoint: 790,
                settings: {
                    slidesToShow: 7,
                    slidesToScroll: 3,
                    infinite: featuredCategories?.length > 4.5 && true,
                },
            },

            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 7,
                    slidesToScroll: 3,
                    infinite: featuredCategories?.length > 7 && true,
                },
            },
            {
                breakpoint: 500,
                settings: {
                    slidesToShow: 5,
                    slidesToScroll: 3,
                    infinite: featuredCategories?.length > 5 && true,
                },
            },
        ],
    }

    if (!featuredCategories) {
        return null
    }

    return (
        <Card
            sx={{
                paddingTop: categoryIsSticky && '.5rem',
                position: 'sticky',
                top: { xs: '91px', md: '108px' },
                zIndex: 1100,
                background: (theme) => theme.palette.neutral[1800],
                boxShadow: categoryIsSticky
                    ? '0px 1px 1px rgba(100, 116, 139, 0.06), 0px 1px 2px rgba(100, 116, 139, 0.1)'
                    : 'none',
            }}
        >
            <CustomContainer>
                <Grid
                    container
                    ref={catOffsetElementRef}
                    gap={{ xs: '.3rem', md: '.5rem' }}
                >
                    {!categoryIsSticky && (
                        <Grid item xs={12} md={12}>
                            <Stack
                                direction="row"
                                justifyContent="space-between"
                                width="100%"
                            >
                                <Typography
                                    fontSize={{ xs: '16px', md: '20px' }}
                                    fontWeight={{ xs: '500', md: '700' }}
                                    component="h2"
                                >
                                    {t('Whats on Your Mind?')}
                                </Typography>
                                <CustomViewAll
                                    onClick={() => router.push('/categories')}
                                    sx={{ marginInlineEnd: '10px' }}
                                >
                                    <Typography
                                        fontSize="14px"
                                        fontWeight="500"
                                    >
                                        {t('Explore More')}
                                    </Typography>
                                </CustomViewAll>
                            </Stack>
                        </Grid>
                    )}
                    <Grid
                        item
                        xs={12}
                        md={12}
                        onMouseEnter={() => setHoverOn(true)}
                        onMouseLeave={() => setHoverOn(false)}
                    >
                        {featuredCategories?.length > 0 ? (
                            <Slider
                                className="slick__slider"
                                {...settings}
                                ref={sliderRef}
                            >
                                {featuredCategories.map((categoryItem) => (
                                    <FeaturedCategoryCard
                                        key={categoryItem?.id}
                                        id={categoryItem?.id}
                                        categoryImage={
                                            categoryItem?.image_full_url
                                        }
                                        name={categoryItem?.name}
                                        categoryImageUrl={
                                            global?.base_urls
                                                ?.category_image_url
                                        }
                                        height="40px"
                                        categoryIsSticky={categoryIsSticky}
                                    />
                                ))}
                            </Slider>
                        ) : (
                            <CustomShimmerCategories
                                noSearchShimmer="true"
                                itemCount="7"
                                smItemCount="5"
                            />
                        )}
                    </Grid>
                </Grid>
            </CustomContainer>
        </Card>
    )
}

export default memo(FeatureCatagories)
