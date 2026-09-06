import { ImageResponse } from 'next/og'

export const alt = 'react-raffle-picker — React random picker for giveaways & prize draws'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OpengraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '72px 80px',
        background: '#f4ede0',
        backgroundImage:
          'radial-gradient(ellipse at top left, rgba(212,160,74,0.28), transparent 55%), radial-gradient(ellipse at bottom right, rgba(124,29,41,0.18), transparent 55%)',
        color: '#1a1410',
        fontFamily: 'sans-serif',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        <div
          style={{
            display: 'flex',
            padding: '10px 20px',
            borderRadius: 999,
            border: '2px solid rgba(124,29,41,0.35)',
            color: '#7c1d29',
            fontSize: 26,
            fontWeight: 700,
            letterSpacing: '0.02em',
          }}
        >
          npm i react-raffle-picker
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
        <div
          style={{
            display: 'flex',
            fontSize: 82,
            fontWeight: 800,
            lineHeight: 1.03,
            letterSpacing: '-0.03em',
            maxWidth: 1000,
          }}
        >
          Random winner picker for React.
        </div>
        <div style={{ display: 'flex', fontSize: 34, color: '#4a3f33', maxWidth: 940 }}>
          Giveaways, prize draws, slot-machine reels, countdown auto-freeze.
        </div>
      </div>

      <div
        style={{
          display: 'flex',
          gap: 28,
          fontSize: 26,
          color: '#8a7a66',
          fontWeight: 600,
        }}
      >
        <div style={{ display: 'flex' }}>headless</div>
        <div style={{ display: 'flex' }}>·</div>
        <div style={{ display: 'flex' }}>~3.4 KB gzip</div>
        <div style={{ display: 'flex' }}>·</div>
        <div style={{ display: 'flex' }}>zero deps</div>
        <div style={{ display: 'flex' }}>·</div>
        <div style={{ display: 'flex' }}>MIT</div>
      </div>
    </div>,
    size
  )
}
