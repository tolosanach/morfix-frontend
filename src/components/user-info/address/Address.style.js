import { alpha, styled } from '@mui/material/styles'
import { Box, Button } from '@mui/material'

import { CustomStackFullWidth } from '@/styled-components/CustomStyles.style'

export const ButtonBox = styled(Box)(({ theme }) => ({
    [theme.breakpoints.up('xs')]: {
        display: 'flex',
        justifyContent: 'end',
    },
}))

export const CustomDivWithBorder = styled(CustomStackFullWidth)(
    ({ theme }) => ({
        border: `1px solid ${alpha(theme.palette.neutral[300], 0.3)}`,
        borderRadius: '5px',
        boxShadow:
            '0px 9.075px 18.151px -2.723px rgba(145, 158, 171, 0.05), 0px 0px 1.815px 0px rgba(145, 158, 171, 0.20)',
    })
)

export const LabelButton = styled(Button)(({ theme, value, selected }) => ({
    color:
        value === selected
            ? `${theme.palette.primary.main} !important`
            : `${theme.palette.neutral[400]} !important`,
    border:
        value === selected
            ? `1px solid ${theme.palette.primary.main}`
            : `1px solid ${theme.palette.neutral[400]}`,
    '&:hover': {
        border: `1px solid ${theme.palette.primary.main} !important`,
    },
}))
