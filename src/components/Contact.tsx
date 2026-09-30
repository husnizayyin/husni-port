import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { FaGithub, FaWhatsapp, FaTelegram, FaXTwitter, FaEnvelope, FaPhone, FaLocationDot } from 'react-icons/fa6';
import { TbArrowUpRight } from 'react-icons/tb';
import { gsap } from '../lib/gsap';
import { klTime } from '../lib/util';

const LOGO = ['H', 'u', 's', 'n', 'i'];

export function Contact() {
  const rootRef = useRef<HTMLElement>(null);
  const ellRef = useRef<SVGEllipseElement>(null);
  const [clock, setClock] = useState(klTime);

  useEffect(() => {
    const id = window.setInterval(() => setClock(klTime()), 20000);
    return () => window.clearInterval(id);
  }, []);

  useLayoutEffect(() => {
    const root = rootRef.current!;
    const ell = ellRef.current!;
    const q = gsap.utils.selector(root);
    const len = ell.getTotalLength();

    const ctx = gsap.context(() => {
      gsap.set(ell, { strokeDasharray: len, strokeDashoffset: len });
      gsap.timeline({ scrollTrigger: { trigger: root, start: 'top 80%', end: 'top 30%', scrub: 0.5 } })
        .to(ell, { strokeDashoffset: 0, ease: 'none', duration: 1 }, 0)
        .fromTo(
          q('.endmark .ch'),
          { yPercent: 100, opacity: 0, '--s': 100 },
          { yPercent: 0, opacity: 1, '--s': 20, ease: 'none', duration: 0.7, stagger: 0.08 },
          0.2
        );

      gsap.from(q('.contact-content > *'), {
        y: 28,
        opacity: 0,
        duration: 0.9,
        ease: 'power3.out',
        stagger: 0.1,
        scrollTrigger: { trigger: q('.contact-content')[0], start: 'top 88%' },
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section id="contact" ref={rootRef} className="pad contact-section" aria-label="Contact">
      <div className="contact-wrapper">
        {/* Brand Ellipse Logo */}
        <div className="endmark">
          <svg viewBox="0 0 1000 400" aria-hidden="true">
            <ellipse
              ref={ellRef}
              cx="500"
              cy="200"
              rx="470"
              ry="175"
              fill="none"
              stroke="var(--ink)"
              strokeWidth="2"
            />
          </svg>
          <div className="w fr">
            {LOGO.map((c, i) => (
              <span key={i} className="ch fr">
                {c}
              </span>
            ))}
          </div>
        </div>

        {/* Contact Body */}
        <div className="contact-content">
          <div className="contact-headline">
            <span className="contact-avail-badge">
              <span className="avail-dot" />
              AVAILABLE FOR SENIOR & LEAD ENGINEERING ROLES
            </span>
            <h2 className="fr contact-title">Let's build something exceptional.</h2>
          </div>

          <div className="contact-main-channels">
            <a className="contact-email-card" href="mailto:husni.zayyin98@gmail.com">
              <div className="contact-channel-icon email">
                <FaEnvelope size={20} />
              </div>
              <div className="contact-channel-info">
                <span className="channel-label">Primary Email</span>
                <span className="fr channel-val">husni.zayyin98@gmail.com</span>
              </div>
              <TbArrowUpRight size={22} className="channel-arrow" />
            </a>

            <a className="contact-phone-card" href="https://wa.me/6285959939270" target="_blank" rel="noreferrer">
              <div className="contact-channel-icon phone">
                <FaPhone size={18} />
              </div>
              <div className="contact-channel-info">
                <span className="channel-label">Direct Line / WhatsApp</span>
                <span className="fr channel-val">+62 859 5993 9270</span>
              </div>
              <TbArrowUpRight size={22} className="channel-arrow" />
            </a>
          </div>

          <div className="contact-meta-row">
            <div className="contact-loc-time">
              <FaLocationDot size={13} className="loc-icon" />
              <span>Jakarta, Indonesia (UTC+7)</span>
              <span className="time-sep">·</span>
              <span className="clock-badge">{clock} WIB</span>
            </div>

            {/* Social & Code Links */}
            <div className="contact-socials">
              <a href="https://github.com/husnizayyin" target="_blank" rel="noreferrer" className="social-pill">
                <FaGithub size={14} />
                <span>GitHub (25+ Repos)</span>
                <TbArrowUpRight size={13} />
              </a>
              <a href="https://wa.me/6285959939270" target="_blank" rel="noreferrer" className="social-pill">
                <FaWhatsapp size={14} style={{ color: '#25D366' }} />
                <span>WhatsApp</span>
                <TbArrowUpRight size={13} />
              </a>
              <a href="https://t.me/husnizayn" target="_blank" rel="noreferrer" className="social-pill">
                <FaTelegram size={14} style={{ color: '#229ED9' }} />
                <span>Telegram</span>
                <TbArrowUpRight size={13} />
              </a>
              <a href="https://x.com/husnizayn" target="_blank" rel="noreferrer" className="social-pill">
                <FaXTwitter size={14} />
                <span>@husnizayn</span>
                <TbArrowUpRight size={13} />
              </a>
            </div>
          </div>
        </div>

        {/* Footer info */}
        <div className="contact-footer">
          <div className="footer-left">
            <b>Husni Zayyin Ansori</b>
            <span>B.Eng Informatics (GPA 3.31) · 5+ Years Experience</span>
          </div>
          <div className="footer-right">
            <span>Specialized in Mobile Architecture, Frontend Systems & Full-Stack Engineering</span>
          </div>
        </div>
      </div>
    </section>
  );
}

