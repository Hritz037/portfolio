import React, { useState } from 'react';
import { X, RotateCcw, Check, User, Sparkles } from 'lucide-react';
import { ProfileData } from '../types/portfolio';
import { initialProfile } from '../data/portfolioData';

interface ProfileCustomizerModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: ProfileData;
  onSaveProfile: (updated: ProfileData) => void;
}

export const ProfileCustomizerModal: React.FC<ProfileCustomizerModalProps> = ({
  isOpen,
  onClose,
  profile,
  onSaveProfile,
}) => {
  const [formData, setFormData] = useState<ProfileData>(profile);
  const [savedSuccess, setSavedSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveProfile(formData);
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 600);
  };

  const handleReset = () => {
    setFormData(initialProfile);
    onSaveProfile(initialProfile);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-neutral-950/80 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="relative w-full max-w-xl bg-neutral-900 light:bg-white border border-neutral-800 light:border-neutral-200 rounded-2xl shadow-2xl overflow-hidden my-auto text-neutral-100 light:text-neutral-900"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-800 light:border-neutral-200 bg-neutral-900/90 light:bg-neutral-100/90">
          <div className="flex items-center gap-2">
            <User className="w-4 h-4 text-indigo-400" />
            <h2 className="text-sm font-bold font-display">Personalize Portfolio Information</h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-neutral-400 hover:text-neutral-100 light:hover:text-neutral-900 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-neutral-300 light:text-neutral-700">
              Display Name
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-3 py-2 text-xs rounded-lg bg-neutral-950 light:bg-neutral-50 border border-neutral-800 light:border-neutral-300 text-neutral-100 light:text-neutral-900 focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-medium text-neutral-300 light:text-neutral-700">
              Professional Role Title
            </label>
            <input
              type="text"
              value={formData.roleTitle}
              onChange={(e) => setFormData({ ...formData, roleTitle: e.target.value })}
              className="w-full px-3 py-2 text-xs rounded-lg bg-neutral-950 light:bg-neutral-50 border border-neutral-800 light:border-neutral-300 text-neutral-100 light:text-neutral-900 focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-medium text-neutral-300 light:text-neutral-700">
              Primary Headline
            </label>
            <input
              type="text"
              value={formData.headline}
              onChange={(e) => setFormData({ ...formData, headline: e.target.value })}
              className="w-full px-3 py-2 text-xs rounded-lg bg-neutral-950 light:bg-neutral-50 border border-neutral-800 light:border-neutral-300 text-neutral-100 light:text-neutral-900 focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-neutral-300 light:text-neutral-700">
                Direct Email
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-3 py-2 text-xs rounded-lg bg-neutral-950 light:bg-neutral-50 border border-neutral-800 light:border-neutral-300 text-neutral-100 light:text-neutral-900 focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-medium text-neutral-300 light:text-neutral-700">
                Location
              </label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="w-full px-3 py-2 text-xs rounded-lg bg-neutral-950 light:bg-neutral-50 border border-neutral-800 light:border-neutral-300 text-neutral-100 light:text-neutral-900 focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-medium text-neutral-300 light:text-neutral-700">
              Availability Status Tagline
            </label>
            <input
              type="text"
              value={formData.availability}
              onChange={(e) => setFormData({ ...formData, availability: e.target.value })}
              className="w-full px-3 py-2 text-xs rounded-lg bg-neutral-950 light:bg-neutral-50 border border-neutral-800 light:border-neutral-300 text-neutral-100 light:text-neutral-900 focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-medium text-neutral-300 light:text-neutral-700">
              Short Bio Narrative
            </label>
            <textarea
              rows={3}
              value={formData.bioIntro}
              onChange={(e) => setFormData({ ...formData, bioIntro: e.target.value })}
              className="w-full px-3 py-2 text-xs rounded-lg bg-neutral-950 light:bg-neutral-50 border border-neutral-800 light:border-neutral-300 text-neutral-100 light:text-neutral-900 focus:outline-none focus:border-indigo-500 resize-none"
            />
          </div>

          <div className="pt-3 border-t border-neutral-800 light:border-neutral-200 flex items-center justify-between">
            <button
              type="button"
              onClick={handleReset}
              className="text-xs text-neutral-400 hover:text-neutral-200 light:hover:text-neutral-900 flex items-center gap-1.5 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset to Defaults</span>
            </button>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-3 py-1.5 text-xs text-neutral-400 hover:text-neutral-200 light:hover:text-neutral-800 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="inline-flex items-center gap-1.5 px-4 py-1.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg shadow-sm transition-all"
              >
                {savedSuccess ? (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    <span>Saved!</span>
                  </>
                ) : (
                  <span>Save Changes</span>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
