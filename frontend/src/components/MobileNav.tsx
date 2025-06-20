import { CircleUserRound, Menu } from 'lucide-react'
import React from 'react'
import { Sheet, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { Separator } from '@radix-ui/react-separator'
import { Button } from './ui/button'
import { useAuth0 } from '@auth0/auth0-react'
import MobileNavLinks from './MobileNavLinks'

export default function MobileNav() {
  const { isAuthenticated, loginWithRedirect, user } = useAuth0();

  return (
    <Sheet>
      <SheetTrigger>
        <Menu className="text-orange-500" />
      </SheetTrigger>
      <SheetContent className='p-4 space-y-3'>
        <SheetTitle>
          {isAuthenticated ? (
            <span className='flex item-center font-bold gap-2'>
              <CircleUserRound className='text-orange-500' />
              {user?.email}
            </span>
          ) : (
            <span className="text-2xl font-bold">Welcome to MernEats.com!</span>
          )}
        </SheetTitle>
        <Separator />
        <SheetDescription className='flex flex-col gap-4'>
          {isAuthenticated ? (<MobileNavLinks />) : (<Button
            onClick={() => loginWithRedirect()}
            className="flex-1 font-bold bg-orange-500"
          >
            Log In
          </Button>)}

        </SheetDescription>
      </SheetContent>
    </Sheet>
  )
}
