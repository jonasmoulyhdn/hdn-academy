import { useState, useRef, useEffect } from "react";

const SUPABASE_URL = "https://mdppuysfoxaogwnkxvxa.supabase.co";
const SUPABASE_KEY = "sb_publishable_EG8PNwPh_I6-H1ipKcMmSw_Kfx918am";
const HDN_LOGO = "data:image/webp;base64,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";

const T = {
  blue: "#002B49", blueLight: "#004070", bluePale: "#E6EEF4",
  red: "#F9423A", redPale: "#FEF0EF",
  white: "#FAFAFA", surface: "#F0F3F6", mid: "#DDE3E9",
  border: "#C8D0D8", dark: "#0D1F2D", muted: "#5E7080",
};

const CLASSEMENTS = ["NC","40","30/5","30/4","30/3","30/2","30/1","30","15/5","15/4","15/3","15/2","15/1","15","5/6","4/6","3/6","2/6","1/6","0","-2/6","-4/6","-15","FFT Pro"];
const ROUNDS = ["1er tour","2e tour","3e tour","Quarts","Demi-finale","Finale","Consolation"];
const NOTE_MENTALE = ["Tactique","Attitude","Concentration"];
const NOTE_TECHNIQUE = ["Coup droit","Revers","Service","Smash","Volée","Retour"];
const NOTE_KEYS_MENTALE = ["note_tactique","note_attitude","note_concentration"];
const NOTE_KEYS_TECHNIQUE = ["note_coup_droit","note_revers","note_service","note_smash","note_volee","note_retour"];

// ─── SUPABASE ────────────────────────────────────────────────────
async function sbFetch(path, opts = {}) {
  const res = await fetch(SUPABASE_URL + "/rest/v1/" + path, {
    headers: {
      "apikey": SUPABASE_KEY,
      "Authorization": "Bearer " + SUPABASE_KEY,
      "Content-Type": "application/json",
      "Prefer": opts.prefer || "return=representation",
      ...opts.headers,
    },
    ...opts,
  });
  if (!res.ok) { const e = await res.text(); throw new Error(e); }
  const t = await res.text();
  return t ? JSON.parse(t) : null;
}

const api = {
  getPlayers: () => sbFetch("players?select=*&order=created_at.asc"),
  getPlayer: (id) => sbFetch(`players?id=eq.${id}&select=*`).then(r => r[0]),
  createPlayer: (p) => sbFetch("players", { method: "POST", body: JSON.stringify(p) }).then(r => r[0]),
  updatePlayer: (id, p) => sbFetch(`players?id=eq.${id}`, { method: "PATCH", body: JSON.stringify(p) }),
  deletePlayer: (id) => sbFetch(`players?id=eq.${id}`, { method: "DELETE", prefer: "return=minimal" }),
  getMatches: (pid) => sbFetch(`matches?player_id=eq.${pid}&select=*&order=created_at.asc`),
  createMatch: (m) => sbFetch("matches", { method: "POST", body: JSON.stringify(m) }).then(r => r[0]),
  updateMatch: (id, m) => sbFetch(`matches?id=eq.${id}`, { method: "PATCH", body: JSON.stringify(m) }),
  deleteMatch: (id) => sbFetch(`matches?id=eq.${id}`, { method: "DELETE", prefer: "return=minimal" }),
};

// ─── STARS ───────────────────────────────────────────────────────
function Stars({ value = 0, onChange, readonly }) {
  return (
    <div style={{ display: "flex", gap: 3 }}>
      {[1,2,3,4,5].map(i => (
        <span key={i} onClick={() => !readonly && onChange && onChange(i === value ? 0 : i)}
          style={{ fontSize: 20, cursor: readonly ? "default" : "pointer", color: i <= value ? "#F9423A" : "#DDE3E9",
            transition: "color .1s", userSelect: "none" }}>★</span>
      ))}
    </div>
  );
}

function StarRow({ label, noteKey, match, onChange }) {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "6px 0",
      borderBottom: `1px solid ${T.mid}` }}>
      <span style={{ fontSize: 13, color: T.dark, minWidth: 110 }}>{label}</span>
      <Stars value={match[noteKey] || 0} onChange={v => onChange({ ...match, [noteKey]: v })} />
    </div>
  );
}

// ─── UI PRIMITIVES ───────────────────────────────────────────────
function Avatar({ src, name, size = 72 }) {
  const initials = name ? name.split(" ").map(w => w[0]).join("").slice(0,2).toUpperCase() : "?";
  return (
    <div style={{ width: size, height: size, borderRadius: "50%", overflow: "hidden", flexShrink: 0,
      background: src ? "transparent" : T.bluePale, border: `2px solid ${T.mid}`,
      display: "flex", alignItems: "center", justifyContent: "center",
      fontSize: size * 0.35, fontWeight: 700, color: T.blue }}>
      {src ? <img src={src} alt={name} style={{ width: "100%", height: "100%", objectFit: "cover" }} /> : initials}
    </div>
  );
}

function Badge({ children, color = T.blue, bg }) {
  return <span style={{ background: bg || color + "18", color, border: `1px solid ${color}40`,
    borderRadius: 4, padding: "2px 8px", fontSize: 11, fontWeight: 700, letterSpacing: 0.5, textTransform: "uppercase" }}>{children}</span>;
}

function Btn({ children, onClick, variant = "primary", small, disabled, style: s }) {
  const base = { border: "none", borderRadius: 6, cursor: disabled ? "not-allowed" : "pointer",
    fontFamily: "system-ui", fontWeight: 600, opacity: disabled ? 0.45 : 1,
    padding: small ? "6px 14px" : "10px 20px", fontSize: small ? 13 : 14, ...s };
  const variants = {
    primary: { background: T.blue, color: T.white },
    secondary: { background: T.surface, color: T.dark, border: `1px solid ${T.border}` },
    ghost: { background: "transparent", color: T.blue, border: `1px solid ${T.blue}` },
    red: { background: T.red, color: "#fff" },
  };
  return <button onClick={disabled ? undefined : onClick} style={{ ...base, ...variants[variant] }}>{children}</button>;
}

function Field({ label, children, required }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
      <label style={{ fontSize: 11, fontWeight: 700, color: T.muted, letterSpacing: 0.6, textTransform: "uppercase" }}>
        {label}{required && <span style={{ color: T.red }}> *</span>}
      </label>
      {children}
    </div>
  );
}

const inputStyle = { border: `1px solid ${T.border}`, borderRadius: 6, padding: "8px 10px",
  fontSize: 14, fontFamily: "system-ui", color: T.dark, background: T.white, outline: "none",
  width: "100%", boxSizing: "border-box" };
const taStyle = { ...inputStyle, resize: "vertical", minHeight: 80 };

function Spinner() {
  return <div style={{ display: "flex", justifyContent: "center", padding: 40 }}>
    <div style={{ width: 32, height: 32, border: `3px solid ${T.mid}`, borderTop: `3px solid ${T.blue}`,
      borderRadius: "50%", animation: "spin 0.8s linear infinite" }}></div>
    <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
  </div>;
}

function SectionTitle({ children }) {
  return <h3 style={{ margin: "0 0 12px 0", fontSize: 15, fontFamily: "Georgia, serif", color: T.dark,
    borderBottom: `2px solid ${T.blue}`, paddingBottom: 8 }}>{children}</h3>;
}


// ─── RADAR CHART ─────────────────────────────────────────────────
function RadarChart({ data, size = 220 }) {
  const cx = size / 2, cy = size / 2;
  const r = size * 0.36;
  const n = data.length;
  const levels = 5;

  function polar(angle, radius) {
    const a = (angle - Math.PI / 2);
    return { x: cx + radius * Math.cos(a), y: cy + radius * Math.sin(a) };
  }

  const axes = data.map((_, i) => polar(2 * Math.PI * i / n, r));

  const gridPolygons = Array.from({ length: levels }, (_, l) => {
    const fr = r * (l + 1) / levels;
    return data.map((_, i) => {
      const p = polar(2 * Math.PI * i / n, fr);
      return `${p.x},${p.y}`;
    }).join(' ');
  });

  const dataPoints = data.map((d, i) => {
    const p = polar(2 * Math.PI * i / n, r * (d.value / 5));
    return `${p.x},${p.y}`;
  }).join(' ');

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      {/* Grid */}
      {gridPolygons.map((pts, i) => (
        <polygon key={i} points={pts} fill="none" stroke="#DDE3E9" strokeWidth={0.8}/>
      ))}
      {/* Axes */}
      {axes.map((p, i) => (
        <line key={i} x1={cx} y1={cy} x2={p.x} y2={p.y} stroke="#DDE3E9" strokeWidth={0.8}/>
      ))}
      {/* Data polygon */}
      <polygon points={dataPoints} fill="#002B4930" stroke="#002B49" strokeWidth={2} strokeLinejoin="round"/>
      {/* Data points */}
      {data.map((d, i) => {
        const p = polar(2 * Math.PI * i / n, r * (d.value / 5));
        return <circle key={i} cx={p.x} cy={p.y} r={3} fill="#002B49"/>;
      })}
      {/* Labels */}
      {data.map((d, i) => {
        const p = polar(2 * Math.PI * i / n, r + 18);
        const anchor = p.x < cx - 5 ? "end" : p.x > cx + 5 ? "start" : "middle";
        return (
          <text key={i} x={p.x} y={p.y + 4} textAnchor={anchor}
            fontSize={8.5} fill="#5E7080" fontFamily="system-ui">
            {d.label}
          </text>
        );
      })}
    </svg>
  );
}

// ─── STATS SECTION ───────────────────────────────────────────────
function MatchStats({ matches, playerNotes }) {
  const allKeys = [...NOTE_KEYS_MENTALE, ...NOTE_KEYS_TECHNIQUE];
  const allLabels = [...NOTE_MENTALE, ...NOTE_TECHNIQUE];
  const usePlayer = (!matches || matches.length === 0) && playerNotes;

  const avgs = allKeys.map((k, i) => {
    if (usePlayer) {
      return { key: k, label: allLabels[i], value: playerNotes[k] || 0 };
    }
    const vals = matches.map(m => m[k] || 0).filter(v => v > 0);
    return {
      key: k,
      label: allLabels[i],
      value: vals.length > 0 ? vals.reduce((a, b) => a + b, 0) / vals.length : 0,
    };
  });

  if (avgs.every(a => a.value === 0)) return null;

  const mentalAvgs = avgs.slice(0, 3);
  const techAvgs = avgs.slice(3);
  const radarData = avgs.filter(a => a.value > 0);

  if (radarData.length === 0) return null;

  return (
    <div style={{ background: T.white, border: `1px solid ${T.border}`, borderRadius: 10, padding: "16px 20px", marginBottom: 16 }}>
      <div style={{ fontSize: 13, fontWeight: 700, color: T.blue, marginBottom: 14, fontFamily: "Georgia, serif" }}>
        {matches && matches.length > 0
          ? `Évaluation moyenne sur ${matches.length} match${matches.length > 1 ? "s" : ""}`
          : "Évaluation globale du stage"}
      </div>
      <div style={{ display: "flex", gap: 24, alignItems: "center", flexWrap: "wrap" }}>
        {/* Radar */}
        <div style={{ flexShrink: 0 }}>
          <RadarChart data={radarData} size={200}/>
        </div>
        {/* Star averages */}
        <div style={{ flex: 1, minWidth: 180 }}>
          <div style={{ marginBottom: 12 }}>
            <div style={{ fontSize: 10, fontWeight: 700, color: T.muted, letterSpacing: 0.5, marginBottom: 6 }}>MENTAL / TACTIQUE</div>
            {mentalAvgs.map(a => (
              <div key={a.key} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "3px 0", borderBottom: `1px solid ${T.mid}` }}>
                <span style={{ fontSize: 12, color: T.dark }}>{a.label}</span>
                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <Stars value={Math.round(a.value)} readonly/>
                  <span style={{ fontSize: 11, color: T.muted, minWidth: 24 }}>{a.value > 0 ? a.value.toFixed(1) : "–"}</span>
                </div>
              </div>
            ))}
          </div>
          <div>
            <div style={{ fontSize: 10, fontWeight: 700, color: T.muted, letterSpacing: 0.5, marginBottom: 6 }}>TECHNIQUE</div>
            {techAvgs.map(a => (
              <div key={a.key} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "3px 0", borderBottom: `1px solid ${T.mid}` }}>
                <span style={{ fontSize: 12, color: T.dark }}>{a.label}</span>
                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <Stars value={Math.round(a.value)} readonly/>
                  <span style={{ fontSize: 11, color: T.muted, minWidth: 24 }}>{a.value > 0 ? a.value.toFixed(1) : "–"}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── MATCH CARD ──────────────────────────────────────────────────
function MatchCard({ match, index, onEdit, onDelete }) {
  const [expanded, setExpanded] = useState(false);
  const win = match.resultat === "Victoire";
  const lose = match.resultat === "Défaite";
  const allKeys = [...NOTE_KEYS_MENTALE, ...NOTE_KEYS_TECHNIQUE];
  const avgNote = allKeys.filter(k => match[k] > 0).length > 0
    ? (allKeys.reduce((s,k) => s + (match[k]||0), 0) / allKeys.filter(k => match[k]>0).length).toFixed(1)
    : null;

  return (
    <div style={{ background: T.white, border: `1px solid ${T.border}`, borderRadius: 10, overflow: "hidden" }}>
      <div style={{ background: win ? T.blue : lose ? T.red : T.mid, padding: "8px 16px",
        display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer" }} onClick={() => setExpanded(!expanded)}>
          <span style={{ color: "#fff", fontWeight: 700, fontSize: 13 }}>Match {index + 1}</span>
          <Badge color="#fff" bg="rgba(255,255,255,0.2)">{match.round}</Badge>
          {match.tournoi && <Badge color="#fff" bg="rgba(255,255,255,0.15)">{match.tournoi}</Badge>}
          {match.adversaire_nom && <span style={{ color: "rgba(255,255,255,0.85)", fontSize: 13 }}>vs {match.adversaire_nom}</span>}
          {match.score && <span style={{ color: "#fff", fontWeight: 800, fontSize: 14, fontFamily: "Georgia, serif" }}>{match.score}</span>}
          {avgNote && <Badge color="#fff" bg="rgba(255,255,255,0.2)">★ {avgNote}</Badge>}
        </div>
        <div style={{ display: "flex", gap: 6 }}>
          <Btn small variant="ghost" onClick={onEdit}
            style={{ border: "1px solid rgba(255,255,255,0.5)", color: "#fff", padding: "4px 10px" }}>✏️</Btn>
          <Btn small variant="ghost" onClick={onDelete}
            style={{ border: "1px solid rgba(255,255,255,0.3)", color: "#fff", padding: "4px 10px" }}>✕</Btn>
          <span onClick={() => setExpanded(!expanded)}
            style={{ color: "#fff", cursor: "pointer", fontSize: 16, padding: "4px 8px" }}>{expanded ? "▲" : "▼"}</span>
        </div>
      </div>

      {expanded && (
        <div style={{ padding: "14px 16px", display: "flex", flexDirection: "column", gap: 12 }}>
          <div style={{ display: "flex", gap: 16, flexWrap: "wrap", alignItems: "center" }}>
            <div><div style={{ fontSize: 11, color: T.muted, marginBottom: 2 }}>Adversaire</div>
              <div style={{ fontWeight: 700 }}>{match.adversaire_nom || "–"}</div></div>
            <div><div style={{ fontSize: 11, color: T.muted, marginBottom: 2 }}>Classement</div>
              <Badge color={T.blue}>{match.adversaire_classement}</Badge></div>
            <div><div style={{ fontSize: 11, color: T.muted, marginBottom: 2 }}>Score</div>
              <div style={{ fontWeight: 800, fontSize: 18, fontFamily: "Georgia, serif" }}>{match.score || "–"}</div></div>
            {match.resultat && <Badge color={win ? T.blue : T.red}>{win ? "✓ " : "✗ "}{match.resultat}</Badge>}
            {match.date && <div style={{ fontSize: 12, color: T.muted }}>
              📅 {new Date(match.date + "T00:00:00").toLocaleDateString("fr-FR", { weekday: "short", day: "numeric", month: "short" })}
            </div>}
          </div>

          <div style={{ display: "flex", flexWrap: "wrap", gap: 16 }}>
            <div style={{ flex: "1 1 200px", minWidth: 180 }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: T.muted, marginBottom: 8, letterSpacing: 0.5 }}>MENTAL / TACTIQUE</div>
              {NOTE_MENTALE.map((l,i) => <StarRow key={l} label={l} noteKey={NOTE_KEYS_MENTALE[i]} match={match} onChange={() => {}} />)}
            </div>
            <div style={{ flex: "1 1 200px", minWidth: 180 }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: T.muted, marginBottom: 8, letterSpacing: 0.5 }}>TECHNIQUE</div>
              {NOTE_TECHNIQUE.map((l,i) => <StarRow key={l} label={l} noteKey={NOTE_KEYS_TECHNIQUE[i]} match={match} onChange={() => {}} />)}
            </div>
          </div>

          {match.preparation && <div style={{ background: T.bluePale, borderRadius: 6, padding: "8px 12px" }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: T.blue, marginBottom: 3 }}>PRÉPARATION</div>
            <div style={{ fontSize: 13, whiteSpace: "pre-wrap" }}>{match.preparation}</div>
          </div>}
          {match.debrief && <div style={{ background: "#FFF8F4", border: `1px solid ${T.red}30`, borderRadius: 6, padding: "8px 12px" }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: T.red, marginBottom: 3 }}>DÉBRIEF</div>
            <div style={{ fontSize: 13, whiteSpace: "pre-wrap" }}>{match.debrief}</div>
          </div>}
          {match.notes && <div style={{ borderTop:`1px solid ${T.mid}`, paddingTop:8 }}><div style={{ fontSize:11, fontWeight:700, color:T.muted, marginBottom:3, letterSpacing:0.5 }}>COMMENTAIRE</div><div style={{ fontSize:13, whiteSpace:"pre-wrap", fontStyle:"italic", color:T.muted }}>{match.notes}</div></div>}
        </div>
      )}
    </div>
  );
}

// ─── MATCH FORM ──────────────────────────────────────────────────
function MatchForm({ match, onChange, onSave, onCancel, saving }) {
  const u = (k, v) => onChange({ ...match, [k]: v });
  return (
    <div style={{ background: T.white, border: `2px solid ${T.blue}`, borderRadius: 12, padding: 20,
      display: "flex", flexDirection: "column", gap: 16 }}>
      <div style={{ fontWeight: 700, fontSize: 15, color: T.blue }}>{match._new ? "➕ Nouveau match" : "✏️ Modifier"}</div>

      <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
        <div style={{ flex: "1 1 130px" }}><Field label="Date"><input type="date" style={inputStyle} value={match.date||""} onChange={e=>u("date",e.target.value)}/></Field></div>
        <div style={{ flex: "1 1 130px" }}><Field label="Tour"><select style={inputStyle} value={match.round||"1er tour"} onChange={e=>u("round",e.target.value)}>{ROUNDS.map(r=><option key={r}>{r}</option>)}</select></Field></div>
        <div style={{ flex: "1 1 120px" }}><Field label="Résultat"><select style={inputStyle} value={match.resultat||""} onChange={e=>u("resultat",e.target.value)}><option value="">–</option><option>Victoire</option><option>Défaite</option></select></Field></div>
      </div>

      <Field label="Tournoi">
        <input style={inputStyle} placeholder="Nom du tournoi" value={match.tournoi||""} onChange={e=>u("tournoi",e.target.value)}/>
      </Field>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
        <div style={{ flex: "2 1 180px" }}><Field label="Adversaire"><input style={inputStyle} placeholder="Prénom Nom" value={match.adversaire_nom||""} onChange={e=>u("adversaire_nom",e.target.value)}/></Field></div>
        <div style={{ flex: "1 1 100px" }}><Field label="Classement"><select style={inputStyle} value={match.adversaire_classement||"NC"} onChange={e=>u("adversaire_classement",e.target.value)}>{CLASSEMENTS.map(c=><option key={c}>{c}</option>)}</select></Field></div>
        <div style={{ flex: "1 1 100px" }}><Field label="Score"><input style={inputStyle} placeholder="6/3 4/6 6/4" value={match.score||""} onChange={e=>u("score",e.target.value)}/></Field></div>
      </div>

      <div style={{ display: "flex", flexWrap: "wrap", gap: 20 }}>
        <div style={{ flex: "1 1 200px", minWidth: 180 }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: T.muted, marginBottom: 10, letterSpacing: 0.5 }}>MENTAL / TACTIQUE</div>
          {NOTE_MENTALE.map((l,i) => <StarRow key={l} label={l} noteKey={NOTE_KEYS_MENTALE[i]} match={match} onChange={onChange}/>)}
        </div>
        <div style={{ flex: "1 1 200px", minWidth: 180 }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: T.muted, marginBottom: 10, letterSpacing: 0.5 }}>TECHNIQUE</div>
          {NOTE_TECHNIQUE.map((l,i) => <StarRow key={l} label={l} noteKey={NOTE_KEYS_TECHNIQUE[i]} match={match} onChange={onChange}/>)}
        </div>
      </div>

      <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
        <div style={{ flex: "1 1 220px" }}><Field label="Préparation"><textarea style={taStyle} placeholder="Tennis + physique..." value={match.preparation||""} onChange={e=>u("preparation",e.target.value)}/></Field></div>
        <div style={{ flex: "1 1 220px" }}><Field label="Débrief post-match"><textarea style={taStyle} placeholder="Points forts, axes..." value={match.debrief||""} onChange={e=>u("debrief",e.target.value)}/></Field></div>
      </div>

      <Field label="Notes"><input style={inputStyle} placeholder="Observations libres..." value={match.notes||""} onChange={e=>u("notes",e.target.value)}/></Field>

      <div style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}>
        <Btn variant="secondary" onClick={onCancel}>Annuler</Btn>
        <Btn variant="primary" onClick={onSave} disabled={saving}>{saving?"Sauvegarde...":"Enregistrer"}</Btn>
      </div>
    </div>
  );
}

// ─── BILAN FORM ──────────────────────────────────────────────────
function BilanForm({ player, onSave, onCancel, saving }) {
  const [bilan, setBilan] = useState({
    bilan_technique: player.bilan_technique || "",
    bilan_physique: player.bilan_physique || "",
    bilan_mental: player.bilan_mental || "",
    bilan_tactique: player.bilan_tactique || "",
    points_forts: player.points_forts || "",
    axes_amelioration: player.axes_amelioration || "",
    bilan_global: player.bilan_global || "",
    note_tactique: player.note_tactique || 0,
    note_attitude: player.note_attitude || 0,
    note_concentration: player.note_concentration || 0,
    note_coup_droit: player.note_coup_droit || 0,
    note_revers: player.note_revers || 0,
    note_service: player.note_service || 0,
    note_smash: player.note_smash || 0,
    note_volee: player.note_volee || 0,
    note_retour: player.note_retour || 0,
  });
  const u = (k,v) => setBilan(b => ({...b, [k]: v}));

  return (
    <div style={{ background: T.white, border: `2px solid ${T.blue}`, borderRadius: 12, padding: 24,
      display: "flex", flexDirection: "column", gap: 16 }}>
      <div style={{ fontWeight: 700, fontSize: 16, color: T.blue }}>📋 Bilan de stage</div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
        <Field label="Technique">
          <textarea style={taStyle} placeholder="Coups travaillés, progrès observés..."
            value={bilan.bilan_technique} onChange={e=>u("bilan_technique",e.target.value)}/>
        </Field>
        <Field label="Physique">
          <textarea style={taStyle} placeholder="Condition physique, endurance, déplacements..."
            value={bilan.bilan_physique} onChange={e=>u("bilan_physique",e.target.value)}/>
        </Field>
        <Field label="Mental">
          <textarea style={taStyle} placeholder="Attitude, gestion du stress, combativité..."
            value={bilan.bilan_mental} onChange={e=>u("bilan_mental",e.target.value)}/>
        </Field>
        <Field label="Tactique">
          <textarea style={taStyle} placeholder="Schémas de jeu, lecture du match..."
            value={bilan.bilan_tactique} onChange={e=>u("bilan_tactique",e.target.value)}/>
        </Field>
      </div>

      {/* Évaluation par étoiles */}
      <div style={{ background: T.surface, borderRadius: 8, padding: "14px 16px" }}>
        <div style={{ fontSize: 12, fontWeight: 700, color: T.blue, marginBottom: 12, letterSpacing: 0.5 }}>
          ÉVALUATION GLOBALE DU STAGE
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 20 }}>
          <div style={{ flex: "1 1 180px" }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: T.muted, marginBottom: 8, letterSpacing: 0.5 }}>MENTAL / TACTIQUE</div>
            {NOTE_MENTALE.map((l,i) => (
              <div key={l} style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"5px 0", borderBottom:`1px solid ${T.mid}` }}>
                <span style={{ fontSize:13, color:T.dark }}>{l}</span>
                <Stars value={bilan[NOTE_KEYS_MENTALE[i]]} onChange={v => u(NOTE_KEYS_MENTALE[i], v)}/>
              </div>
            ))}
          </div>
          <div style={{ flex: "1 1 180px" }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: T.muted, marginBottom: 8, letterSpacing: 0.5 }}>TECHNIQUE</div>
            {NOTE_TECHNIQUE.map((l,i) => (
              <div key={l} style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"5px 0", borderBottom:`1px solid ${T.mid}` }}>
                <span style={{ fontSize:13, color:T.dark }}>{l}</span>
                <Stars value={bilan[NOTE_KEYS_TECHNIQUE[i]]} onChange={v => u(NOTE_KEYS_TECHNIQUE[i], v)}/>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Field label="✅ Points forts">
        <textarea style={{ ...taStyle, minHeight: 60 }} placeholder="Ce que le joueur maîtrise bien..."
          value={bilan.points_forts} onChange={e=>u("points_forts",e.target.value)}/>
      </Field>

      <Field label="🎯 Axes d'amélioration">
        <textarea style={{ ...taStyle, minHeight: 60 }} placeholder="Priorités de travail pour la suite..."
          value={bilan.axes_amelioration} onChange={e=>u("axes_amelioration",e.target.value)}/>
      </Field>

      <Field label="💬 Synthèse coach">
        <textarea style={{ ...taStyle, minHeight: 80 }} placeholder="Message global au joueur et à la famille..."
          value={bilan.bilan_global} onChange={e=>u("bilan_global",e.target.value)}/>
      </Field>

      <div style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}>
        <Btn variant="secondary" onClick={onCancel}>Annuler</Btn>
        <Btn variant="primary" onClick={() => onSave(bilan)} disabled={saving}>{saving?"Sauvegarde...":"Enregistrer le bilan"}</Btn>
      </div>
    </div>
  );
}

// ─── PLAYER FORM ─────────────────────────────────────────────────
function PlayerForm({ player, onChange, onSave, onCancel, saving }) {
  const fileRef = useRef();
  const u = (k,v) => onChange({...player,[k]:v});
  function handlePhoto(e) {
    const file = e.target.files[0]; if(!file) return;
    const r = new FileReader(); r.onload = ev => u("photo", ev.target.result); r.readAsDataURL(file);
  }
  return (
    <div style={{ background: T.white, border: `2px solid ${T.blue}`, borderRadius: 12, padding: 24,
      display: "flex", flexDirection: "column", gap: 16, maxWidth: 640 }}>
      <div style={{ fontWeight: 700, fontSize: 16, color: T.blue }}>Nouveau stagiaire</div>

      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        <Avatar src={player.photo} name={`${player.prenom} ${player.nom}`} size={80}/>
        <div>
          <Btn small variant="ghost" onClick={() => fileRef.current.click()}>📷 Photo</Btn>
          <input ref={fileRef} type="file" accept="image/*" style={{display:"none"}} onChange={handlePhoto}/>
          <div style={{ fontSize: 12, color: T.muted, marginTop: 4 }}>Photo de profil</div>
        </div>
      </div>

      <Field label="Formule">
        <div style={{ display: "flex", gap: 10 }}>
          {[["tennis_tournoi","🎾 Tennis + Tournois"],["stage_uniquement","🏋️ Stage uniquement"]].map(([val,label]) => (
            <button key={val} onClick={() => u("type_stage", val)} style={{
              flex: 1, padding: "10px 8px", borderRadius: 8, cursor: "pointer", fontSize: 13, fontWeight: 600,
              border: `2px solid ${player.type_stage === val ? T.blue : T.border}`,
              background: player.type_stage === val ? T.bluePale : T.white,
              color: player.type_stage === val ? T.blue : T.muted,
            }}>{label}</button>
          ))}
        </div>
      </Field>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
        <Field label="Prénom" required><input style={inputStyle} value={player.prenom||""} onChange={e=>u("prenom",e.target.value)}/></Field>
        <Field label="Nom" required><input style={inputStyle} value={player.nom||""} onChange={e=>u("nom",e.target.value)}/></Field>
        <Field label="Âge"><input type="number" style={inputStyle} value={player.age||""} min={6} max={99} onChange={e=>u("age",e.target.value)}/></Field>
        <Field label="Classement"><select style={inputStyle} value={player.classement||"NC"} onChange={e=>u("classement",e.target.value)}>{CLASSEMENTS.map(c=><option key={c}>{c}</option>)}</select></Field>
      </div>

      <Field label="Club"><input style={inputStyle} placeholder="Club d'origine" value={player.club||""} onChange={e=>u("club",e.target.value)}/></Field>
      <Field label="Objectif du stage"><textarea style={{...taStyle,minHeight:54}} placeholder="Ex: améliorer le service..." value={player.objectif||""} onChange={e=>u("objectif",e.target.value)}/></Field>

      <div style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}>
        <Btn variant="secondary" onClick={onCancel}>Annuler</Btn>
        <Btn variant="primary" onClick={onSave} disabled={saving}>{saving?"Sauvegarde...":"Créer la fiche"}</Btn>
      </div>
    </div>
  );
}

// ─── PRINT VIEW ──────────────────────────────────────────────────
function PrintView({ playerId, onClose }) {
  const [player, setPlayer] = useState(null);
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([api.getPlayer(playerId), api.getMatches(playerId)])
      .then(([p,m]) => { setPlayer(p); setMatches(m||[]); setLoading(false); });
  }, [playerId]);

  if (loading) return <Spinner/>;
  if (!player) return null;

  const fullName = `${player.prenom} ${player.nom}`.trim();
  const wins = matches.filter(m=>m.resultat==="Victoire").length;
  const losses = matches.filter(m=>m.resultat==="Défaite").length;
  const isTournoi = player.type_stage === "tennis_tournoi";

  function StarsReadonly({ value=0 }) {
    return <span>{[1,2,3,4,5].map(i=><span key={i} style={{color: i<=value?"#F9423A":"#DDE3E9",fontSize:14}}>★</span>)}</span>;
  }

  return (
    <div style={{ maxWidth: 740, margin: "0 auto", fontFamily: "system-ui", background: "#fff" }}>
      <style>{`
  .print-stripe-top { display: none; }
  .print-stripe-bottom { display: none; }
  @media print {
    .no-print { display: none !important; }
    @page { size: A4 portrait; margin: 0mm 12mm 0mm 12mm; }
    body { -webkit-print-color-adjust: exact; print-color-adjust: exact; margin: 0; }
    .print-cover { page-break-after: always !important; break-after: page !important; width: 210mm; height: 297mm; overflow: hidden; box-sizing: border-box; margin: 0 -12mm; }
    .print-page-section { padding: 15mm 0; position: relative; }
    .print-page-section::before { content: ""; display: block; position: running(header); height: 13px; background: linear-gradient(to bottom, #002B49 10px, #F9423A 10px, #F9423A 13px); width: 100vw; margin-left: -12mm; }
    .print-page-section::after { content: ""; display: block; height: 13px; background: linear-gradient(to top, #002B49 10px, #F9423A 10px, #F9423A 13px); width: 100vw; margin-left: -12mm; }
    .print-page-break { page-break-before: always; break-before: page; }
    .print-bilan { page-break-inside: avoid; break-inside: avoid; }
    .print-match-pair { page-break-after: always; break-after: page; page-break-inside: avoid; }
    .print-match-pair:last-child { page-break-after: auto; break-after: auto; }
  }
`}</style>



      {/* Top action bar - sticky */}
      <div className="no-print" style={{ position:"sticky", top:0, zIndex:100, display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:24, margin:"0 0 0 0", padding:"12px 32px", background:T.blue, borderRadius:0, boxShadow:"0 2px 12px rgba(0,43,73,0.3)" }}>
        <div style={{ fontSize:13, color:"#fff", fontWeight:600 }}>📄 {player.prenom} {player.nom} — Aperçu bilan</div>
        <div style={{ display:"flex", gap:10 }}>
          <Btn onClick={onClose} variant="ghost" small style={{ border:"1px solid rgba(255,255,255,0.4)", color:"#fff" }}>← Retour</Btn>
          <Btn onClick={() => window.print()} variant="red" small>🖨 Imprimer / PDF</Btn>
        </div>
      </div>

      {/* ── PAGE DE GARDE ── */}
      <div className="print-cover" style={{
        width: "210mm", height: "297mm", display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
        background: T.white, pageBreakAfter: "always", breakAfter: "page",
        padding: "40px 32px", textAlign: "center", position: "relative",
        boxSizing: "border-box", overflow: "hidden", margin: "0 auto",
      }}>
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 12, background: T.blue }}></div>
        <div style={{ position: "absolute", top: 12, left: 0, right: 0, height: 4, background: T.red }}></div>
        <img src={HDN_LOGO} alt="HDN Academy" style={{ height: 180, objectFit: "contain", marginBottom: 28 }} />
        {player.photo
          ? <img src={player.photo} alt={fullName} style={{ width: 160, height: 160, borderRadius: "50%", objectFit: "cover", border: `4px solid ${T.blue}`, marginBottom: 24, boxShadow: "0 6px 24px rgba(0,43,73,0.25)" }}/>
          : <div style={{ width: 160, height: 160, borderRadius: "50%", background: T.bluePale, border: `4px solid ${T.blue}`, marginBottom: 24, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 48, fontWeight: 700, color: T.blue }}>
              {fullName.split(" ").map(w=>w[0]).join("").slice(0,2).toUpperCase()}
            </div>
        }
        <h1 style={{ margin: "0 0 8px 0", fontFamily: "Georgia, serif", fontSize: 30, color: T.dark, letterSpacing: 1 }}>{fullName}</h1>
        <div style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap", marginBottom: 24 }}>
          <Badge color={T.blue}>{player.classement}</Badge>
          {player.age && <Badge color={T.muted}>{player.age} ans</Badge>}
          {player.club && <Badge color={T.muted}>{player.club}</Badge>}
          <Badge color={isTournoi ? T.red : T.blue}>{isTournoi ? "🎾 Tennis + Tournois" : "🏋️ Stage uniquement"}</Badge>
        </div>
        {player.objectif && (
          <div style={{ maxWidth: 480, background: T.bluePale, border: `1px solid ${T.blue}30`, borderRadius: 12, padding: "16px 24px", marginBottom: 20, fontSize: 13, fontStyle: "italic", color: T.dark, lineHeight: 1.6 }}>
            « {player.objectif} »
          </div>
        )}
        <div style={{ width: 60, height: 3, background: T.red, borderRadius: 2, marginBottom: 24 }}></div>
        <div style={{ fontSize: 13, color: T.muted, letterSpacing: 2, textTransform: "uppercase", marginBottom: 8 }}>Bilan de stage</div>
        <div style={{ fontSize: 13, color: T.muted }}>{new Date().toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" })}</div>
        <div style={{ position: "absolute", bottom: 24, left: 0, right: 0, textAlign: "center", fontSize: 10, color: T.muted, letterSpacing: 1 }}>HDN ACADEMY — NÎMES — 1997</div>
        <div style={{ position: "absolute", bottom: 4, left: 0, right: 0, height: 12, background: T.blue }}></div>
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 4, background: T.red }}></div>
      </div>





      {/* Bilan stage */}
      {(player.bilan_technique || player.bilan_physique || player.bilan_mental || player.bilan_tactique || player.points_forts || player.axes_amelioration || player.bilan_global) && (
        <div className="print-page-section">
        <div className="print-bilan" style={{ marginBottom: 0 }}>
          <div style={{ padding:"4px 0 24px 0" }}>
          <h2 style={{ fontFamily:"Georgia,serif", fontSize:17, color:T.dark, borderBottom:`2px solid ${T.blue}`, paddingBottom:6, marginBottom:14 }}>Bilan du stage</h2>
          {/* Radar + étoiles moyennes */}
          {isTournoi && matches.length > 0 && (() => {
            const allKeys = [...NOTE_KEYS_MENTALE, ...NOTE_KEYS_TECHNIQUE];
            const allLabels = [...NOTE_MENTALE, ...NOTE_TECHNIQUE];
            const avgs = allKeys.map((k,i) => {
              const vals = matches.map(m=>m[k]||0).filter(v=>v>0);
              return { key:k, label:allLabels[i], value: vals.length>0 ? vals.reduce((a,b)=>a+b,0)/vals.length : 0 };
            });
            const radarData = avgs.filter(a=>a.value>0);
            if (radarData.length === 0) return null;
            return (
              <div style={{ display:"flex", gap:20, alignItems:"center", marginBottom:16, padding:"12px 16px", border:`1px solid ${T.border}`, borderRadius:8, flexWrap:"wrap" }}>
                <RadarChart data={radarData} size={180}/>
                <div style={{ flex:1, minWidth:160 }}>
                  <div style={{ fontSize:10, fontWeight:700, color:T.muted, marginBottom:6, letterSpacing:0.5 }}>MOYENNES SUR {matches.length} MATCH{matches.length>1?"S":""}</div>
                  {avgs.filter(a=>a.value>0).map(a => (
                    <div key={a.key} style={{ display:"flex", justifyContent:"space-between", fontSize:11, padding:"2px 0", borderBottom:`1px solid ${T.mid}` }}>
                      <span style={{ color:T.muted }}>{a.label}</span>
                      <span style={{ fontWeight:700, color:T.dark }}>{a.value.toFixed(1)} / 5</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })()}
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12, marginBottom:12 }}>
            {[["Technique",player.bilan_technique],["Physique",player.bilan_physique],["Mental",player.bilan_mental],["Tactique",player.bilan_tactique]].filter(([,v])=>v).map(([l,v])=>(
              <div key={l} style={{ background:T.surface, borderRadius:6, padding:"10px 12px" }}>
                <div style={{ fontSize:10, fontWeight:700, color:T.blue, marginBottom:4, letterSpacing:0.5 }}>{l.toUpperCase()}</div>
                <div style={{ fontSize:12, whiteSpace:"pre-wrap" }}>{v}</div>
              </div>
            ))}
          </div>
          {player.points_forts && <div style={{ background:"#F0FFF4", border:`1px solid ${T.blue}30`, borderRadius:6, padding:"10px 12px", marginBottom:8 }}>
            <div style={{ fontSize:10, fontWeight:700, color:T.blue, marginBottom:4 }}>✅ POINTS FORTS</div>
            <div style={{ fontSize:12, whiteSpace:"pre-wrap" }}>{player.points_forts}</div>
          </div>}
          {player.axes_amelioration && <div style={{ background:"#FFF8F4", border:`1px solid ${T.red}30`, borderRadius:6, padding:"10px 12px", marginBottom:8 }}>
            <div style={{ fontSize:10, fontWeight:700, color:T.red, marginBottom:4 }}>🎯 AXES D'AMÉLIORATION</div>
            <div style={{ fontSize:12, whiteSpace:"pre-wrap" }}>{player.axes_amelioration}</div>
          </div>}
          {player.bilan_global && <div style={{ background:T.bluePale, border:`1px solid ${T.blue}40`, borderRadius:6, padding:"12px 14px" }}>
            <div style={{ fontSize:10, fontWeight:700, color:T.blue, marginBottom:6 }}>💬 SYNTHÈSE COACH</div>
            <div style={{ fontSize:13, fontStyle:"italic", whiteSpace:"pre-wrap" }}>{player.bilan_global}</div>
          </div>}
          </div>
        </div>
        </div>
      )}
      {/* Pied de page */}
      <div style={{ marginTop:32, borderTop:`1px solid ${T.mid}`, paddingTop:10, textAlign:"center", fontSize:9, color:T.muted, letterSpacing:0.8 }}>
        HDN ACADEMY 1997 — NÎMES — 620 Chemin des Hauts de Nîmes — www.hdnacademy.com
      </div>

      {/* Matchs — tournoi only */}
      {isTournoi && matches.length > 0 && (
        <div className="print-page-break print-page-section">
          <div style={{ padding:"4px 0 24px 0" }}>
          <h2 style={{ fontFamily:"Georgia,serif", fontSize:17, color:T.dark, borderBottom:`2px solid ${T.blue}`, paddingBottom:6, marginBottom:14 }}>Journal des matchs</h2>
          {/* Stats sous le titre */}
          {isTournoi && (
            <div style={{ display:"flex", marginBottom:16, border:`1px solid ${T.border}`, borderRadius:8, overflow:"hidden" }}>
              {[{l:"Matchs",v:matches.length,c:T.dark},{l:"Victoires",v:wins,c:T.blue},{l:"Défaites",v:losses,c:T.red},{l:"Ratio",v:matches.length>0?`${Math.round(wins/matches.length*100)}%`:"–",c:T.blue}].map((s,i)=>(
                <div key={i} style={{ flex:1, textAlign:"center", padding:"12px 8px", borderRight: i<3?`1px solid ${T.border}`:"none" }}>
                  <div style={{ fontFamily:"Georgia,serif", fontSize:22, fontWeight:700, color:s.c }}>{s.v}</div>
                  <div style={{ fontSize:10, color:T.muted, fontWeight:700, letterSpacing:0.5, textTransform:"uppercase" }}>{s.l}</div>
                </div>
              ))}
            </div>
          )}
          {Array.from({length: Math.ceil(matches.length / 2)}, (_, pageIdx) => (
            <div key={pageIdx} className="print-match-pair" style={{ display:"grid", gridTemplateColumns: matches.length > 1 ? "1fr 1fr" : "1fr", gap:12, marginBottom:0 }}>
              {matches.slice(pageIdx*2, pageIdx*2+2).map((m,i) => {
                const globalIdx = pageIdx*2+i;
                return (
                  <div key={m.id} className="print-match" style={{ border:`1px solid ${T.border}`, borderRadius:8, overflow:"hidden", fontSize:11, display:"flex", flexDirection:"column" }}>
                    <div style={{ background: m.resultat==="Victoire"?T.blue:m.resultat==="Défaite"?T.red:T.mid, padding:"6px 12px", display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                      <div style={{ color:"#fff", fontWeight:700, fontSize:12 }}>Match {globalIdx+1} — {m.round}{m.tournoi ? ` · ${m.tournoi}` : ""}</div>
                      <div style={{ color:"#fff", fontSize:11 }}>{m.date && new Date(m.date+"T00:00:00").toLocaleDateString("fr-FR",{day:"numeric",month:"short"})}</div>
                    </div>
                    <div style={{ padding:"8px 12px", display:"flex", flexDirection:"column", flex:1 }}>
                      <div style={{ display:"flex", gap:6, alignItems:"flex-start", flexWrap:"wrap", marginBottom:4 }}>
                        <span style={{ fontWeight:700, fontSize:13 }}>vs {m.adversaire_nom||"–"}</span>
                        <Badge color={T.blue}>{m.adversaire_classement}</Badge>
                      </div>
                      <div style={{ display:"flex", gap:8, alignItems:"center", flexWrap:"wrap", marginBottom:4 }}>
                        {m.resultat && <Badge color={m.resultat==="Victoire"?T.blue:T.red}>{m.resultat}</Badge>}
                        <span style={{ fontFamily:"Georgia,serif", fontWeight:800, fontSize:14, color:T.dark }}>{m.score||"–"}</span>
                      </div>
                      {([...NOTE_MENTALE,...NOTE_TECHNIQUE].some((_,idx) => (m[[...NOTE_KEYS_MENTALE,...NOTE_KEYS_TECHNIQUE][idx]]||0) > 0)) && (
                        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:4, borderTop:`1px solid ${T.mid}`, paddingTop:4, marginBottom:4 }}>
                          <div>
                            {NOTE_MENTALE.map((l,ni)=> m[NOTE_KEYS_MENTALE[ni]]>0 && <div key={l} style={{ display:"flex", justifyContent:"space-between", fontSize:10, padding:"1px 0" }}>
                              <span style={{ color:T.muted }}>{l}</span><StarsReadonly value={m[NOTE_KEYS_MENTALE[ni]]}/>
                            </div>)}
                          </div>
                          <div>
                            {NOTE_TECHNIQUE.map((l,ni)=> m[NOTE_KEYS_TECHNIQUE[ni]]>0 && <div key={l} style={{ display:"flex", justifyContent:"space-between", fontSize:10, padding:"1px 0" }}>
                              <span style={{ color:T.muted }}>{l}</span><StarsReadonly value={m[NOTE_KEYS_TECHNIQUE[ni]]}/>
                            </div>)}
                          </div>
                        </div>
                      )}
                      <div>
                        <div style={{ borderTop:`1px solid ${T.mid}`, paddingTop:4, marginBottom:4 }}>
                          <div style={{ fontSize:9, fontWeight:700, color:T.blue, marginBottom:2, letterSpacing:0.5 }}>PRÉPARATION</div>
                          <div style={{ fontSize:11, whiteSpace:"pre-wrap", minHeight:88 }}>{m.preparation||<span style={{color:T.mid}}>–</span>}</div>
                        </div>
                        <div style={{ borderTop:`1px solid ${T.mid}`, paddingTop:4, marginBottom:4 }}>
                          <div style={{ fontSize:9, fontWeight:700, color:T.red, marginBottom:2, letterSpacing:0.5 }}>DÉBRIEF</div>
                          <div style={{ fontSize:11, whiteSpace:"pre-wrap", minHeight:150 }}>{m.debrief||<span style={{color:T.mid}}>–</span>}</div>
                        </div>
                        <div style={{ borderTop:`1px solid ${T.mid}`, paddingTop:4 }}>
                          <div style={{ fontSize:9, fontWeight:700, color:T.muted, marginBottom:2, letterSpacing:0.5 }}>COMMENTAIRE</div>
                          <div style={{ fontSize:11, whiteSpace:"pre-wrap", fontStyle:"italic", color:T.muted, minHeight:56 }}>{m.notes||<span style={{color:T.mid}}>–</span>}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ))}
          </div>
        </div>
      )}
      {/* Pied de page */}
      <div style={{ marginTop:32, borderTop:`1px solid ${T.mid}`, paddingTop:10, textAlign:"center", fontSize:9, color:T.muted, letterSpacing:0.8 }}>
        HDN ACADEMY 1997 — NÎMES — 620 Chemin des Hauts de Nîmes — www.hdnacademy.com
      </div>

      <div className="no-print" style={{ marginTop:24, display:"flex", gap:12 }}>
        <Btn onClick={() => window.print()} variant="primary">🖨 Imprimer / PDF</Btn>
        <Btn onClick={onClose} variant="secondary">← Retour</Btn>
      </div>
    </div>
  );
}

// ─── PLAYER DETAIL ───────────────────────────────────────────────
function PlayerDetail({ playerId, allPlayers, onBack, onPrint }) {
  const [player, setPlayer] = useState(null);
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState("matchs");
  const [editMatch, setEditMatch] = useState(null);
  const [addingMatch, setAddingMatch] = useState(false);
  const [newMatch, setNewMatch] = useState(null);
  const [editingBilan, setEditingBilan] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    Promise.all([api.getPlayer(playerId), api.getMatches(playerId)])
      .then(([p,m]) => { setPlayer(p); setMatches(m||[]); setLoading(false); })
      .catch(e => { setError(e.message); setLoading(false); });
  }, [playerId]);

  const isTournoi = !player?.type_stage || player?.type_stage === "tennis_tournoi";
  const wins = matches.filter(m=>m.resultat==="Victoire").length;
  const losses = matches.filter(m=>m.resultat==="Défaite").length;

  async function saveNewMatch() {
    setSaving(true);
    try {
      const { _new, ...m } = newMatch;
      const created = await api.createMatch({ ...m, player_id: playerId });
      setMatches(prev => [...prev, created]);
      setAddingMatch(false); setNewMatch(null);
    } catch(e) { setError(e.message); } finally { setSaving(false); }
  }

  async function saveEditMatch() {
    setSaving(true);
    try {
      const { id, player_id, created_at, ...data } = editMatch;
      await api.updateMatch(id, data);
      setMatches(prev => prev.map(m => m.id===id ? editMatch : m));
      setEditMatch(null);
    } catch(e) { setError(e.message); } finally { setSaving(false); }
  }

  async function deleteMatch(id) {
    if (!window.confirm("Supprimer ce match ?")) return;
    try { await api.deleteMatch(id); setMatches(prev=>prev.filter(m=>m.id!==id)); }
    catch(e) { setError(e.message); }
  }

  async function saveBilan(bilanData) {
    setSaving(true);
    try {
      await api.updatePlayer(playerId, bilanData);
      setPlayer(p => ({...p, ...bilanData}));
      setEditingBilan(false);
    } catch(e) { setError(e.message); } finally { setSaving(false); }
  }

  if (loading) return <Spinner/>;
  if (!player) return <div style={{color:T.red}}>Introuvable.</div>;
  const fullName = `${player.prenom} ${player.nom}`.trim();

  const hasBilan = player.bilan_technique||player.bilan_physique||player.bilan_mental||player.bilan_tactique||player.points_forts||player.axes_amelioration||player.bilan_global;

  return (
    <div style={{ display:"flex", flexDirection:"column", gap:20 }}>
      <button onClick={onBack} style={{ background:"none", border:"none", color:T.blue, cursor:"pointer",
        fontWeight:600, fontSize:14, display:"flex", alignItems:"center", gap:6, padding:0, width:"fit-content" }}>
        ← Retour
      </button>

      {error && <div style={{ background:T.redPale, border:`1px solid ${T.red}`, borderRadius:8, padding:12, fontSize:13, color:T.red }}>
        ⚠️ {error} <button onClick={()=>setError(null)} style={{float:"right",background:"none",border:"none",cursor:"pointer",color:T.red}}>✕</button>
      </div>}

      {/* Player header */}
      <div style={{ background:T.white, border:`1px solid ${T.border}`, borderRadius:12, padding:24,
        display:"flex", gap:20, alignItems:"flex-start", flexWrap:"wrap" }}>
        <Avatar src={player.photo} name={fullName} size={88}/>
        <div style={{ flex:1, minWidth:200 }}>
          <div style={{ display:"flex", alignItems:"center", gap:10, flexWrap:"wrap", marginBottom:6 }}>
            <h2 style={{ margin:0, fontFamily:"Georgia,serif", fontSize:22, color:T.dark }}>{fullName}</h2>
            <Badge color={T.blue}>{player.classement}</Badge>
            {player.age && <Badge color={T.muted}>{player.age} ans</Badge>}
            <Badge color={isTournoi?T.red:T.blue}>{isTournoi?"🎾 Tournois":"🏋️ Stage"}</Badge>
          </div>
          {player.club && <div style={{ fontSize:13, color:T.muted, marginBottom:6 }}>🏟 {player.club}</div>}
          {player.objectif && <div style={{ fontSize:13, color:T.dark, fontStyle:"italic" }}>« {player.objectif} »</div>}
        </div>
        {isTournoi && (
          <div style={{ display:"flex", gap:16 }}>
            {[{v:wins,l:"V",c:T.blue},{v:losses,l:"D",c:T.red},{v:matches.length,l:"M",c:T.dark}].map((s,i)=>(
              <div key={i} style={{ textAlign:"center" }}>
                <div style={{ fontFamily:"Georgia,serif", fontSize:26, fontWeight:700, color:s.c }}>{s.v}</div>
                <div style={{ fontSize:10, color:T.muted, fontWeight:700 }}>{s.l}</div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Tabs */}
      <div style={{ display:"flex", gap:0, background:T.surface, borderRadius:8, padding:4, border:`1px solid ${T.border}` }}>
        {(isTournoi ? [["matchs","🎾 Matchs"],["bilan","📋 Bilan"]] : [["bilan","📋 Bilan"]]).map(([key,label])=>(
          <button key={key} onClick={()=>setTab(key)} style={{
            flex:1, padding:"8px 16px", borderRadius:6, border:"none", cursor:"pointer",
            fontWeight:600, fontSize:13, fontFamily:"system-ui",
            background: tab===key ? T.white : "transparent",
            color: tab===key ? T.blue : T.muted,
            boxShadow: tab===key ? "0 1px 4px rgba(0,0,0,0.1)" : "none",
          }}>{label}</button>
        ))}
      </div>

      {/* MATCHS TAB */}
      {tab==="matchs" && isTournoi && (
        <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
          <div style={{ display:"flex", justifyContent:"flex-end" }}>
            {!addingMatch && !editMatch && <Btn variant="red" small onClick={()=>{ setNewMatch({date:new Date().toISOString().slice(0,10),round:"1er tour",tournoi:"",adversaire_nom:"",adversaire_classement:"NC",score:"",resultat:"",preparation:"",debrief:"",notes:"",note_tactique:0,note_attitude:0,note_concentration:0,note_coup_droit:0,note_revers:0,note_service:0,note_smash:0,note_volee:0,note_retour:0,_new:true}); setAddingMatch(true);}}>+ Match</Btn>}
          </div>
          {addingMatch && newMatch && <MatchForm match={newMatch} onChange={setNewMatch} onSave={saveNewMatch} onCancel={()=>{setAddingMatch(false);setNewMatch(null);}} saving={saving}/>}
          {matches.length===0 && !addingMatch && <div style={{ textAlign:"center", padding:"40px 20px", color:T.muted, fontStyle:"italic", background:T.surface, borderRadius:10, border:`1px dashed ${T.border}` }}>Aucun match enregistré.</div>}
          {matches.map((m,i) => editMatch?.id===m.id
            ? <MatchForm key={m.id} match={editMatch} onChange={setEditMatch} onSave={saveEditMatch} onCancel={()=>setEditMatch(null)} saving={saving}/>
            : <MatchCard key={m.id} match={m} index={i} onEdit={()=>setEditMatch({...m})} onDelete={()=>deleteMatch(m.id)}/>
          )}
        </div>
      )}

      {/* BILAN TAB */}
      {tab==="bilan" && (
        <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
          {(matches.length > 0 || NOTE_KEYS_MENTALE.some(k => player[k] > 0) || NOTE_KEYS_TECHNIQUE.some(k => player[k] > 0)) && (
            <MatchStats matches={matches} playerNotes={player}/>
          )}
          {editingBilan
            ? <BilanForm player={player} onSave={saveBilan} onCancel={()=>setEditingBilan(false)} saving={saving}/>
            : (
              <div>
                {!hasBilan ? (
                  <div style={{ textAlign:"center", padding:"40px 20px", color:T.muted, fontStyle:"italic",
                    background:T.surface, borderRadius:10, border:`1px dashed ${T.border}` }}>
                    Bilan non encore renseigné.<br/>
                    <Btn variant="primary" style={{marginTop:16}} onClick={()=>setEditingBilan(true)}>📋 Rédiger le bilan</Btn>
                  </div>
                ) : (
                  <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
                    <div style={{ display:"flex", justifyContent:"flex-end" }}>
                      <Btn small variant="ghost" onClick={()=>setEditingBilan(true)}>✏️ Modifier le bilan</Btn>
                    </div>
                    <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12 }}>
                      {[["Technique",player.bilan_technique,T.blue],["Physique",player.bilan_physique,T.blue],["Mental",player.bilan_mental,T.blue],["Tactique",player.bilan_tactique,T.blue]].filter(([,v])=>v).map(([l,v,c])=>(
                        <div key={l} style={{ background:T.white, border:`1px solid ${T.border}`, borderRadius:8, padding:"12px 14px" }}>
                          <div style={{ fontSize:11, fontWeight:700, color:c, marginBottom:6, letterSpacing:0.5 }}>{l.toUpperCase()}</div>
                          <div style={{ fontSize:13, whiteSpace:"pre-wrap", color:T.dark }}>{v}</div>
                        </div>
                      ))}
                    </div>
                    {player.points_forts && <div style={{ background:"#F0FFF4", border:`1px solid ${T.blue}40`, borderRadius:8, padding:"12px 14px" }}>
                      <div style={{ fontSize:11, fontWeight:700, color:T.blue, marginBottom:6 }}>✅ POINTS FORTS</div>
                      <div style={{ fontSize:13, whiteSpace:"pre-wrap" }}>{player.points_forts}</div>
                    </div>}
                    {player.axes_amelioration && <div style={{ background:"#FFF8F4", border:`1px solid ${T.red}30`, borderRadius:8, padding:"12px 14px" }}>
                      <div style={{ fontSize:11, fontWeight:700, color:T.red, marginBottom:6 }}>🎯 AXES D'AMÉLIORATION</div>
                      <div style={{ fontSize:13, whiteSpace:"pre-wrap" }}>{player.axes_amelioration}</div>
                    </div>}
                    {player.bilan_global && <div style={{ background:T.bluePale, border:`1px solid ${T.blue}40`, borderRadius:8, padding:"14px 16px" }}>
                      <div style={{ fontSize:11, fontWeight:700, color:T.blue, marginBottom:8 }}>💬 SYNTHÈSE COACH</div>
                      <div style={{ fontSize:14, fontStyle:"italic", whiteSpace:"pre-wrap", color:T.dark }}>{player.bilan_global}</div>
                    </div>}
                  </div>
                )}
              </div>
            )
          }
        </div>
      )}
    </div>
  );
}

// ─── MAIN APP ────────────────────────────────────────────────────
const APP_PASSWORD = "HDN2026";

export default function HDNCarnetStage() {
  const [auth, setAuth] = useState(() => sessionStorage.getItem('hdn_auth') === APP_PASSWORD);
  const [pwInput, setPwInput] = useState("");
  const [pwError, setPwError] = useState(false);

  function handleLogin() {
    if (pwInput === APP_PASSWORD) {
      sessionStorage.setItem('hdn_auth', APP_PASSWORD);
      setAuth(true);
      setPwError(false);
    } else {
      setPwError(true);
      setPwInput("");
    }
  }

  if (!auth) return (
    <div style={{ minHeight:"100vh", background:T.blue, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", padding:24 }}>
      <img src={HDN_LOGO} alt="HDN Academy" style={{ height:120, objectFit:"contain", marginBottom:32, filter:"brightness(0) invert(1)" }}/>
      <div style={{ background:"#fff", borderRadius:16, padding:"36px 40px", width:"100%", maxWidth:360, textAlign:"center", boxShadow:"0 8px 40px rgba(0,0,0,0.3)" }}>
        <div style={{ fontFamily:"Georgia,serif", fontSize:22, fontWeight:700, color:T.dark, marginBottom:6 }}>HDN Academy</div>
        <div style={{ fontSize:13, color:T.muted, marginBottom:28 }}>Carnet de stage — Accès staff</div>
        <input
          type="password"
          placeholder="Mot de passe"
          value={pwInput}
          onChange={e => { setPwInput(e.target.value); setPwError(false); }}
          onKeyDown={e => e.key === "Enter" && handleLogin()}
          style={{ width:"100%", boxSizing:"border-box", border:`2px solid ${pwError ? T.red : T.border}`, borderRadius:8, padding:"10px 14px", fontSize:15, outline:"none", marginBottom:8, fontFamily:"system-ui", textAlign:"center", letterSpacing:2 }}
        />
        {pwError && <div style={{ fontSize:12, color:T.red, marginBottom:8 }}>Mot de passe incorrect</div>}
        <button onClick={handleLogin} style={{ width:"100%", background:T.blue, color:"#fff", border:"none", borderRadius:8, padding:"12px", fontSize:15, fontWeight:700, cursor:"pointer", marginTop:8 }}>
          Accéder
        </button>
      </div>
      <div style={{ marginTop:24, fontSize:11, color:"rgba(255,255,255,0.4)", letterSpacing:1 }}>HDN ACADEMY — NÎMES — 1997</div>
    </div>
  );

  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState("list");
  const [currentPlayerId, setCurrentPlayerId] = useState(null);
  const [newPlayer, setNewPlayer] = useState(null);
  const [search, setSearch] = useState("");
  const [stageName, setStageName] = useState("Nîmes Tennis Tour 2025");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    api.getPlayers().then(p=>{setPlayers(p||[]);setLoading(false);})
      .catch(e=>{setError(e.message);setLoading(false);});
  }, []);

  async function saveNewPlayer() {
    if (!newPlayer?.prenom && !newPlayer?.nom) return;
    setSaving(true);
    try {
      const created = await api.createPlayer(newPlayer);
      setPlayers(prev=>[...prev,created]);
      setCurrentPlayerId(created.id);
      setView("detail");
    } catch(e) { setError(e.message); } finally { setSaving(false); }
  }

  async function deletePlayer(id) {
    if (!window.confirm("Supprimer ce stagiaire ?")) return;
    try { await api.deletePlayer(id); setPlayers(prev=>prev.filter(p=>p.id!==id)); setView("list"); }
    catch(e) { setError(e.message); }
  }

  const filtered = players.filter(p=>`${p.prenom} ${p.nom}`.toLowerCase().includes(search.toLowerCase()));
  const currentPlayer = players.find(p=>p.id===currentPlayerId);

  if (view==="print" && currentPlayerId) return <PrintView playerId={currentPlayerId} onClose={()=>setView("detail")}/>;

  return (
    <div style={{ minHeight:"100vh", background:T.surface, fontFamily:"system-ui,-apple-system,sans-serif", color:T.dark }}>
      {/* NAV */}
      <div style={{ background:T.blue, padding:"14px 28px", display:"flex", alignItems:"center", justifyContent:"space-between" }}>
        <div style={{ display:"flex", alignItems:"center", gap:12 }}>
          {(view==="detail"||view==="add") && <button onClick={()=>setView("list")} style={{ background:"none",border:"none",color:"rgba(255,255,255,0.75)",cursor:"pointer",fontSize:18,padding:0 }}>←</button>}
          <div style={{ background:"#fff", borderRadius:8, padding:"3px 6px", display:"flex", alignItems:"center" }}><img src={HDN_LOGO} alt="HDN" style={{ height:40, objectFit:"contain" }}/></div>
          <div>
            <div style={{ color:"rgba(255,255,255,0.6)", fontSize:11, letterSpacing:1, textTransform:"uppercase" }}>HDN Academy</div>
            {view==="list"
              ? <input value={stageName} onChange={e=>setStageName(e.target.value)} style={{ background:"none",border:"none",outline:"none",color:"#fff",fontFamily:"Georgia,serif",fontSize:18,fontWeight:700,padding:0,width:280 }}/>
              : <div style={{ color:"#fff",fontFamily:"Georgia,serif",fontSize:18,fontWeight:700 }}>
                  {view==="add" ? "Nouveau stagiaire" : currentPlayer ? `${currentPlayer.prenom} ${currentPlayer.nom}` : ""}
                </div>
            }
          </div>
        </div>
        {view==="detail" && currentPlayerId && (
          <div style={{ display:"flex", gap:8 }}>
            <Btn small variant="red" onClick={()=>setView("print")}>🖨 Bilan PDF</Btn>
            <Btn small variant="secondary" onClick={()=>deletePlayer(currentPlayerId)}>🗑 Supprimer</Btn>
          </div>
        )}
      </div>

      {/* CONTENT */}
      <div style={{ maxWidth:780, margin:"0 auto", padding:"28px 20px" }}>
        {error && <div style={{ background:T.redPale,border:`1px solid ${T.red}`,borderRadius:8,padding:12,fontSize:13,color:T.red,marginBottom:16 }}>
          ⚠️ {error} <button onClick={()=>setError(null)} style={{float:"right",background:"none",border:"none",cursor:"pointer",color:T.red}}>✕</button>
        </div>}

        {view==="list" && (
          <div style={{ display:"flex", flexDirection:"column", gap:20 }}>
            <div style={{ display:"flex", gap:12 }}>
              <input style={{ ...inputStyle, flex:1 }} placeholder="🔍 Rechercher..." value={search} onChange={e=>setSearch(e.target.value)}/>
              <Btn variant="red" onClick={()=>{setNewPlayer({prenom:"",nom:"",age:"",classement:"NC",club:"",photo:null,objectif:"",type_stage:"tennis_tournoi"});setView("add");}}>+ Stagiaire</Btn>
            </div>

            {loading ? <Spinner/> : <>
              {players.length>0 && (
                <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:12 }}>
                  {[
                    {l:"Stagiaires",v:players.length,i:"👤"},
                    {l:"Tennis + Tournois",v:players.filter(p=>p.type_stage==="tennis_tournoi").length,i:"🎾"},
                    {l:"Stage uniquement",v:players.filter(p=>p.type_stage==="stage_uniquement").length,i:"🏋️"},
                  ].map((s,i)=>(
                    <div key={i} style={{ background:T.white,border:`1px solid ${T.border}`,borderRadius:10,padding:"16px 20px",textAlign:"center" }}>
                      <div style={{ fontSize:22, marginBottom:4 }}>{s.i}</div>
                      <div style={{ fontFamily:"Georgia,serif",fontSize:28,fontWeight:700,color:T.blue }}>{s.v}</div>
                      <div style={{ fontSize:11,color:T.muted,fontWeight:700,letterSpacing:0.5,textTransform:"uppercase" }}>{s.l}</div>
                    </div>
                  ))}
                </div>
              )}

              {filtered.length===0 && <div style={{ textAlign:"center",padding:"60px 20px",color:T.muted,fontStyle:"italic",background:T.white,borderRadius:12,border:`1px dashed ${T.border}` }}>
                {players.length===0 ? <>Aucun stagiaire.<br/><span style={{fontSize:12}}>Cliquez sur « + Stagiaire » pour commencer.</span></> : "Aucun résultat."}
              </div>}

              <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
                {filtered.map(p => (
                  <button key={p.id} onClick={()=>{setCurrentPlayerId(p.id);setView("detail");}}
                    style={{ background:T.white,border:`1px solid ${T.border}`,borderRadius:10,padding:"14px 18px",
                      display:"flex",alignItems:"center",gap:14,cursor:"pointer",textAlign:"left" }}
                    onMouseEnter={e=>e.currentTarget.style.boxShadow=`0 2px 12px ${T.blue}25`}
                    onMouseLeave={e=>e.currentTarget.style.boxShadow="none"}>
                    <Avatar src={p.photo} name={`${p.prenom} ${p.nom}`} size={52}/>
                    <div style={{ flex:1 }}>
                      <div style={{ fontWeight:700,fontSize:15 }}>{p.prenom} {p.nom}</div>
                      <div style={{ fontSize:12,color:T.muted,marginTop:2 }}>{p.club||"Club non renseigné"} {p.age?`· ${p.age} ans`:""}</div>
                    </div>
                    <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                      <Badge color={T.blue}>{p.classement}</Badge>
                      <Badge color={p.type_stage==="tennis_tournoi"?T.red:T.blue}>{p.type_stage==="tennis_tournoi"?"🎾":"🏋️"}</Badge>
                    </div>
                  </button>
                ))}
              </div>
            </>}
          </div>
        )}

        {view==="add" && newPlayer && (
          <PlayerForm player={newPlayer} onChange={setNewPlayer} onSave={saveNewPlayer} onCancel={()=>setView("list")} saving={saving}/>
        )}

        {view==="detail" && currentPlayerId && (
          <PlayerDetail playerId={currentPlayerId} allPlayers={players} onBack={()=>setView("list")} onPrint={()=>setView("print")}/>
        )}
      </div>
    </div>
  );
}
