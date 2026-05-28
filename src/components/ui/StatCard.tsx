interface StatCardProps {
  label: string
  value: string
  color?: string
  delay?: number
}

export default function StatCard({ label, value, color = '#ffffff', delay = 0 }: StatCardProps) {
  return (
    <div
      style={{
        background: 'rgba(255,255,255,0.04)',
        border: '1px solid rgba(255,255,255,0.07)',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        borderRadius: '10px',
        padding: '12px 16px',
        minWidth: '100px',
        textAlign: 'center',
        animationDelay: `${delay}s`,
      }}
    >
      <div
        style={{
          width: '18px',
          height: '2px',
          borderRadius: '1px',
          margin: '0 auto 8px',
          background: color,
        }}
      />
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.95rem', fontWeight: 700, color: '#fff' }}>
        {value}
      </div>
      <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.56rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.38)', marginTop: '4px' }}>
        {label}
      </div>
    </div>
  )
}
