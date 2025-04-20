import styled from '@emotion/styled'
import { Typography, Box, Stack, alpha } from '@mui/material'
import Image from 'next/image'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick-theme.css'
import 'slick-carousel/slick/slick.css'
import img from '../../../../public/static/profile/walletbonus.png'
import { t } from 'i18next'
import { getAmount } from '@/utils/customFunctions'
import { CustomDateFormat } from '@/utils/CustomDateAndTimeFormat'
import { useTheme } from '@mui/styles'

const WalletFundBonus = ({ walleBonus, isLoading }) => {
    const theme = useTheme()

    const settings = {
        dots: false,
        slidesToShow: 1,
        slidesToScroll: 2,
        responsive: [
            {
                breakpoint: 2000,
                settings: {
                    slidesToShow: 1.4,
                    slidesToScroll: 1,
                    infinite: false,
                },
            },
            {
                breakpoint: 1600,
                settings: {
                    slidesToShow: 1.4,
                    slidesToScroll: 1,
                    infinite: false,
                },
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,

                    initialSlide: 1,
                },
            },
        ],
    }

    const valid_till = t('Valid till')
    const you_have_to_add_min = t('You have to add min')
    const fund_to_get_max_of = t('fund to get max of')

    return !isLoading ? (
        <Stack height="100%" justifyContent="center">
            <Slider {...settings}>
                {walleBonus?.map((item, i) => (
                    <Box key={i} pr={1.4}>
                        <CustomWalletStack>
                            <Box>
                                <Typography
                                    fontSize={{ xs: '14px', md: '16px' }}
                                    fontWeight="600"
                                    color={theme.palette.primary.main}
                                >
                                    {item?.title}
                                </Typography>
                                <Typography
                                    variant="body2"
                                    color={theme.palette.neutral[1000]}
                                >
                                    {valid_till}{' '}
                                    {CustomDateFormat(item?.end_date)}
                                </Typography>
                                <Typography fontSize="12px" paddingTop="11px">
                                    {you_have_to_add_min}{' '}
                                    {getAmount(item?.minimum_add_amount)}{' '}
                                    {fund_to_get_max_of}{' '}
                                    {getAmount(item?.maximum_bonus_amount)}
                                </Typography>
                            </Box>
                            <Image src={img.src} width="100" height="100" />
                        </CustomWalletStack>
                    </Box>
                ))}
            </Slider>
        </Stack>
    ) : (
        ''
    )
}
const CustomWalletStack = styled(Stack)(({ theme }) => ({
    border: `1px solid ${alpha(theme.palette.primary.main, 0.4)}`,
    flexDirection: 'row',
    alignItems: 'center',
    padding: '25px 0 25px 15px',
    borderRadius: '10px',
    [theme.breakpoints.down('md')]: {
        padding: '15px 0 15px 15px',
    },
    '.MuiBox-root': {
        width: '0',
        flexGrow: '1',
    },
    '.MuiTypography-h6': {
        fontSize: '16px',
        fontWeight: '500',
        color: theme.palette.primary.main,
    },
    '.MuiTypography-body2': {
        display: 'block',
        marginBlock: '10px',
    },
    '.MuiTypography-body1': {
        fontSize: '14px',
        lineHeight: '1.3',
        display: 'block',
    },
}))

export default WalletFundBonus
