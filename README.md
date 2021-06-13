# maxSection10

useReducer

- Have more complex state, useState() become more hard and error-prone to be used.
- It a replacement for useState()
  useReducerFunction
  const [state, dispatchFn]= useReducer(reducerFn, initialState, initFn)

  //with this lesson we able to reduce unnecesary useEffect rendering, with the combination of using useEffect and useReducer

ContextLimitation

- Not optimize for high frequency Changed - better tool -Redux

Rules of Hook

- Only call reactHooks in React Functions
- Only call raactHooks at TopLevel
- Always add everuthing your refer to inside of useEffect as a dependency
