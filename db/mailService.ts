import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_KEY);

export async function sendEmail(to: string, subject: string, html: string) {
    await resend.emails.send({
        from: 'noreply@happyeastie.org',
        to,
        subject,
        html
    });
}
