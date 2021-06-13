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

useImperativeHandle and forwardRef

- we can expose functionalities from a React Compoenent to its parent Component to then use in the component through refs and trigger certain functions
- also able to expose value
- try to avoid using this, but it is very useful for scrolling and focusing
