/* eslint-disable react/prop-types */
import React from "react"
import { iOSCheck } from "../../helpers/iosCheck/iosCheck.util"
import { AndroidArView } from "./androidArView/customizer.androidArView"
import { IosArView } from "./iosArView/customizer.iosArView"

export const MobileAr = ({ mesh, setArAvailble, setLoading, isLoading }) => {
  React.useEffect(() => {
    if (!iOSCheck()) {
      if ("xr" in navigator) {
        // @ts-ignore
        navigator.xr
          .isSessionSupported("immersive-ar")
          .then(function(supported) {
            supported ? setArAvailble(true) : setArAvailble(false)
          })
          .catch(setArAvailble(false))
      }
    } else {
      setArAvailble(true)
    }
  }, [])

  console.log(iOSCheck())

  return (
    <>
      {/* {iOSCheck() ? ( */}
        <IosArView mesh={mesh} setLoading={setLoading} isLoading={isLoading} />
      {/* ) : (
        <AndroidArView mesh={mesh} />
      )} */}
    </>
  )
}
