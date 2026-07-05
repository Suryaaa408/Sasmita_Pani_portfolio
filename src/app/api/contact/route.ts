import { NextResponse } from "next/server";

type ContactPayload = {
  name?: string;
  email?: string;
  message?: string;
  botcheck?: string;
};

type Web3FormsResult = {
  success?: boolean;
  message?: string;
};

export async function GET() {
  const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY ?? process.env.WEB3FORMS_ACCESS_KEY;

  if (!accessKey) {
    return NextResponse.json({ error: "Email service is not configured." }, { status: 500 });
  }

  return NextResponse.json({ accessKey });
}

export async function POST(request: Request) {
  const accessKey = process.env.WEB3FORMS_ACCESS_KEY ?? process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY;

  if (!accessKey) {
    return NextResponse.json({ error: "Email service is not configured." }, { status: 500 });
  }

  try {
    const body = (await request.json()) as ContactPayload;

    if (body.botcheck) {
      return NextResponse.json({ success: true });
    }

    const name = body.name?.trim();
    const email = body.email?.trim();
    const message = body.message?.trim();

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Name, email, and message are required." }, { status: 400 });
    }

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        access_key: accessKey,
        name,
        email,
        message,
        subject: `New portfolio message from ${name}`,
        from_name: "Sasmita Pani Portfolio",
        replyto: email,
      }),
    });

    const responseText = await response.text();
    let result: Web3FormsResult | undefined;

    try {
      result = responseText ? (JSON.parse(responseText) as Web3FormsResult) : undefined;
    } catch {
      console.error("Web3Forms returned a non-JSON response", {
        status: response.status,
        statusText: response.statusText,
        contentType: response.headers.get("content-type"),
        bodyPreview: responseText.slice(0, 160),
      });

      return NextResponse.json(
        { error: "Email service returned an unexpected response. Please try the mail link instead." },
        { status: 502 },
      );
    }

    if (!response.ok || !result?.success) {
      return NextResponse.json(
        { error: result?.message ?? "Email service could not send this message." },
        { status: response.ok ? 400 : 502 },
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact form submission failed", error);
    return NextResponse.json({ error: "Failed to send message." }, { status: 500 });
  }
}
