import React from 'react'
import { Stack } from '@mui/material'
import { CustomSpinner } from '../HomeStyle'
import { useTheme } from '@emotion/react'

const DotSpin = () => {
    const theme = useTheme()
    return (
        <Stack
            width="100%"
            justifyContent="Center"
            alignItems="center"
            heigth="400px"
        >
            <CustomSpinner color={theme.palette.primary.main}></CustomSpinner>
        </Stack>
    )
}

export default DotSpin
