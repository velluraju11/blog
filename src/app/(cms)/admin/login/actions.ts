'use server'

import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

export async function login(formData: FormData) {
  const email = formData.get('email') as string
  const password = formData.get('password') as string
  const supabase = createClient()

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    // Using query params to pass error messages is a common pattern for server actions.
    return redirect(`/admin/login?message=${encodeURIComponent(error.message)}`)
  }

  // A successful login will have its session set in the cookies.
  // The middleware will handle the redirect to the dashboard on the next navigation.
  // We can explicitly redirect here to make it faster and more reliable.
  return redirect('/admin/dashboard')
}
