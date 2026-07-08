/**
 * Inked cameo silhouettes for the cast — solid profile busts in the
 * Victorian-cameo tradition, one per persona, built from simple shapes so
 * they stay crisp at small sizes. Ink on paper, ringed like a seal.
 */
export function PersonaPortrait({ id, size = 46 }: { id: string; size?: number }) {
  const bust = BUSTS[id];
  if (!bust) return null;
  return (
    <span className="cameo" style={{ width: size, height: size }} aria-hidden="true">
      <svg viewBox="0 0 64 64" width={size} height={size} role="presentation">
        <circle cx="32" cy="32" r="30.5" fill="var(--paper-white)" stroke="var(--hairline)" strokeWidth="1.5" />
        <circle cx="32" cy="32" r="27" fill="none" stroke="var(--gold)" strokeWidth="0.8" opacity="0.7" />
        <g fill="var(--ink)">{bust}</g>
      </svg>
    </span>
  );
}

const BUSTS: Record<string, JSX.Element> = {
  // Elena — hair swept back into a low bun at the nape; pearl at the throat.
  elena: (
    <>
      <ellipse cx="31" cy="25" rx="11" ry="12" />
      <path d="M40 22 L45.5 27.5 L40.5 30 Z" />
      <path d="M22 16 Q31 8 40 16 Q42 20 40 24 L38 15 Q31 11 24 15 Z" />
      <circle cx="20" cy="30" r="6" />
      <rect x="27" y="34" width="8" height="8" />
      <path d="M14 56 Q31 40 48 56 L48 62 L14 62 Z" />
      <circle cx="33.5" cy="45.5" r="1.6" fill="var(--paper-white)" />
    </>
  ),
  // Rafael — short flat hair, heavy jaw, open collar cut into the bust.
  rafael: (
    <>
      <ellipse cx="31" cy="26" rx="11.5" ry="12" />
      <path d="M40 23 L46 28 L41 31 Z" />
      <path d="M20 20 Q22 11 32 11 Q42 11 42 19 L42 22 Q36 15 30 15 Q23 15 21 23 Z" />
      <path d="M38 33 Q42 34 41 37 L36 36 Z" />
      <rect x="26" y="35" width="9" height="8" />
      <path d="M12 58 Q31 40 50 58 L50 62 L12 62 Z" />
      <path d="M31 46 L27 52 L31 58 L35 52 Z" fill="var(--paper-white)" />
    </>
  ),
  // Lucia — hair pulled into a tight high bun; sharp high collar line.
  lucia: (
    <>
      <ellipse cx="31" cy="26" rx="10.5" ry="11.5" />
      <path d="M39.5 23 L44.5 27.5 L40 30 Z" />
      <path d="M23 18 Q26 12 33 12 Q40 13 40 19 L39 21 Q33 15 25 19 Z" />
      <circle cx="31" cy="9" r="5" />
      <rect x="27" y="34" width="8" height="7" />
      <path d="M15 57 Q31 41 47 57 L47 62 L15 62 Z" />
      <path d="M25 46 L37 46 L36 48.5 L26 48.5 Z" fill="var(--paper-white)" />
    </>
  ),
  // Bia — a cloud of curls and round spectacles picked out in paper.
  bia: (
    <>
      <ellipse cx="31" cy="27" rx="10" ry="11" />
      <path d="M39 24 L44 28.5 L39.5 31 Z" />
      <circle cx="22" cy="16" r="7" />
      <circle cx="31" cy="12" r="7.5" />
      <circle cx="40" cy="16" r="6" />
      <circle cx="17" cy="24" r="5.5" />
      <circle cx="16" cy="32" r="5" />
      <rect x="27" y="35" width="8" height="7" />
      <path d="M15 57 Q31 42 47 57 L47 62 L15 62 Z" />
      <circle cx="36" cy="25" r="4" fill="none" stroke="var(--paper-white)" strokeWidth="1.3" />
    </>
  ),
};
