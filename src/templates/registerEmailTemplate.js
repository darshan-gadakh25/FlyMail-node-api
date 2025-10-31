export const registerEmailTemplate = (username) => `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Welcome to FlyMail</title>
    <style>
      body {
        font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
        background-color: #f4f6f8;
        color: #333;
        margin: 0;
        padding: 0;
      }
      .container {
        max-width: 600px;
        background: #ffffff;
        margin: 40px auto;
        border-radius: 12px;
        overflow: hidden;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
      }
      .header {
        background: linear-gradient(135deg, #4f46e5, #3b82f6);
        padding: 30px 20px;
        text-align: center;
        color: #ffffff;
      }
      .header h1 {
        margin: 0;
        font-size: 28px;
      }
      .content {
        padding: 30px 40px;
        text-align: left;
      }
      .content h2 {
        color: #111827;
        font-size: 22px;
      }
      .button {
        display: inline-block;
        background: #3b82f6;
        color: #ffffff !important;
        text-decoration: none;
        padding: 12px 25px;
        border-radius: 8px;
        font-weight: 500;
        margin-top: 15px;
      }
      .footer {
        background-color: #f9fafb;
        text-align: center;
        padding: 20px;
        font-size: 13px;
        color: #6b7280;
      }
      @media (max-width: 600px) {
        .content {
          padding: 20px;
        }
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">
        <h1>Welcome to FlyMail!</h1>
      </div>
      <div class="content">
        <h2>Hi ${username},</h2>
        <p>
          Thank you for registering with <strong>FlyMail</strong>! 🎉  
          We're excited to have you on board.
        </p>
        <p>
          You can now send and receive mails seamlessly using our secure platform.
        </p>
        <a href="https://yourapp.com/login" class="button">Go to Dashboard</a>
        <p style="margin-top: 25px;">
          If you didn’t create this account, you can safely ignore this email.
        </p>
      </div>
      <div class="footer">
        © ${new Date().getFullYear()} FlyMail.<br> All rights reserved.
      </div>
    </div>
  </body>
</html>
`;
