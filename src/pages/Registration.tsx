import React, { useState } from 'react';

export default function Registration() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    organization: '',
    subPartnerArea: '',
    role: '',
    email: '',
    phone: '',
    dietary: '',
    accessibility: '',
    travelAccommodation: '',
    consent: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Registration Submitted:', formData);
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', fontFamily: 'sans-serif', backgroundColor: '#f8f9fa' }}>
      {/* Sidebar */}
      <aside style={{ width: '220px', backgroundColor: '#ffffff', padding: '20px', borderRight: '1px solid #e0e0e0', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <div>
          <h2 style={{ color: '#0F2C59', margin: '0 0 5px 0' }}>OAK</h2>
          <p style={{ fontSize: '10px', color: '#666', letterSpacing: '1px', marginBottom: '30px' }}>PARTNER CONVENING 2026</p>
          <button style={{ width: '100%', padding: '10px', backgroundColor: '#0F2C59', color: '#fff', border: 'none', borderRadius: '6px', textAlign: 'left', cursor: 'pointer', fontWeight: 'bold' }}>
             Register
          </button>
        </div>
        <div style={{ fontSize: '11px', color: '#888' }}>
          Harare, Zimbabwe<br />9-11 November 2026
        </div>
      </aside>

      {/* Main Content Area */}
      <main style={{ flex: 1, padding: '30px', display: 'flex', justifyContent: 'center' }}>
        <div style={{ width: '100%', maxWidth: '520px' }}>
          
          {/* Header Card */}
          <div style={{ backgroundColor: '#0F2C59', color: '#fff', borderRadius: '12px', padding: '24px', marginBottom: '15px' }}>
            <h1 style={{ margin: '0 0 5px 0', fontSize: '22px' }}>Partner Convening 2026</h1>
            <p style={{ margin: 0, fontSize: '12px', opacity: 0.8 }}>Harare • 9-11 November 2026</p>
          </div>

          {/* Stats Bar */}
          <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
            <div style={{ flex: 1, backgroundColor: '#fff', padding: '12px', borderRadius: '8px', border: '1px solid #e0e0e0', textAlign: 'center' }}>
              <div style={{ fontWeight: 'bold', fontSize: '16px', color: '#0F2C59' }}>110+</div>
              <div style={{ fontSize: '11px', color: '#666' }}>Attendees</div>
            </div>
            <div style={{ flex: 1, backgroundColor: '#fff', padding: '12px', borderRadius: '8px', border: '1px solid #e0e0e0', textAlign: 'center' }}>
              <div style={{ fontWeight: 'bold', fontSize: '16px', color: '#0F2C59' }}>24</div>
              <div style={{ fontSize: '11px', color: '#666' }}>Sessions</div>
            </div>
            <div style={{ flex: 1, backgroundColor: '#fff', padding: '12px', borderRadius: '8px', border: '1px solid #e0e0e0', textAlign: 'center' }}>
              <div style={{ fontWeight: 'bold', fontSize: '16px', color: '#0F2C59' }}>38</div>
              <div style={{ fontSize: '11px', color: '#666' }}>Partners</div>
            </div>
          </div>

          {/* Registration Form Card */}
          <div style={{ backgroundColor: '#fff', padding: '24px', borderRadius: '12px', border: '1px solid #e0e0e0' }}>
            <h3 style={{ margin: '0 0 20px 0', fontSize: '16px', color: '#333' }}>Registration Form</h3>
            
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              
              {/* Row: First Name & Last Name */}
              <div style={{ display: 'flex', gap: '10px' }}>
                <div style={{ flex: 1 }}>
                  <label style={{ fontSize: '11px', fontWeight: 'bold', color: '#555', display: 'block', marginBottom: '4px' }}>FIRST NAME *</label>
                  <input type="text" name="firstName" placeholder="Maria" value={formData.firstName} onChange={handleChange} required style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #ccc', boxSizing: 'border-box' }} />
                </div>
                <div style={{ flex: 1 }}>
                  <label style={{ fontSize: '11px', fontWeight: 'bold', color: '#555', display: 'block', marginBottom: '4px' }}>LAST NAME *</label>
                  <input type="text" name="lastName" placeholder="Schmidt" value={formData.lastName} onChange={handleChange} required style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #ccc', boxSizing: 'border-box' }} />
                </div>
              </div>

              {/* Organization */}
              <div>
                <label style={{ fontSize: '11px', fontWeight: 'bold', color: '#555', display: 'block', marginBottom: '4px' }}>ORGANISATION *</label>
                <input type="text" name="organization" placeholder="Your organisation name" value={formData.organization} onChange={handleChange} required style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #ccc', boxSizing: 'border-box' }} />
              </div>

              {/* Sub-Partner Area */}
              <div>
                <label style={{ fontSize: '11px', fontWeight: 'bold', color: '#555', display: 'block', marginBottom: '4px' }}>SUB-PARTNER / PROGRAMME AREA</label>
                <input type="text" name="subPartnerArea" placeholder="Optional" value={formData.subPartnerArea} onChange={handleChange} style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #ccc', boxSizing: 'border-box' }} />
              </div>

              {/* Role */}
              <div>
                <label style={{ fontSize: '11px', fontWeight: 'bold', color: '#555', display: 'block', marginBottom: '4px' }}>ROLE / CAPACITY *</label>
                <select name="role" value={formData.role} onChange={handleChange} required style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #ccc', boxSizing: 'border-box' }}>
                  <option value="">Select your role</option>
                  <option value="Partner">Partner</option>
                  <option value="OAK Staff">OAK Staff</option>
                  <option value="Presenter">Presenter</option>
                  <option value="Observer">Observer</option>
                  <option value="Coordination Team">Coordination Team</option>
                </select>
              </div>

              {/* Email */}
              <div>
                <label style={{ fontSize: '11px', fontWeight: 'bold', color: '#555', display: 'block', marginBottom: '4px' }}>EMAIL ADDRESS *</label>
                <input type="email" name="email" placeholder="you@organisation.org" value={formData.email} onChange={handleChange} required style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #ccc', boxSizing: 'border-box' }} />
              </div>

              {/* Phone */}
              <div>
                <label style={{ fontSize: '11px', fontWeight: 'bold', color: '#555', display: 'block', marginBottom: '4px' }}>PHONE NUMBER *</label>
                <input type="tel" name="phone" placeholder="+263 7" value={formData.phone} onChange={handleChange} required style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #ccc', boxSizing: 'border-box' }} />
              </div>

              <hr style={{ border: 'none', borderTop: '1px solid #eee', margin: '10px 0' }} />
              <p style={{ fontSize: '11px', fontWeight: 'bold', color: '#888', margin: 0 }}>REQUIREMENTS</p>

              {/* Dietary */}
              <div>
                <label style={{ fontSize: '11px', color: '#555', display: 'block', marginBottom: '4px' }}>DIETARY REQUIREMENTS</label>
                <input type="text" name="dietary" placeholder="e.g. Vegetarian, Halal, Gluten-free" value={formData.dietary} onChange={handleChange} style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #ccc', boxSizing: 'border-box' }} />
              </div>

              {/* Accessibility */}
              <div>
                <label style={{ fontSize: '11px', color: '#555', display: 'block', marginBottom: '4px' }}>ACCESSIBILITY REQUIREMENTS</label>
                <input type="text" name="accessibility" placeholder="e.g. Wheelchair access, hearing loop" value={formData.accessibility} onChange={handleChange} style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #ccc', boxSizing: 'border-box' }} />
              </div>

              {/* Travel & Accommodation */}
              <div>
                <label style={{ fontSize: '11px', color: '#555', display: 'block', marginBottom: '4px' }}>TRAVEL & ACCOMMODATION</label>
                <input type="text" name="travelAccommodation" placeholder="e.g. Flight details, hotel needed" value={formData.travelAccommodation} onChange={handleChange} style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #ccc', boxSizing: 'border-box' }} />
              </div>

              {/* Consent */}
              <div style={{ marginTop: '10px' }}>
                <label style={{ fontSize: '11px', color: '#555', display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                  <input type="checkbox" name="consent" checked={formData.consent} onChange={handleChange} required style={{ marginTop: '2px' }} />
                  I agree to OAK Foundation's privacy policy and consent to my registration data being used for event coordination.
                </label>
              </div>

              {/* Submit Button */}
              <button type="submit" style={{ width: '100%', padding: '12px', backgroundColor: '#0F2C59', color: '#fff', border: 'none', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer', marginTop: '10px' }}>
                Register & Generate QR Code
              </button>

            </form>
          </div>

        </div>
      </main>
    </div>
  );
}