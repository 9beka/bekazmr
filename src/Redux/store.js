import {configureStore} from "@reduxjs/toolkit"
import RegistrationSlicer from "./LoginSlicer.js"
import CrmSlicer from "./CrmSlicer.js"
import ProfileChangeSlicer from "./ProfileChangeSlicer.js"
import GenerateSlicer  from "./SlicerGenerator.js"
export const store = configureStore({
   reducer: {
      login: RegistrationSlicer,
      crm : CrmSlicer,
      change:ProfileChangeSlicer,
      image : GenerateSlicer,

   }
})