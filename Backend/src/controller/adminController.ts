import { body, query, Result, validationResult, type ValidationError } from "express-validator"

import CryptoJS from "crypto-js"
import transporter from "../services/nodemailer.js"
import jwt from "jsonwebtoken"
import type {Request,Response} from "express"
import Admin from "../models/Admin.js"


const createNewAdmin=async(req:Request,res:Response)=>{
try {

    const errors:any=validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({message:errors.array()[0].msg,success:false})
    }

    const {adminName,adminEmail,adminMobileNo,adminPassword,adminConfirmPassword,adminAuthPassword}=req.body

    const existingEmail=await Admin.findOne({adminEmail})
    if(existingEmail){
        return res.status(400).json({message:"Email already exists",success:false})
    }

    const existingMobileNo=await Admin.findOne({adminMobileNo})
    if(existingMobileNo){
        return res.status(400).json({message:"Mobile Number already exists",success:false})
    }
    if(adminAuthPassword!==process.env.AUTH_SECRET){
        return res.status(400).json({message:"Invalid Authentication Password",success:false})
    }

    if(adminPassword!==adminConfirmPassword){
        return res.status(400).json({message:"Passwords do not match",success:false})
    }

    const ciphertext = CryptoJS.AES.encrypt(adminPassword, process.env.AUTH_SECRET!).toString();

    const newAdmin=new Admin({
        adminName,
        adminEmail,
        adminMobileNo,
        adminPassword:ciphertext
    })
    await newAdmin.save()


    setTimeout(async()=>{
 const info = await transporter.sendMail({
    from: `"${process.env.COMPANY_NAME} – Admin Access" <${process.env.SMTP_EMAIL}>`,
    to: adminEmail,
    subject: "Your Admin Access Details",
    html:`<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <meta name="x-apple-disable-message-reformatting" />
    <title>Admin Access</title>
  </head>
  <body style="margin:0;padding:0;background:#f6f8fb;font-family:Inter,Arial,Helvetica,sans-serif;">
    <!-- Preheader (hidden) -->
    <div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent;">
      Your admin account is ready. Use the temporary password to log in and change it immediately.
    </div>

    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f6f8fb;padding:28px 12px;">
      <tr>
        <td align="center">

          <!-- Container -->
          <table role="presentation" width="640" cellpadding="0" cellspacing="0" style="width:640px;max-width:640px;">
            
            <!-- Brand Header -->
            <tr>
              <td style="padding:0 8px 14px 8px;">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                  <tr>
                    <td align="left" style="font-size:14px;color:#111827;font-weight:700;letter-spacing:0.2px;">
                      ${process.env.COMPANY_NAME}
                    </td>
                    <td align="right" style="font-size:12px;color:#6b7280;">
                      Admin Operations
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

            <!-- Main Card -->
            <tr>
              <td style="background:#ffffff;border-radius:16px;box-shadow:0 12px 34px rgba(16,24,40,0.10);overflow:hidden;">
                
                <!-- Top Accent -->
                <div style="height:6px;background:linear-gradient(90deg,#111827 0%, #4f46e5 45%, #06b6d4 100%);"></div>

                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="padding:28px 28px 22px 28px;">
                  
                  <!-- Title -->
                  <tr>
                    <td style="font-size:22px;line-height:1.25;color:#0f172a;font-weight:800;">
                      Admin account created
                    </td>
                  </tr>

                  <!-- Intro -->
                  <tr>
                    <td style="padding-top:10px;font-size:14px;line-height:1.7;color:#334155;">
                      Hi <strong style="color:#0f172a;">${adminName}</strong>,<br/>
                      Your administrator access has been provisioned. Use the credentials below to sign in.
                      For security, this password should be changed immediately after login.
                    </td>
                  </tr>

                  <!-- Credentials Card -->
                  <tr>
                    <td style="padding-top:18px;">
                      <table role="presentation" width="100%" cellpadding="0" cellspacing="0"
                        style="background:#f8fafc;border:1px solid #e5e7eb;border-radius:14px;">
                        <tr>
                          <td style="padding:16px 16px 10px 16px;font-size:12px;color:#64748b;font-weight:700;letter-spacing:.08em;text-transform:uppercase;">
                            Access credentials
                          </td>
                        </tr>
                        <tr>
                          <td style="padding:0 16px 16px 16px;">
                            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
                              <tr>
                                <td style="padding:10px 0;font-size:13px;color:#64748b;width:160px;">Email</td>
                                <td style="padding:10px 0;font-size:14px;color:#0f172a;font-weight:700;">
                                  ${adminEmail}
                                </td>
                              </tr>
                              <tr>
                                <td style="padding:10px 0;font-size:13px;color:#64748b;">Temporary Password</td>
                                <td style="padding:10px 0;font-size:14px;color:#0f172a;font-weight:700;">
                                  ${adminPassword}
                                </td>
                              </tr>
                            </table>

                            <!-- Divider -->
                            <div style="height:1px;background:#e5e7eb;margin:12px 0;"></div>

                            <div style="font-size:12px;line-height:1.6;color:#6b7280;">
                              <strong style="color:#0f172a;">Security tip:</strong>
                              Change your password after signing in. Do not forward this email.
                            </div>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>

                  <!-- CTA Button -->
                  <tr>
                    <td style="padding-top:18px;">
                      <table role="presentation" cellpadding="0" cellspacing="0">
                        <tr>
                          <td style="background:#111827;border-radius:12px;">
                            <a href="${process.env.COMPANY_WEBSITE_URL}" target="_blank"
                              style="display:inline-block;padding:12px 18px;font-size:14px;font-weight:700;color:#ffffff;text-decoration:none;border-radius:12px;">
                              Open Admin Login →
                            </a>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>

                  <!-- Secondary Note -->
                  <tr>
                    <td style="padding-top:14px;font-size:13px;line-height:1.7;color:#64748b;">
                      If you didn’t request this access, please contact us immediately at
                      <a href="mailto:${process.env.SMTP_EMAIL}" style="color:#4f46e5;text-decoration:none;font-weight:700;">${process.env.SMTP_EMAIL}</a>.
                    </td>
                  </tr>

                </table>

                <!-- Footer -->
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0"
                  style="padding:14px 28px 24px 28px;background:#ffffff;">
                  <tr>
                    <td style="font-size:12px;color:#9ca3af;line-height:1.6;">
                      This is an automated message from ${process.env.COMPANY_NAME}. Please do not reply to this email.
                      <br/>© 2025 ${process.env.COMPANY_NAME}. All rights reserved.
                    </td>
                  </tr>
                </table>

              </td>
            </tr>

            <!-- Spacer -->
            <tr><td style="height:16px;"></td></tr>

            <!-- Plain footer line -->
            <tr>
              <td align="center" style="font-size:11px;color:#9ca3af;padding:0 8px;">
                Need help? Email us at <a href="mailto:${process.env.SMTP_EMAIL}" style="color:#4f46e5;text-decoration:none;font-weight:700;">${process.env.SMTP_EMAIL}</a>
              </td>
            </tr>

          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`, // HTML version of the message
  });
    },3000)


    return res.status(200).json({message:"Admin created successfully",success:true})

    
} catch (error) {
 
    return res.status(500).json({message:"Internal Server Error",success:false})
}
}




const loginAdmin=async(req:Request,res:Response)=>{
    try {
        const errors:any=validationResult(req)
        if(!errors.isEmpty()){
            return res.status(400).json({message:errors.array()[0].msg,success:false})
        }
        const {adminEmail,adminPassword}=req.body
        const existAdmin=await Admin.findOne({adminEmail})
        if(!existAdmin){
            return res.status(400).json({message:"Admin not found",success:false})
        }

        const bytes  = CryptoJS.AES.decrypt(existAdmin.adminPassword, process.env.AUTH_SECRET!);
const originalText = bytes.toString(CryptoJS.enc.Utf8);

if(adminPassword!==originalText){

    return res.status(200).json({message:"Incorrect Password",success:false})
}


existAdmin.lastLoginDate=new Date()
existAdmin.loginHistory.push(new Date())
await existAdmin.save()

const token = jwt.sign({ adminId: existAdmin._id, adminEmail: existAdmin.adminEmail, adminMobileNo: existAdmin.adminMobileNo }, process.env.JWT_SECRET!);

return res.status(200).json({message:"Admin logged in successfully",token:token,success:true})


    

    } catch (error) {
        
        return res.status(500).json({message:"Internal Server Error",success:false})
    }
}

export {createNewAdmin,loginAdmin}