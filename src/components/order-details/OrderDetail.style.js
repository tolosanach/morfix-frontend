import { styled } from '@mui/material/styles'
import {
    alpha,
    Box,
    Button,
    Divider,
    Grid,
    Stack,
    Typography,
} from '@mui/material'

export const IformationGrid = styled(Stack)(({ theme, bgColor }) => ({
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    background:
        theme.palette.mode === 'dark'
            ? bgColor ?? alpha(theme.palette.primary.main, 0.05)
            : bgColor ?? alpha(theme.palette.primary.main, 0.1),
    borderRadius: '10px',
    padding: '10px',
}))

export const IformationGridWithBorder = styled(Stack)(
    ({ theme, isVerfired }) => ({
        borderRadius: '14px',
        padding: isVerfired ? '0rem' : '1rem',
        border:
            !isVerfired &&
            `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
        boxShadow: !isVerfired && '0px 5px 10px 0px rgba(51, 66, 87, 0.05)',
    })
)
export const OfflineWrapper = styled(Stack)(({ theme }) => ({
    borderRadius: '14px',
    position: 'absolute',
    top: '8px',
    right: '8px',
}))

export const OrderSummaryGrid = styled(Grid)(() => ({
    padding: '0px 14px 20px 14px',
}))

export const OrderFoodName = styled(Typography)(
    ({ theme, color, textAlign, fontSize, fontWeight }) => ({
        fontSize: fontSize || '12px',
        fontWeight: fontWeight || 400,
        color: color || theme.palette.neutral[1000],
        textAlign: textAlign || 'start',
    })
)
export const OrderFoodAmount = styled(Typography)(({ theme }) => ({
    color: theme.palette.customColor.fifteen,
    fontSize: '14px',
    fontWeight: '600',
    textAlign: 'end',
}))

export const TotalGrid = styled(Grid)(() => ({
    fontSize: '16px',
    fontWeight: '600',
}))

export const TitleTypography = styled(Typography)(({ theme }) => ({
    fontSize: '16px',
    fontWeight: '600',
    color: theme.palette.customColor.fifteen,
    [theme.breakpoints.down('md')]: {
        fontSize: '14px',
    },
}))

export const HeadingBox = styled(Box)(() => ({
    padding: '10px 0px 20px 0px',
}))

export const InfoTypography = styled(Typography)(({ theme }) => ({
    fontSize: '13px',
    fontWeight: 400,
    lineHeight: '28px',
    color: theme.palette.neutral[900],
    [theme.breakpoints.down('sm')]: {
        fontSize: '13px',
        lineHeight: '20px',
    },
}))

export const RefundButton = styled(Button)(({ theme }) => ({
    width: '100%',
    fontSize: '14px',
    fontWeight: 400,
    marginBlock: '16px',
    border: `1px solid ${alpha(theme.palette.error.main, 0.6)}`,
    color: theme.palette.error.main,
}))
export const ProductDetailsWrapper = styled(Stack)(({ theme, isVerfired }) => ({
    width: '100%',
    padding: '10px',
    borderRadius: '10px',
    boxShadow: theme.shadows[26],
}))
export const CustomProductDivider = styled(Divider)(
    ({ theme, style, height }) => ({
        height: height || '1px',
        margin: '0px',
        borderStyle: style || 'groove',
    })
)
export const CustomOrderStatus = styled(Stack)(
    ({ theme, color, isVerfired }) => ({
        paddingBlock: '3px',
        paddingInline: '8px',
        backgroundColor: alpha(color, 0.1),
        borderRadius: '2px',
        marginBottom: '0px !important',
    })
)
export const InstructionWrapper = styled(Stack)(({ theme }) => ({
    padding: '15px',
    backgroundColor: theme.palette.neutral[1800],
    borderRadius: '10px',
    [theme.breakpoints.down('md')]: {
        padding: '10px',
    },
}))
