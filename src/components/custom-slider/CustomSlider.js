import React from 'react'
import { Slider, Stack, Typography } from '@mui/material'
import { useIsMount } from '../first-render-useeffect-controller/useIsMount'
import { useSelector } from 'react-redux'

const CustomSlider = ({ handleChangePrice,highestPrice ,priceValue }) => {
    const { filterData } = useSelector((state) => state.searchFilterStore)
    const [value, setValue] = React.useState(
        filterData.price !== '' ? filterData.price : [0, 1]
    )
    const minDistance = 1
    const isMount = useIsMount()
    const handleChange = (event, newValue, activeThumb) => {
        if (!Array.isArray(newValue)) {
            return
        }
        if (activeThumb === 0) {
            setValue([Math.min(newValue[0], value[1] - minDistance), value[1]])
        } else {
            setValue([value[0], Math.max(newValue[1], value[0] + minDistance)])
        }
    }
    // useEffect(() => {
    //     if (isMount) {
    //         //for doing nothing on first render
    //     } else {
    //         handleChangePrice(value)
    //     }
    // }, [value])
    const handleChangeCommitted = (event, newValue) => {
        handleChangePrice(newValue);
    };

    return (
        <Stack spacing={2} direction="row" sx={{ mb: 1 }} alignItems="center">
            <Typography>0</Typography>
            <Slider
                onChangeCommitted={handleChangeCommitted}
                getAriaLabel={() => 'Minimum distance'}
                value={value}
                onChange={handleChange}
                valueLabelDisplay="auto"
                min={0}
                max={highestPrice}
                // getAriaValueText={valuetext}
                disableSwap
            />
            <Typography>{highestPrice}</Typography>
        </Stack>
    )
}

CustomSlider.propTypes = {}

export default CustomSlider
