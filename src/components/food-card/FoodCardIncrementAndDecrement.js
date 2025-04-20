import { CustomToaster } from '@/components/custom-toaster/CustomToaster'
import {
    decrementProductQty,
    incrementProductQty,
    removeProduct,
} from '@/redux/slices/cart'
import {
    calculateItemBasePrice,
    getConvertDiscount,
    handleIncrementedTotal,
} from '@/utils/customFunctions'
import { useTheme } from '@emotion/react'
import AddIcon from '@mui/icons-material/Add'
import DeleteIcon from '@mui/icons-material/Delete'
import RemoveIcon from '@mui/icons-material/Remove'
import { IconButton, Typography, alpha, Stack } from '@mui/material'
import { t } from 'i18next'
import toast from 'react-hot-toast'
import { useDispatch } from 'react-redux'
import useCartItemUpdate from '../../hooks/react-query/add-cart/useCartItemUpdate'
import useDeleteCartItem from '../../hooks/react-query/add-cart/useDeleteCartItem'
import { onErrorResponse } from '../ErrorResponse'
import { getGuestId } from '../checkout-page/functions/getGuestUserId'
import { getItemDataForAddToCart } from '../floating-cart/helperFunction'
import CircularLoader from '../loader/CircularLoader'
import { getSelectedAddons } from '../navbar/second-navbar/SecondNavbar'

const FoodCardIncrementAndDecrement = ({
    getQuantity,
    product,
    setIncrOpen,
    isInCart,
    horizontal,
}) => {
    const theme = useTheme()
    const dispatch = useDispatch()
    const { mutate: updateMutate, isLoading: updatedLoading } =
        useCartItemUpdate()
    const { mutate: itemRemove, isLoading: removeIsLoading } =
        useDeleteCartItem()
    const guestId = getGuestId()
    const handleHover = () => {}

    const cartUpdateHandleSuccess = (res) => {
        if (res) {
            res?.forEach((item) => {
                if (isInCart?.cartItemId === item?.id) {
                    const product = {
                        ...item?.item,
                        cartItemId: item?.id,
                        totalPrice: item?.price,
                        quantity: item?.quantity,
                        variations: item?.item?.variations,
                        selectedAddons: getSelectedAddons(item?.item?.addons),
                        itemBasePrice: getConvertDiscount(
                            item?.item?.discount,
                            item?.item?.discount_type,
                            calculateItemBasePrice(
                                item,
                                item?.item?.variations
                            ),
                            item?.item?.restaurant_discount
                        ),
                    }

                    dispatch(incrementProductQty(product)) // Dispatch the single product
                }
            })
        }
    }

    const handleIncrement = (e) => {
        e.stopPropagation()
        if (getQuantity(product?.id) >= product?.item_stock) {
            CustomToaster('error', t('Out Of Stock'))
        } else {
            const updateQuantity = isInCart?.quantity + 1
            const totalPrice = handleIncrementedTotal(
                isInCart?.itemBasePrice,
                updateQuantity,
                isInCart?.discount,
                isInCart?.discount_type
            )
            const itemObject = getItemDataForAddToCart(
                isInCart,
                updateQuantity,
                totalPrice,
                guestId
            )
            if (product?.maximum_cart_quantity) {
                if (
                    product?.maximum_cart_quantity &&
                    product?.maximum_cart_quantity <= getQuantity(product?.id)
                ) {
                    toast.error(t('Out Of Limits'))
                } else {
                    updateMutate(itemObject, {
                        onSuccess: cartUpdateHandleSuccess,
                        onError: onErrorResponse,
                    })
                }
            } else {
                updateMutate(itemObject, {
                    onSuccess: cartUpdateHandleSuccess,
                    onError: onErrorResponse,
                })
            }
        }
    }
    const cartUpdateHandleSuccessDecrement = (res) => {
        if (res) {
            res?.forEach((item) => {
                if (isInCart?.cartItemId === item?.id) {
                    const product = {
                        ...item?.item,
                        cartItemId: item?.id,
                        totalPrice: item?.price,
                        quantity: item?.quantity,
                        variations: item?.item?.variations,
                        selectedAddons: getSelectedAddons(item?.item?.addons),
                        itemBasePrice: getConvertDiscount(
                            item?.item?.discount,
                            item?.item?.discount_type,
                            calculateItemBasePrice(
                                item,
                                item?.item?.variations
                            ),
                            item?.item?.restaurant_discount
                        ),
                    }

                    dispatch(decrementProductQty(product)) // Dispatch the single product
                }
            })
        }
    }
    const handleDecrement = (e) => {
        e.stopPropagation()
        const updateQuantity = isInCart?.quantity - 1
        const totalPrice = handleIncrementedTotal(
            isInCart?.itemBasePrice,
            updateQuantity,
            isInCart?.discount,
            isInCart?.discount_type
        )
        const itemObject = getItemDataForAddToCart(
            isInCart,
            updateQuantity,
            totalPrice,
            guestId
        )
        updateMutate(itemObject, {
            onSuccess: cartUpdateHandleSuccessDecrement,
            onError: onErrorResponse,
        })
    }
    const handleSuccess = () => {
        dispatch(removeProduct(isInCart))
    }
    const handleRemove = () => {
        const cartIdAndGuestId = {
            cart_id: isInCart?.cartItemId,
            guestId: getGuestId(),
        }
        itemRemove(cartIdAndGuestId, {
            onSuccess: handleSuccess,
            onError: onErrorResponse,
        })
    }
    return (
        <Stack
            sx={{
                padding: '2px',
                borderRadius: '15px',
                border: '1px solid',
                borderColor: (theme) => alpha(theme.palette.primary.main, 0.5),
                background: (theme) => theme.palette.neutral[200],
                position: 'absolute',
                right: horizontal === 'true' ? '0px' : '10px',
                left: 'unset',
                bottom: horizontal === 'true' ? '0px' : '8px',
                width: { xs: '60%', md: '40%' },
                transformOrigin: 'right',
                '@keyframes scaleXCustom': {
                    '0%': {
                        transform: 'scaleX(0)',
                        transformOrigin: 'right',
                    },
                    '100%': {
                        transform: 'scaleX(1)',
                    },
                },
                animation: 'scaleXCustom .3s',
                WebkitAnimation: 'scaleXCustom .3s',
                MozAnimation: 'scaleXCustom .3s',
            }}
            onClick={(e) => e.stopPropagation()}
            onMouseEnter={() => setIncrOpen(true)}
        >
            <Stack
                width="100%"
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                gap="8px"
                onMouseEnter={handleHover}
            >
                {getQuantity(product?.id) === 1 ? (
                    <IconButton
                        disabled={removeIsLoading}
                        aria-label="delete"
                        size="small"
                        color="error"
                        sx={{
                            padding: '5px',
                        }}
                        onClick={(e) => handleRemove(e)}
                    >
                        <DeleteIcon
                            fontSize="inherit"
                            sx={{ width: '15px', height: '15px' }}
                        />
                    </IconButton>
                ) : (
                    <>
                        <IconButton
                            disabled={updatedLoading}
                            size="small"
                            color="primary"
                            sx={{
                                background: (theme) =>
                                    alpha(theme.palette.primary.main, 0.5),
                                borderRadius: '50%',
                                padding: '5px',
                                '&:hover': {
                                    background: (theme) =>
                                        theme.palette.primary.dark,
                                },
                            }}
                            onClick={(e) => handleDecrement(e)}
                        >
                            <RemoveIcon
                                size="small"
                                sx={{
                                    color: (theme) =>
                                        theme.palette.neutral[100],
                                    width: '15px',
                                    height: '15px',
                                }}
                            />
                        </IconButton>
                    </>
                )}

                {updatedLoading ? (
                    <CircularLoader size="14px" />
                ) : (
                    <Typography
                        variant="h5"
                        fontWeight="500"
                        color={theme.palette.neutral[1000]}
                    >
                        {getQuantity(product?.id)}
                    </Typography>
                )}

                <IconButton
                    disabled={updatedLoading}
                    color="primary"
                    aria-label="add"
                    onClick={(e) => handleIncrement(e)}
                    size="small"
                    sx={{
                        background: (theme) => theme.palette.primary.main,
                        borderRadius: '50%',
                        padding: '5px',
                        '&:hover': {
                            background: (theme) => theme.palette.primary.dark,
                        },
                    }}
                >
                    <AddIcon
                        size="small"
                        sx={{
                            color: (theme) => theme.palette.neutral[100],
                            width: '15px',
                            height: '15px',
                        }}
                    />
                </IconButton>
            </Stack>
        </Stack>
    )
}

export default FoodCardIncrementAndDecrement
