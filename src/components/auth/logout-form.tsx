import { Button } from '@/components/ui/button'
import { logoutUser } from '@/lib/auth'

export function LogoutForm() {
  return (
    <form action={logoutUser}>
      <Button variant="outline" type="submit">
        Logout
      </Button>
    </form>
  )
}