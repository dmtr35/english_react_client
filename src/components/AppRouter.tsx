import React, {FC} from "react"
import { Route, Routes, Navigate } from "react-router-dom"
import { authRouters, pablicRouters } from "../routes"
import { LOGIN_ROUTE } from "../utils/consts"
import { useSelector } from 'react-redux'



const AppRouter: FC = () => {
  const isAuth = useSelector((state: any) => state.isAuthReducer.isAuth)

  return (
    <Routes>
      {isAuth && authRouters.map(({ path, Element }) =>
        <Route key={path} path={path} element={<Element />} />
      )}
      {pablicRouters.map(({ path, Element }) =>
        <Route key={path} path={path} element={<Element />} />
      )}
      <Route path="*" element={<Navigate to={LOGIN_ROUTE} />} />
    </Routes>
  )
}



export default AppRouter