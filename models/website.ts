import mongoose from "mongoose";

export interface IWebsite extends mongoose.Document {
  name: string;
  website_content: {
    hero: string;
    feature: string;
    about: string;
    contact: string;
  };
}

const websiteSchema = new mongoose.Schema({
  name: { type: String, required: true },
  website_content: {
    linkedin: { type: String, required: true },
    location: { type: String, required: true },
    email: { type: String, required: true },
    primary_color: { type: String, required: true },
    hero: { type: String, required: true },
    feature: { type: String, required: true },
    about: { type: String, required: true },
    contact: { type: String, required: true },
  },
});


const Website = mongoose.models.Website || mongoose.model('Website', websiteSchema);

export default Website;