import React, { useEffect } from 'react'
import RestaurantDetails from '../../../components/restaurant-details/RestaurantDetails'
import Meta from '../../../components/Meta'
import MainApi from '../../../api/MainApi'
import { useDispatch } from 'react-redux'
import { useRouter } from 'next/router'
import { setGlobalSettings } from '@/redux/slices/global'

const index = ({ restaurantData, configData }) => {
    const router = useRouter()
    const dispatch = useDispatch()

    const { restaurant_zone_id } = router.query
    let zoneId = undefined
    if (typeof window !== 'undefined') {
        zoneId = localStorage.getItem('zoneid')
    }
    useEffect(() => {
        dispatch(setGlobalSettings(configData))
    }, [])

    useEffect(() => {
        if (configData) {
            if (configData.maintenance_mode) {
                router.push('/maintenance')
            }
        }
    }, [configData, router])

    useEffect(() => {
        if (!zoneId) {
            localStorage.setItem(
                'zoneid',
                JSON.stringify([Number(restaurant_zone_id)])
            )
        }
    }, [restaurant_zone_id])

    return (
        <>
            <Meta
                title={`${
                    restaurantData?.meta_title ?? restaurantData.name
                } - ${configData?.business_name}`}
                ogImage={`${configData?.base_urls?.restaurant_image_url}/${restaurantData?.meta_image}`}
                description={restaurantData?.meta_description}
            />
            <RestaurantDetails restaurantData={restaurantData} />
        </>
    )
}

export default index
export const getServerSideProps = async (context) => {
    const id = context.query.id
    const { req } = context
    const language = req.cookies.languageSetting
    const data = await MainApi.get(`/api/v1/restaurants/details/${id}`)
    const configRes = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/config`,
        {
            method: 'GET',
            headers: {
                'X-software-id': 33571750,
                'X-server': 'server',
                'X-localization': language,
                origin: process.env.NEXT_CLIENT_HOST_URL,
            },
        }
    )
    const config = await configRes.json()
    return {
        props: {
            restaurantData: data.data,
            configData: config,
        },
    }
}
