import React from "react"
import ProfileInfo from "../../components/users/ProfileInfo"
import { Container } from "@mui/material"
import PostedArt from "../../components/users/PostedArt"
import Footer from "../../components/users/Footer"
import Navbar from "../../components/users/Navbar"

function ProfilePage() {
  return (
    <>
      <Navbar />
      <Container sx={{ height: '65px', overflow: 'hidden' }} />
      <ProfileInfo />
      <PostedArt/>
      <Footer/>
    </>
  )
}


export default ProfilePage