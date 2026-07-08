import type { Artifact } from "../engine/types";
import { PersonaPortrait } from "./PersonaPortrait";

export function ArtifactView({ artifact }: { artifact: Artifact }) {
  const { kind } = artifact;
  const paragraphs = artifact.body.split(/\n\n+/);

  if (kind === "sticky") {
    return (
      <div className="artifact sticky" role="note" aria-label={`Sticky note from ${artifact.from ?? "Bia"}`}>
        {artifact.stamp && <span className="stamp">{artifact.stamp}</span>}
        <div className="a-head">— {artifact.from ?? "Bia"}</div>
        <div className="a-body">
          {paragraphs.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
      </div>
    );
  }

  if (kind === "clipping") {
    return (
      <article className="artifact clipping">
        {artifact.stamp && <span className="stamp">{artifact.stamp}</span>}
        <div className="a-mast">{artifact.from ?? "THE PROVISIONER"}</div>
        {artifact.subject && <h3 className="a-subject">{artifact.subject}</h3>}
        <div className="a-body">
          {paragraphs.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
      </article>
    );
  }

  if (kind === "letter") {
    return (
      <article className="artifact letter">
        {artifact.stamp && <span className="stamp">{artifact.stamp}</span>}
        <div className="a-head">
          <PersonaPortrait id={artifact.portrait ?? "elena"} size={52} />
          <div className="letter-name">Elena Solari</div>
          <div className="letter-sub">{artifact.from ?? "Group CEO · Solari Foods · Torino"}</div>
        </div>
        <div className="a-body">
          {paragraphs.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
        {artifact.ps && <p className="letter-ps">{artifact.ps}</p>}
      </article>
    );
  }

  if (kind === "message") {
    // Deterministic transcript timestamps, a few minutes apart.
    const stamp = (i: number) => `09:${String(12 + i * 3).padStart(2, "0")}`;
    return (
      <article className="artifact message" aria-label={`Phone messages from ${artifact.from ?? "Rafael Ortega"}`}>
        <div className="a-head">
          <span className="msg-route">Forwarded from mobile · printed for file</span>
          <span className="msg-from">
            {artifact.portrait && <PersonaPortrait id={artifact.portrait} size={26} />}
            {artifact.from ?? "R. Ortega"}
          </span>
        </div>
        <div className="a-body msg-thread">
          {paragraphs.map((p, i) => (
            <div className="msg-row" key={i} style={{ animationDelay: `${120 + i * 260}ms` }}>
              <p className="msg-bubble">{p}</p>
              <span className="msg-time">{stamp(i)}</span>
            </div>
          ))}
        </div>
      </article>
    );
  }

  if (kind === "frontpage") {
    return (
      <article className="artifact frontpage">
        <div className="fp-mast">THE PROVISIONER</div>
        <div className="fp-sub">International Grocery Trade Weekly — special to the file</div>
        <h3 className="fp-headline">{artifact.subject}</h3>
        <p className="fp-standfirst">{artifact.body}</p>
      </article>
    );
  }

  const cls = kind === "memo" ? "memo" : kind === "compliance" ? "compliance" : "email";
  return (
    <article className={`artifact ${cls}`}>
      {artifact.stamp && <span className="stamp">{artifact.stamp}</span>}
      <div className="a-head">
        {kind === "memo" && <div className="letterhead">SOLARI · ALBA · MCMXXXIV</div>}
        {kind === "compliance" && artifact.portrait && (
          <div className="comp-cameo">
            <PersonaPortrait id={artifact.portrait} size={34} />
          </div>
        )}
        {artifact.from && (
          <div>
            <strong>From:</strong> {artifact.from}
          </div>
        )}
        {artifact.to && (
          <div>
            <strong>To:</strong> {artifact.to}
          </div>
        )}
        {kind !== "memo" && artifact.subject && (
          <div>
            <strong>Subject:</strong> {artifact.subject}
          </div>
        )}
      </div>
      {kind === "memo" && artifact.subject && <div className="a-subject">{artifact.subject}</div>}
      <div className="a-body">
        {paragraphs.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </div>
      {kind === "compliance" && (
        <div className="comp-footer">cc: E. Solari · original to file · retain 7 yrs</div>
      )}
    </article>
  );
}
