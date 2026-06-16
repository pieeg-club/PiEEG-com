import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      );
    }

    const BEEHIIV_API_KEY = process.env.BEEHIIV_API_KEY;
    const BEEHIIV_PUBLICATION_ID = process.env.BEEHIIV_PUBLICATION_ID;

    if (!BEEHIIV_API_KEY || !BEEHIIV_PUBLICATION_ID) {
      console.warn('Beehiiv not configured');
      return NextResponse.json(
        { error: 'Newsletter not configured' },
        { status: 500 }
      );
    }

    const response = await fetch(
      `https://api.beehiiv.com/v2/publications/${BEEHIIV_PUBLICATION_ID}/subscriptions`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${BEEHIIV_API_KEY}`
        },
        body: JSON.stringify({
          email,
          reactivate_existing: false,
          send_welcome_email: true,
          utm_source: 'website',
          utm_medium: 'newsletter_form',
          utm_campaign: 'pieeg_com_news',
          referring_site: req.headers.get('referer') || 'direct'
        })
      }
    );

    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      const txt = JSON.stringify(data).toLowerCase();
      if (response.status === 400 && txt.includes('already')) {
        return NextResponse.json({ success: true, alreadySubscribed: true });
      }
      console.error('Beehiiv API error:', data);
      return NextResponse.json(
        {
          error: data.errors?.[0]?.message || data.error || 'Subscription failed'
        },
        { status: response.status }
      );
    }

    return NextResponse.json({ success: true, data });
  } catch (err) {
    console.error('Subscription error:', err);
    return NextResponse.json(
      { error: 'Internal server error', message: err instanceof Error ? err.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
