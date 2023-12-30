import mongoose from "mongoose";

const companiesSchema = new mongoose.Schema({
  company_id: {
    type: String,
    unique: true,
    required: true
  },
  company_name: {
    type: String,
    required: true
  },
  company_email: {
    type: String,
    unique: true,
    required: true
  },
  company_address_line1: {
    type: String
  },
  company_address_line2: {
    type: String
  },
  company_address_line3: {
    type: String
  },
  country: {
    type: String
  },
  company_size: {
    type: String
  },
  company_logo: {
    type: String
  },
  is_deleted: {
    type: Boolean,
    default: false
  },
  created_at: {
    type: Date,
    default: Date.now()
  },
  updated_at: {
    type: Date,
    default: Date.now()
  }
}, {versionKey: false})

const Company = mongoose.model("companies", companiesSchema);

export default Company;