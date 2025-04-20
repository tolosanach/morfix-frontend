import React from 'react'
import { Grid, IconButton, Stack, Tooltip, Typography } from '@mui/material'
import CustomImageContainer from '../CustomImageContainer'
import {
    OrderFoodAmount,
    OrderFoodName,
    OrderFoodSubtitle,
} from '../checkout-page/CheckOut.style'
import VisibleVariations from './VisibleVariations'
import {
    calculateItemBasePrice,
    getAmount,
    getConvertDiscount,
    getSelectedAddOn,
    getTotalVariationsPrice,
    handleTotalAmountWithAddonsFF,
} from '@/utils/customFunctions'
import DeleteIcon from '@mui/icons-material/Delete'
import RemoveIcon from '@mui/icons-material/Remove'
import CircularLoader from '../loader/CircularLoader'
import AddIcon from '@mui/icons-material/Add'
import { getSelectedAddons } from '../navbar/second-navbar/SecondNavbar'
import {
    decrementProductQty,
    incrementProductQty,
    removeProduct,
} from '@/redux/slices/cart'
import { getItemDataForAddToCart } from './helperFunction'
import toast from 'react-hot-toast'
import { onErrorResponse } from '../ErrorResponse'
import useDeleteCartItem from '../../hooks/react-query/add-cart/useDeleteCartItem'
import useCartItemUpdate from '../../hooks/react-query/add-cart/useCartItemUpdate'
import { useDispatch, useSelector } from 'react-redux'
import { getGuestId } from '../checkout-page/functions/getGuestUserId'
import HalalSvg from '@/components/food-card/HalalSvg'
import { CustomToaster } from '@/components/custom-toaster/CustomToaster'

const CartContent = ({ item, handleProductUpdateModal, productBaseUrl, t }) => {
    const dispatch = useDispatch()
    const guestId = getGuestId()
    const { global } = useSelector((state) => state.globalSettings)
    const { mutate: itemRemove, isLoading: removeIsLoading } =
        useDeleteCartItem()
    const { mutate: updateMutate, isLoading: updatedLoading } =
        useCartItemUpdate()
    let currencySymbol
    let currencySymbolDirection
    let digitAfterDecimalPoint

    if (global) {
        currencySymbol = global.currency_symbol
        currencySymbolDirection = global.currency_symbol_direction
        digitAfterDecimalPoint = global.digit_after_decimal_point
    }

    const cartUpdateHandleSuccess = (res, cartItem) => {
        if (res) {
            res?.forEach((item) => {
                if (cartItem?.cartItemId === item?.id) {
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
    const handleIncrement = (item) => {
        const updateQuantity = item?.quantity + 1
        const totalPrice =
            item?.price + getTotalVariationsPrice(item?.variations)
        const getPriceAfterDiscount = getConvertDiscount(
            item?.discount,
            item?.discount_type,
            totalPrice,
            item?.restaurant_discount
        )
        const productPrice = getPriceAfterDiscount * updateQuantity
        const itemObject = getItemDataForAddToCart(
            item,
            updateQuantity,
            productPrice,
            guestId
        )
        if (item?.maximum_cart_quantity) {
            if (item?.maximum_cart_quantity <= item?.quantity) {
                toast.error(t('Out Of Limits'))
            } else {
                // dispatch(incrementProductQty(product))
                updateMutate(itemObject, {
                    onSuccess: (res) => cartUpdateHandleSuccess(res, item),
                    onError: onErrorResponse,
                })
            }
        } else {
            updateMutate(itemObject, {
                onSuccess: (res) => cartUpdateHandleSuccess(res, item),
                onError: onErrorResponse,
            })
            //dispatch(incrementProductQty(item))
        }
    }
    const cartUpdateHandleSuccessDecrement = (res, cartItem) => {
        if (res) {
            res?.forEach((item) => {
                if (cartItem?.cartItemId === item?.id) {
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
    const handleDecrement = (item) => {
        const updateQuantity = item?.quantity - 1
        const totalPrice =
            item?.price + getTotalVariationsPrice(item?.variations)
        const getPriceAfterDiscount = getConvertDiscount(
            item?.discount,
            item?.discount_type,
            totalPrice,
            item?.restaurant_discount
        )
        const productPrice = getPriceAfterDiscount * updateQuantity
        const itemObject = getItemDataForAddToCart(
            item,
            updateQuantity,
            productPrice,
            guestId
        )
        updateMutate(itemObject, {
            onSuccess: (res) => cartUpdateHandleSuccessDecrement(res, item),
            onError: (error) => {
                error?.response?.data?.errors?.forEach((items) => {
                    CustomToaster('error', items?.message)
                    if (items?.code === 'stock_out') {
                        handleProductUpdateModal(item)
                    }
                })
            },
        })
    }
    const handleSuccess = (item) => {
        dispatch(removeProduct(item))
        //toast.success(t(cart_item_remove));
    }
    const handleRemove = (item) => {
        const cartIdAndGuestId = {
            cart_id: item?.cartItemId,
            guestId: getGuestId(),
        }
        itemRemove(cartIdAndGuestId, {
            onSuccess: () => handleSuccess(item),
            onError: onErrorResponse,
        })
    }
    return (
        <Grid
            item
            md={12}
            xs={12}
            sm={12}
            container
            sx={{ alignItems: 'center' }}
        >
            <Grid
                item
                md={3}
                xs={3}
                sm={3}
                onClick={() => handleProductUpdateModal(item)}
                sx={{ cursor: 'pointer', paddingInlineEnd: '1rem' }}
            >
                <CustomImageContainer
                    height="90px"
                    width="90px"
                    src={item.image_full_url}
                    smHeight="70px"
                    smWidth="70px"
                    objectFit="cover"
                    borderRadius="1rem"
                />
                {/*<img*/}
                {/*    height="90px"*/}
                {/*    width="90px"*/}
                {/*    src={ImageSource(*/}
                {/*        productBaseUrl,*/}
                {/*        item.image*/}
                {/*    )}*/}
                {/*    loading="lazy"*/}
                {/*/>*/}
            </Grid>
            <Grid item md={9} xs={9} sx={{ paddingInlineStart: '.7rem' }}>
                <Grid container md={12} sm={12} xs={12} spacing={{ xs: 1 }}>
                    <Grid item md={12} sm={12} xs={12}>
                        <Stack
                            direction="row"
                            spacing={0.5}
                            alignItems="center"
                        >
                            <OrderFoodName
                                sx={{
                                    cursor: 'pointer',
                                }}
                                onClick={() => handleProductUpdateModal(item)}
                            >
                                {item.name}
                            </OrderFoodName>
                            {item?.halal_tag_status === 1 &&
                                item?.is_halal === 1 && (
                                    <Tooltip
                                        arrow
                                        title={t('This is a halal food')}
                                    >
                                        <IconButton sx={{ padding: '0px' }}>
                                            <HalalSvg />
                                        </IconButton>
                                    </Tooltip>
                                )}
                        </Stack>
                        {item?.variations?.length > 0 && (
                            <VisibleVariations
                                variations={item?.variations}
                                t={t}
                            />
                        )}
                        {item?.selectedAddons?.length > 0 && (
                            <Stack
                                direction="row"
                                alignItems="center"
                                spacing={0.5}
                            >
                                <OrderFoodSubtitle>
                                    {t('Addon')}
                                </OrderFoodSubtitle>
                                <OrderFoodSubtitle>:</OrderFoodSubtitle>
                                <OrderFoodSubtitle>
                                    {getSelectedAddOn(item?.selectedAddons)}
                                </OrderFoodSubtitle>
                            </Stack>
                        )}
                    </Grid>
                    <Grid item md={6} xs={6} sm={6}>
                        <OrderFoodAmount>
                            {getAmount(
                                handleTotalAmountWithAddonsFF(
                                    item.totalPrice,
                                    item?.selectedAddons
                                ),
                                currencySymbolDirection,
                                currencySymbol,
                                digitAfterDecimalPoint
                            )}
                        </OrderFoodAmount>
                    </Grid>
                    <Grid md={6} xs={6} sm={6} pt="6px">
                        <Stack direction="row" alignItems="center" spacing={2}>
                            {item?.quantity === 1 ? (
                                <IconButton
                                    aria-label="delete"
                                    size="small"
                                    color="error"
                                    disabled={removeIsLoading}
                                >
                                    <DeleteIcon
                                        onClick={() => handleRemove(item)}
                                        fontSize="inherit"
                                    />
                                </IconButton>
                            ) : (
                                <IconButton
                                    disabled={updatedLoading}
                                    aria-label="delete"
                                    size="small"
                                    sx={{
                                        width: '24px',
                                        height: '24px',
                                        background: (theme) =>
                                            theme.palette.neutral[200],
                                        borderRadius: '11px',
                                    }}
                                >
                                    <RemoveIcon
                                        size="small"
                                        sx={{
                                            color: (theme) =>
                                                theme.palette.neutral[1000],
                                            padding: '3px',
                                        }}
                                        onClick={() => handleDecrement(item)}
                                        //onClick={decrementPrice}
                                    />
                                </IconButton>
                            )}

                            {updatedLoading ? (
                                <CircularLoader size="14px" />
                            ) : (
                                <Typography width="14px">
                                    {item?.quantity}
                                </Typography>
                            )}
                            <IconButton
                                disabled={updatedLoading}
                                aria-label="delete"
                                size="small"
                                sx={{
                                    width: '24px',
                                    height: '24px',
                                    background: (theme) =>
                                        theme.palette.neutral[200],
                                    borderRadius: '11px',
                                }}
                            >
                                <AddIcon
                                    sx={{
                                        color: (theme) =>
                                            theme.palette.neutral[1000],
                                        padding: '3px',
                                    }}
                                    size="small"
                                    onClick={() => handleIncrement(item)}
                                />
                            </IconButton>
                        </Stack>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )
}

export default CartContent
