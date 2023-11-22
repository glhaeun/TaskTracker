import {Outlet} from 'react-router-dom'

// import Custom from './../Customization/Custom';

const MinLayout = () => {
  return (
    <>
        <Outlet></Outlet>
        {/* <Custom></Custom> */}
    </>
  )
}

export default MinLayout