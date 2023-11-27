import 'bootstrap/dist/css/bootstrap.css'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import '../styles/modal1.css';
import 'react-datepicker/dist/react-datepicker.css';
//import 'react-datepicker/dist/react-datepicker.module.css';

import Layout from "@/components/layout"
import "@/styles/globals.css"
import type { AppProps } from "next/app"

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  )
}
