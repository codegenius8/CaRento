const initialState = {
    cars : [],
    bookedCars : []
}
export const carReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_ALL_CARS": {
      return {
        ...state,
        cars : action.payload
      };
    }

    case "GET_ALL_BOOKED_CARS": {
      return {
        ...state,
        bookedCars : action.payload
      };
    }

    default:
      return state;
  }
};
