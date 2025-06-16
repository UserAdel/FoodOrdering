import { Menu } from 'lucide-react'
import React from 'react'
import { Sheet, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { Separator } from '@radix-ui/react-separator'
import { Button } from './ui/button'

export default function MobileNav() {
  return (
    <Sheet>
      <SheetTrigger>
        <Menu className="text-orange-500" />
      </SheetTrigger>
      <SheetContent className='p-4 space-y-3'>
        <SheetTitle>   
        <span className="text-2xl font-bold">Welcome to MernEats.com!</span>
         </SheetTitle>
        <Separator/>
        <SheetDescription className='flex'>
        <Button className="flex-1 font-bold bg-orange-500">
            Log In
        </Button>
        </SheetDescription>
      </SheetContent>
    </Sheet>
  )
}
