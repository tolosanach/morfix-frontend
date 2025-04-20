import React from 'react'
import { Stack, styled, Typography, Box } from '@mui/material'
import { CustomStackFullWidth } from '@/styled-components/CustomStyles.style'
import { Scrollbar } from '../../Scrollbar'
import moment from 'moment/moment'
import { weekDays } from '../../checkout-page/order-type/data'

const CustomBox = styled(Box)(({ theme }) => ({
    padding: '10px 15px',
    border: '1px dashed',
    borderColor: 'gray',
    minWidth: '100px',
    textAlign: 'center',
    borderRadius: '8px',
}))

const SubscriptionSchedules = ({ subscriptionSchedules, t }) => {
    const handleDaily = () => {
        return (
            <CustomBox>
                <Typography variant="h5">
                    {moment(subscriptionSchedules?.[0]?.time, 'LT').format(
                        'LT'
                    )}
                </Typography>
            </CustomBox>
        )
    }
    const handleMonthly = () => {
        return (
            <CustomStackFullWidth
                direction="row"
                alignItems="center"
                spacing={2}
            >
                {subscriptionSchedules?.map((item) => (
                    <CustomBox key={item?.day}>
                        <Stack>
                            <Typography variant="h5">
                                {t('Day')} {item?.day}
                            </Typography>
                            <Typography variant="h5">
                                {moment(item?.time, 'LT').format('LT')}
                            </Typography>
                        </Stack>
                    </CustomBox>
                ))}
            </CustomStackFullWidth>
        )
    }
    const handleWeekly = () => {
        return (
            <CustomStackFullWidth
                direction="row"
                alignItems="center"
                spacing={2}
            >
                {subscriptionSchedules?.map((item) => (
                    <CustomBox key={item?.day}>
                        <Stack width="100%">
                            <Typography variant="h5" fontWeight="400">
                                {
                                    weekDays?.find(
                                        (day) => day?.value === item?.day
                                    )?.name
                                }
                            </Typography>
                            <Typography fontWeight="400" variant="h5">
                                {moment(item?.time, 'LT').format('LT')}
                            </Typography>
                        </Stack>
                    </CustomBox>
                ))}
            </CustomStackFullWidth>
        )
    }
    return (
        <>
            {subscriptionSchedules?.length > 0 && (
                <>
                    {subscriptionSchedules[0]?.type === 'daily' ? (
                        handleDaily()
                    ) : (
                        <Scrollbar
                            style={{ maxWidth: '100%', padding: '5px 0px' }}
                        >
                            {subscriptionSchedules[0]?.type === 'monthly'
                                ? handleMonthly()
                                : handleWeekly()}
                        </Scrollbar>
                    )}
                </>
            )}
        </>
    )
}

SubscriptionSchedules.propTypes = {}

export default SubscriptionSchedules
