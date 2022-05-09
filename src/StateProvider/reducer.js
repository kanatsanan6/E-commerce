export const initialState = {
  products: null,
  basket: [],
};

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_PRODUCT":
      return {...state, products: action.item}
      
    case "ADD_TO_BASKET":
      const found = state.basket.findIndex(
        (basketItem) => basketItem.id === action.item.id
      );
      if (found >= 0) {
        return {
          ...state,
          basket: state.basket.map((basketItem) =>
            basketItem.id === action.item.id
              ? { ...basketItem, number: basketItem.number + 1 }
              : basketItem
          ),
        };
      } else {
        return {
          ...state,
          basket: [...state.basket, action.item],
        };
      }
    case "REMOVE_FROM_BASKET":
      const index = state.basket.findIndex((basketItem) => basketItem.id === action.item.id);
      if (index >= 0) {
        const newBasket = [...state.basket]
        newBasket.splice(index, 1);
        return {...state, basket: [...newBasket]}
      } else {
        return {...state}
      }
    
    case "DECREASE_ONE_ITEM":
      const index2 = state.basket.findIndex(
        (basketItem) => basketItem.id === action.item.id
      );
      if (index2 >= 0) {
        return {
          ...state,
          basket: state.basket.map((basketItem) =>
            (basketItem.id === action.item.id && basketItem.number > 1)
              ? { ...basketItem, number: basketItem.number - 1 }
              : basketItem
          ),
        };
      } else {
        return {
          ...state,
          basket: [...state.basket, action.item],
        };
      }

    default:
      return { ...state };
  }
};

export default reducer;
