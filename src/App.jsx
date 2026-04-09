import React, { useEffect, useRef, useState } from 'react'

const fontJa = "'YuGothic', 'Yu Gothic', 'Hiragino Kaku Gothic ProN', 'Noto Sans JP', sans-serif"
const fontSerif = "'Noto Serif', 'Georgia', serif"
const fontGill = "'Gill Sans', 'Gill Sans MT', 'Trebuchet MS', sans-serif"
const BASE = import.meta.env.BASE_URL

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

// ── Shared styles ─────────────────────────────────────────────────────────────

const sectionBorder = {
  borderBottom: '2px solid transparent',
  borderImage: 'linear-gradient(-90deg, rgba(210,210,210,1) 0%, rgba(108,108,108,1) 100%) 1',
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
          url(${BASE}images/hero-bg.png)
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
            src={`${BASE}images/logo.svg`}
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
            justifyContent: 'center',
            gap: '10px',
            fontFamily: fontJa,
            fontWeight: 700,
            fontSize: '14px',
            lineHeight: '1',
            color: '#FFFFFF',
            background: '#FF7474',
            border: 'none',
            borderRadius: '6px',
            padding: '8px 24px',
            cursor: 'pointer',
            boxShadow: '0px 1px 2px 0px rgba(75,75,75,0.3)',
          }}
        >
          応募
        </button>
      </nav>

      {/* Headline tags */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
        <Reveal delay={0}><TextTag bgImage={`${BASE}images/text-frame-bg1.png`} fontSize="36px">ホテルを一棟動かす</TextTag></Reveal>
        <Reveal delay={80}><TextTag bgImage={`${BASE}images/text-frame-bg2.png`} fontSize="24px">その経験が君を</TextTag></Reveal>
        <Reveal delay={160}><TextTag bgImage={`${BASE}images/text-frame-bg2.png`} fontSize="24px" color="#FF4B4B">どこでも通用する人材</TextTag></Reveal>
        <Reveal delay={240}><TextTag bgImage={`${BASE}images/text-frame-bg2.png`} fontSize="24px">にする。</TextTag></Reveal>
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
        ...sectionBorder,
      }}
    >
      {/* Circle photo — absolutely positioned top-left */}
      <div
        className="absolute rounded-full overflow-hidden"
        style={{ top: '-113px', left: '-160px', width: '350px', height: '350px', flexShrink: 0, zIndex: 0 }}
      >
        <img
          src={`${BASE}images/ellipse-photo.png`}
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
        <p style={{ fontWeight: 500, fontSize: '14px', lineHeight: '1.8', color: '#FFFFFF', whiteSpace: 'pre-line' }}>
          {`笑顔で迎えるだけが、この仕事じゃない。
なぜ今日の客数はこうなのか。
どうすればチームがもっと動けるのか。
何がこの店の強みで、
何が足を引っ張っているのか——
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
            backgroundImage: `url(${BASE}images/hotel-photo.png)`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
      </Reveal>
    </section>
  )
}

// ── Career Section ────────────────────────────────────────────────────────────

function CareerArrows() {
  return (
    <svg width="231" height="60" viewBox="0 0 231 60" fill="none" xmlns="http://www.w3.org/2000/svg">
      <line x1="115.5" y1="0" x2="115.5" y2="30" stroke="#FF7474" strokeWidth="1" strokeDasharray="1 2" />
      <line x1="0" y1="30" x2="231" y2="30" stroke="#FF7474" strokeWidth="1" strokeDasharray="1 2" />
      <line x1="0" y1="30" x2="0" y2="55" stroke="#FF7474" strokeWidth="1" strokeDasharray="1 2" />
      <line x1="115.5" y1="30" x2="115.5" y2="55" stroke="#FF7474" strokeWidth="1" strokeDasharray="1 2" />
      <line x1="231" y1="30" x2="231" y2="55" stroke="#FF7474" strokeWidth="1" strokeDasharray="1 2" />
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
        backgroundImage: `url(${BASE}images/career-bg.png)`,
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
          <p style={{ fontWeight: 500, fontSize: '14px', lineHeight: '1.8', color: '#FFFFFF', whiteSpace: 'pre-line' }}>
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

        {/* Branching arrows */}
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

const staffData = [
  { photo: `${BASE}images/staff1.png`, name: '山田 太郎', dept: 'ビジネス推進部' },
  { photo: `${BASE}images/staff2-1dd95b.png`, name: '山田 太郎', dept: 'PdM' },
  { photo: `${BASE}images/staff3.png`, name: '山田 太郎', dept: 'グロース戦略部' },
]

function StaffCard({ photo, name, dept }) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        padding: '16px',
        background: 'linear-gradient(90deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.2) 100%)',
        border: '1px solid #6C6C6C',
      }}
    >
      {/* Photo */}
      <div style={{ width: '100%', height: '200px', overflow: 'hidden', backgroundColor: '#D9D9D9' }}>
        <img src={photo} alt={name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      </div>
      {/* Content */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {/* Name + dept */}
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: '8px' }}>
          <span style={{ fontFamily: fontJa, fontWeight: 700, fontSize: '16px', lineHeight: '1.3', color: '#FFFFFF' }}>{name}</span>
          <span style={{ fontFamily: fontJa, fontWeight: 500, fontSize: '16px', lineHeight: '1.3', color: '#FFFFFF' }}>{dept}</span>
        </div>
        {/* Interview link */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', cursor: 'pointer' }}>
          <span style={{ fontFamily: fontJa, fontWeight: 700, fontSize: '14px', lineHeight: '1.3', color: '#FFFFFF' }}>インタビュー</span>
          <i className="fas fa-chevron-right" style={{ color: '#FFFFFF', fontSize: '14px' }} />
        </div>
      </div>
    </div>
  )
}

function StaffSection() {
  return (
    <section
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
        <p style={{ fontWeight: 700, fontSize: '20px', lineHeight: '1.3', color: '#FF9C9C' }}>先輩社員紹介</p>
      </Reveal>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {staffData.map((staff, i) => (
          <Reveal key={i} delay={i * 100}>
            <StaffCard {...staff} />
          </Reveal>
        ))}
      </div>
    </section>
  )
}

// ── Training Section ──────────────────────────────────────────────────────────

const trainingPrograms = [
  { name: 'プログラム名', desc: 'プログラムの説明テキストが入ります。' },
  { name: 'プログラム名', desc: 'プログラムの説明テキストが入ります。' },
  { name: 'プログラム名', desc: 'プログラムの説明テキストが入ります。' },
]

function TrainingSection() {
  return (
    <section
      style={{
        fontFamily: fontJa,
        backgroundImage: `url(${BASE}images/career-bg.png)`,
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
          <p style={{ fontWeight: 700, fontSize: '20px', lineHeight: '1.3', color: '#FF9C9C' }}>成長の場</p>
          <p style={{ fontWeight: 700, fontSize: '14px', lineHeight: '1.8', color: '#FFFFFF' }}>
            この研修を越えた人だけが、見える景色がある。
          </p>
          <p style={{ fontWeight: 500, fontSize: '14px', lineHeight: '1.8', color: '#FFFFFF', whiteSpace: 'pre-line' }}>
            {`入社前から始まる、実行力を育てる研修プログラム。 内定者インターンから、
地方採用メンバー向けの東京研修まで——

現場で積み上げてきた知見をもとに設計されたこの時間が、 あなたをビジネスパーソンとして、一段階引き上げる。 さあ、自分を試しにきてください。`}
          </p>
        </div>
      </Reveal>

      {/* Program list */}
      <Reveal>
        <div
          style={{
            background: 'rgba(255,255,255,0.1)',
            padding: '12px',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
          }}
        >
          <p style={{ fontWeight: 700, fontSize: '13px', lineHeight: '1.3', color: '#D7D7D7' }}>研修プログラムの一例</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            {trainingPrograms.map((prog, i) => (
              <div key={i} style={{ display: 'flex', flexDirection: 'column', padding: '4px 0' }}>
                <div style={{ display: 'flex', alignItems: 'center', paddingLeft: '8px', borderLeft: '2px solid #FFFFFF' }}>
                  <span style={{ fontWeight: 700, fontSize: '14px', lineHeight: '1.3', color: '#FFFFFF' }}>{prog.name}</span>
                </div>
                <p style={{ fontWeight: 500, fontSize: '13px', lineHeight: '1.3', color: '#D7D7D7', marginTop: '4px' }}>{prog.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  )
}

// ── Culture Section ───────────────────────────────────────────────────────────

function StatCard({ label, children, desc }) {
  return (
    <div
      style={{
        width: '160px',
        background: 'rgba(255,255,255,0.1)',
        padding: '12px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '12px',
        boxSizing: 'border-box',
      }}
    >
      <p style={{ fontFamily: fontJa, fontWeight: 700, fontSize: '12px', lineHeight: '1.3', color: '#FFFFFF', textAlign: 'center' }}>{label}</p>
      <div style={{ display: 'flex', alignItems: 'flex-end', gap: '2px' }}>
        {children}
      </div>
      {desc && (
        <p style={{ fontFamily: fontJa, fontWeight: 500, fontSize: '12px', lineHeight: '1.3', color: '#D7D7D7', textAlign: 'center', width: '100%' }}>{desc}</p>
      )}
    </div>
  )
}

function BigNum({ children }) {
  return (
    <span style={{ fontFamily: fontSerif, fontWeight: 500, fontSize: '34px', lineHeight: '1', color: '#FF9C9C' }}>{children}</span>
  )
}

function Unit({ children }) {
  return (
    <span style={{ fontFamily: fontJa, fontWeight: 700, fontSize: '12px', lineHeight: '1.3', color: '#FFFFFF' }}>{children}</span>
  )
}

function CultureSection() {
  return (
    <section
      style={{
        fontFamily: fontJa,
        background: '#111111',
        padding: '48px 32px',
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        ...sectionBorder,
      }}
    >
      <Reveal>
        <p style={{ fontWeight: 700, fontSize: '20px', lineHeight: '1.3', color: '#FF9C9C', marginBottom: '8px' }}>数字で見るUnitoカルチャー</p>
      </Reveal>

      {/* Stats grid */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
        <Reveal delay={0}>
          <StatCard label="平均年齢" desc="新卒・第二新卒が活躍している組織です。">
            <BigNum>00</BigNum><Unit>歳</Unit>
          </StatCard>
        </Reveal>

        <Reveal delay={50}>
          <StatCard label="昇進までの年数" desc="実力主義の評価制度。成長意欲が高く、挑戦を楽しめる方を歓迎します。">
            <Unit>平均</Unit><BigNum>0</BigNum><Unit>年0ヶ月</Unit>
          </StatCard>
        </Reveal>

        <Reveal delay={100}>
          <StatCard label="男女比" desc="男女問わず働きやすい職場です。">
            <span style={{ fontFamily: fontJa, fontWeight: 700, fontSize: '20px', lineHeight: '1.3', color: '#FFFFFF' }}>0:0</span>
          </StatCard>
        </Reveal>

        <Reveal delay={150}>
          <div
            style={{
              width: '160px',
              background: 'rgba(255,255,255,0.1)',
              padding: '12px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '12px',
            }}
          >
            <p style={{ fontWeight: 700, fontSize: '12px', lineHeight: '1.3', color: '#FFFFFF', textAlign: 'center' }}>前職</p>
            <p style={{ fontWeight: 500, fontSize: '12px', lineHeight: '1.3', color: '#D7D7D7', textAlign: 'center' }}>
              ○○○○業界 / ○○○○業界 / ○○○○業界 / ○○○○業界 / ○○○○業界 / ○○○○業界 他
            </p>
          </div>
        </Reveal>

        <Reveal delay={200}>
          <div
            style={{
              width: '160px',
              background: 'rgba(255,255,255,0.1)',
              padding: '12px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '12px',
            }}
          >
            <p style={{ fontWeight: 700, fontSize: '12px', lineHeight: '1.3', color: '#FFFFFF', textAlign: 'center' }}>学歴</p>
            <p style={{ fontWeight: 500, fontSize: '12px', lineHeight: '1.3', color: '#D7D7D7', textAlign: 'center' }}>
              ○○○○大学 / ○○○○大学 / ○○○○大学 / ○○○○大学 / ○○○○大学 他
            </p>
          </div>
        </Reveal>

        <Reveal delay={250}>
          <div
            style={{
              width: '160px',
              background: 'rgba(255,255,255,0.1)',
              padding: '12px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '12px',
            }}
          >
            <p style={{ fontWeight: 700, fontSize: '12px', lineHeight: '1.3', color: '#FFFFFF', textAlign: 'center' }}>趣味</p>
            <p style={{ fontWeight: 500, fontSize: '12px', lineHeight: '1.3', color: '#D7D7D7', textAlign: 'center' }}>
              趣味の名前 / 趣味の名前 / 趣味の名前 / 趣味の名前 / 趣味の名前 / 趣味の名前 他
            </p>
          </div>
        </Reveal>

        <Reveal delay={300}>
          <StatCard label="1年に実施する社内イベントの回数" desc="イベントの名前 / イベントの名前 / イベントの名前 / イベントの名前 / イベントの名前 他">
            <BigNum>0</BigNum><Unit>回</Unit>
          </StatCard>
        </Reveal>
      </div>
    </section>
  )
}

// ── Skills Section ────────────────────────────────────────────────────────────

const skills = [
  '現場を動かす「経営実戦スキル」',
  '事業を加速させる「グローススキル」',
  '変化を楽しむ「カオス耐性と自走力」',
]

function SkillsSection() {
  return (
    <section
      style={{
        fontFamily: fontJa,
        background: '#111111',
        padding: '48px 32px',
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        ...sectionBorder,
      }}
    >
      <Reveal>
        <p style={{ fontWeight: 700, fontSize: '14px', lineHeight: '1.3', color: '#CCCCCC' }}>得られるスキル</p>
      </Reveal>
      {skills.map((skill, i) => (
        <Reveal key={i} delay={i * 80}>
          <div
            style={{
              background: 'linear-gradient(90deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.2) 100%)',
              border: '1px solid #6C6C6C',
              padding: '16px',
            }}
          >
            <p style={{ fontWeight: 700, fontSize: '18px', lineHeight: '1.3', color: '#FF9C9C' }}>{skill}</p>
          </div>
        </Reveal>
      ))}
    </section>
  )
}

// ── Entry Section ─────────────────────────────────────────────────────────────

function EntrySection() {
  return (
    <section
      style={{
        fontFamily: fontJa,
        background: '#111111',
        padding: '48px 32px',
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        ...sectionBorder,
      }}
    >
      <Reveal>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <p style={{ fontWeight: 700, fontSize: '20px', lineHeight: '1.3', color: '#FF9C9C' }}>新卒・第二新卒採用エントリー</p>
          <p style={{ fontWeight: 500, fontSize: '12px', lineHeight: '1.3', color: '#CCCCCC' }}>拠点の収益を最大化する数値責任。</p>
        </div>
      </Reveal>
      <Reveal>
        <button
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            background: '#FF7474',
            padding: '16px',
            gap: '10px',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            boxShadow: '0px 1px 2px 0px rgba(75,75,75,0.3)',
          }}
        >
          <span style={{ fontWeight: 700, fontSize: '16px', lineHeight: '1', color: '#FFFFFF' }}>エントリーはこちら</span>
        </button>
      </Reveal>
    </section>
  )
}

// ── Footer ────────────────────────────────────────────────────────────────────

function Footer() {
  return (
    <footer
      style={{
        fontFamily: fontJa,
        background: '#111111',
        padding: '32px',
        display: 'flex',
        flexDirection: 'column',
        gap: '32px',
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          <span style={{ fontFamily: fontGill, fontWeight: 600, fontSize: '20px', lineHeight: '1.3', letterSpacing: '0.028em', color: '#FFFFFF' }}>Unito</span>
          <span style={{ fontWeight: 700, fontSize: '15px', lineHeight: '1.3', color: '#FFFFFF' }}>新卒・第二新卒採用</span>
        </div>
        {/* Links */}
        {['Unito 採用サイトメイン', '会社概要', 'お問い合わせ', 'プライバシーポリシー'].map((link, i) => (
          <a
            key={i}
            href="#"
            style={{ fontWeight: 500, fontSize: '12px', lineHeight: '1.3', color: '#CCCCCC', textDecoration: 'none' }}
          >
            {link}
          </a>
        ))}
      </div>
      <p style={{ fontWeight: 500, fontSize: '12px', lineHeight: '1.3', color: '#CCCCCC', textAlign: 'center' }}>
        ©︎ 2025 Unito Inc.
      </p>
    </footer>
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
        <TrainingSection />
        <CultureSection />
        <SkillsSection />
        <EntrySection />
        <Footer />
      </div>
    </div>
  )
}
