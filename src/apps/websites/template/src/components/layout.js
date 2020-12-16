import '../css/style.less'
import React, { Fragment } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import Style from './style'
import Image from './image'

function Layout({ children, site, page }) {
  return (
    <>
      <Head>
        <title>{ page.title } | { site.title }</title>
        <meta name="description" content={ page.description} />
      </Head>
      <Style site={ site } page={ page } />
      <article>
        <header>
          <Image alt="greg.jpg" src="/assets/19532/me.jpg" transforms={{ fit: 'cover', w: 28, h: 28 }} />
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
        </header>
        <main>
          { children }
        </main>
        <footer>
        </footer>
      </article>
    </>
  )
}

export default Layout
