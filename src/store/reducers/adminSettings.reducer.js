// initial State
const adminSettings = {
  signInDiscount: 10,
  promoCodes: [{
    code: "",
    discountPercentage: 0,
    type: "", // noLimit/maxLimit/oneTimeUse >> per phone number.
    counter: 0,
    usedByPhoneNumbers: [],
    expirationDate: ""
  }],
  hero: {
    mainText: "",
    text2: "",
    imageUrl: ""
  },
  collection: {
    imageOneUrl: "",
    imageTwoUrl: "",
    imageThreeUrl: ""
  },
}

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
