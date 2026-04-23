import Contact from "../models/Contact.js";
import type{ Request, Response, NextFunction } from "express";

import { validationResult } from "express-validator";
import Admin from "../models/Admin.js";
import transporter from "../services/nodemailer.js";
interface ExtentedRequest extends Request {
  token?: any;
  file?: Express.Multer.File;
}



const create_new_contact = async (req: Request, res: Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: errors.array()[0]?.msg,
        success: false,
      });
    }

    const { name, email, mobile, message } = req.body;

    const newContact = new Contact({
      name,
      email,
      mobile,
      message,
    });

    await newContact.save();

    const thankYouHtml = `
      <div style="margin:0;padding:0;background-color:#07111f;font-family:Arial,Helvetica,sans-serif;color:#ffffff;">
        <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color:#07111f;">
          <tr>
            <td align="center" style="padding:40px 16px;">
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="max-width:680px;background:linear-gradient(135deg,#0b1728,#132238);border:1px solid #1e293b;border-radius:24px;overflow:hidden;">
                
                <tr>
                  <td style="background:linear-gradient(90deg,#06b6d4,#0ea5e9,#38bdf8);padding:28px 32px;">
                    <div style="font-size:12px;letter-spacing:2px;text-transform:uppercase;font-weight:700;color:#082f49;margin-bottom:10px;">
                      TecHealerz
                    </div>
                    <h1 style="margin:0;font-size:30px;line-height:1.3;color:#07111f;font-weight:800;">
                      Thank You for Contacting Us
                    </h1>
                    <p style="margin:10px 0 0;font-size:14px;line-height:1.7;color:#083344;">
                      We’ve received your message successfully.
                    </p>
                  </td>
                </tr>

                <tr>
                  <td style="padding:34px 32px;">
                    <p style="margin:0 0 16px;font-size:16px;line-height:1.9;color:#dbeafe;">
                      Hi <strong style="color:#ffffff;">${name}</strong>,
                    </p>

                    <p style="margin:0 0 16px;font-size:15px;line-height:1.9;color:#cbd5e1;">
                      Thank you for reaching out to <strong style="color:#ffffff;">TecHealerz</strong>.
                      We appreciate your interest and have received your message successfully.
                    </p>

                    <p style="margin:0 0 16px;font-size:15px;line-height:1.9;color:#cbd5e1;">
                      Our team will review your query and get back to you as soon as possible.
                    </p>

                    <div style="margin:24px 0;padding:18px 20px;border-radius:18px;background:#0f1c2e;border:1px solid #23344d;">
                      <p style="margin:0;font-size:14px;line-height:1.8;color:#dbeafe;">
                        We look forward to connecting with you and helping you with the right solution.
                      </p>
                    </div>

                    <p style="margin:24px 0 0;font-size:15px;line-height:1.9;color:#cbd5e1;">
                      Best Regards,<br />
                      <strong style="color:#ffffff;">TecHealerz Team</strong>
                    </p>
                  </td>
                </tr>

                <tr>
                  <td style="padding:18px 32px;background:#0a1422;border-top:1px solid #1e293b;">
                    <p style="margin:0;font-size:13px;line-height:1.7;color:#94a3b8;">
                      This is an automated acknowledgment email from TecHealerz.
                    </p>
                  </td>
                </tr>

              </table>
            </td>
          </tr>
        </table>
      </div>
    `;

    try {
      await transporter.sendMail({
        from: `"TecHealerz" <${process.env.SMTP_EMAIL}>`,
        to: email,
        subject: "Thank you for contacting TecHealerz",
        html: thankYouHtml,
      });
    } catch (mailError) {
      console.error("Thank you email sending failed:", mailError);
    }

    return res.status(201).json({
      message: "Contact Created Successfully",
      success: true,
    });
  } catch (error) {
    console.error("create_new_contact error:", error);
    return res.status(500).json({
      message: "Internal Server Error",
      success: false,
    });
  }
};




const fetch_all_contact=async(req:ExtentedRequest,res:Response)=>{
    try {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({message:errors.array()[0]?.msg,success:false});
        }

        const existAdmin=await Admin.findOne({_id:req.token.adminId})
        if(!existAdmin){
            return res.status(401).json({message:"Unauthorized Access",success:false});
        }

        const {search,skip}=req.body;



        interface searchQuery{
            $text?:{$search:string}
        }
        const query:searchQuery={};
        if(search) query.$text={$search:`"${search}"`}
        
        const data=await Contact.find(query as any).sort({_id:-1}).skip(skip).limit(100);

        return res.status(200).json({message:"Contacts fetched successfully",success:true,data});
    } catch (error) {
        
        return res.status(500).json({message:"Internal Server Error",success:false});
    }
}
export {create_new_contact,fetch_all_contact}