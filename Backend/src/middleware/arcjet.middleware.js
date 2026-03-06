import aj from "../lib/arcjet.js";
   import { isSpoofedBot } from "@arcjet/inspect";
export const arcjetProtection= async(req,res,next)=>{
    try {
        const decision= await aj.protect(req);
        if(decision.isDenied()){
            if(decision.reason.isRateLimit()){
                return res.status(429).json({msg:"Rate limit excedeed , pls try again later"})
            }
            else if(decision.reason.isBot()){
                return res.status(403).json({msg:"Bot access denied"})
            }else{
                return res.status(403).json({
                    msg:"Access denied by security poilicy"
                });
            }
        }
        //check for spoofed bots
        if(decision.results.some(isSpoofedBot))
            return res.status(403).json({
        error:"spofed bot detected",
        message:"malicious bot detected"
    });
    next(); 
    } catch (error) {
        console.log("Arcjet protection error"+ error);
        next();
    }
}
    