import { InputField } from './CheckOut.style'
import { alpha, InputBase, Typography } from '@mui/material'
import LocationOnIcon from '@mui/icons-material/LocationOn'

const AddressSelectionField = ({ theme, address, t }) => {
    const borderColor = 'rgba(255, 130, 0, 0.20)'

    return (
        <InputField
            variant="outlined"
            sx={{
                p: '8px 4px',
                display: 'flex',
                alignItems: 'center',
                width: '100%',
                border: `1px solid ${borderColor}`,
                gap: '5px',
                borderRadius: '5px',
                backgroundColor: (theme) =>
                    alpha(theme.palette.primary.light, 0.2),
            }}
        >
            <LocationOnIcon
                sx={{ color: (theme) => theme.palette.primary.main }}
            />
            <Typography fontSize="14px" fontWeight="600">
                {t(address?.address_type)}:
            </Typography>
            <InputBase
                sx={{
                    ml: 1,
                    flex: 1,
                    fontSize: '15px',
                    color: (theme) => theme.palette.neutral[600],
                    [theme.breakpoints.down('sm')]: {
                        fontSize: '12px',
                    },
                }}
                placeholder="Set Location"
                inputProps={{
                    'aria-label': 'search google maps',
                }}
                value={address?.address}
            />

            {/*<AddNewAddress refetch={refetch} buttonbg="true" />*/}
        </InputField>
    )
}

AddressSelectionField.propTypes = {}

export default AddressSelectionField
