import { Box, CssBaseline, Grid, Stack } from '@mui/material'
import { CustomPaperBigCard } from '@/styled-components/CustomStyles.style'
import CustomPageTitle from '../CustomPageTitle'
import CuisinesCard from '../home/cuisines/CuisinesCard'
import useMediaQuery from '@mui/material/useMediaQuery'
import CustomShimmerCategories from '../CustomShimmer/CustomShimmerCategories'
import CustomContainer from '../container'
import { useSelector } from 'react-redux'

const AllCuisines = () => {
    const matches = useMediaQuery('(max-width:1180px)')
    const { cuisines } = useSelector((state) => state.storedData)

    return (
        <>
            <CssBaseline />
            <CustomContainer>
                <CustomPaperBigCard
                    sx={{
                        marginTop: { xs: '4rem', sm: '4rem', md: '8rem' },
                        marginBottom: { xs: '.5rem', md: '1rem' },
                    }}
                >
                    <Box>
                        <Grid
                            container
                            spacing={{ xs: 1, md: 2, lg: 2 }}
                            mb="30px"
                        >
                            <Grid item xs={12} sm={12} md={12} justify="center">
                                <CustomPageTitle title="Cuisines" />
                            </Grid>
                            {cuisines?.map((item, index) => (
                                <Grid
                                    item
                                    md={matches ? 2 : 1.7}
                                    sm={3}
                                    xs={3}
                                    mt=".5rem"
                                >
                                    <CuisinesCard item={item} key={index} />
                                </Grid>
                            ))}
                            {!cuisines && (
                                <Stack
                                    justifyContent="center"
                                    alignItems="flex-start"
                                    paddingX="20px"
                                >
                                    <CustomShimmerCategories
                                        noSearchShimmer="true"
                                        itemCount="14"
                                        smItemCount="5"
                                    />
                                </Stack>
                            )}
                        </Grid>
                    </Box>
                </CustomPaperBigCard>
            </CustomContainer>
        </>
    )
}

export default AllCuisines
