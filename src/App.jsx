import React, { useEffect, useRef, useState } from 'react'

const fontJa = "'YuGothic', 'Yu Gothic', 'Hiragino Kaku Gothic ProN', 'Noto Sans JP', sans-serif"

// ── Scroll reveal ─────────────────────────────────────────────────────────────

function useScrollReveal(options = {}) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.unobserve(el) } },
      { threshold: 0.15, ...options }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return { ref, visible }
}

function Reveal({ children, delay = 0, style = {}, className = '' }) {
  const { ref, visible } = useScrollReveal()
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(28px)',
        transition: `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms`,
        ...style,
      }}
    >
      {children}
    </div>
  )
}

// ── Hero Section ──────────────────────────────────────────────────────────────

function TextTag({ bgImage, fontSize, color = '#FFFFFF', children }) {
  return (
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '8px',
        backgroundImage: `url('${bgImage}')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        width: 'fit-content',
      }}
    >
      <span style={{ fontFamily: fontJa, fontWeight: 700, fontSize, lineHeight: '1.3', color }}>
        {children}
      </span>
    </div>
  )
}

function HeroSection() {
  return (
    <section
      className="relative flex flex-col justify-end"
      style={{
        minHeight: '540px',
        padding: '48px 24px',
        backgroundImage: `
          linear-gradient(180deg, rgba(17,17,17,0) 85%, rgba(17,17,17,1) 100%),
          url('/images/hero-bg.png')
        `,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundColor: '#222222',
      }}
    >
      {/* Nav */}
      <nav
        className="absolute flex items-center justify-between"
        style={{ top: '19px', left: '24px', width: '352px' }}
      >
        <div className="flex items-center gap-1">
          <img
            src="/images/logo.svg"
            alt="Unito"
            style={{ width: '83.2px', height: '28px' }}
          />
          <span style={{ fontFamily: fontJa, fontWeight: 700, fontSize: '15px', lineHeight: '1.3', color: '#FFFFFF' }}>
            新卒採用
          </span>
        </div>
        <button
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            fontFamily: fontJa,
            fontWeight: 700,
            fontSize: '15px',
            lineHeight: '1.3',
            color: '#FFFFFF',
            background: 'rgba(0,0,0,0.2)',
            border: '1px solid #CCCCCC',
            borderRadius: '999px',
            padding: '6px 14px 8px',
            cursor: 'pointer',
          }}
        >
          <span>応募</span>
          <i className="fas fa-external-link-alt" style={{ fontSize: '15px' }} />
        </button>
      </nav>

      {/* Headline tags */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
        <Reveal delay={0}><TextTag bgImage="/images/text-frame-bg1.png" fontSize="36px">ホテルを一棟動かす</TextTag></Reveal>
        <Reveal delay={80}><TextTag bgImage="/images/text-frame-bg2.png" fontSize="24px">その経験が君を</TextTag></Reveal>
        <Reveal delay={160}><TextTag bgImage="/images/text-frame-bg2.png" fontSize="24px" color="#FF4B4B">どこでも通用する人材</TextTag></Reveal>
        <Reveal delay={240}><TextTag bgImage="/images/text-frame-bg2.png" fontSize="24px">にする。</TextTag></Reveal>
      </div>
    </section>
  )
}

// ── About Section ─────────────────────────────────────────────────────────────

function AboutSection() {
  return (
    <section
      className="relative overflow-hidden flex flex-col"
      style={{
        fontFamily: fontJa,
        background: '#111111',
        padding: '48px 32px',
        gap: '48px',
        borderBottom: '2px solid transparent',
        borderImage: 'linear-gradient(-90deg, rgba(210,210,210,1) 0%, rgba(108,108,108,1) 100%) 1',
      }}
    >
      {/* Circle photo — absolutely positioned top-left */}
      <div
        className="absolute rounded-full overflow-hidden"
        style={{ top: '-113px', left: '-160px', width: '350px', height: '350px', flexShrink: 0, zIndex: 0 }}
      >
        <img
          src="/images/ellipse-photo.png"
          alt=""
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      </div>

      {/* Heading */}
      <Reveal style={{ position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <p style={{ fontWeight: 700, fontSize: '20px', lineHeight: '1.3', color: '#FFFFFF' }}>
            Unitoのホテマネとは<br />接客のプロではなく
          </p>
          <p style={{ fontWeight: 700, fontSize: '40px', lineHeight: '1.3', color: '#FFFFFF' }}>
            現場の経営者。
          </p>
        </div>
      </Reveal>

      {/* Body text */}
      <Reveal style={{ position: 'relative', zIndex: 1 }}>
        <p style={{ fontWeight: 500, fontSize: '13px', lineHeight: '1.8', color: '#FFFFFF', whiteSpace: 'pre-line' }}>
          {`笑顔で迎えるだけが、この仕事じゃない。
なぜ今日の客数はこうなのか。
どうすればチームがもっと動けるのか。
何がこの店の強みで、何が足を引っ張っているのか——
そこまで考えて、初めて一人前だと
私たちは思っている。

Unitoの現場は、若いうちから経営者の目線で仕事ができる、数少ない場所のひとつだ。

この経験は、あなたの一生の武器になる。`}
        </p>
      </Reveal>

      {/* Hotel photo */}
      <Reveal>
        <div
          style={{
            width: '100%',
            height: '250px',
            backgroundImage: `url('/images/hotel-photo.png')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
      </Reveal>

      {/* Skills */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <Reveal>
          <p style={{ fontWeight: 700, fontSize: '14px', lineHeight: '1.3', color: '#FF9C9C' }}>得られるスキル</p>
        </Reveal>
        {[
          { title: 'P/L管理', desc: '拠点の収益を最大化する数値責任。' },
          { title: '改善の打席', desc: 'オペレーションを自らハックし、効率化する経験。' },
          { title: 'チームビルディング', desc: 'アルバイトや清掃スタッフを巻き込み、組織を動かす力。' },
        ].map((skill, i) => (
          <Reveal key={i} delay={i * 100}>
            <div
              style={{
                background: 'linear-gradient(90deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.2) 100%)',
                border: '1px solid #6C6C6C',
                padding: '16px',
                display: 'flex',
                flexDirection: 'column',
                gap: '4px',
              }}
            >
              <p style={{ fontWeight: 700, fontSize: '18px', lineHeight: '1.3', color: '#FF9C9C' }}>{skill.title}</p>
              <p style={{ fontWeight: 500, fontSize: '12px', lineHeight: '1.3', color: '#CCCCCC' }}>{skill.desc}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

// ── Career Section ────────────────────────────────────────────────────────────

function CareerArrows() {
  return (
    <svg width="231" height="60" viewBox="0 0 231 60" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Center vertical: top to horizontal bar */}
      <line x1="115.5" y1="0" x2="115.5" y2="30" stroke="#FF7474" strokeWidth="1" strokeDasharray="1 2" />
      {/* Horizontal bar */}
      <line x1="0" y1="30" x2="231" y2="30" stroke="#FF7474" strokeWidth="1" strokeDasharray="1 2" />
      {/* Left vertical: down to bottom */}
      <line x1="0" y1="30" x2="0" y2="55" stroke="#FF7474" strokeWidth="1" strokeDasharray="1 2" />
      {/* Center vertical: down to bottom */}
      <line x1="115.5" y1="30" x2="115.5" y2="55" stroke="#FF7474" strokeWidth="1" strokeDasharray="1 2" />
      {/* Right vertical: down to bottom */}
      <line x1="231" y1="30" x2="231" y2="55" stroke="#FF7474" strokeWidth="1" strokeDasharray="1 2" />
      {/* Arrowheads */}
      <polygon points="0,58 -4,50 4,50" fill="#FF7474" />
      <polygon points="115.5,58 111.5,50 119.5,50" fill="#FF7474" />
      <polygon points="231,58 227,50 235,50" fill="#FF7474" />
    </svg>
  )
}

const careerCards = [
  {
    title: 'ビジネス推進部',
    badge: '事業推進',
    desc: '現場の解像度を武器にした、新規拠点の立ち上げやBtoB交渉。',
    color: '#369026',
  },
  {
    title: 'PdM',
    badge: 'プロダクト開発',
    desc: '現場の負（ペイン）をITで解決する、実体験に基づいたプロダクト設計。',
    color: '#E29016',
  },
  {
    title: 'グロース戦略部',
    badge: 'マーケティング',
    desc: '全社の数値を分析し、Unitoの成長を加速させるマーケティング・戦略立案。',
    color: '#FF7474',
  },
]

function CareerSection() {
  return (
    <section
      style={{
        fontFamily: fontJa,
        backgroundImage: `url('/images/career-bg.png')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        padding: '48px 32px',
        display: 'flex',
        flexDirection: 'column',
        gap: '48px',
      }}
    >
      {/* Header */}
      <Reveal>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <p style={{ fontWeight: 700, fontSize: '20px', lineHeight: '1.3', color: '#FF9C9C' }}>キャリアパス</p>
          <p style={{ fontWeight: 500, fontSize: '13px', lineHeight: '1.8', color: '#FFFFFF', whiteSpace: 'pre-line' }}>
            {`ホテルという最前線で培った経営者の目線は、ビジネスのどんな場所でも通用する武器になる。
Unitoが用意するキャリアパスは、現場の先にある。
サービスの仕組みをつくる道、プロダクトを進化させる道、新たな事業を切り開く道——
どのルートを歩むにしても、あなたがホテルの現場で積み上げたものが、必ず土台になる。`}
          </p>
        </div>
      </Reveal>

      {/* Career path diagram */}
      <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '60px' }}>

        {/* First card: ホテルマネージャー */}
        <Reveal>
        <div
          style={{
            width: '200px',
            border: '1px solid #FFFFFF',
            borderRadius: '8px',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              background: 'rgba(0,0,0,0.5)',
              padding: '8px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '8px',
            }}
          >
            <p style={{ fontWeight: 700, fontSize: '14px', lineHeight: '1.3', color: '#FFFFFF' }}>ホテルマネージャー</p>
            <span style={{
              fontWeight: 500, fontSize: '10px', lineHeight: '1.3', color: '#FFFFFF',
              background: 'rgba(255,255,255,0.2)', borderRadius: '999px', padding: '4px 12px',
            }}>
              1~2年目
            </span>
            <p style={{ fontWeight: 500, fontSize: '12px', lineHeight: '1.3', color: '#CCCCCC', width: '100%' }}>
              現場での課題発見、数値管理、泥臭い実行力の習得。
            </p>
          </div>
        </div>
        </Reveal>

        {/* Branching arrows — absolutely positioned in the gap */}
        <div style={{ position: 'absolute', left: '53.49px', top: '105px', width: '231px', height: '60px', pointerEvents: 'none' }}>
          <CareerArrows />
        </div>

        {/* Three destination cards */}
        <div style={{ display: 'flex', gap: '8px', width: '100%' }}>
          {careerCards.map((card, i) => (
            <Reveal key={i} delay={i * 100} style={{ flex: 1 }}>
            <div style={{ borderRadius: '8px', overflow: 'hidden', display: 'flex', flexDirection: 'column', height: '100%' }}>
              <div style={{ height: '4px', background: card.color, flexShrink: 0 }} />
              <div
                style={{
                  background: 'rgba(0,0,0,0.5)',
                  padding: '8px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '8px',
                  flex: 1,
                }}
              >
                <p style={{ fontWeight: 700, fontSize: '12px', lineHeight: '1.3', color: '#FFFFFF', textAlign: 'center' }}>
                  {card.title}
                </p>
                <span style={{
                  fontWeight: 500, fontSize: '10px', lineHeight: '1.3', color: '#FFFFFF',
                  background: 'rgba(255,255,255,0.2)', borderRadius: '999px', padding: '4px 12px', whiteSpace: 'nowrap',
                }}>
                  {card.badge}
                </span>
                <p style={{ fontWeight: 500, fontSize: '12px', lineHeight: '1.3', color: '#CCCCCC', width: '100%' }}>
                  {card.desc}
                </p>
              </div>
            </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

// ── Staff Section ─────────────────────────────────────────────────────────────

function StaffCard({ photo, dept, name }) {
  return (
    <div style={{ width: '158px', flexShrink: 0, borderRadius: '4px', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
      <div
        style={{
          width: '158px',
          height: '300px',
          flexShrink: 0,
          backgroundImage: `linear-gradient(180deg, rgba(0,0,0,0) 50%, rgba(0,0,0,0.7) 100%), url('${photo}')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      <div
        style={{
          padding: '0 8px 12px',
          marginTop: '-55px',
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          gap: '8px',
        }}
      >
        <p style={{ fontFamily: fontJa, fontWeight: 700, fontSize: '20px', lineHeight: '1.3', color: '#FFFFFF' }}>{dept}</p>
        <p style={{ fontFamily: fontJa, fontWeight: 500, fontSize: '12px', lineHeight: '1.3', color: '#FFFFFF' }}>{name}</p>
      </div>
    </div>
  )
}

const staffData = [
  { photo: '/images/staff1.png', dept: 'ビジネス推進部', name: '山田 太郎' },
  { photo: '/images/staff2-1dd95b.png', dept: 'PdM', name: '山田 太郎' },
  { photo: '/images/staff3.png', dept: 'グロース戦略部', name: '山田 太郎' },
]

function StaffSection() {
  return (
    <section
      className="relative overflow-hidden"
      style={{
        fontFamily: fontJa,
        background: '#222222',
        padding: '48px 32px',
        display: 'flex',
        flexDirection: 'column',
        gap: '24px',
      }}
    >
      <Reveal>
        <p style={{ fontWeight: 700, fontSize: '14px', lineHeight: '1.3', color: '#FF9C9C' }}>先輩社員紹介</p>
      </Reveal>

      {/* Horizontal scrollable cards */}
      <Reveal>
      <div className="relative">
        <div
          className="no-scrollbar"
          style={{
            display: 'flex',
            gap: '16px',
            overflowX: 'auto',
            marginLeft: '-32px',
            marginRight: '-32px',
            paddingLeft: '32px',
            paddingRight: '32px',
          }}
        >
          {staffData.map((staff, i) => (
            <StaffCard key={i} {...staff} />
          ))}
        </div>

        {/* Arrow button */}
        <button
          style={{
            position: 'absolute',
            right: '0',
            top: '148px',
            width: '40px',
            height: '40px',
            background: 'rgba(17,17,17,0.6)',
            borderRadius: '4px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: 'none',
            cursor: 'pointer',
          }}
        >
          <i className="fas fa-arrow-right" style={{ color: '#FFFFFF', fontSize: '20px' }} />
        </button>
      </div>
      </Reveal>
    </section>
  )
}

// ── CTA Section ───────────────────────────────────────────────────────────────

function CTASection() {
  return (
    <section
      style={{
        fontFamily: fontJa,
        background: '#222222',
        display: 'flex',
        padding: '2px',
        gap: '2px',
      }}
    >
      <Reveal style={{ width: '100%' }}>
      <button
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          background: '#FF7474',
          padding: '8px',
          gap: '10px',
          border: 'none',
          cursor: 'pointer',
        }}
      >
        <span style={{ fontWeight: 700, fontSize: '16px', lineHeight: '1.3', color: '#FFFFFF' }}>応募</span>
        <i className="fas fa-external-link-alt" style={{ color: '#FFFFFF', fontSize: '16px' }} />
      </button>
      </Reveal>
    </section>
  )
}

// ── Password Gate ─────────────────────────────────────────────────────────────

const CORRECT_PASSWORD = 'unito-saiyo'
const SESSION_KEY = 'unito_auth'

function PasswordGate({ onAuth }) {
  const [value, setValue] = useState('')
  const [error, setError] = useState(false)

  function handleSubmit(e) {
    e.preventDefault()
    if (value === CORRECT_PASSWORD) {
      sessionStorage.setItem(SESSION_KEY, '1')
      onAuth()
    } else {
      setError(true)
      setValue('')
    }
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: '#111111',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: fontJa,
    }}>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px', width: '280px' }}>
        <p style={{ color: '#FFFFFF', fontWeight: 700, fontSize: '16px', margin: 0 }}>パスワードを入力してください</p>
        <input
          type="password"
          value={value}
          onChange={e => { setValue(e.target.value); setError(false) }}
          autoFocus
          style={{
            width: '100%',
            padding: '10px 14px',
            background: '#222222',
            border: error ? '1px solid #FF7474' : '1px solid #6C6C6C',
            borderRadius: '4px',
            color: '#FFFFFF',
            fontSize: '14px',
            outline: 'none',
            boxSizing: 'border-box',
          }}
        />
        {error && <p style={{ color: '#FF7474', fontSize: '12px', margin: 0 }}>パスワードが違います</p>}
        <button type="submit" style={{
          width: '100%',
          padding: '10px',
          background: '#FF7474',
          border: 'none',
          borderRadius: '4px',
          color: '#FFFFFF',
          fontWeight: 700,
          fontSize: '14px',
          cursor: 'pointer',
        }}>
          入る
        </button>
      </form>
    </div>
  )
}

// ── App ───────────────────────────────────────────────────────────────────────

export default function App() {
  const [authed, setAuthed] = useState(() => sessionStorage.getItem(SESSION_KEY) === '1')

  if (!authed) return <PasswordGate onAuth={() => setAuthed(true)} />

  return (
    <div style={{ minHeight: '100vh', background: '#111111', display: 'flex', justifyContent: 'center' }}>
      <div style={{ width: '400px' }}>
        <HeroSection />
        <AboutSection />
        <CareerSection />
        <StaffSection />
        <CTASection />
      </div>
    </div>
  )
}
