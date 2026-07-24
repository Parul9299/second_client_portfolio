import { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2, Loader2, AlertCircle } from 'lucide-react';

const SUBJECT_OPTIONS = [
  'Brand Identity Design',
  'Logo Design',
  'Print & Packaging Design',
  'Social Media Graphics',
  'Web & UI Design',
  'Collaboration / Partnership',
  'Other',
];

const ACCESS_KEY = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;

export function Contact() {
  const [subject, setSubject] = useState('');
  const [customSubject, setCustomSubject] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('loading');

    const formEl = e.currentTarget;
    const formData = new FormData(formEl);
    const finalSubject =
      subject === 'Other' ? customSubject.trim() || 'Other' : subject;

    formData.append('access_key', ACCESS_KEY);
    formData.append('subject', finalSubject);
    formData.append('from_name', 'Kabir Khan Portfolio');

    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: formData,
      });
      const data = await res.json();
      if (data.success) {
        setStatus('success');
        formEl.reset();
        setSubject('');
        setCustomSubject('');
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  return (
    <section id="contact" className="py-24 lg:py-32 bg-[#0d0d0d] relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full bg-[#4af600]/5 blur-[140px]" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-12 gap-12">
          {/* Left */}
          <div className="lg:col-span-5 reveal-left">
            <div className="flex items-center gap-4 mb-6">
              <span className="green-line" />
              <span className="section-label">Get In Touch</span>
            </div>
            <h2 className="section-heading text-white text-5xl lg:text-6xl mb-8">
              Let's<br />Create<br /><span className="text-accent">Together</span>
            </h2>
            <p className="text-gray-400 text-base leading-relaxed mb-10 max-w-md">
              Have a project in mind? Whether it's a brand identity, print campaign, or digital design — I'm ready to bring your vision to life. Let's start a conversation.
            </p>

            <div className="space-y-4">
              {[
                { icon: <Mail size={18} />, label: 'Email', value: 'kabirkhanat8@gmail.com', href: 'mailto:kabirkhanat8@gmail.com' },
                { icon: <Phone size={18} />, label: 'Phone', value: '+91 8885857725', href: 'tel:+918885857725' },
                { icon: <MapPin size={18} />, label: 'Location', value: 'Mathura, India — 281006', href: '#' },
              ].map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="flex items-center gap-4 group"
                >
                  <div className="w-12 h-12 border border-[#2a2a2a] flex items-center justify-center text-[#4af600] group-hover:border-[#4af600] group-hover:bg-[#4af600]/10 transition-all">
                    {item.icon}
                  </div>
                  <div>
                    <p className="text-[#666] text-xs font-condensed uppercase tracking-widest">{item.label}</p>
                    <p className="text-white text-sm font-medium group-hover:text-[#4af600] transition-colors">{item.value}</p>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Right — form */}
          <div className="lg:col-span-7 reveal-right">
            <div className="card p-8 lg:p-10">
              <form className="space-y-5" onSubmit={handleSubmit}>
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-[#666] text-xs font-condensed uppercase tracking-widest mb-2">Your Name</label>
                    <input type="text" name="name" required placeholder="John Doe" className="contact-input" />
                  </div>
                  <div>
                    <label className="block text-[#666] text-xs font-condensed uppercase tracking-widest mb-2">Your Email</label>
                    <input type="email" name="email" required placeholder="john@example.com" className="contact-input" />
                  </div>
                </div>

                {/* Phone number */}
                <div>
                  <label className="block text-[#666] text-xs font-condensed uppercase tracking-widest mb-2">Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    placeholder="+91 xxxxx xxxxx"
                    className="contact-input"
                    maxLength={10}
                  />
                </div>

                {/* Subject — dropdown with "Other" */}
                <div>
                  <label className="block text-[#666] text-xs font-condensed uppercase tracking-widest mb-2">Subject</label>
                  <select
                    required
                    value={subject}
                    onChange={(e) => {
                      setSubject(e.target.value);
                      if (e.target.value !== 'Other') setCustomSubject('');
                    }}
                    className="contact-input appearance-none cursor-pointer"
                    style={{
                      backgroundImage:
                        "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8' fill='none'%3E%3Cpath d='M1 1.5L6 6.5L11 1.5' stroke='%23888' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E\")",
                      backgroundRepeat: 'no-repeat',
                      backgroundPosition: 'right 1rem center',
                    }}
                  >
                    <option value="" disabled>Select a subject</option>
                    {SUBJECT_OPTIONS.map((opt) => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                </div>

                {/* Custom subject input — only when "Other" selected */}
                {subject === 'Other' && (
                  <div className="animate-[fadeIn_0.3s_ease]">
                    <label className="block text-[#666] text-xs font-condensed uppercase tracking-widest mb-2">Custom Subject</label>
                    <input
                      type="text"
                      value={customSubject}
                      onChange={(e) => setCustomSubject(e.target.value)}
                      placeholder="Type your subject here..."
                      className="contact-input"
                    />
                  </div>
                )}

                <div>
                  <label className="block text-[#666] text-xs font-condensed uppercase tracking-widest mb-2">Message</label>
                  <textarea name="message" rows={5} required placeholder="Tell me about your project..." className="contact-input resize-none"></textarea>
                </div>

                {/* Status messages */}
                {status === 'success' && (
                  <div className="flex items-center gap-2 text-[#4af600] text-sm">
                    <CheckCircle2 size={18} />
                    Message sent successfully! I'll get back to you soon.
                  </div>
                )}
                {status === 'error' && (
                  <div className="flex items-center gap-2 text-red-400 text-sm">
                    <AlertCircle size={18} />
                    Something went wrong. Please try again or email me directly.
                  </div>
                )}

                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="btn-primary inline-flex items-center gap-2 w-full sm:w-auto justify-center disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {status === 'loading' ? (
                    <>Sending... <Loader2 size={16} className="animate-spin" /></>
                  ) : (
                    <>Send Message <Send size={16} /></>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
