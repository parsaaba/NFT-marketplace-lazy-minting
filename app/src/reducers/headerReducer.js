export default (state = { IsHeader: true }, action) => {
  switch (action.type) {
    case 'HEADER_HIDDEN':
      return { IsHeader: action.payload };
    default:
      return state;
  }
};
