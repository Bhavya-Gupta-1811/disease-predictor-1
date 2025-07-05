import { Outlet } from "react-router-dom"
import { Header } from "../UI/header"
import { Footer } from "../UI/footer"

export const AppLayout = () => {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />      
    </>
  )
}