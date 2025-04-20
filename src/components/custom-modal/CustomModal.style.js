import { styled } from '@mui/material/styles'
import Box from '@mui/material/Box'

export const CustomModalWrapper = styled(Box)(
    ({ theme, maxWidth, bgColor }) => ({
        maxWidth: maxWidth || '450px',
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        borderRadius: '8px',
        backgroundColor: bgColor ? bgColor : theme.palette.neutral[100],
        p: 2,
        outline: 'none',
        width: '100%',
        [theme.breakpoints.down('md')]: {
            width: '88%',
        },
    })
)
