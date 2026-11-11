
import React, { useState } from 'react';
import { api } from '../services/api';

export default function ContactSection() {

  // STEMORA Official Contact Details
  const currentSettings = {
    phone: "7090000417",
    email: "stemoraeducation@gmail.com",
    location: "Geethanjali Layout, HAL 3rd Stage, Bhoomi Reddy Colony, New Thippasandra, Bengaluru, Karnataka 560075, India"
  };

  const [formData, setFormData] = useState({
    school_name: '',
    contact_person: '',
    phone: '',
    email: '',
    programme: '',
    message: ''
  });

  const [status, setStatus] = useState({
    submitting: false,
    success: false,
    error: null
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });

    if (status.error) {
      setStatus({ ...status, error: null });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.school_name ||
      !formData.contact_person ||
      !formData.phone ||
      !formData.email
    ) {
      setStatus({
        submitting: false,
        success: false,
        error: 'Please fill out all required fields: School name, Contact person, Phone, and Email.'
      });
      return;
    }

    try {
      setStatus({
        submitting: true,
        success: false,
        error: null
      });

      await api.submitEnquiry(formData);

      setStatus({
        submitting: false,
        success: true,
        error: null
      });

      setFormData({
        school_name: '',
        contact_person: '',
        phone: '',
        email: '',
        programme: '',
        message: ''
      });

    } catch (err) {
      console.error('[SUBMISSION ERROR]', err);

      setStatus({
        submitting: false,
        success: false,
        error: err.message || 'Could not submit your enquiry. Please check your network or try again.'
      });
    }
  };

  return (
    <section id="contact" className="py-20 lg:py-24">

      <div className="max-w-[1120px] mx-auto px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-14 items-start">

        {/* Left Information Column */}
        <div className="info">

          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-[-0.025em] leading-[1.08] text-navy">
            Ready to bring Stemora to your school?
          </h2>

          <p className="mt-4 mb-7 text-lg text-mut max-w-[480px]">
            Request a callback or book a programme discussion.
          </p>

          <div className="space-y-3 font-bold text-navy text-[17px]">

            <div className="flex items-center">
              <span className="inline-block w-3 h-3 bg-teal border-2 border-navy rounded-full mr-3 shrink-0" />
              <span>
                Phone:{' '}
                <a
                  href={`tel:${currentSettings.phone}`}
                  className="hover:text-teal-dark hover:underline"
                >
                  {currentSettings.phone}
                </a>
              </span>
            </div>

            <div className="flex items-center">
              <span className="inline-block w-3 h-3 bg-teal border-2 border-navy rounded-full mr-3 shrink-0" />
              <span>
                Email:{' '}
                <a
                  href={`mailto:${currentSettings.email}`}
                  className="hover:text-teal-dark hover:underline"
                >
                  {currentSettings.email}
                </a>
              </span>
            </div>

            <div className="flex items-start">
              <span className="inline-block w-3 h-3 bg-teal border-2 border-navy rounded-full mr-3 mt-1.5 shrink-0" />
              <span>
                Location: {currentSettings.location}
              </span>
            </div>

          </div>
        </div>

        {/* Right Contact Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-gold border-3 border-navy rounded-[20px] shadow-brutal-lg p-7 sm:p-8 grid gap-3.5"
        >

          {status.success && (
            <div className="bg-white border-2.5 border-navy rounded-xl p-4 text-navy font-bold text-sm shadow-sm flex items-start gap-3">
              <span className="text-xl">🎉</span>
              <div>
                <p className="text-navy font-bold">
                  Enquiry sent successfully!
                </p>
                <p className="font-normal text-xs text-mut mt-0.5">
                  Thank you! Our STEM director will get in touch with you shortly. A confirmation has also been dispatched.
                </p>
              </div>
            </div>
          )}

          {status.error && (
            <div className="bg-red-50 border-2.5 border-red-500 rounded-xl p-3 text-red-700 font-bold text-xs">
              ⚠️ {status.error}
            </div>
          )}

          <label className="text-sm font-bold text-navy grid gap-1.5">
            School name *
            <input
              type="text"
              name="school_name"
              value={formData.school_name}
              onChange={handleChange}
              className="font-sans p-3 px-3.5 border-2.5 border-navy rounded-[10px] w-full bg-white text-navy focus:outline-none focus:ring-2 focus:ring-navy"
              required
            />
          </label>

          <label className="text-sm font-bold text-navy grid gap-1.5">
            Contact person *
            <input
              type="text"
              name="contact_person"
              value={formData.contact_person}
              onChange={handleChange}
              className="font-sans p-3 px-3.5 border-2.5 border-navy rounded-[10px] w-full bg-white text-navy focus:outline-none focus:ring-2 focus:ring-navy"
              required
            />
          </label>

          <label className="text-sm font-bold text-navy grid gap-1.5">
            Phone *
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="font-sans p-3 px-3.5 border-2.5 border-navy rounded-[10px] w-full bg-white text-navy focus:outline-none focus:ring-2 focus:ring-navy"
              required
            />
          </label>

          <label className="text-sm font-bold text-navy grid gap-1.5">
            Email *
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="font-sans p-3 px-3.5 border-2.5 border-navy rounded-[10px] w-full bg-white text-navy focus:outline-none focus:ring-2 focus:ring-navy"
              required
            />
          </label>

          <label className="text-sm font-bold text-navy grid gap-1.5">
            Programme interest
            <input
              type="text"
              name="programme"
              value={formData.programme}
              onChange={handleChange}
              className="font-sans p-3 px-3.5 border-2.5 border-navy rounded-[10px] w-full bg-white text-navy focus:outline-none focus:ring-2 focus:ring-navy"
            />
          </label>

          <label className="text-sm font-bold text-navy grid gap-1.5">
            Message
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              className="font-sans p-3 px-3.5 border-2.5 border-navy rounded-[10px] w-full bg-white text-navy min-h-[84px] resize-y focus:outline-none focus:ring-2 focus:ring-navy"
            />
          </label>

          <button
            type="submit"
            disabled={status.submitting}
            className="font-sans font-extrabold bg-navy text-white hover:bg-teal-dark border-0 p-4 rounded-full cursor-pointer transition-colors shadow-sm disabled:opacity-70 mt-2 text-base flex items-center justify-center gap-2"
          >
            {status.submitting ? (
              <>
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                <span>Sending enquiry...</span>
              </>
            ) : (
              'Get in touch'
            )}
          </button>

        </form>
      </div>
    </section>
  );
}
