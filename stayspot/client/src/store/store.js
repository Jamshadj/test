import { createStore } from 'redux';

const initialState = {
  user: { login: null },
  admin: { login: null },
  host: { login: null },
  propertyDetails: {
    structure: null,
    privacyType: null,
    location:null,
    coordinates:null,
    address:[],
    floorPlan:[],
    amenities:[],
    images:[],
    minimumStay:null,
    maximumStay:null,
    availability:[],
    title:null,
    description:null,
    pricePerNight:null,
    hostId:null
  },
  coordinates:{
   latitude:null,
   longitude:null
  },
  refresh: true,
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case 'user':
      return { ...state, user: action.payload };
    case 'host':
      return { ...state, host: action.payload };
    case 'admin':
      return { ...state, admin: action.payload };
    case 'refresh':
      return { ...state, refresh: !state.refresh };
    case 'propertyDetails':
      return {
        ...state,
        propertyDetails: { ...state.propertyDetails, ...action.payload },
      };
    default:
      return state;
  }
}

export default createStore(reducer);




