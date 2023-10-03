import React, { Suspense } from 'react'
import Loader from './Loader'

const Loadable = (Component) => (props) => {
  return (
    <>
        <Suspense fallback={<Loader {...props} />}>
            <Component {...props}></Component>
        </Suspense>
    </>
  )
}

export default Loadable


