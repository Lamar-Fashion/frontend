// initial State
const adminSettings = {
  signInDiscount: 0,
  shippingFees: 50,
  other: {},
  promoCodes: [{
    code: "",
    discountPercentage: 0,
    type: "", // noLimit/maxLimit/oneTimeUse >> per phone number.
    maxLimit: 0,
    counter: 0,
    usedByPhoneNumbers: [],
    expirationDate: "",
    isActive: false
  }],
  hero: {
    mainText: "",
    subText: "",
    buttonText: "",
    arrowText: "",
    imageUrl: ""
  },
  collection: {
    imageOneUrl: "",
    imageTwoUrl: "",
    imageThreeUrl: ""
  },
};

//auth Reducer
const adminSettingsReducer = (state = adminSettings, action) => {
  const { type, payload } = action;

  switch (type) {
    case 'SET_ADMIN_SETTINGS':
      return payload.adminSettings;
    case 'CLEAR_ADMIN_SETTINGS':
      return adminSettings;
    default:
      return state;
  }
};

export default adminSettingsReducer;
