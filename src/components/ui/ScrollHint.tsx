export default function ScrollHint() {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '6px',
        opacity: 0.35,
      }}
    >
      <div style={{
        width: '1px',
        height: '32px',
        background: 'linear-gradient(to bottom, transparent, white)',
      }} />
      <div style={{
        width: '5px',
        height: '5px',
        background: 'white',
        borderRadius: '50%',
      }} />
    </div>
  )
}
