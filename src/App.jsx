import { useState } from 'react'
import Header from './components/Header'
import GroupBlock from './components/GroupBlock'
import KnockoutBracket from './components/KnockoutBracket'
import ScheduleView from './components/ScheduleView'
import SetupBanner from './components/SetupBanner'
import { useWorldCupData } from './hooks/useWorldCupData'
import { hasApiKey } from './api/footballData'

function LoadingOverlay() {
  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(27,77,46,0.7)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
      }}
    >
      <div
        style={{
          background: '#FFFFFF',
          border: '3px solid #C9A227',
          borderRadius: '6px',
          padding: '24px 40px',
          textAlign: 'center',
        }}
      >
        <div
          style={{
            fontFamily: 'Oswald, sans-serif',
            fontSize: '18px',
            color: '#1B4D2E',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
          }}
        >
          Loading...
        </div>
        <div style={{ marginTop: 8, fontSize: '12px', color: '#666', fontFamily: 'Inter, sans-serif' }}>
          Fetching live data
        </div>
      </div>
    </div>
  )
}

function LiveIndicator({ liveMatches }) {
  if (!liveMatches || liveMatches.length === 0) return null

  return (
    <div
      style={{
        background: '#E74C3C',
        color: 'white',
        padding: '4px 12px',
        fontSize: '11px',
        fontFamily: 'Oswald, sans-serif',
        letterSpacing: '0.1em',
        textTransform: 'uppercase',
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        justifyContent: 'center',
      }}
    >
      <span className="live-dot" style={{ width: 8, height: 8, borderRadius: '50%', background: 'white', display: 'inline-block' }} />
      {liveMatches.length} Match{liveMatches.length > 1 ? 'es' : ''} Live Now
    </div>
  )
}

export default function App() {
  const [activeTab, setActiveTab] = useState('wallchart')
  const { groups, standings, matches, knockoutMatches, liveMatches, isLoading, error, isApiConnected } =
    useWorldCupData()

  const leftGroups = groups.filter((g) => ['A', 'B', 'C', 'D', 'E', 'F'].includes(g.id))
  const rightGroups = groups.filter((g) => ['G', 'H', 'I', 'J', 'K', 'L'].includes(g.id))

  const tabButtonStyle = (active) => ({
    fontFamily: 'Oswald, sans-serif',
    fontWeight: active ? 700 : 500,
    fontSize: '14px',
    padding: '10px 24px',
    cursor: 'pointer',
    border: 'none',
    borderBottom: active ? '3px solid #C9A227' : '3px solid transparent',
    background: active ? 'rgba(201,162,39,0.1)' : 'transparent',
    color: active ? '#1B4D2E' : '#555',
    letterSpacing: '0.12em',
    textTransform: 'uppercase',
    transition: 'all 0.15s ease',
  })

  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#FFFFFF',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Header */}
      <Header />

      {/* Live indicator */}
      <LiveIndicator liveMatches={liveMatches} />

      {/* Setup banner */}
      {!hasApiKey() && <SetupBanner />}

      {/* API error */}
      {error && isApiConnected === false && hasApiKey() && (
        <div
          style={{
            background: '#FEE2E2',
            border: '1px solid #FCA5A5',
            borderLeft: '4px solid #E74C3C',
            padding: '8px 16px',
            fontSize: '12px',
            fontFamily: 'Inter, sans-serif',
            color: '#7F1D1D',
          }}
        >
          Failed to load live data: {error}. Showing cached/static data.
        </div>
      )}

      {/* Tabs */}
      <div
        style={{
          background: '#FFFFFF',
          borderBottom: '2px solid #D4C5A0',
          display: 'flex',
          padding: '0 16px',
        }}
      >
        <button style={tabButtonStyle(activeTab === 'wallchart')} onClick={() => setActiveTab('wallchart')}>
          Wall Chart
        </button>
        <button style={tabButtonStyle(activeTab === 'schedule')} onClick={() => setActiveTab('schedule')}>
          Schedule
        </button>
        {isApiConnected && (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              marginLeft: 'auto',
              gap: 6,
              fontSize: '10px',
              fontFamily: 'Oswald, sans-serif',
              color: '#2D6A4F',
              letterSpacing: '0.08em',
            }}
          >
            <span
              style={{
                width: 7,
                height: 7,
                borderRadius: '50%',
                background: '#2D6A4F',
                display: 'inline-block',
              }}
            />
            LIVE DATA
          </div>
        )}
      </div>

      {/* Loading overlay */}
      {isLoading && <LoadingOverlay />}

      {/* Main content */}
      {activeTab === 'wallchart' ? (
        <div
          style={{
            display: 'flex',
            gap: '8px',
            padding: '8px',
            alignItems: 'flex-start',
            width: '100%',
            boxSizing: 'border-box',
            overflowX: 'auto',
          }}
        >
          {/* Left groups: A-F */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '4px',
              minWidth: '260px',
              width: '260px',
              flexShrink: 0,
            }}
          >
            <div
              style={{
                fontFamily: 'Oswald, sans-serif',
                fontWeight: 700,
                fontSize: '11px',
                color: '#C9A227',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                textAlign: 'center',
                padding: '4px',
                background: '#1B4D2E',
                borderRadius: '2px',
                marginBottom: '4px',
              }}
            >
              ★&nbsp; Groups A &ndash; F &nbsp;★
            </div>
            {leftGroups.map((group) => (
              <GroupBlock
                key={group.id}
                group={group}
                matches={matches}
                standings={standings}
              />
            ))}
          </div>

          {/* Center: Knockout bracket */}
          <div
            style={{
              flex: 1,
              minWidth: '600px',
            }}
          >
            <KnockoutBracket knockoutMatches={knockoutMatches} />
          </div>

          {/* Right groups: G-L */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '4px',
              minWidth: '260px',
              width: '260px',
              flexShrink: 0,
            }}
          >
            <div
              style={{
                fontFamily: 'Oswald, sans-serif',
                fontWeight: 700,
                fontSize: '11px',
                color: '#C9A227',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                textAlign: 'center',
                padding: '4px',
                background: '#1B4D2E',
                borderRadius: '2px',
                marginBottom: '4px',
              }}
            >
              ★&nbsp; Groups G &ndash; L &nbsp;★
            </div>
            {rightGroups.map((group) => (
              <GroupBlock
                key={group.id}
                group={group}
                matches={matches}
                standings={standings}
              />
            ))}
          </div>
        </div>
      ) : (
        <ScheduleView matches={matches} />
      )}

      {/* Footer */}
      <div
        style={{
          marginTop: 'auto',
          background: '#1B4D2E',
          color: '#C9A227',
          padding: '8px 16px',
          textAlign: 'center',
          fontSize: '10px',
          fontFamily: 'Oswald, sans-serif',
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
          borderTop: '2px solid #C9A227',
        }}
      >
        FIFA World Cup 2026 &bull; USA &bull; Canada &bull; Mexico &bull; June 11 &ndash; July 19, 2026
      </div>
    </div>
  )
}
