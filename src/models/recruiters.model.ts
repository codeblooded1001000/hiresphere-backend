import mongoose from "mongoose";

const recruiterSchema = new mongoose.Schema({
    recruiter_id: {
      type: String,
      unique: true,
      required: true
    },
    recruiter_name: {
      type: String,
      required: true
    },
    company_id: {
      type: String
    },
    recruiter_email: {
      type: String
    },
    password: {
      type: String,
      required: true
    },
    is_admin: {
      type: Boolean,
      required: true
    },
    is_deleted: {
      type: Boolean,
      required: true
    },
    recruiter_contact: {
      type: String
    },
    isd_code: {
      type: String
    }
}, {timestamps: true, versionKey: false});

const Recruiter = mongoose.model("recruiters", recruiterSchema);

export default Recruiter;