import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export const AuthBox = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-full sm:w-sm mx-auto space-y-4">
      <div className="p-6 border rounded-md bg-background">{children}</div>
      <Link className="text-xs text-muted-foreground flex items-center gap-1" href="/">
        <ArrowLeft size="12" /> Back to home
      </Link>
    </div>
  )
}
