import { useState, useEffect, useRef } from 'react';
import './Landing.css';

import BrandLogo, { BrandSymbol } from './components/BrandLogo';
import imgCardsFan from './assets/images/cards-fan.jpg';

// La app (login, registro, dashboard) vive en otro dominio: se navega con recarga completa.
const APP_URL = (import.meta.env.VITE_APP_URL || 'http://localhost:5173').replace(/\/$/, '');
const goApp = (path) => { window.location.href = `${APP_URL}${path}`; };

/* ════════════════════════════════════════════════════════════
   LEGAL — Términos y Privacidad
   Plantilla de referencia; revisar con un abogado antes de operar.
════════════════════════════════════════════════════════════ */
const LEGAL = {
  terminos: {
    title: 'Términos y Condiciones',
    updated: 'Julio 2026',
    sections: [
      { h: '1. El servicio', p: [
        'Fintú & Co. es una herramienta de organización financiera personal. No somos una entidad financiera, no otorgamos créditos ni nos conectamos a tu banco. La app te permite registrar y visualizar manualmente la información de tus tarjetas de crédito.',
      ]},
      { h: '2. Acceso y pago', p: [
        'El acceso se obtiene mediante un pago único de $4 USD procesado por PayPal. La licencia es personal, intransferible y válida durante toda la vida del servicio. No existen suscripciones ni cobros recurrentes.',
      ]},
      { h: '3. Tu cuenta', p: [
        'Eres responsable de mantener la confidencialidad de tu contraseña y de la veracidad de los datos que registras. Una cuenta corresponde a una sola persona.',
      ]},
      { h: '4. Información referencial', p: [
        'Los cálculos que muestra la app (intereses, ciclos, score de salud financiera y similares) son estimaciones referenciales basadas en los datos que tú ingresas. No constituyen asesoría financiera, contable ni legal. Las decisiones que tomes con esta información son tu responsabilidad.',
      ]},
      { h: '5. Reembolsos', p: [
        'Por la naturaleza digital del producto, no se realizan reembolsos una vez activado el acceso, salvo error de cobro demostrable.',
      ]},
      { h: '6. Propiedad intelectual', p: [
        'La marca Fintú & Co., el diseño, el código, los textos y todos los contenidos de la plataforma son propiedad exclusiva de Fintú & Co. Queda prohibida su copia, reproducción, distribución, modificación o ingeniería inversa, total o parcial, sin autorización escrita.',
      ]},
      { h: '7. Marcas de terceros y tasas de referencia', p: [
        'Los nombres y marcas de bancos, financieras y emisoras de tarjetas mencionados en la plataforma pertenecen a sus respectivos titulares y se usan únicamente con fines de identificación y comparación informativa. Fintú & Co. no está afiliada, patrocinada ni respaldada por ninguna de ellas, ni actúa como intermediaria o promotora de sus productos.',
        'Las tasas (TEA) que muestra el comparador son referenciales, se basan en información pública de la SBS y pueden variar en cualquier momento. La tasa aplicable a cada persona depende de su perfil crediticio y del producto contratado. Verifica siempre las condiciones vigentes directamente con la entidad financiera antes de tomar una decisión.',
      ]},
      { h: '8. Cambios', p: [
        'Podemos actualizar el servicio y estos términos para mejorarlos. Los cambios relevantes se comunicarán dentro de la app.',
      ]},
      { h: '9. Ley aplicable', p: [
        'Estos términos se rigen por las leyes de la República del Perú.',
      ]},
    ],
  },
  privacidad: {
    title: 'Política de Privacidad',
    updated: 'Junio 2026',
    sections: [
      { h: '1. Datos que recopilamos', p: [
        'Para crear tu cuenta solo pedimos: nombre, apellido, email y una contraseña (que guardamos cifrada). Al pagar, registramos el identificador de la transacción que nos entrega PayPal.',
        'Nunca pedimos ni almacenamos números de tarjeta, CVV, claves bancarias ni credenciales de banca por internet.',
      ]},
      { h: '2. Datos que tú registras', p: [
        'Los montos, fechas de ciclo y movimientos que ingresas en la app son datos que tú decides registrar manualmente. Se usan únicamente para mostrarte tu propia información y cálculos.',
      ]},
      { h: '3. Para qué usamos tus datos', p: [
        'Autenticarte, operar las funciones de la app, enviarte el código de recuperación de contraseña a tu email y brindarte soporte. Nada más.',
      ]},
      { h: '4. Con quién compartimos', p: [
        'Con nadie. No vendemos ni cedemos tus datos a terceros. El pago lo procesa PayPal bajo sus propios términos y nosotros solo recibimos la confirmación.',
      ]},
      { h: '5. Seguridad', p: [
        'Contraseñas cifradas con bcrypt, acceso autenticado mediante token y comunicación restringida a tu propia cuenta.',
      ]},
      { h: '6. Tus derechos (Ley N° 29733)', p: [
        'Conforme a la Ley de Protección de Datos Personales del Perú, puedes ejercer tus derechos de acceso, rectificación, cancelación y oposición escribiendo a soporte@fintu.pe.',
      ]},
      { h: '7. Almacenamiento local', p: [
        'La app guarda tu sesión (token) en el almacenamiento local de tu navegador para mantenerte conectado. Se elimina al cerrar sesión.',
      ]},
    ],
  },
};

function LegalModal({ doc, onClose }) {
  const data = LEGAL[doc];
  if (!data) return null;
  return (
    <div className="lp-legal-ov" onClick={onClose} role="presentation">
      <div className="lp-legal" onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true" aria-label={data.title}>
        <div className="lp-legal-head">
          <div>
            <h3>{data.title}</h3>
            <span>Última actualización: {data.updated}</span>
          </div>
          <button className="lp-legal-x" onClick={onClose} aria-label="Cerrar">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" width="14" height="14">
              <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>
        <div className="lp-legal-body">
          {data.sections.map((s) => (
            <section key={s.h}>
              <h4>{s.h}</h4>
              {s.p.map((t, i) => <p key={i}>{t}</p>)}
            </section>
          ))}
          <p className="lp-legal-contact">¿Dudas? Escríbenos a soporte@fintu.pe</p>
        </div>
        <div className="lp-legal-foot">
          <button className="lp-btn lp-btn--green" onClick={onClose}>Entendido</button>
        </div>
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════
   ICONOS
════════════════════════════════════════════════════════════ */
const Arr = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" width="15" height="15" aria-hidden="true">
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);
const IcCheck = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" width="12" height="12" aria-hidden="true">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);
const IcPercent = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <line x1="19" y1="5" x2="5" y2="19" /><circle cx="6.5" cy="6.5" r="2.5" /><circle cx="17.5" cy="17.5" r="2.5" />
  </svg>
);
const IcCards = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="2" y="7" width="17" height="12" rx="2" /><path d="M6 4h14a2 2 0 0 1 2 2v9" /><line x1="2" y1="11" x2="19" y2="11" />
  </svg>
);
const IcShield = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="16" height="16" aria-hidden="true">
    <path d="M12 3l8 3v6c0 4.5-3.4 8.3-8 9-4.6-.7-8-4.5-8-9V6z" />
  </svg>
);
const IcChevron = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" width="16" height="16" aria-hidden="true">
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

/* ════════════════════════════════════════════════════════════
   CONTENIDO
════════════════════════════════════════════════════════════ */
const STEPS = [
  { n: '01', t: 'Crea tu cuenta',      d: 'Un pago único de $4 con PayPal.' },
  { n: '02', t: 'Agrega tus tarjetas', d: 'Banco, línea y fechas. Nada más.' },
  { n: '03', t: 'Paga a tiempo',       d: 'Fintú te dice cuánto y cuándo.' },
];

const PRICE_INCLUDES = [
  'Todas las funciones',
  'Hasta 4 tarjetas',
  'Actualizaciones incluidas',
  'Sin suscripción ni publicidad',
];

const FAQS = [
  { q: '¿Es seguro?',
    a: 'No pedimos claves, números de tarjeta ni acceso a tu banco. Solo los montos y fechas que tú ingresas.' },
  { q: '¿Los $4 son mensuales?',
    a: 'No. Pagas una vez y la app es tuya para siempre.' },
  { q: '¿Funciona con mi banco?',
    a: 'Sí, con cualquier tarjeta de crédito de cualquier banco.' },
  { q: 'Aún no tengo tarjeta, ¿me sirve?',
    a: 'Sí. Si recién empiezas, una tarjeta con garantía (dejas un depósito como respaldo) es la forma más fácil de construir historial, y Fintú te ayuda a cuidarlo desde el primer día.' },
  { q: '¿Y si olvido mi contraseña?',
    a: 'La recuperas con tu email desde la pantalla de inicio de sesión.' },
];

const NAV = [
  { label: 'Beneficios',    id: 'beneficios' },
  { label: 'Cómo funciona', id: 'pasos' },
  { label: 'Precio',        id: 'precio' },
  { label: 'Preguntas',     id: 'preguntas' },
];

/* ════════════════════════════════════════════════════════════
   VIDEO AMBIENTE — autoplay silencioso en loop.
   Con prefers-reduced-motion se queda en el poster.
════════════════════════════════════════════════════════════ */
function AmbientVideo({ src, poster, className }) {
  const ref = useRef(null);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) {
      v.removeAttribute('autoplay');
      v.pause();
      return;
    }
    // Algunos navegadores ignoran el atributo autoplay en una SPA: forzamos play.
    const p = v.play?.();
    if (p && typeof p.catch === 'function') p.catch(() => { /* autoplay bloqueado, queda en poster */ });
  }, []);

  return (
    <video ref={ref} className={className} src={src} poster={poster}
      autoPlay muted loop playsInline preload="metadata" aria-hidden="true" />
  );
}

/* ════════════════════════════════════════════════════════════
   REVEAL ON SCROLL
════════════════════════════════════════════════════════════ */
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal');
    if (!els.length) return;
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); }
      }),
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

/* ════════════════════════════════════════════════════════════
   VISTA PREVIA DE LA APP (datos de ejemplo)
════════════════════════════════════════════════════════════ */
function Showcase() {
  return (
    <div className="lp-show" aria-label="Vista previa de la app con datos de ejemplo" role="img">
      {/* Izquierda: video de tarjetas + fichas claras */}
      <div className="lp-show-media">
        <AmbientVideo src="/videos/Tarjetas.mp4" poster={imgCardsFan} className="lp-show-video" />
        <div className="lp-show-shade" />
        <div className="lp-show-stack" aria-hidden="true">
          <div className="lp-chip-card">
            <span className="lp-chip-label">Próximo pago · Visa</span>
            <div className="lp-chip-row">
              <strong>S/ 1,240.00</strong>
              <span className="lp-chip-date">15 nov</span>
            </div>
          </div>
          <div className="lp-chip-card">
            <div className="lp-chip-row">
              <span className="lp-chip-label">Uso de tu línea</span>
              <span className="lp-chip-pct">34%</span>
            </div>
            <div className="lp-bars">
              {Array.from({ length: 30 }, (_, i) => <i key={i} className={i < 10 ? 'on' : ''} />)}
            </div>
            <span className="lp-chip-foot"><b>S/ 3,400</b> de S/ 10,000</span>
          </div>
        </div>
      </div>

      {/* Derecha: panel oscuro del dashboard */}
      <div className="lp-show-panel" aria-hidden="true">
        <div className="lp-show-top">
          <span className="lp-pill">Tu tablero</span>
          <span className="lp-show-ghost">Tus tarjetas</span>
        </div>
        <div className="lp-metrics">
          <div><span>Deuda total</span><strong>S/ 3,480</strong></div>
          <div><span>Próximo corte</span><strong>25 nov</strong></div>
          <div><span>Tarjetas</span><strong>3</strong></div>
          <div><span>Fintú Score</span><strong>82</strong></div>
        </div>
        <div className="lp-show-tiles">
          <div className="lp-tile">
            <div className="lp-tile-head"><span>Ciclo actual</span><span>Día 18 de 30</span></div>
            <div className="lp-cycle">
              <BrandSymbol />
              <div className="lp-cycle-fill" />
            </div>
            <span className="lp-tile-foot">Cierra el 25 · pagas hasta el 15</span>
          </div>
          <div className="lp-tile lp-tile--tip">
            <span className="lp-tile-mark"><BrandSymbol /></span>
            <p>Paga <b>S/ 1,240</b> antes del 15 y no pagas intereses este mes.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════
   LANDING
════════════════════════════════════════════════════════════ */
export default function Landing() {
  const [openFaq, setOpenFaq] = useState(0);
  const [navScrolled, setNavScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [legalOpen, setLegalOpen] = useState(null); // null | 'terminos' | 'privacidad'

  useReveal();

  useEffect(() => {
    document.body.style.overflow = (legalOpen || menuOpen) ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [legalOpen, menuOpen]);

  useEffect(() => {
    if (!legalOpen) return;
    const onKey = (e) => { if (e.key === 'Escape') setLegalOpen(null); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [legalOpen]);

  useEffect(() => {
    const onScroll = () => setNavScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const go = (id) => (e) => {
    e?.preventDefault();
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="lp">
      {legalOpen && <LegalModal doc={legalOpen} onClose={() => setLegalOpen(null)} />}

      {/* ─── NAV ─── */}
      <nav className={`lp-nav${navScrolled ? ' is-scrolled' : ''}`}>
        <div className="lp-nav-in">
          <a href="#top" className="lp-nav-logo" onClick={go('top')} aria-label="Fintú & Co., ir al inicio">
            <BrandLogo size="sm" as="span" />
          </a>
          <div className="lp-nav-links">
            {NAV.map((n) => <a key={n.id} href={`#${n.id}`} onClick={go(n.id)}>{n.label}</a>)}
          </div>
          <div className="lp-nav-cta">
            <button className="lp-btn lp-btn--quiet" onClick={() => goApp('/login')}>Iniciar sesión</button>
            <button className="lp-btn lp-btn--dark" onClick={() => goApp('/registro')}>Empezar</button>
            <button
              className="lp-burger"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
              aria-expanded={menuOpen}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                {menuOpen
                  ? <><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></>
                  : <><line x1="4" y1="8" x2="20" y2="8" /><line x1="4" y1="16" x2="20" y2="16" /></>}
              </svg>
            </button>
          </div>
        </div>
        {menuOpen && (
          <div className="lp-menu">
            {NAV.map((n) => <a key={n.id} href={`#${n.id}`} onClick={go(n.id)}>{n.label}</a>)}
            <button className="lp-btn lp-btn--outline" onClick={() => goApp('/login')}>Iniciar sesión</button>
          </div>
        )}
      </nav>

      <main id="top">
        {/* ─── HERO ─── */}
        <header className="lp-frame lp-hero">
          <div className="lp-hero-top">
            <h1 className="lp-h1">No pagues<br />intereses de más.</h1>
            <div className="lp-hero-side">
              <p>
                Fintú calcula el ciclo de cada tarjeta y te dice cuánto y cuándo
                pagar. Sin conectar tu banco.
              </p>
              <div className="lp-btn-row">
                <button className="lp-btn lp-btn--green lp-btn--lg" onClick={() => goApp('/registro')}>
                  Empezar por $4 <Arr />
                </button>
                <button className="lp-btn lp-btn--outline lp-btn--lg" onClick={go('pasos')}>
                  Cómo funciona
                </button>
              </div>
            </div>
          </div>
          <Showcase />
        </header>

        {/* ─── BENEFICIOS ─── */}
        <section id="beneficios" className="lp-sec">
          <div className="lp-sec-head reveal">
            <span className="lp-eyebrow">Por qué Fintú</span>
            <h2 className="lp-h2">Menos sustos.<br />Menos intereses.</h2>
          </div>

          <div className="lp-bento">
            <article className="lp-b lp-b--dark lp-b--tall reveal">
              <div className="lp-ring" aria-hidden="true">
                <svg viewBox="0 0 120 120">
                  <circle cx="60" cy="60" r="46" className="lp-ring-track" />
                  <circle cx="60" cy="60" r="46" className="lp-ring-fill" />
                </svg>
                <div className="lp-ring-txt"><strong>7</strong><span>días para pagar</span></div>
              </div>
              <h3>Sabes cuándo pagar</h3>
              <p>Fintú calcula el corte y el pago de cada tarjeta. Se acabaron las moras por olvido.</p>
            </article>

            <article className="lp-b reveal">
              <span className="lp-b-ico"><IcPercent /></span>
              <h3>Ves el interés antes de que llegue</h3>
              <p>Te muestra cuánto pagarías si no cancelas el total.</p>
            </article>

            <article className="lp-b reveal">
              <span className="lp-b-ico"><IcCards /></span>
              <h3>Todo en un solo lugar</h3>
              <p>Hasta 4 tarjetas de cualquier banco, en un tablero.</p>
            </article>

            <article className="lp-b lp-b--peach lp-b--wide reveal">
              <div>
                <h3>Tu historial mejora solo</h3>
                <p>Pagar a tiempo construye tu perfil: mejores tasas, más línea y créditos más grandes después.</p>
              </div>
              <svg className="lp-b-trend" viewBox="0 0 160 70" aria-hidden="true">
                <polyline points="4,62 36,50 64,54 96,30 124,24 156,6" />
              </svg>
            </article>
          </div>

          <ul className="lp-trust reveal">
            <li><IcShield /> Sin conectar tu banco</li>
            <li><IcShield /> Sin número de tarjeta</li>
            <li><IcShield /> Hecho en Perú</li>
          </ul>
        </section>

        {/* ─── CÓMO FUNCIONA ─── */}
        <section id="pasos" className="lp-sec lp-sec--tight">
          <div className="lp-steps-head reveal">
            <span className="lp-eyebrow">Cómo funciona</span>
            <h2 className="lp-h2">Listo en tres pasos.</h2>
          </div>
          <ol className="lp-steps">
            {STEPS.map((s, i) => (
              <li className="reveal" key={s.n} style={{ transitionDelay: `${i * 0.08}s` }}>
                <span className="lp-step-n">{s.n}</span>
                <h3>{s.t}</h3>
                <p>{s.d}</p>
              </li>
            ))}
          </ol>
        </section>

        {/* ─── PRECIO ─── */}
        <section id="precio" className="lp-frame lp-price reveal">
          <div className="lp-price-l">
            <span className="lp-eyebrow lp-eyebrow--light">Precio</span>
            <div className="lp-price-num"><span>$</span>4</div>
            <h2 className="lp-h2 lp-h2--light">Una vez. Para siempre.</h2>
            <p>Menos de lo que cuesta un solo descuido con tu tarjeta.</p>
          </div>
          <div className="lp-price-r">
            <ul>
              {PRICE_INCLUDES.map((t) => (
                <li key={t}><span className="lp-check"><IcCheck /></span>{t}</li>
              ))}
            </ul>
            <button className="lp-btn lp-btn--peach lp-btn--lg lp-btn--block" onClick={() => goApp('/registro')}>
              Crear mi cuenta <Arr />
            </button>
            <p className="lp-price-fine">
              Pago seguro con PayPal. Al crear tu cuenta aceptas los{' '}
              <button type="button" onClick={() => setLegalOpen('terminos')}>Términos</button> y la{' '}
              <button type="button" onClick={() => setLegalOpen('privacidad')}>Privacidad</button>.
            </p>
          </div>
        </section>

        {/* ─── PREGUNTAS ─── */}
        <section id="preguntas" className="lp-sec lp-faq">
          <div className="lp-faq-l reveal">
            <span className="lp-eyebrow">Preguntas</span>
            <h2 className="lp-h2">Lo que todos preguntan.</h2>
            <p>¿Otra duda? <a href="mailto:soporte@fintu.pe">soporte@fintu.pe</a></p>
          </div>
          <div className="lp-faq-list reveal">
            {FAQS.map((f, i) => {
              const open = openFaq === i;
              return (
                <div className={`lp-faq-item${open ? ' is-open' : ''}`} key={f.q}>
                  <button
                    type="button"
                    className="lp-faq-q"
                    aria-expanded={open}
                    aria-controls={`faq-${i}`}
                    onClick={() => setOpenFaq(open ? null : i)}
                  >
                    <span>{f.q}</span><IcChevron />
                  </button>
                  <div className="lp-faq-a" id={`faq-${i}`} role="region" hidden={!open}>
                    <p>{f.a}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </main>

      {/* ─── CIERRE + FOOTER ─── */}
      <footer className="lp-frame lp-end">
        <div className="lp-end-cta">
          <h2 className="lp-h2 lp-h2--light">Toma el control<br />de tus tarjetas.</h2>
          <div className="lp-btn-row">
            <button className="lp-btn lp-btn--peach lp-btn--lg" onClick={() => goApp('/registro')}>
              Empezar por $4 <Arr />
            </button>
            <button className="lp-btn lp-btn--ink lp-btn--lg" onClick={() => goApp('/login')}>
              Iniciar sesión
            </button>
          </div>
        </div>

        <div className="lp-foot">
          <div className="lp-foot-brand">
            <BrandLogo size="md" />
            <p>La app peruana para pagar tus tarjetas a tiempo.</p>
          </div>
          <div className="lp-foot-col">
            <h4>Producto</h4>
            <a href="#beneficios" onClick={go('beneficios')}>Beneficios</a>
            <a href="#precio" onClick={go('precio')}>Precio</a>
            <a href="#preguntas" onClick={go('preguntas')}>Preguntas</a>
          </div>
          <div className="lp-foot-col">
            <h4>Legal</h4>
            <button type="button" onClick={() => setLegalOpen('terminos')}>Términos y condiciones</button>
            <button type="button" onClick={() => setLegalOpen('privacidad')}>Privacidad</button>
          </div>
          <div className="lp-foot-col">
            <h4>Contacto</h4>
            <a href="mailto:soporte@fintu.pe">soporte@fintu.pe</a>
          </div>
        </div>

        <p className="lp-copy">© {new Date().getFullYear()} Fintú &amp; Co. · Hecho en Perú</p>
      </footer>

      {/* ─── CTA FIJO EN CELULAR ─── */}
      <div className="lp-sticky">
        <span><strong>$4</strong> pago único</span>
        <button className="lp-btn lp-btn--green" onClick={() => goApp('/registro')}>Empezar <Arr /></button>
      </div>
    </div>
  );
}
