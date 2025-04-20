import React from 'react'
import VariationButtons from './VariationButtons'
import { ChoiceValues } from './ChoiceValues'

const VariationsManager = (props) => {
    const {
        t,
        modalData,
        radioCheckHandler,
        changeChoices,
        currencySymbolDirection,
        currencySymbol,
        digitAfterDecimalPoint,
        quantity,
        selectedOptions,
        isCheck,
        itemIsLoading,
        productUpdate,
    } = props

    return (
        <>
            {modalData.length > 0 && modalData[0].variations?.length > 0 ? (
                modalData[0].variations?.map((choice, choiceIndex) => (
                    <ChoiceValues
                        key={choiceIndex}
                        choice={choice}
                        t={t}
                        radioCheckHandler={radioCheckHandler}
                        choiceIndex={choiceIndex}
                        changeChoices={changeChoices}
                        currencySymbolDirection={currencySymbolDirection}
                        currencySymbol={currencySymbol}
                        digitAfterDecimalPoint={digitAfterDecimalPoint}
                        quantity={quantity}
                        selectedOptions={selectedOptions}
                        isCheck={isCheck}
                        itemIsLoading={itemIsLoading}
                        productUpdate={productUpdate}
                    />
                ))
            ) : (
                <VariationButtons
                    modalData={modalData}
                    changeChoices={changeChoices}
                />
            )}
        </>
    )
}

VariationsManager.propTypes = {}

export default VariationsManager
