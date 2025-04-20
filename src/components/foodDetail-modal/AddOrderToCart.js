import React from 'react'
import { Button } from '@mui/material'
import { CustomTypography } from '../custom-tables/Tables.style'
import CircularLoader from '../loader/CircularLoader'

const AddOrderToCart = (props) => {
    const {
        product,
        t,
        addToCard,
        orderNow,
        addToCartLoading,
        getFullFillRequirements,
    } = props
    return (
        <>
            {!product?.available_date_starts ? (
                <Button
                    onClick={() => addToCard?.()}
                    variant="contained"
                    fullWidth
                    sx={{
                        borderRadius: '4px',
                    }}
                >
                    {addToCartLoading ? (
                        <CircularLoader size="1.4rem" />
                    ) : (
                        <CustomTypography
                            sx={{
                                color: (theme) =>
                                    theme.palette.whiteContainer.main,
                            }}
                        >
                            {t('Add to cart')}
                        </CustomTypography>
                    )}
                </Button>
            ) : (
                <Button
                    disabled={!getFullFillRequirements()}
                    onClick={() => orderNow?.()}
                    variant="contained"
                    fullWidth
                >
                    {addToCartLoading ? (
                        <CircularLoader size="1.4rem" />
                    ) : (
                        <CustomTypography
                            sx={{
                                color: (theme) =>
                                    theme.palette.whiteContainer.main,
                            }}
                        >
                            {t('Order Now')}
                        </CustomTypography>
                    )}
                </Button>
            )}
        </>
    )
}
export default AddOrderToCart
