import { Box } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { CustomTabs } from '@/styled-components/CustomStyles.style'
import { RTL } from '../../RTL/RTL'
import { RestaurantDetailsNavButton } from '../../food-card/FoodCard.style'

const FoodNavigation = ({
    catetoryMenus,
    setCategoryId,
    category_id,
    id,
    usein,
}) => {
    const { t } = useTranslation()
    const handleCategoryId = (catId) => {
        setCategoryId(catId)
    }

    let languageDirection = undefined
    if (typeof window !== 'undefined') {
        languageDirection = localStorage.getItem('direction')
    }
    return (
        <>
            <RTL direction={languageDirection}>
                <CustomTabs
                    orientation="horizontal"
                    // variant="contained"
                    variant="scrollable"
                    scrollButtons="auto"
                    aria-label="scrollable auto tabs example"
                >
                    <Box>
                        <RestaurantDetailsNavButton
                            sx={{
                                color: (theme) =>
                                    category_id === 0 || category_id === id
                                        ? `${theme.palette.whiteContainer.main} !important`
                                        : 'whiteContainer',
                                backgroundColor: (theme) =>
                                    category_id ===
                                    (usein === 'restaurant' ? 0 : id)
                                        ? theme.palette.primary.main
                                        : 'inherit',
                                '&:hover': {
                                    backgroundColor: (theme) =>
                                        category_id ===
                                        (usein === 'restaurant' ? 0 : id)
                                            ? theme.palette.primary.main
                                            : 'inherit',
                                },
                            }}
                            onClick={() => handleCategoryId(id)}
                        >
                            {t('All')}
                        </RestaurantDetailsNavButton>

                        {catetoryMenus?.length > 0 &&
                            catetoryMenus?.map((menu) => {
                                return (
                                    <RestaurantDetailsNavButton
                                        sx={{
                                            fontSize: '.9rem',

                                            fontWeight:
                                                category_id === menu.id
                                                    ? '600'
                                                    : '400',
                                            color: (theme) =>
                                                category_id === menu.id
                                                    ? `${theme.palette.whiteContainer.main} !important`
                                                    : `${theme.palette.neutral[1000]} !important`,
                                            backgroundColor: (theme) =>
                                                category_id === menu.id
                                                    ? theme.palette.primary.main
                                                    : 'inherit',
                                            '&:hover': {
                                                backgroundColor: (theme) =>
                                                    category_id === menu.id
                                                        ? theme.palette.primary
                                                              .main
                                                        : 'inherit',
                                            },
                                        }}
                                        key={menu.id}
                                        onClick={() =>
                                            handleCategoryId(menu.id)
                                        }
                                    >
                                        {menu.name}
                                    </RestaurantDetailsNavButton>
                                )
                            })}
                    </Box>
                </CustomTabs>
            </RTL>
        </>
    )
}

export default FoodNavigation
