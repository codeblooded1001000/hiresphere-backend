import mongoose from "mongoose";

const candidateSchema = new mongoose.Schema({
    candidate_id: {
      type: String,
      unique: true,
      required: true
    },
    candidate_name: {
      type: String,
      required: true
    },
    candidate_email: {
      type: String
    },
    password: {
      type: String,
      required: true
    },
    is_deleted: {
      type: Boolean,
      default: false
    },
    candidate_contact: {
      type: String
    },
    isd_code: {
      type: String
    },
    resume: {
      type: String,
      required: true
    },
    created_at: {
      type: Date,
      default: Date.now()
    },
    updated_at: {
      type: Date,
      default: Date.now()
    }
}, {versionKey: false});

const Candidate = mongoose.model("candidates", candidateSchema);

export default Candidate;