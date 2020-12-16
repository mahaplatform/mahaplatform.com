import '../css/style.less'
import React, { Fragment } from 'react'
import Head from 'next/head'
import Link from 'next/link'

function Layout({ children, config }) {
  return (
    <>
      <div className="page">
        <img src="/imagecache/fit=cover&w=28&h=28&dpi=2/assets/19532/me.jpg" />
        <ul>
          <li>
            <Link href="/">
              <a>Home</a>
            </Link>
          </li>
          <li>
            <Link href="/about">
              <a>About</a>
            </Link>
          </li>
          <li>
            <Link href="/contact">
              <a>Contact</a>
            </Link>
          </li>
        </ul>
        { children }
      </div>
    </>
  )
}

export default Layout
