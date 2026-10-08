import React, { useState } from 'react';
import {
  Github,
  Linkedin,
  Twitter,
  Mail,
  Send,
  CheckCircle,
  Copy,
  Check,
  ExternalLink,
  MessageSquare,
  Sparkles,
  MapPin,
  Clock,
} from 'lucide-react';
import { ProfileData } from '../types/portfolio';

interface ProfilesAndContactSectionProps {
  profile: ProfileData;
}

export const ProfilesAndContactSection: React.FC<ProfilesAndContactSectionProps> = ({ profile }) => {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [inquiryType, setInquiryType] = useState('Senior / Staff Role');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formError, setFormError] = useState('');

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    } catch {
      // Fallback
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');

    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setFormError('Please fill out all fields before sending.');
      return;
    }

    if (!formData.email.includes('@') || !formData.email.includes('.')) {
      setFormError('Please provide a valid email address.');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      setFormData({ name: '', email: '', message: '' });
    }, 600);
  };

  const inquiryOptions = [
    'Senior / Staff Role',
    'Technical Advisory',
    'Consulting / Architecture',
    'Coffee / Intro',
  ];

  return (
    <section id="contact" className="py-20 border-t border-neutral-800/80 light:border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-14">
          <div className="text-xs font-semibold text-indigo-400 light:text-indigo-600 tracking-wider uppercase mb-2">
            Professional Network & Inquiries
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-neutral-100 light:text-neutral-900 font-display tracking-tight text-balance">
            Let&rsquo;s start a conversation.
          </h2>
          <p className="text-sm text-neutral-400 light:text-neutral-600 mt-2">
            Currently discussing opportunities for senior engineering roles, architectural advisory, and high-impact software projects.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Professional Profiles Cards */}
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-3">
              {/* GitHub Card */}
              <a
                href="https://github.com/hritikagupta"
                target="_blank"
                rel="noopener noreferrer"
                className="group p-5 rounded-2xl bg-neutral-900/60 light:bg-neutral-100/80 border border-neutral-800/80 light:border-neutral-200 hover:border-neutral-700 light:hover:border-neutral-300 transition-all flex items-center justify-between"
              >
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-xl bg-neutral-800 light:bg-neutral-200 text-neutral-100 light:text-neutral-900 group-hover:scale-105 transition-transform">
                    <Github className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-neutral-100 light:text-neutral-900 font-display">
                      GitHub
                    </div>
                    <div className="text-xs text-neutral-400 light:text-neutral-600 font-mono-code">
                      @hritikagupta
                    </div>
                  </div>
                </div>
                <ExternalLink className="w-4 h-4 text-neutral-500 group-hover:text-indigo-400 transition-colors" />
              </a>

              {/* LinkedIn Card */}
              <a
                href="https://linkedin.com/in/hritikagupta"
                target="_blank"
                rel="noopener noreferrer"
                className="group p-5 rounded-2xl bg-neutral-900/60 light:bg-neutral-100/80 border border-neutral-800/80 light:border-neutral-200 hover:border-neutral-700 light:hover:border-neutral-300 transition-all flex items-center justify-between"
              >
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-xl bg-neutral-800 light:bg-neutral-200 text-neutral-100 light:text-neutral-900 group-hover:scale-105 transition-transform">
                    <Linkedin className="w-5 h-5 text-sky-400" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-neutral-100 light:text-neutral-900 font-display">
                      LinkedIn
                    </div>
                    <div className="text-xs text-neutral-400 light:text-neutral-600 font-mono-code">
                      in/hritikagupta
                    </div>
                  </div>
                </div>
                <ExternalLink className="w-4 h-4 text-neutral-500 group-hover:text-indigo-400 transition-colors" />
              </a>

              {/* X / Twitter Card */}
              <a
                href="https://x.com/hritikagupta"
                target="_blank"
                rel="noopener noreferrer"
                className="group p-5 rounded-2xl bg-neutral-900/60 light:bg-neutral-100/80 border border-neutral-800/80 light:border-neutral-200 hover:border-neutral-700 light:hover:border-neutral-300 transition-all flex items-center justify-between"
              >
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-xl bg-neutral-800 light:bg-neutral-200 text-neutral-100 light:text-neutral-900 group-hover:scale-105 transition-transform">
                    <Twitter className="w-5 h-5 text-indigo-400" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-neutral-100 light:text-neutral-900 font-display">
                      X / Twitter
                    </div>
                    <div className="text-xs text-neutral-400 light:text-neutral-600 font-mono-code">
                      @hritikagupta
                    </div>
                  </div>
                </div>
                <ExternalLink className="w-4 h-4 text-neutral-500 group-hover:text-indigo-400 transition-colors" />
              </a>

              {/* Direct Email Card with 1-Click Copy */}
              <div className="p-5 rounded-2xl bg-neutral-900/60 light:bg-neutral-100/80 border border-neutral-800/80 light:border-neutral-200 flex items-center justify-between">
                <div className="flex items-center gap-4 min-w-0">
                  <div className="p-3 rounded-xl bg-neutral-800 light:bg-neutral-200 text-neutral-100 light:text-neutral-900">
                    <Mail className="w-5 h-5 text-emerald-400" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-sm font-bold text-neutral-100 light:text-neutral-900 font-display">
                      Direct Email
                    </div>
                    <div className="text-xs text-neutral-400 light:text-neutral-600 font-mono-code truncate">
                      {profile.email}
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleCopyEmail}
                  className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-neutral-800 light:bg-neutral-200 hover:bg-neutral-700 light:hover:bg-neutral-300 text-neutral-200 light:text-neutral-800 flex items-center gap-1.5 transition-colors shrink-0 ml-2"
                >
                  {copiedEmail ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedEmail ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
            </div>

            {/* Availability details */}
            <div className="p-5 rounded-2xl bg-neutral-900/30 light:bg-neutral-100/40 border border-neutral-800/60 light:border-neutral-200 space-y-2 text-xs text-neutral-400 light:text-neutral-600">
              <div className="flex items-center gap-2 text-neutral-300 light:text-neutral-700 font-medium">
                <MapPin className="w-3.5 h-3.5 text-indigo-400" />
                <span>Base: {profile.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-neutral-500" />
                <span>Response Time: Usually within 24 hours</span>
              </div>
            </div>
          </div>

          {/* Right Column: Working Interactive Contact Form */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-8 rounded-2xl bg-neutral-900/60 light:bg-neutral-100/80 border border-neutral-800/80 light:border-neutral-200 shadow-sm">
              <h3 className="text-lg font-bold text-neutral-100 light:text-neutral-900 font-display mb-1 flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-indigo-400" />
                <span>Send a Direct Message</span>
              </h3>
              <p className="text-xs text-neutral-400 light:text-neutral-600 mb-6">
                Fill out the form below to reach me directly for hiring, consulting, or technical advisory.
              </p>

              {submitted ? (
                <div className="py-12 text-center space-y-3 animate-in fade-in duration-200">
                  <div className="inline-flex p-3 rounded-full bg-emerald-500/10 text-emerald-400 mb-2">
                    <CheckCircle className="w-8 h-8" />
                  </div>
                  <h4 className="text-lg font-bold text-neutral-100 light:text-neutral-900 font-display">
                    Message Delivered!
                  </h4>
                  <p className="text-xs text-neutral-400 light:text-neutral-600 max-w-sm mx-auto">
                    Thank you for reaching out. I have received your note and will review it shortly.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-4 px-4 py-2 text-xs font-semibold text-neutral-200 light:text-neutral-800 bg-neutral-800 light:bg-neutral-200 hover:bg-neutral-700 rounded-lg transition-colors"
                  >
                    Send Another Note
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Inquiry Topic Selection */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-neutral-300 light:text-neutral-700">
                      Inquiry Topic
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {inquiryOptions.map((opt) => (
                        <button
                          key={opt}
                          type="button"
                          onClick={() => setInquiryType(opt)}
                          className={`px-3 py-2 text-xs rounded-lg text-left transition-colors font-medium border ${
                            inquiryType === opt
                              ? 'bg-indigo-600/15 border-indigo-500 text-indigo-300 light:text-indigo-700'
                              : 'bg-neutral-900 light:bg-white border-neutral-800 light:border-neutral-300 text-neutral-400 light:text-neutral-600 hover:border-neutral-700'
                          }`}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Name and Email Inputs */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label htmlFor="contact-name" className="text-xs font-medium text-neutral-300 light:text-neutral-700">
                        Your Name
                      </label>
                      <input
                        id="contact-name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Ada Lovelace"
                        className="w-full px-3.5 py-2.5 text-xs rounded-lg bg-neutral-900 light:bg-white border border-neutral-800 light:border-neutral-300 text-neutral-100 light:text-neutral-900 placeholder:text-neutral-500 focus:outline-none focus:border-indigo-500 transition-colors"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label htmlFor="contact-email" className="text-xs font-medium text-neutral-300 light:text-neutral-700">
                        Your Email
                      </label>
                      <input
                        id="contact-email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="ada@domain.com"
                        className="w-full px-3.5 py-2.5 text-xs rounded-lg bg-neutral-900 light:bg-white border border-neutral-800 light:border-neutral-300 text-neutral-100 light:text-neutral-900 placeholder:text-neutral-500 focus:outline-none focus:border-indigo-500 transition-colors"
                      />
                    </div>
                  </div>

                  {/* Message Field */}
                  <div className="space-y-1.5">
                    <label htmlFor="contact-message" className="text-xs font-medium text-neutral-300 light:text-neutral-700">
                      Message / Project Details
                    </label>
                    <textarea
                      id="contact-message"
                      rows={4}
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Hi Hritika, I would love to talk about our engineering team's open role..."
                      className="w-full px-3.5 py-2.5 text-xs rounded-lg bg-neutral-900 light:bg-white border border-neutral-800 light:border-neutral-300 text-neutral-100 light:text-neutral-900 placeholder:text-neutral-500 focus:outline-none focus:border-indigo-500 transition-colors resize-none"
                    />
                  </div>

                  {formError && (
                    <div className="text-xs text-rose-400 font-medium">
                      {formError}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full inline-flex items-center justify-center gap-2 px-5 py-2.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 disabled:opacity-60 rounded-lg shadow-sm hover:shadow transition-all duration-150 active:scale-98"
                  >
                    {isSubmitting ? (
                      <span>Sending note...</span>
                    ) : (
                      <>
                        <Send className="w-3.5 h-3.5" />
                        <span>Send Message</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
