import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { google } from "googleapis"


export const dynamic = 'force-dynamic';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_SERVER,
  port: Number(process.env.SMTP_PORT),
  secure: false,
  auth: {
    user: process.env.FROM_EMAIL_GMAIL,
    pass: process.env.FROM_EMAIL_PASSWORD,
  },
});



// Named export for POST method
export async function POST(req: NextRequest) {
  
  const body = await req.json();
  console.log(body);
  const { name,  email,  subject, message,  } = body;

  try {
    // Create user in the database


    const mailOptions = {
  from: process.env.FROM_EMAIL_GMAIL,
  to: email,
  subject: "Hamza Fallahi - you will be contacted soon",
  html: `
    <div style="font-family: 'Arial', sans-serif; padding: 20px; background-color: #f9fafc; color: #333;">
  <div style="max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 10px; box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1); overflow: hidden;">
    <div style="background-color: #004b6d; padding: 20px; color: #ffffff; text-align: center;">
      <h1 style="font-size: 24px; margin: 0;">Thank You for Reaching Out!</h1>
    </div>
    <div style="padding: 30px;">
      <p style="font-size: 18px; line-height: 1.6; color: #555;">
        Hi <strong>${name}</strong>,
      </p>
      <p style="font-size: 16px; line-height: 1.6; color: #555;">
        Thank you for contacting me through my portfolio. I’ve received your message and will get back to you as soon as possible. Here’s a quick summary of your inquiry:
      </p>
      <div style="margin-top: 20px; background: #f4f7fa; padding: 20px; border-radius: 5px;">
        <p style="font-size: 16px; margin: 0;"><strong>Subject:</strong> ${subject}</p>
        <p style="font-size: 16px; margin: 0; margin-top: 10px;"><strong>Message:</strong></p>
        <p style="font-size: 16px; margin: 0; color: #555;">${message}</p>
      </div>
      <p style="margin-top: 20px; font-size: 16px; color: #555;">
        I appreciate your patience and will do my best to provide a thoughtful and timely response. In the meantime, feel free to explore more of my work on my portfolio!
      </p>
      <p style="font-size: 16px; margin-top: 20px; color: #555;">
        Best regards,<br>
        Hamza Fallahi
      </p>
    </div>
    <div style="background-color: #f9fafc; padding: 10px 20px; text-align: center; font-size: 14px; color: #aaa;">
      <p style="margin: 0;">&copy; 2024 Hamza Fallahi. All rights reserved.</p>
    </div>
  </div>
</div>
  `,
};



    await transporter.sendMail(mailOptions);

    // Handle Google Sheets data append
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_CLIENT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/, '\n'),
      },
      scopes: [
        'https://www.googleapis.com/auth/drive',
        'https://www.googleapis.com/auth/drive.file',
        'https://www.googleapis.com/auth/spreadsheets',
      ],
    });

    const sheets = google.sheets({ auth, version: 'v4' });

    const range = 'A1:D1'; // Same range for both
    const spreadsheetId = process.env.GOOGLE_SHEET_ID ;

    // Append data to Google Sheets
    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range,
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: [
          [name, email, subject, message],
        ],
      },
    });



    return NextResponse.json({ message: 'User registered and emails sent successfully.' });
  } catch (error) {
    console.error('Error during registration:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}



    