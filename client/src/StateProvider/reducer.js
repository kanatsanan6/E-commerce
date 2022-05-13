export const initialState = {
  products: null,
  user: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_PRODUCT":
      return { ...state, products: action.item };

    case "ADD_USER":
      return { ...state, user: action.user };

    default:
      return { ...state };
  }
};

export default reducer;
