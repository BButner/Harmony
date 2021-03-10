import { NavigationContextProvider } from 'lib/navigation/NavigationContext'
import { useRouter } from 'next/router'
import { FunctionComponent, useEffect, useState } from 'react'
import { Meta } from './Meta'
import { Navbar } from './navbar/Navbar'

type LayoutProps = {
  pageTitle: string;
}

export const Layout: FunctionComponent<LayoutProps> = ({ pageTitle, children }) => {
  const router = useRouter()
  const routerPath: string = router.route.replace('/', '')
  const [currentService, setCurrentService] = useState<string>(routerPath)

  useEffect(() => {
    if (['spotify', 'pandora', 'youtube', 'apple'].includes(routerPath)) {
      setCurrentService(routerPath)
    } else {
      setCurrentService(null)
    }
  })

  return (
    <NavigationContextProvider
      value={{ currentService }}
    >
      <Meta pageTitle={pageTitle} />
      <Navbar />
      {children}
    </NavigationContextProvider>
  )
}