import { Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'

export const SubmitButton = ({ loading, text }: { loading: boolean; text: string }) => {
  return (
    <Button type="submit" disabled={loading}>
      {loading ? <Loader2 className="animate-spin" /> : text}
    </Button>
  )
}
