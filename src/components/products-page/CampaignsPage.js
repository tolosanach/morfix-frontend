import { Grid } from '@mui/material'
import { useQuery } from 'react-query'
import { CampaignApi } from '@/hooks/react-query/config/campaignApi'
import CustomShimmerForBestFood from '../CustomShimmer/CustomShimmerForBestFood'
import ProductList from './ProductList'

import CustomEmptyResult from '../empty-view/CustomEmptyResult'

const CampaignsPage = () => {
    const { data } = useQuery(['campaign'], CampaignApi.campaign)

    return (
        <Grid container>
            <Grid item xs={12} sm={12} md={12} container spacing={1}>
                {data?.data?.length === 0 && <CustomEmptyResult />}
                {data?.data ? (
                    <>
                        <ProductList
                            product_list={{ products: data.data }}
                            productType="campaigns"
                        />
                    </>
                ) : (
                    <CustomShimmerForBestFood />
                )}
            </Grid>
        </Grid>
    )
}
export default CampaignsPage
