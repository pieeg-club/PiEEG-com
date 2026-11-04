import { NextRequest, NextResponse } from 'next/server';

const SENDY_SUBSCRIBE_URL = 'https://newsletter.pieeg.com/subscribe';
const DEFAULT_SENDY_LIST = '2qeF7lDYvGmxV1rsHaBxcQ';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const email = typeof body.email === 'string' ? body.email.trim() : '';
    const name = typeof body.name === 'string' ? body.name.trim() : '';
    const hp = typeof body.hp === 'string' ? body.hp : '';
    const list =
      typeof body.list === 'string' && body.list.trim()
        ? body.list.trim()
        : DEFAULT_SENDY_LIST;

    // Honeypot check: silently succeed if filled by a bot
    if (hp) {
      return NextResponse.json({ success: true });
    }

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      );
    }

    const formData = new URLSearchParams();
    formData.set('name', name);
    formData.set('email', email);
    formData.set('hp', '');
    formData.set('list', list);
    formData.set('subform', 'yes');
    formData.set('boolean', 'true');

    const sendyRes = await fetch(SENDY_SUBSCRIBE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
      },
      body: formData.toString()
    });

    const sendyText = (await sendyRes.text()).trim();
    const lower = sendyText.toLowerCase();

    if (
      sendyText === '1' ||
      lower === 'true' ||
      lower.includes("you're subscribed") ||
      lower.includes('you are subscribed') ||
      lower.includes('check your email') ||
      lower.includes('confirmation email')
    ) {
      return NextResponse.json({ success: true });
    }

    if (lower.includes('already subscribed')) {
      return NextResponse.json({ success: true, alreadySubscribed: true });
    }

    if (lower.includes('invalid email')) {
      return NextResponse.json(
        { error: 'Please enter a valid email address.' },
        { status: 400 }
      );
    }

    if (sendyRes.ok) {
      return NextResponse.json({ success: true });
    }

    console.error('Sendy error:', sendyRes.status, sendyText.slice(0, 300));
    return NextResponse.json(
      { error: 'Subscription failed. Please try again.' },
      { status: 502 }
    );
  } catch (err) {
    console.error('Subscription error:', err);
    return NextResponse.json(
      {
        error: 'Internal server error',
        message: err instanceof Error ? err.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
