import './globals.css'
import { Inter } from 'next/font/google'
import Navbar from '@/app/components/navbar/Navbar'
import ClientOnly from './components/ClientOnly'
import RegisterModal from './components/modals/RegisterModal'
import ToasterProvider from './providers/ToasterProvider'
import getCurrentUser from './actions/getCurrentUser'
import LoginModal from './components/modals/LoginModal'
import RentModal from './components/modals/RentModal'
// import ToastProvider1 from './providers/ToastProvider1'

const inter = Inter({ subsets: ['latin'] })


export const metadata = {
  title: 'Live',
  description: 'Live clone',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const currentUser = await getCurrentUser()
  return (
    <html lang="en">
      <body className={inter.className}>
        <ClientOnly>
          <ToasterProvider />
          <RentModal />
          <LoginModal />
          <RegisterModal />
          <Navbar currentUser={currentUser} />
        </ClientOnly>
        <div className='pb-20 pt-28'>
          {children}
        </div>
      </body>
    </html>
  )
}
