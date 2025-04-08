import { Request, Response } from "express"
import { Webhook } from "svix"
import User from "../models/User"
import bcrypt from "bcrypt"

export const clerkWebHook = async (req: Request, res : Response) => {
    try {
        const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET as string)
        await whook.verify(JSON.stringify(req.body), {
            "svix-id" : req.headers['svix-id'] as string,
            "svix-signature"  : req.headers['svix-signature'] as string,
            "svix-timestamp"  : req.headers['svix-timestamp'] as string
        })

        const {data , type} = req.body

        const timestamp = Date.now().toString().slice(-5);
        const namePart = `${data.firstName}${data.lastName}`.replace(/\s+/g, "").toLowerCase().slice(0, 5);
        const phonePart = data.phone.slice(-4);
        const generatedReferralId = `${namePart}${phonePart}${timestamp}`;

        const hashedPassword = await bcrypt.hash(data.password, 10);

        switch (type) {
            case 'user.created':
                const userData = {
                    email: data.email_addresses[0]?.email_address || "",
                    name: `${data.first_name} ${data.last_name}`.trim(),
                    image: data.image_url || "",
                    ...(data.referralId?.trim() === "" || !data.referralId ? { referralId: generatedReferralId, RootUser : true } : ""),
                    password: hashedPassword,
                    phone : data.phone
                };
        
                await User.create(userData);
                res.json({})
                break;
        
            case 'user.updated':
                await User.findOneAndUpdate(
                    { _id: data.id },
                    {
                        name: `${data.first_name} ${data.last_name}`.trim(),
                        email: data.email_addresses[0]?.email_address || "",
                        image: data.image_url || "",
                    },
                    { new: true }
                );
                res.json({})
                break;
        
            case 'user.deleted':
                await User.findByIdAndDelete(data.id);
                res.json({})
                break;
        
            default:
                console.log(`Unhandled event type: ${type}`);
                break;
        }
        
    } catch (error) {
        console.log((error as Error).message);
        res.json({success : false , message : 'Webhook'})
    }
}
