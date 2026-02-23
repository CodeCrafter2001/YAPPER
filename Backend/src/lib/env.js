import "dotenv/config";
export const ENV = {
  PORT: process.env.PORT,
  MONGO_URI: process.env.MONGO_URI,
  JWT_SECRET: process.env.JWT_SECRET,
  NODE_ENV: process.env.NODE_ENV,
  CLIENT_URL: process.env.CLIENT_URL,
  RESEND_API_KEY: process.env.RESEND_API_KEY,
  EMAIL_FROM: process.env.EMAIL_FROM,
  EMAIL_FROM_NAME: process.env.EMAIL_FROM_NAME,
   
};
// PORT= 3000
// MONGO_URI = mongodb+srv://anmolbansiwal018_db_user:Anmol%4020012004@yapper.czrcxq8.mongodb.net/YApper_DB
// if(!MONGO_URI) throw new error("MONGO_URI is not set");
// NODE_ENV= development
// JWT_SECRET=super_secret_key_123
// RESEND_API_KEY=re_FLEDt237_AFzSL9wXxKchdTio3zP4qcsE
// EMAIL_FROM= "onboarding@resend.dev"
// EMAIL_FROM_NAME="BURAK ORKEZ" 
// CLIENT_URL= http://localhost:5173 