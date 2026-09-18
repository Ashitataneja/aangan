export default function WaveDivider({ color = '#D4A017', className = '' }) {
  return (
    <svg
      viewBox="0 0 100 6"
      preserveAspectRatio="none"
      className={`h-2 w-full px-3 opacity-50 ${className}`}
    >
      <path
        d="M0,3 Q5,0 10,3 T20,3 T30,3 T40,3 T50,3 T60,3 T70,3 T80,3 T90,3 T100,3"
        fill="none"
        stroke={color}
        strokeWidth="1.2"
        strokeLinecap="round"
      />
    </svg>
  );
}
