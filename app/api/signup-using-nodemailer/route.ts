import supabaseAdmin from "@/lib/supabase/admin";
import { NextRequest, NextResponse } from "next/server";
import nodemailer, { SentMessageInfo } from "nodemailer";

export async function POST(request: NextRequest): Promise<NextResponse> {
  // Rate limit logic here if needed

  const data = await request.json();
  const supabase = supabaseAdmin();
  console.log(data);

  const res = await supabase.auth.admin.generateLink({
    type: "signup",
    email: data.email,
    password: data.password,
  });

  console.log(res.data);

  if (res.data.properties?.email_otp) {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true, // true for 465, false for other ports
      auth: {
        user: "<name>@gmail.com", // Gmail address
        pass: process.env.SMTP_PASSWORD as string, // App-specific password or your SMTP password
      },
    });

    // Compose the email
    const mailOptions = {
      from: "Kartikeya Saini <onboarding@example.com>", // Sender address
      to: data.email, // List of recipients
      subject: "Verify Email", // Subject line
      html: res.data.properties?.email_otp,
    };

    // Send the email
    try {
      const info: SentMessageInfo = await transporter.sendMail(mailOptions);
      console.log("Email sent: %s", info.messageId);
      return NextResponse.json({ success: true, info }, { status: 200 });
    } catch (error) {
      console.error("Error sending email:", error);
      return NextResponse.json(
        { success: false, error: (error as Error).message },
        { status: 500 }
      );
    }
  } else {
    return NextResponse.json({ data: null, error: res.error });
  }
}
