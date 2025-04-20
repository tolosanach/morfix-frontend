import React from 'react'
import { alpha, Stack, Typography } from '@mui/material'
import { getAmount, getConvertDiscount } from '@/utils/customFunctions'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { useTheme } from '@mui/material/styles'

const StartPriceView = (props) => {
    const theme = useTheme()
    const { data, hideStartFromText, selectedOptions } = props
    const { t } = useTranslation()
    const { global } = useSelector((state) => state.globalSettings)
    let currencySymbol
    let currencySymbolDirection
    let digitAfterDecimalPoint

    if (global) {
        currencySymbol = global.currency_symbol
        currencySymbolDirection = global.currency_symbol_direction
        digitAfterDecimalPoint = global.digit_after_decimal_point
    }

    const handleConvertedPrice = () => {
        if (data?.restaurant_discount === 0) {
            return getAmount(
                getConvertDiscount(
                    data.discount,
                    data.discount_type,
                    data.price,
                    data.restaurant_discount
                ),
                currencySymbolDirection,
                currencySymbol,
                digitAfterDecimalPoint
            )
        } else {
            let price =
                data?.price - (data?.price * data?.restaurant_discount) / 100
            return getAmount(
                price,
                currencySymbolDirection,
                currencySymbol,
                digitAfterDecimalPoint
            )
        }
    }

    return (
        <Stack
            direction="row"
            gap={hideStartFromText === 'false' ? 1 : 0.5}
            alignItems="center"
            flexWrap="wrap"
        >
            {hideStartFromText === 'false' && (
                <Typography component="p">{t('Starts From:')}</Typography>
            )}
            <Typography
                display="flex"
                fontWeight="700"
                alignItems="center"
                color={theme.palette.primary.main}
                sx={{
                    fontSize: { xs: '13px', sm: '16px' },
                }}
                component="p"
            >
                {data?.price > 0 && handleConvertedPrice()}
                {data?.price === handleConvertedPrice() ? (
                    getAmount(
                        data?.price,
                        currencySymbolDirection,
                        currencySymbol,
                        digitAfterDecimalPoint
                    )
                ) : (
                    <Typography
                        component="span"
                        marginLeft="5px"
                        fontWeight="500"
                        color={theme.palette.neutral[400]}
                        sx={{ fontSize: { xs: '13px', sm: '13px' } }}
                    >
                        {(data?.discount > 0 ||
                            data?.restaurant_discount !== 0) && (
                            <del>
                                {' '}
                                {getAmount(
                                    data.price,
                                    currencySymbolDirection,
                                    currencySymbol,
                                    digitAfterDecimalPoint
                                )}
                            </del>
                        )}
                    </Typography>
                )}
            </Typography>
            {data?.item_stock === 0 &&
                selectedOptions?.length === 0 &&
                data?.stock_type !== 'unlimited' && (
                    <Stack
                        backgroundColor={alpha(theme.palette.error.light, 0.2)}
                        padding="3px 6px"
                        borderRadius="10px"
                        alignItems="center"
                        justifyContent="center"
                    >
                        <Typography
                            color={theme.palette.error.main}
                            fontSize="12px"
                        >
                            {t('Out Of Stock')}
                        </Typography>
                    </Stack>
                )}
        </Stack>
    )
}

StartPriceView.propTypes = {}

export default StartPriceView
