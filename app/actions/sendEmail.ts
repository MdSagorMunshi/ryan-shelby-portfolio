'use server'

import { transporter } from '../lib/nodemailer'

interface EmailData {
  name: string
  email: string
  message: string
  turnstileToken: string
}

export async function sendEmail(data: EmailData) {
  const { name, email, message, turnstileToken } = data

  // Verify Turnstile token
  const turnstileResponse = await fetch(
    'https://challenges.cloudflare.com/turnstile/v0/siteverify',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        secret: process.env.CLOUDFLARE_TURNSTILE_SECRET_KEY,
        response: turnstileToken,
      }),
    }
  )

  const turnstileData = await turnstileResponse.json()

  if (!turnstileData.success) {
    throw new Error('Turnstile verification failed')
  }

  // Send email
  await new Promise((resolve, reject) => {
    setTimeout(async () => {
      try {
        await transporter.sendMail({
          from: process.env.EMAIL_FROM,
          to: process.env.EMAIL_TO,
          subject: `New message from ${name}`,
          text: `
            Name: ${name}
            Email: ${email}
            Message: ${message}
          `,
        })
        resolve(true)
      } catch (error) {
        reject(error)
      }
    }, 100) // 2-second delay
  })

  return { success: true }
}