"use client"
import React from 'react'
import BlogPost from './components/BlogPost'
import Footer from './components/Footer'
import Header from './components/Header.js'
import NewStory from './components/NewStory'

export default function Home() {
  return (
<>
<Header />
<div className="grid grid-cols-12 gap-4"> </div>
<NewStory />
<Footer />

</>
  )
}
