import { SelectedPage } from '@/components/enum/selectedPage'
import React from 'react'
import AnchorLink from 'react-anchor-link-smooth-scroll'

type Props = {
setSelectedPage:(value:SelectedPage)=>void;
children:React.ReactNode;
page:SelectedPage;
href:string
}

const ActionButton = ({setSelectedPage,href, children,page}: Props) => {
  return (
    <AnchorLink
    className='bg-secondary-500 rounded-md px-10 py-2 hover:bg-primary-500 hover:text-white'
    href={`${href}`}
    onClick={()=>setSelectedPage(page)}
    >{children}</AnchorLink>
  )
}

export default ActionButton