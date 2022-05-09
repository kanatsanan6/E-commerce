import { SignalCellularConnectedNoInternet4BarTwoTone } from "@mui/icons-material"

export const initialState = {
    products: null
}

const reducer = (state, action) => {
    console.log(action)
    switch(action.type) {
        case "FETCH_PRODUCT":
            return {...state, products: action.item}

        default:
            return {...state}
    }

}

export default reducer;