export const VERIFICATION_EMAIL_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Box Surprise Email Verification</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: linear-gradient(to right, #2b01c5, #2b01c5); padding: 20px; text-align: center;">
    <h1 style="color: white; margin: 0;">Verify Your Email</h1>
  </div>
  <div style="background-color: #fefefe; padding: 20px; border-radius: 0 0 5px 5px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
    <p>Hi there 👋,</p>
    <p>Welcome to <strong>Box Surprise</strong>! To activate your account and start earning from referrals, please verify your email using this code:</p>
    <div style="text-align: center; margin: 30px 0;">
      <span style="font-size: 32px; font-weight: bold; letter-spacing: 5px; color: #2b01c5;">{verificationCode}</span>
    </div>
    <p>This code will expire in 15 minutes for your security.</p>
    <p>If you didn't sign up for Box Surprise, feel free to ignore this email.</p>
    <p>Happy Earning!<br><strong>The Box Surprise Team 🎁</strong></p>
  </div>
  <div style="text-align: center; margin-top: 20px; color: #999; font-size: 0.8em;">
    <p>This is an automated message from Box Surprise. Please do not reply.</p>
  </div>
</body>
</html>
`;

export const PASSWORD_RESET_SUCCESS_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Password Reset Successful - Box Surprise</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: linear-gradient(to right, #2b01c5, #2b01c5); padding: 20px; text-align: center;">
    <h1 style="color: white; margin: 0;">Password Reset Successful</h1>
  </div>
  <div style="background-color: #fefefe; padding: 20px; border-radius: 0 0 5px 5px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
    <p>Hello,</p>
    <p>Your password for <strong>{email}</strong> was successfully changed. You're all set!</p>
    <div style="text-align: center; margin: 30px 0;">
      <div style="background-color: #2b01c5; color: white; width: 50px; height: 50px; line-height: 50px; border-radius: 50%; display: inline-block; font-size: 30px;">
        ✓
      </div>
    </div>
    <p>If you didn't request this change, please contact our support team right away.</p>
    <p>Security Tips:</p>
    <ul>
      <li>Use strong, unique passwords</li>
      <li>Never share your login info</li>
      <li>Keep your referral earnings safe!</li>
    </ul>
    <p>Stay Safe!<br><strong>Box Surprise Team 🎁</strong></p>
  </div>
  <div style="text-align: center; margin-top: 20px; color: #999; font-size: 0.8em;">
    <p>This is an automated message from Box Surprise. Please do not reply.</p>
  </div>
</body>
</html>
`;

export const PASSWORD_RESET_REQUEST_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Reset Your Password - Box Surprise</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: linear-gradient(to right, #2b01c5, #2b01c5); padding: 20px; text-align: center;">
    <h1 style="color: white; margin: 0;">Reset Your Password</h1>
  </div>
  <div style="background-color: #fefefe; padding: 20px; border-radius: 0 0 5px 5px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
    <p>Hello,</p>
    <p>We received a request to reset your password for your <strong>Box Surprise</strong> account.</p>
    <p>Click the button below to set a new password:</p>
    <div style="text-align: center; margin: 30px 0;">
      <a href="{resetURL}" style="background-color: #2b01c5; color: white; padding: 12px 20px; text-decoration: none; border-radius: 5px; font-weight: bold;">Reset Password</a>
    </div>
    <p>This link will expire in 1 hour. If you didn’t request a password reset, you can safely ignore this email.</p>
    <p>Keep Earning 🎁<br><strong>The Box Surprise Team</strong></p>
  </div>
  <div style="text-align: center; margin-top: 20px; color: #999; font-size: 0.8em;">
    <p>This is an automated message from Box Surprise. Please do not reply.</p>
  </div>
</body>
</html>
`;

export const WELCOME_EMAIL_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Welcome to Box Surprise</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: #2b01c5; padding: 20px; text-align: center;">
    <h1 style="color: white; margin: 0;">Welcome to Box Surprise 🎉</h1>
  </div>
  <div style="background-color: #fefefe; padding: 20px; border-radius: 0 0 5px 5px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
    <p>Hi <strong>{userName}</strong> 👋,</p>
    <p>We’re thrilled to have you on board at <strong>Box Surprise</strong>! Whether you're here for the fun surprises or the rewarding referral program, you’re in the right place.</p>
    
    <p>Here’s what you can do next:</p>
    <ul>
      <li>🎁 Start referring and earning rewards</li>
      <li>📦 Explore surprise boxes and exclusive deals</li>
      <li>💬 Connect with the community</li>
    </ul>

    <p>We're always here to help. If you have any questions, just hit us up at <a href="mailto:support@boxsurprise.com">support@boxsurprise.com</a>.</p>

    <p>Let the surprises begin!<br/><strong>The Box Surprise Team 🎁</strong></p>
  </div>
  <div style="text-align: center; margin-top: 20px; color: #999; font-size: 0.8em;">
    <p>This is an automated message from Box Surprise. Please do not reply.</p>
  </div>
</body>
</html>
`;


export const INVITATION_EMAIL_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>You’ve Been Invited to Join Box Surprise</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: linear-gradient(to right, #2b01c5, #2b01c5); padding: 20px; text-align: center;">
    <h1 style="color: white; margin: 0;">You’re Invited!</h1>
  </div>
  <div style="background-color: #fefefe; padding: 20px; border-radius: 0 0 5px 5px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
    <p>Hi <strong>{recipientName}</strong>,</p>
    <p><strong>{inviterName}</strong> has invited you to join <strong>Box Surprise</strong> — a fun and rewarding surprise box platform!</p>
    <p>When you sign up using the referral link below, you’ll get a special bonus, and <strong>{inviterName}</strong> will earn rewards too!</p>

    <p style="text-align: center;">
      <a href="{referralLink}" style="background-color: #2b01c5; color: white; padding: 12px 25px; text-decoration: none; border-radius: 5px; font-weight: bold;">Join Now</a>
    </p>

    <p>🎁 <strong>How it works:</strong></p>
    <ul>
      <li>Click the referral link above.</li>
      <li>Sign up and explore the surprises!</li>
      <li>You both get rewarded for the referral!</li>
    </ul>

    <p>Don't miss the fun — start your Box Surprise journey today!</p>

    <p>Cheers!<br><strong>The Box Surprise Team 🎁</strong></p>
  </div>
  <div style="text-align: center; margin-top: 20px; color: #999; font-size: 0.8em;">
    <p>This is an automated message from Box Surprise. Please do not reply.</p>
  </div>
</body>
</html>
`;
