export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen py-2 bg-accent">
      {children}
    </main>
  )
}
