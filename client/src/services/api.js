const API_BASE = '/api';

export const api = {
  // Admin authentication
  async loginAdmin(credentials) {
    const res = await fetch(`${API_BASE}/admin/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials)
    });
    const result = await res.json();
    if (!res.ok) throw new Error(result.error || 'Failed to sign in');
    return result.data;
  },

  async getAdminSession() {
    const res = await fetch(`${API_BASE}/admin/session`);
    if (res.status === 401) return false;
    const result = await res.json();
    if (!res.ok) throw new Error(result.error || 'Failed to verify admin session');
    return Boolean(result.data?.authenticated);
  },

  async logoutAdmin() {
    const res = await fetch(`${API_BASE}/admin/logout`, { method: 'POST' });
    const result = await res.json();
    if (!res.ok) throw new Error(result.error || 'Failed to sign out');
    return result;
  },

  // Enquiries
  async submitEnquiry(data) {
    const res = await fetch(`${API_BASE}/enquiries`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    const result = await res.json();
    if (!res.ok) throw new Error(result.error || 'Failed to submit enquiry');
    return result;
  },

  async getEnquiries() {
    const res = await fetch(`${API_BASE}/enquiries`);
    const result = await res.json();
    if (!res.ok) throw new Error(result.error || 'Failed to load enquiries');
    return result.data;
  },

  async updateEnquiryStatus(id, status) {
    const res = await fetch(`${API_BASE}/enquiries/${id}/status`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status })
    });
    const result = await res.json();
    if (!res.ok) throw new Error(result.error || 'Failed to update status');
    return result.data;
  },

  // Dynamic Site Content
  async getContent() {
    try {
      const res = await fetch(`${API_BASE}/content`);
      if (!res.ok) throw new Error('API unavailable');
      const result = await res.json();
      return result.data;
    } catch (err) {
      console.warn('[API] Could not fetch remote content, using local defaults:', err.message);
      return null;
    }
  },

  async updateStats(stats) {
    const res = await fetch(`${API_BASE}/content/stats`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(stats)
    });
    const result = await res.json();
    if (!res.ok) throw new Error(result.error || 'Failed to update stats');
    return result.data;
  },

  async updateSettings(settings) {
    const res = await fetch(`${API_BASE}/content/settings`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(settings)
    });
    const result = await res.json();
    if (!res.ok) throw new Error(result.error || 'Failed to update settings');
    return result.data;
  },

  async saveInnovator(item) {
    const res = await fetch(`${API_BASE}/content/innovators`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(item)
    });
    const result = await res.json();
    if (!res.ok) throw new Error(result.error || 'Failed to save innovator');
    return result.data;
  },

  async deleteInnovator(id) {
    const res = await fetch(`${API_BASE}/content/innovators/${id}`, {
      method: 'DELETE'
    });
    const result = await res.json();
    if (!res.ok) throw new Error(result.error || 'Failed to delete innovator');
    return result;
  },

  // Photo Upload
  async uploadPhoto(file) {
    const formData = new FormData();
    formData.append('photo', file);

    const res = await fetch(`${API_BASE}/upload`, {
      method: 'POST',
      body: formData
    });
    const result = await res.json();
    if (!res.ok) throw new Error(result.error || 'Failed to upload photo');
    return result.url;
  }
};
