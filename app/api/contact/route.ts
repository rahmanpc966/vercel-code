import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, offer, message } = body

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required' },
        { status: 400 }
      )
    }

    // Create email content
    const emailContent = `
New Domain Inquiry for yt2mate.pro

Contact Details:
- Name: ${name}
- Email: ${email}
- Offer: ${offer || 'Not specified'}
- Message: ${message}

This inquiry was sent from the domain sale website.
Timestamp: ${new Date().toISOString()}
    `.trim()

    // Log the inquiry (this will show in Vercel logs)
    console.log('Domain Inquiry Received:', {
      name,
      email,
      offer,
      message,
      timestamp: new Date().toISOString()
    })

    // Send email using a simple HTTP request to a webhook service
    // You can use services like:
    // - Zapier webhook
    // - IFTTT webhook
    // - Custom webhook endpoint
    // - EmailJS (client-side)
    
    try {
      // Example: Send to a webhook service (replace with your actual webhook URL)
      const webhookUrl = process.env.CONTACT_WEBHOOK_URL
      
      if (webhookUrl) {
        await fetch(webhookUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            to: 'teamlumina66@gmail.com',
            subject: 'New Domain Inquiry - yt2mate.pro',
            text: emailContent,
            from: email,
            name: name
          }),
        })
      }
    } catch (webhookError) {
      console.error('Webhook error:', webhookError)
      // Continue even if webhook fails
    }

    // For now, we'll return success
    // In production, you should integrate with a proper email service
    return NextResponse.json({
      success: true,
      message: 'Your inquiry has been received! We will contact you soon.'
    })

  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json(
      { error: 'Failed to process your inquiry. Please try again.' },
      { status: 500 }
    )
  }
}