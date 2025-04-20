import React, { useEffect, useState } from 'react'
import { alpha, styled, Typography, useTheme } from '@mui/material'
import { Stack } from '@mui/system'
import { t } from 'i18next'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import { useDispatch, useSelector } from 'react-redux'
import 'slick-carousel/slick/slick.css'
import Slider from 'react-slick'
import Box from '@mui/material/Box'
import { setActiveStep } from '@/redux/slices/storeRegistrationData'

import {
    CustomButton,
    CustomStackFullWidth,
    SliderCustom,
} from '@/styled-components/CustomStyles.style'
import useGetSubscriptionPackage from '@/hooks/react-query/store-registraion/useGetSubscriptionPackage'
import Plan from './Plan'
import LoadingButton from '@mui/lab/LoadingButton'

const BusinessPlan = ({ formSubmit, isLoading, configData }) => {
    const theme = useTheme()
    const dispatch = useDispatch()
    const [selectedPlan, setSelectedPlan] = useState('commission')
    const { data } = useGetSubscriptionPackage(selectedPlan)
    const [selectedPackage, setSelectedPackage] = useState(null)
    const [isHover, setIsHover] = useState(false)
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth', // Adds a smooth scrolling effect
        })
    }

    useEffect(() => {
        scrollToTop()
    }, [])

    const settings = {
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 2024,
                settings: {
                    slidesToShow: 3,
                },
            },

            {
                breakpoint: 1624,
                settings: {
                    slidesToShow: 3,
                },
            },

            {
                breakpoint: 1424,
                settings: {
                    slidesToShow: 3,
                },
            },

            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                },
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                },
            },
        ],
    }
    const handleSubmit = () => {
        const tempValues = {
            business_plan: selectedPlan,
            package_id: selectedPackage,
        }

        formSubmit(tempValues)
    }

    return (
        <CustomStackFullWidth
            sx={{
                border: `1px solid ${alpha(theme.palette.neutral[400], 0.2)}`,
                marginTop: '2rem',
                borderRadius: '8px',
                padding: { xs: '1rem', md: '30px' },
            }}
        >
            <Stack
                sx={{
                    // backgroundColor: (theme) => alpha(theme.palette.neutral[400], 0.1),
                    padding: '.6rem',
                    borderRadius: '8px',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <Typography
                    fontSize="18px"
                    fontWeight="500"
                    textAlign="center"
                    sx={{ color: theme.palette.neutral[1000] }}
                >
                    {t('Choose Your Business Plan')}
                </Typography>

                <CustomStackFullWidth
                    direction={{ xs: 'column', md: 'row' }}
                    spacing={2}
                    mt="1rem"
                >
                    {configData?.commission_business_model !== 0 && (
                        <Stack
                            flexGrow={1}
                            padding="20px"
                            sx={{
                                cursor: 'pointer',
                                borderRadius: '10px',
                                border: '1px solid',
                                backgroundColor:
                                    selectedPlan === 'commission'
                                        ? (theme) =>
                                              alpha(
                                                  theme.palette.primary.main,
                                                  0.1
                                              )
                                        : theme.palette.neutral[100],
                                borderColor:
                                    selectedPlan === 'commission'
                                        ? (theme) => theme.palette.primary.main
                                        : alpha(
                                              theme.palette.neutral[400],
                                              0.5
                                          ),
                            }}
                            spacing={1}
                            onClick={() => setSelectedPlan('commission')}
                        >
                            <Stack
                                direction="row"
                                justifyContent="space-between"
                            >
                                <Typography
                                    fontSize="16px"
                                    fontWeight="700"
                                    color={
                                        selectedPlan === 'commission'
                                            ? theme.palette.primary.main
                                            : theme.palette.neutral[1000]
                                    }
                                >
                                    {t('Commission Base')}
                                </Typography>
                                {selectedPlan === 'commission' && (
                                    <CheckCircleIcon
                                        sx={{
                                            fontSize: '24px',
                                            color: (theme) =>
                                                theme.palette.primary.main,
                                        }}
                                    />
                                )}
                            </Stack>
                            <Typography
                                fontSize="13px"
                                color={theme.palette.neutral[400]}
                            >
                                {t(
                                    `Store will pay ${configData?.admin_commission}% commission to 6amMart from each order. You will get access of all the features and options  in store panel , app and interaction with user.`
                                )}
                            </Typography>
                        </Stack>
                    )}
                    {configData?.subscription_business_model !== 0 &&
                        data?.packages?.length > 0 && (
                            <Stack
                                onClick={() => setSelectedPlan('subscription')}
                                flexGrow={1}
                                padding="20px"
                                sx={{
                                    cursor: 'pointer',
                                    borderRadius: '10px',
                                    border: '1px solid',
                                    backgroundColor:
                                        selectedPlan === 'subscription'
                                            ? (theme) =>
                                                  alpha(
                                                      theme.palette.primary
                                                          .main,
                                                      0.1
                                                  )
                                            : theme.palette.neutral[100],
                                    borderColor:
                                        selectedPlan === 'subscription'
                                            ? (theme) =>
                                                  theme.palette.primary.main
                                            : alpha(
                                                  theme.palette.neutral[400],
                                                  0.5
                                              ),
                                }}
                                spacing={1}
                            >
                                <Stack
                                    direction="row"
                                    justifyContent="space-between"
                                >
                                    <Typography
                                        fontSize="16px"
                                        fontWeight="700"
                                        color={
                                            selectedPlan === 'subscription'
                                                ? theme.palette.primary.main
                                                : theme.palette.neutral[1000]
                                        }
                                    >
                                        {t('Subscription Base')}
                                    </Typography>
                                    {selectedPlan === 'subscription' && (
                                        <CheckCircleIcon
                                            sx={{
                                                fontSize: '24px',
                                                color: (theme) =>
                                                    theme.palette.primary.main,
                                            }}
                                        />
                                    )}
                                </Stack>

                                <Typography
                                    fontSize="13px"
                                    color={theme.palette.neutral[400]}
                                >
                                    {t(
                                        'Run restaurant by puchasing subsciption  packages. You will have access the features of in restaurant panel , app and interaction with user according to the subscription packages.'
                                    )}
                                </Typography>
                            </Stack>
                        )}
                </CustomStackFullWidth>
                {data?.packages?.length > 0 && selectedPlan === 'subscription' && (
                    <Stack
                        width="100%"
                        maxWidth="850px"
                        justifyContent="center"
                        mt="40px"
                        spacing={5}
                    >
                        <Typography
                            textAlign="center"
                            fontWeight="bold"
                            fontSize="18px"
                            color={theme.palette.neutral[1000]}
                        >
                            {t('Choose Subscription Package')}
                        </Typography>
                        <Box
                            onMouseEnter={() => setIsHover(true)}
                            onMouseLeave={() => setIsHover(false)}
                            sx={{
                                '.slick-slide': {
                                    '&:nth-of-type(3n+1) .plan-item': {
                                        background: '#E2F4EB',
                                    },
                                    '&:nth-of-type(3n+2) .plan-item': {
                                        background: '#E3F5FF',
                                    },
                                    '&:nth-of-type(3n+3) .plan-item': {
                                        background: '#FFE2D3',
                                    },
                                    '&:nth-of-type(3n+4) .plan-item': {
                                        background: '#E4EDFF',
                                    },
                                },
                            }}
                        >
                            <SliderCustom padding="15px" gap="25px">
                                <Slider {...settings}>
                                    {data?.packages?.map((item) => (
                                        <Plan
                                            key={item.id}
                                            item={item}
                                            setSelectedPackage={
                                                setSelectedPackage
                                            }
                                            selectedPackage={selectedPackage}
                                        />
                                    ))}
                                </Slider>
                            </SliderCustom>
                        </Box>
                    </Stack>
                )}

                <CustomStackFullWidth
                    justifyContent="flex-end"
                    direction="row"
                    spacing={2}
                    mt="2rem"
                >
                    <CustomButton
                        onClick={() => dispatch(setActiveStep(0))}
                        sx={{
                            bgcolor: (theme) =>
                                alpha(theme.palette.neutral[200], 0.5),
                            color: (theme) =>
                                `${theme.palette.primary.dark} !important`,
                            px: '30px',

                            borderRadius: '5px',
                            mr: 2,
                        }}
                    >
                        {t('Back')}
                    </CustomButton>

                    <LoadingButton
                        type="submit"
                        onClick={handleSubmit}
                        disabled={
                            selectedPackage === null &&
                            selectedPlan === 'subscription'
                        }
                        variant="contained"
                        loading={isLoading}
                        sx={{
                            background: (theme) => theme.palette.primary.main,
                            minWidth: '100px',
                            color: (theme) =>
                                `${theme.palette.neutral[100]}!important`,
                            px: '30px',
                            borderRadius: '5px',
                            fontWeight: '500',
                            fontSize: '14px',
                            cursor: 'pointer',
                        }}
                    >
                        {t('Next')}
                    </LoadingButton>
                    {/* <ResetButton
                        onClick={() => dispatch(setActiveStep(0))}
                        variant="outlined"
                    >
                        {t('Back')}
                    </ResetButton>
                    <SaveButton
                        sx={{ minWidth: '110px' }}
                        onClick={handleSubmit}
                        // Fixing the syntax for applying marginTop on xs breakpoint
                        variant="contained"
                        loading={isLoading}
                        // disabled={!disable}
                    >
                        {t('Next')}
                    </SaveButton> */}
                </CustomStackFullWidth>
            </Stack>
        </CustomStackFullWidth>
    )
}

export default BusinessPlan
