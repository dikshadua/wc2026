export default function FlagIcon({ code, name, size = 'md' }) {
  const dimensions = size === 'sm'
    ? { width: 20, height: 14 }
    : { width: 28, height: 20 }

  if (!code) {
    return (
      <span
        className="inline-block rounded bg-gray-200 border border-gray-300"
        style={{ width: dimensions.width, height: dimensions.height, minWidth: dimensions.width }}
      />
    )
  }

  return (
    <img
      src={`https://flagcdn.com/w40/${code.toLowerCase()}.png`}
      alt={name ? `${name} flag` : code}
      width={dimensions.width}
      height={dimensions.height}
      className="inline-block rounded"
      style={{
        border: '1px solid rgba(0,0,0,0.15)',
        objectFit: 'cover',
        minWidth: dimensions.width,
        flexShrink: 0,
      }}
      onError={(e) => {
        e.target.style.display = 'none'
      }}
    />
  )
}
