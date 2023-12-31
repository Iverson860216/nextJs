import '../styles/globals.css';
import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Create Iverson App',
    description: 'Generated by create next app',
  }

export default function App({Component, pageProps}){
    return <Component {...pageProps}/>;
}