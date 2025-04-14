import { PASSWORD_RESET_REQUEST_TEMPLATE, PASSWORD_RESET_SUCCESS_TEMPLATE, VERIFICATION_EMAIL_TEMPLATE, WELCOME_EMAIL_TEMPLATE } from "./email.template"
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