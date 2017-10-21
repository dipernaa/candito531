const buildActionNames = (baseName) => ({
  failure: `${baseName}_FAILURE`,
  request: `${baseName}_REQUEST`,
  success: `${baseName}_SUCCESS`,
});

const buildActions = (actionNames) => ({
  failure: (err) => ({
    type: actionNames.failure,
    ...err
  }),
  request: () => ({
    type: actionNames.request
  }),
  success: (data) => ({
    type: actionNames.success,
    ...data
  }),
});

const createAsyncAction = (actionNames, asyncFn) => {
  const actions = buildActions(actionNames);

  const actionCreator = (dispatch, getState) => {
    dispatch(actions.request());
    const state = getState();

    return asyncFn(state)
      .then(result => {
        dispatch(actions.success(result));
        return {
          ok: true,
          data: result
        };
      })
      .catch(err => {
        dispatch(actions.failure(err));
        return {
          ok: false,
          data: err
        };
      });
  };

  return actionCreator;
};

export {
  buildActionNames,
  buildActions,
  createAsyncAction
};
