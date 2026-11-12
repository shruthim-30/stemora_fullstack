import React, { useState, useEffect } from 'react';
import { api } from '../services/api';

export default function AdminModal({ isOpen, onClose, content, onContentUpdated, onAuthChange }) {
  const [activeTab, setActiveTab] = useState('enquiries');
  const [enquiries, setEnquiries] = useState([]);
  const [loadingEnquiries, setLoadingEnquiries] = useState(false);
  const [enquiriesError, setEnquiriesError] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(false);
  const [loggingIn, setLoggingIn] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [loginForm, setLoginForm] = useState({ username: '', password: '' });

  // Form states for stats
  const [statsForm, setStatsForm] = useState({
    students_trained: '',
    sessions_delivered: '',
    projects_built: '',
    partner_schools: ''
  });

  // Form states for site settings
  const [settingsForm, setSettingsForm] = useState({
    phone: '',
    email: '',
    location: '',
    summer_dates: '',
    summer_grades: '',
    summer_venue: ''
  });

  const [savingMsg, setSavingMsg] = useState('');

  useEffect(() => {
    if (content?.stats) {
      setStatsForm(content.stats);
    }
    if (content?.settings) {
      setSettingsForm(content.settings);
    }
  }, [content]);

  useEffect(() => {
    if (!isOpen) return undefined;

    let active = true;
    setCheckingAuth(true);
    setLoginError('');
    api.getAdminSession()
      .then(authenticated => {
        if (!active) return;
        setIsAuthenticated(authenticated);
        onAuthChange?.(authenticated);
      })
      .catch(error => {
        if (!active) return;
        setIsAuthenticated(false);
        onAuthChange?.(false);
        setLoginError(error.message);
      })
      .finally(() => {
        if (active) setCheckingAuth(false);
      });

    return () => {
      active = false;
    };
  }, [isOpen, onAuthChange]);

  useEffect(() => {
    if (isOpen && isAuthenticated && activeTab === 'enquiries') {
      loadEnquiries();
    }
  }, [isOpen, isAuthenticated, activeTab]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoggingIn(true);
    setLoginError('');
    try {
      await api.loginAdmin(loginForm);
      setIsAuthenticated(true);
      onAuthChange?.(true);
      setLoginForm({ username: '', password: '' });
    } catch (error) {
      setLoginError(error.message);
    } finally {
      setLoggingIn(false);
    }
  };

  const handleLogout = async () => {
    try {
      await api.logoutAdmin();
    } catch (error) {
      setLoginError(error.message);
    } finally {
      setIsAuthenticated(false);
      onAuthChange?.(false);
    }
  };

  const loadEnquiries = async () => {
    try {
      setLoadingEnquiries(true);
      setEnquiriesError('');
      const data = await api.getEnquiries();
      setEnquiries(data || []);
    } catch (err) {
      setEnquiriesError(err.message || 'Could not load enquiries.');
    } finally {
      setLoadingEnquiries(false);
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      await api.updateEnquiryStatus(id, newStatus);
      setEnquiries(enquiries.map(e => e.id === id ? { ...e, status: newStatus } : e));
    } catch (err) {
      alert('Failed to update status: ' + err.message);
    }
  };

  const handleSaveStats = async (e) => {
    e.preventDefault();
    try {
      setSavingMsg('Saving stats...');
      const updated = await api.updateStats(statsForm);
      if (onContentUpdated) onContentUpdated({ ...content, stats: updated });
      setSavingMsg('✅ Statistics updated successfully in database!');
      setTimeout(() => setSavingMsg(''), 3000);
    } catch (err) {
      alert('Failed to save stats: ' + err.message);
      setSavingMsg('');
    }
  };

  const handleSaveSettings = async (e) => {
    e.preventDefault();
    try {
      setSavingMsg('Saving settings...');
      const updated = await api.updateSettings(settingsForm);
      if (onContentUpdated) onContentUpdated({ ...content, settings: updated });
      setSavingMsg('✅ Site settings updated successfully in database!');
      setTimeout(() => setSavingMsg(''), 3000);
    } catch (err) {
      alert('Failed to save settings: ' + err.message);
      setSavingMsg('');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy/70 backdrop-blur-sm animate-fade-in">
      <div className="bg-white border-3 border-navy rounded-[20px] shadow-brutal-lg w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="bg-navy text-white px-6 py-4 flex items-center justify-between border-b-3 border-navy">
          <div className="flex items-center gap-2">
            <span className="text-xl">🛠️</span>
            <div>
              <h3 className="font-extrabold text-lg text-white">Stemora Dynamic Control Panel</h3>
              <p className="text-xs text-[#aebfcd]">Manage inquiries, live metrics and content stored in your database</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-gold border-2 border-navy text-navy font-bold flex items-center justify-center hover:bg-[#e09b17]"
          >
            ✕
          </button>
        </div>

        {/* Tab Navigation */}
        {isAuthenticated && (
        <div className="flex items-center justify-between border-b-2 border-grid bg-paper px-6 pt-3 gap-2 overflow-x-auto">
          <div className="flex gap-2">
          <button
            onClick={() => setActiveTab('enquiries')}
            className={`px-4 py-2 font-bold text-sm rounded-t-lg transition-colors border-t border-x ${
              activeTab === 'enquiries'
                ? 'bg-white border-navy border-b-white text-navy font-extrabold -mb-[2px] shadow-sm'
                : 'border-transparent text-mut hover:text-navy'
            }`}
          >
            📬 School Enquiries ({enquiries.length})
          </button>

          <button
            onClick={() => setActiveTab('stats')}
            className={`px-4 py-2 font-bold text-sm rounded-t-lg transition-colors border-t border-x ${
              activeTab === 'stats'
                ? 'bg-white border-navy border-b-white text-navy font-extrabold -mb-[2px] shadow-sm'
                : 'border-transparent text-mut hover:text-navy'
            }`}
          >
            📊 Live Statistics
          </button>

          <button
            onClick={() => setActiveTab('settings')}
            className={`px-4 py-2 font-bold text-sm rounded-t-lg transition-colors border-t border-x ${
              activeTab === 'settings'
                ? 'bg-white border-navy border-b-white text-navy font-extrabold -mb-[2px] shadow-sm'
                : 'border-transparent text-mut hover:text-navy'
            }`}
          >
            ⚙️ Contact & Summer Settings
          </button>
          </div>
          <button
            type="button"
            onClick={handleLogout}
            className="shrink-0 px-3 py-2 text-sm font-bold text-navy hover:text-teal-dark"
          >
            Sign out
          </button>
        </div>
        )}

        {/* Tab Body */}
        <div className="p-6 overflow-y-auto flex-1">
          {!isAuthenticated ? (
            <div className="max-w-md mx-auto py-6">
              <h4 className="text-xl font-extrabold text-navy mb-2">Admin sign in</h4>
              <p className="text-sm text-mut mb-5">Sign in to manage enquiries and site content.</p>

              {checkingAuth ? (
                <p className="text-sm font-semibold text-mut">Checking your session...</p>
              ) : (
                <form onSubmit={handleLogin} className="space-y-4">
                  {loginError && (
                    <p role="alert" className="bg-red-50 border-2 border-red-500 rounded-lg p-3 text-sm font-semibold text-red-700">
                      {loginError}
                    </p>
                  )}
                  <label className="block text-sm font-bold text-navy">
                    Username
                    <input
                      type="text"
                      autoComplete="username"
                      value={loginForm.username}
                      onChange={(e) => setLoginForm({ ...loginForm, username: e.target.value })}
                      className="mt-1 w-full border-2 border-navy rounded-lg p-2.5"
                      required
                    />
                  </label>
                  <label className="block text-sm font-bold text-navy">
                    Password
                    <input
                      type="password"
                      autoComplete="current-password"
                      value={loginForm.password}
                      onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                      className="mt-1 w-full border-2 border-navy rounded-lg p-2.5"
                      required
                    />
                  </label>
                  <button
                    type="submit"
                    disabled={loggingIn}
                    className="btn-brutal btn-gold text-navy font-extrabold px-6 py-3 disabled:opacity-70"
                  >
                    {loggingIn ? 'Signing in...' : 'Sign in'}
                  </button>
                </form>
              )}
            </div>
          ) : (
          <>
          {savingMsg && (
            <div className="mb-4 p-3 bg-teal/20 border-2 border-teal-dark rounded-xl text-teal-dark font-bold text-sm">
              {savingMsg}
            </div>
          )}

          {/* TAB 1: ENQUIRIES */}
          {activeTab === 'enquiries' && (
            <div>
              <div className="flex justify-between items-center mb-4">
                <h4 className="font-extrabold text-navy text-base">Incoming Demo & Programme Requests</h4>
                <button
                  onClick={loadEnquiries}
                  className="text-xs bg-paper border border-navy px-3 py-1.5 rounded-full font-bold hover:bg-white"
                >
                  🔄 Refresh
                </button>
              </div>

              {enquiriesError ? (
                <div role="alert" className="py-6 text-center text-red-700 font-semibold">
                  Could not load enquiries: {enquiriesError}
                </div>
              ) : loadingEnquiries ? (
                <div className="py-12 text-center text-mut font-bold">Loading enquiries from database...</div>
              ) : enquiries.length === 0 ? (
                <div className="py-12 text-center text-mut bg-paper border border-dashed border-grid rounded-xl">
                  No enquiries received yet. Try filling out the contact form on the home page!
                </div>
              ) : (
                <div className="space-y-4">
                  {enquiries.map((enq) => (
                    <div
                      key={enq.id}
                      className="border-2.5 border-navy rounded-[14px] p-4 bg-white shadow-sm flex flex-col md:flex-row gap-4 justify-between items-start md:items-center"
                    >
                      <div className="flex-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <strong className="text-base text-navy font-extrabold">{enq.school_name}</strong>
                          <span className="text-xs bg-teal/20 text-teal-dark font-bold px-2 py-0.5 rounded-full border border-teal">
                            {enq.programme || 'General Enquiry'}
                          </span>
                          <span className="text-xs text-mut font-normal">
                            {enq.created_at ? new Date(enq.created_at).toLocaleString() : 'Recent'}
                          </span>
                        </div>
                        <div className="text-sm font-semibold text-mut mt-1">
                          👤 {enq.contact_person} &nbsp;|&nbsp; 📞 <a href={`tel:${enq.phone}`} className="text-teal-dark underline">{enq.phone}</a> &nbsp;|&nbsp; ✉️ <a href={`mailto:${enq.email}`} className="text-teal-dark underline">{enq.email}</a>
                        </div>
                        {enq.message && (
                          <div className="mt-2 text-xs bg-paper p-2.5 rounded-lg border border-grid text-navy">
                            "{enq.message}"
                          </div>
                        )}
                      </div>

                      <div className="shrink-0 flex items-center gap-2">
                        <label className="text-xs font-bold text-navy">Status:</label>
                        <select
                          value={enq.status || 'new'}
                          onChange={(e) => handleStatusChange(enq.id, e.target.value)}
                          className="text-xs font-bold border-2 border-navy rounded-lg p-1.5 bg-paper cursor-pointer"
                        >
                          <option value="new">🟡 New</option>
                          <option value="in_progress">🔵 In Progress</option>
                          <option value="contacted">🟢 Contacted</option>
                          <option value="closed">⚪ Closed</option>
                        </select>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 2: LIVE STATISTICS */}
          {activeTab === 'stats' && (
            <form onSubmit={handleSaveStats} className="space-y-4 max-w-xl">
              <p className="text-sm text-mut mb-4">
                Update the numbers displayed in the <strong>Achievements</strong> section. Any changes saved here update directly in the database!
              </p>

              <div>
                <label className="block text-xs font-bold text-navy uppercase mb-1">Students Trained</label>
                <input
                  type="text"
                  value={statsForm.students_trained}
                  onChange={(e) => setStatsForm({ ...statsForm, students_trained: e.target.value })}
                  placeholder="e.g. 2,500+"
                  className="w-full border-2 border-navy rounded-lg p-2.5 font-bold text-navy"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-navy uppercase mb-1">Sessions Delivered</label>
                <input
                  type="text"
                  value={statsForm.sessions_delivered}
                  onChange={(e) => setStatsForm({ ...statsForm, sessions_delivered: e.target.value })}
                  placeholder="e.g. 450+"
                  className="w-full border-2 border-navy rounded-lg p-2.5 font-bold text-navy"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-navy uppercase mb-1">Projects Built</label>
                <input
                  type="text"
                  value={statsForm.projects_built}
                  onChange={(e) => setStatsForm({ ...statsForm, projects_built: e.target.value })}
                  placeholder="e.g. 1,800+"
                  className="w-full border-2 border-navy rounded-lg p-2.5 font-bold text-navy"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-navy uppercase mb-1">Partner Schools</label>
                <input
                  type="text"
                  value={statsForm.partner_schools}
                  onChange={(e) => setStatsForm({ ...statsForm, partner_schools: e.target.value })}
                  placeholder="e.g. 35+"
                  className="w-full border-2 border-navy rounded-lg p-2.5 font-bold text-navy"
                  required
                />
              </div>

              <button
                type="submit"
                className="btn-brutal btn-gold text-navy font-extrabold px-6 py-3 mt-4 cursor-pointer"
              >
                Save Statistics
              </button>
            </form>
          )}

          {/* TAB 3: CONTACT & SETTINGS */}
          {activeTab === 'settings' && (
            <form onSubmit={handleSaveSettings} className="space-y-4 max-w-xl">
              <p className="text-sm text-mut mb-4">
                Update phone numbers, contact email, location, and Summer Camp metadata.
              </p>

              <div>
                <label className="block text-xs font-bold text-navy uppercase mb-1">Contact Phone</label>
                <input
                  type="text"
                  value={settingsForm.phone}
                  onChange={(e) => setSettingsForm({ ...settingsForm, phone: e.target.value })}
                  placeholder="+91 98765 43210"
                  className="w-full border-2 border-navy rounded-lg p-2.5 font-bold text-navy"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-navy uppercase mb-1">Contact Email</label>
                <input
                  type="email"
                  value={settingsForm.email}
                  onChange={(e) => setSettingsForm({ ...settingsForm, email: e.target.value })}
                  placeholder="contact@stemora.in"
                  className="w-full border-2 border-navy rounded-lg p-2.5 font-bold text-navy"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-navy uppercase mb-1">Office Location</label>
                <input
                  type="text"
                  value={settingsForm.location}
                  onChange={(e) => setSettingsForm({ ...settingsForm, location: e.target.value })}
                  placeholder="Indiranagar & HSR Layout, Bangalore"
                  className="w-full border-2 border-navy rounded-lg p-2.5 font-bold text-navy"
                  required
                />
              </div>

              <div className="pt-4 border-t border-grid">
                <h5 className="font-extrabold text-navy text-sm mb-3">Summer Champ 2027 Settings</h5>

                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-bold text-navy uppercase mb-1">Camp Dates</label>
                    <input
                      type="text"
                      value={settingsForm.summer_dates}
                      onChange={(e) => setSettingsForm({ ...settingsForm, summer_dates: e.target.value })}
                      placeholder="April 10 – May 25, 2027"
                      className="w-full border-2 border-navy rounded-lg p-2.5 font-bold text-navy"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-navy uppercase mb-1">Grades / Age</label>
                    <input
                      type="text"
                      value={settingsForm.summer_grades}
                      onChange={(e) => setSettingsForm({ ...settingsForm, summer_grades: e.target.value })}
                      placeholder="Grades 3 to 10 (Ages 8-16)"
                      className="w-full border-2 border-navy rounded-lg p-2.5 font-bold text-navy"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-navy uppercase mb-1">Venue</label>
                    <input
                      type="text"
                      value={settingsForm.summer_venue}
                      onChange={(e) => setSettingsForm({ ...settingsForm, summer_venue: e.target.value })}
                      placeholder="Stemora Innovation Labs, Bangalore"
                      className="w-full border-2 border-navy rounded-lg p-2.5 font-bold text-navy"
                    />
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="btn-brutal btn-gold text-navy font-extrabold px-6 py-3 mt-4 cursor-pointer"
              >
                Save Settings
              </button>
            </form>
          )}
          </>
          )}
        </div>
      </div>
    </div>
  );
}
