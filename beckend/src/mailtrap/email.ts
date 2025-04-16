import { INVITATION_EMAIL_TEMPLATE, PASSWORD_RESET_REQUEST_TEMPLATE, PASSWORD_RESET_SUCCESS_TEMPLATE, VERIFICATION_EMAIL_TEMPLATE, WELCOME_EMAIL_TEMPLATE } from "./email.template"
import nodemailer from "nodemailer"


export const sendVerificationEmail = async (email: string, VerificationToken: string) => {
    const recipent: { email: string }[] = [{ email }]
    
    try {
    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      host: 'smtp.gmail.com',
      secure: false,
      auth: {
        user: process.env.GMAIL_FROM,
        pass: process.env.GMAIL_APP_PASSWORD
      }
    });

    if(!recipent || recipent.length === 0 || !VerificationToken || VerificationToken.toString() === "") {
        throw new Error("Recipent is not valid")
    }


       const response = await transporter.sendMail({
        from: process.env.GMAIL_FROM,
        to: recipent.map(r => r.email),
        subject: "Verify your email address",
        html: VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}", VerificationToken)
    })


        console.log("Email Sent Succesfully", response)
    } catch (error) {
        console.error('Error Sending Verification')
        throw new Error("Error Sending verification email");
        
    }
}

export const sendWelcomeEmail = async (email: string, name: string) => {

    try {
        const transporter = nodemailer.createTransport({
          service: 'Gmail',
          host: 'smtp.gmail.com',
          secure: false,
          auth: {
            user: process.env.GMAIL_FROM,
            pass: process.env.GMAIL_APP_PASSWORD
          }
        });
    
           const response = transporter.sendMail({
               from: process.env.GMAIL_FROM,
               to: email,
               subject: "Welcome to Box Surprise",
               html: WELCOME_EMAIL_TEMPLATE.replace("{userName}", name)
           })
    
    
            console.log("Welcome Email Sent Succesfully", response)
        } catch (error) {
            console.error('Error Sending Verification')
            throw new Error("Error Sending verification email");
            
        }
};

export const sendPasswordResetEmail = async (email: string, resetToken: string) => {
    try {
        const transporter = nodemailer.createTransport({
          service: 'Gmail',
          host: 'smtp.gmail.com',
          secure: false,
          auth: {
            user: process.env.GMAIL_FROM,
            pass: process.env.GMAIL_APP_PASSWORD
          }
        });
    
           const response = transporter.sendMail({
               from: process.env.GMAIL_FROM,
               to: email,
               subject: "Password Reset",
               html: PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", resetToken)
           })
    
    
            console.log("Password Reset Email Sent Succesfully", response)
        } catch (error) {
            console.error('Error Sending Verification')
            throw new Error("Error Sending verification email");
            
        }
}

export const sendResetPasswordEmail = async (email: string) => {
    try {
        const transporter = nodemailer.createTransport({
          service: 'Gmail',
          host: 'smtp.gmail.com',
          secure: false,
          auth: {
            user: process.env.GMAIL_FROM,
            pass: process.env.GMAIL_APP_PASSWORD
          }
        });
    
           const response = transporter.sendMail({
               from: process.env.GMAIL_FROM,
               to: email,
               subject: "Password Reset Successfully",
               html: PASSWORD_RESET_SUCCESS_TEMPLATE.replace("{email}", email)
           })
    
    
            console.log("Password Reset Email Sent Succesfully", response)
        } catch (error) {
            console.error('Error Sending Verification')
            throw new Error("Error Sending verification email");
            
        }
}

function fillTemplate(template: string, data: Record<string, string>): string {
  return template.replace(/\{(\w+)\}/g, (match, key) => {
    return data[key] || match;
  });
}

export const sendInvitationEmail = async (
  recipientEmail: string,
  invitationLink: string,
  inviterName: string,
  recipientName: string
): Promise<void> => {
  try {
    // Create a transporter object using SMTP transport
    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: process.env.GMAIL_FROM,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    // Prepare the dynamic data for the template
    const templateData = {
      referralLink: invitationLink,
      inviterName: inviterName,
      recipientName: recipientName,
    };

    // Generate the final HTML content by replacing placeholders
    const htmlContent = fillTemplate(INVITATION_EMAIL_TEMPLATE, templateData);

    // Define the email options
    const mailOptions = {
      from: process.env.GMAIL_FROM,
      to: recipientEmail,
      subject: `${inviterName} has invited you to join Box Surprise!`,
      html: htmlContent,
    };

    // Send the email
    const info = await transporter.sendMail(mailOptions);
    console.log('Invitation email sent successfully:', info.response);
  } catch (error) {
    console.error('Error sending invitation email:', error);
    throw new Error('Failed to send invitation email.');
  }
};