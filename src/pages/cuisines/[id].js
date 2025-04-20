import React, { useEffect, useState } from 'react'
import { Stack } from '@mui/material'
import { CustomStackFullWidth } from '@/styled-components/CustomStyles.style'
import CuisinesDetailsPage from '../../components/cuisines-page/CuisinesDetailsPage'
import { useRouter } from 'next/router'
import { useGetCuisinesDetails } from '@/hooks/react-query/cuisines/useGetCuisinesDetails'
import { landingPageApi } from '@/components/landingpage/Api'
import Meta from '../../components/Meta'
import CustomContainer from '../../components/container'
import HomeGuard from '../../components/home-guard/HomeGuard'

const Index = ({ configData, landingPageData, pathName }) => {
    const [offset, setOffset] = useState(1)
    const [page_limit, setPageLimit] = useState(10)
    const router = useRouter()
    const { id, name } = router.query
    const { data, refetch, isLoading } = useGetCuisinesDetails({
        id,
        page_limit,
        offset,
    })

    useEffect(() => {
        refetch()
    }, [id])

    return (
        <>
            <Meta
                title={`${name} on ${configData?.business_name}`}
                ogImage={`${configData?.base_urls?.react_landing_page_images}/${landingPageData?.banner_section_full?.banner_section_img_full}`}
                pathName={pathName}
            />
            <HomeGuard>
                <CustomContainer>
                    <CustomStackFullWidth>
                        <Stack
                            sx={{
                                marginTop: {
                                    xs: '1.5rem',
                                    sm: '2rem',
                                    md: '5rem',
                                },
                                marginBottom: '1rem',
                            }}
                        >
                            <CuisinesDetailsPage
                                data={data}
                                isLoading={isLoading}
                            />
                        </Stack>
                    </CustomStackFullWidth>
                </CustomContainer>
            </HomeGuard>
        </>
    )
}

export default Index

export const getServerSideProps = async (context) => {
    const { req, resolvedUrl } = context
    const language = req.cookies.languageSetting
    const domain = req.headers.host
    const pathName = 'https://' + domain + resolvedUrl
    const configRes = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/config`,
        {
            headers: {
                'X-software-id': 33571750,
                'X-server': 'server',
                'X-localization': language,
                origin: process.env.NEXT_CLIENT_HOST_URL,
            },
            method: 'GET',
        }
    )
    const config = await configRes.json()
    const landingPageData = await landingPageApi.getLandingPageImages()
    return {
        props: {
            configData: config,
            landingPageData: landingPageData.data,
            pathName: pathName,
        },
    }
}
