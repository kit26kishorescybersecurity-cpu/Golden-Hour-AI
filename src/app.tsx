import { useEffect, useMemo, useState } from "react";
import { 
  Activity,
  Ambulance,
  ArrowRight,
  BellRing,
  Building2,
  Check,
  CheckCircle2,
  ChevronRight,
  CircleDot,
  Clock3,
  HeartPulse,
  LocateFixed,
  MapPin,
  Navigation,
  Phone,
  Radio,
  RotateCcw,
  Shield,
  ShieldCheck,
  Siren,
  Smartphone,
  Users,
  Wifi,
  X,
} from "lucide-react";

type Stage = "attention" | "detection" | "alarm" | "alert" | "coordination" | "response";

type Hospital = {
  id: number;
  name: string;
  distance: string;
  eta: string;
  beds: number;
  trauma: string;
  score: number;
  recommended?: boolean;
};

const hospitals: Hospital[] = [
  {
    id: 1,
    name: "NYU Langone – Tisch",
    distance: "1.3 km",
    eta: "5 min",
    beds: 3,
    trauma: "Level I Trauma",
    score: 98,
    recommended: true,
  },
  {
    id: 2,
    name: "Bellevue Hospital Center",
    distance: "1.8 km",
    eta: "6 min",
    beds: 7,
    trauma: "Level I Trauma",
    score: 94,
  },
  {
    id: 3,
    name: "Mount Sinai West",
    distance: "2.6 km",
    eta: "8 min",
    beds: 2,
    trauma: "Level II Trauma",
    score: 89,
  },
];

const stages: { id: Stage; label: string }[] = [
  { id: "attention", label: "Monitor" },
  { id: "detection", label: "Detect" },
  { id: "alarm", label: "Alarm" },
  { id: "alert", label: "Alert" },
  { id: "coordination", label: "Coordinate" },
  { id: "response", label: "Respond" },
];

const stageNumber = (stage: Stage) => stages.findIndex((item) => item.id === stage);

function Brand({ emergency = false }: { emergency?: boolean }) {
  return (
    <div className="brand">
      <div className={`brand-mark ${emergency ? "brand-mark--emergency" : ""}`}>
        <Activity size={19} strokeWidth={2.7} />
      </div>
      <div>
        <div className="brand-name">
          GoldenHour <span>AI</span>
        </div>
        <div className="brand-tagline">Emergency Intelligence</div>
      </div>
    </div>
  );
}

function Header({ stage, onReset }: { stage: Stage; onReset: () => void }) {
  const isEmergency = stage === "alarm" || stage === "alert";

  return (
    <header className="app-header">
      <Brand emergency={isEmergency} />
      {stage === "attention" ? (
        <div className="demo-pill">
          <CircleDot size={11} /> DEMO MODE
        </div>
      ) : (
        <button className="icon-button" onClick={onReset} aria-label="Return to monitoring">
          <X size={20} />
        </button>
      )}
    </header>
  );
}

function Workflow({ stage }: { stage: Stage }) {
  const current = stageNumber(stage);
  return (
    <div className="workflow" aria-label={`Workflow: ${stages[current].label}`}>
      {stages.map((item, index) => (
        <div
          className={`workflow-step ${index <= current ? "is-active" : ""} ${
            index === current ? "is-current" : ""
          }`}
          key={item.id}
        >
          <span>{index < current ? <Check size={10} strokeWidth={3} /> : index + 1}</span>
        </div>
      ))}
    </div>
  );
}

function SectionHeading({
  eyebrow,
  title,
  copy,
}: {
  eyebrow: string;
  title: string;
  copy: string;
}) {
  return (
    <div className="section-heading">
      <div className="eyebrow">{eyebrow}</div>
      <h1>{title}</h1>
      <p>{copy}</p>
    </div>
  );
}

function Attention({ onSimulate }: { onSimulate: () => void }) {
  return (
    <div className="screen attention-screen screen-enter">
      <section className="monitor-hero">
        <div className="status-live">
          <span /> MONITORING ACTIVE
        </div>
        <h1>You’re protected.</h1>
        <p>Press SOS for immediate help or let GoldenHour AI monitor for a serious collision.</p>
        <button className="hero-sos" onClick={onSimulate} aria-label="Simulate emergency SOS">
          <span className="hero-sos-pulse" />
          <span className="hero-sos-inner">
            <Siren size={30} />
            <strong>SOS</strong>
            <small>PRESS FOR HELP</small>
          </span>
        </button>
        <div className="simulate-label">
          <CircleDot size={11} />
          SIMULATE ACCIDENT
        </div>
        <div className="monitor-strip">
          <div className="monitor-strip-icon">
            <Activity size={19} />
          </div>
          <div>
            <strong>Automatic crash detection</strong>
            <span>Motion sensors are standing by</span>
          </div>
          <div className="monitor-wave">
            <i />
            <i />
            <i />
            <i />
            <i />
          </div>
        </div>
      </section>

      <div className="status-grid">
        <div className="info-card">
          <div className="info-icon">
            <LocateFixed size={19} />
          </div>
          <div>
            <span>Location</span>
            <strong>Precise access on</strong>
          </div>
          <CheckCircle2 className="success" size={18} />
        </div>
        <div className="info-card">
          <div className="info-icon">
            <Users size={19} />
          </div>
          <div>
            <span>Emergency contacts</span>
            <strong>2 people ready</strong>
          </div>
          <ChevronRight size={18} />
        </div>
      </div>

      <div className="contact-row">
        <div className="stacked-avatars">
          <div className="avatar avatar--one">AM</div>
          <div className="avatar avatar--two">RK</div>
        </div>
        <div>
          <strong>Anna & Ravi</strong>
          <span>Will be notified in an emergency</span>
        </div>
        <Shield size={18} className="muted-icon" />
      </div>

      <div className="safety-note">
        <ShieldCheck size={15} />
        SOS is in demo mode — no emergency services will be contacted
      </div>
    </div>
  );
}

function Detection() {
  return (
    <div className="screen detection-screen screen-enter">
      <SectionHeading
        eyebrow="Detection sequence"
        title="Analyzing impact"
        copy="Unusual motion detected. Running a rapid multi-sensor safety analysis."
      />

      <div className="detection-orb">
        <div className="orbit orbit--one" />
        <div className="orbit orbit--two" />
        <div className="pulse-core">
          <Activity size={39} />
        </div>
      </div>

      <div className="signal-list">
        <div className="signal-row">
          <div className="signal-icon">
            <Smartphone size={20} />
          </div>
          <div>
            <strong>Accelerometer</strong>
            <span>High-force deceleration</span>
          </div>
          <div className="signal-value danger">8.7 G</div>
        </div>
        <div className="signal-row">
          <div className="signal-icon">
            <Navigation size={20} />
          </div>
          <div>
            <strong>Speed change</strong>
            <span>Sudden velocity drop</span>
          </div>
          <div className="signal-value">62 → 0</div>
        </div>
        <div className="signal-row">
          <div className="signal-icon">
            <LocateFixed size={20} />
          </div>
          <div>
            <strong>Location lock</strong>
            <span>GPS coordinates secured</span>
          </div>
          <CheckCircle2 className="success" size={20} />
        </div>
      </div>

      <div className="analysis-bar">
        <div>
          <span>AI confidence</span>
          <strong>Analyzing...</strong>
        </div>
        <div className="progress-track">
          <span />
        </div>
      </div>
    </div>
  );
}

function Alarm({
  countdown,
  onCancel,
  onConfirm,
}: {
  countdown: number;
  onCancel: () => void;
  onConfirm: () => void;
}) {
  return (
    <div className="screen alarm-screen screen-enter">
      <div className="alarm-kicker">
        <BellRing size={17} /> POSSIBLE CRASH DETECTED
      </div>
      <div className="countdown">
        <svg viewBox="0 0 160 160" aria-hidden="true">
          <circle className="countdown-bg" cx="80" cy="80" r="70" />
          <circle
            className="countdown-progress"
            cx="80"
            cy="80"
            r="70"
            style={{ strokeDashoffset: 440 - (440 * countdown) / 10 }}
          />
        </svg>
        <div>
          <strong>{countdown}</strong>
          <span>seconds</span>
        </div>
      </div>
      <h1>Are you okay?</h1>
      <p className="alarm-copy">
        Emergency alerts will be sent automatically when the timer reaches zero.
      </p>
      <div className="alarm-actions">
        <button className="primary-safe-button" onClick={onCancel}>
          <ShieldCheck size={21} /> I’M OKAY — CANCEL
        </button>
        <button className="text-danger-button" onClick={onConfirm}>
          <Siren size={17} /> Send demo alert now
        </button>
      </div>
      <div className="alarm-footer">
        <Phone size={15} /> Demo contacts are queued for notification
      </div>
    </div>
  );
}

function MiniMap({ ambulance = false, progress = 15 }: { ambulance?: boolean; progress?: number }) {
  const ambulancePosition = {
    left: `${16 + progress * 0.48}%`,
    top: `${132 - progress * 0.92}px`,
  };

  return (
    <div className={`mini-map ${ambulance ? "mini-map--route" : ""}`}>
      <div className="road road--one" />
      <div className="road road--two" />
      <div className="road road--three" />
      {ambulance && <div className="route-line" />}
      <div className="map-marker map-marker--user">
        <MapPin size={18} fill="currentColor" />
      </div>
      {ambulance && (
        <>
          <div className="map-marker map-marker--ambulance" style={ambulancePosition}>
            <Ambulance size={16} />
          </div>
          <div className="map-marker map-marker--hospital">
            <Building2 size={15} />
          </div>
        </>
      )}
      <div className="map-label">{ambulance ? "EN ROUTE" : "CURRENT LOCATION"}</div>
    </div>
  );
}

function Alert({ sent, onContinue }: { sent: boolean; onContinue: () => void }) {
  return (
    <div className="screen alert-screen screen-enter">
      <SectionHeading
        eyebrow="Emergency alert"
        title={sent ? "Alert transmitted" : "Sending your alert"}
        copy="Your demo emergency packet includes impact data and precise location."
      />
      <MiniMap />
      <div className="location-card">
        <div className="location-pin">
          <MapPin size={20} />
        </div>
        <div>
          <span>Detected location</span>
          <strong>5th Ave & East 42nd St</strong>
          <small>New York, NY 10017 · Accuracy 4 m</small>
        </div>
      </div>

      <div className="transmission-card">
        <div className="transmission-head">
          <span>Transmission status</span>
          <strong className={sent ? "success-text" : ""}>{sent ? "Complete" : "Sending..."}</strong>
        </div>
        {[
          ["Impact and motion data", true],
          ["Live location coordinates", true],
          ["Emergency contacts", sent],
          ["Hospital coordination network", sent],
        ].map(([label, complete]) => (
          <div className="check-row" key={String(label)}>
            {complete ? <CheckCircle2 size={18} /> : <Radio size={18} className="sending" />}
            <span>{label}</span>
            <small>{complete ? "Sent" : "Sending"}</small>
          </div>
        ))}
      </div>
      <button className="cyan-button" onClick={onContinue} disabled={!sent}>
        FIND AVAILABLE HOSPITAL <ArrowRight size={19} />
      </button>
      <div className="safety-note">
        <Shield size={15} /> Demo data only — nothing has left this device
      </div>
    </div>
  );
}

function Coordination({ onDispatch }: { onDispatch: () => void }) {
  return (
    <div className="screen coordination-screen screen-enter">
      <SectionHeading
        eyebrow="AI care coordination"
        title="Hospitals shortlisted"
        copy="GoldenHour AI automatically ranked nearby real-world facilities by route time, trauma capability, and demo capacity."
      />
      <div className="network-status">
        <Wifi size={16} />
        <span>AI SHORTLIST COMPLETE</span>
        <strong>Demo estimates</strong>
      </div>
      <div className="hospital-list">
        {hospitals.map((hospital, index) => (
          <div
            className={`hospital-card ${hospital.recommended ? "is-selected" : ""}`}
            key={hospital.id}
          >
            <div className="hospital-top">
              <div className="hospital-rank">0{index + 1}</div>
              <div className="hospital-icon">
                <Building2 size={22} />
              </div>
              <div className="hospital-title">
                <div>{hospital.name}</div>
                <span>{hospital.trauma}</span>
              </div>
              <div className="ai-score">
                <strong>{hospital.score}%</strong>
                <span>AI MATCH</span>
              </div>
            </div>
            <div className="hospital-meta">
              <span>
                <Navigation size={14} /> {hospital.distance}
              </span>
              <span>
                <Clock3 size={14} /> {hospital.eta}
              </span>
              <span className="availability">
                <HeartPulse size={14} /> {hospital.beds} beds
              </span>
            </div>
            {hospital.recommended && <div className="recommended">BEST MATCH · AUTO SELECTED</div>}
          </div>
        ))}
      </div>
      <button className="cyan-button" onClick={onDispatch}>
        DISPATCH TO BEST MATCH <Ambulance size={20} />
      </button>
      <div className="safety-note">
        <Shield size={15} /> Hospital capacity and travel times are simulated
      </div>
    </div>
  );
}

function Response({
  progress,
  hospital,
  onReset,
}: {
  progress: number;
  hospital: Hospital;
  onReset: () => void;
}) {
  const steps = [
    { label: "Ambulance assigned", time: "10:42", done: true },
    { label: "Unit GH-24 dispatched", time: "10:43", done: progress >= 40 },
    { label: "Arriving at your location", time: "Est. 10:49", done: progress >= 100 },
  ];
  return (
    <div className="screen response-screen screen-enter">
      <div className="response-heading">
        <div>
          <div className="eyebrow">Emergency response</div>
          <h1>Help is on the way</h1>
        </div>
        <div className="eta-badge">
          <strong>{progress >= 100 ? "0" : Math.max(1, 6 - Math.floor(progress / 20))}</strong>
          <span>MIN ETA</span>
        </div>
      </div>
      <MiniMap ambulance progress={progress} />
      <div className="live-location-card">
        <div className="live-location-beacon">
          <Navigation size={18} fill="currentColor" />
        </div>
        <div>
          <span>AMBULANCE LIVE LOCATION</span>
          <strong>
            {progress >= 100
              ? "Arrived at pickup"
              : `${Math.max(0.1, 1.7 - progress * 0.016).toFixed(1)} km away`}
          </strong>
          <small>{`40.${7520 + progress * 2}° N, 73.${9830 - progress}° W · Updated now`}</small>
        </div>
        <div className="sharing-badge">
          <span /> SHARING
        </div>
      </div>

      <div className="unit-card">
        <div className="unit-icon">
          <Ambulance size={25} />
        </div>
        <div>
          <span>Assigned ambulance</span>
          <strong>Medic Unit GH-24</strong>
          <small>Advanced Life Support · 2 paramedics</small>
        </div>
        <div className="unit-live">
          <span /> LIVE
        </div>
      </div>

      <div className="destination-card">
        <div className="destination-line" />
        <div className="destination-point destination-point--from">
          <LocateFixed size={17} />
        </div>
        <div className="destination-copy">
          <span>Pickup</span>
          <strong>5th Ave & East 42nd St</strong>
        </div>
        <div className="destination-point destination-point--to">
          <Building2 size={17} />
        </div>
        <div className="destination-copy">
          <span>Destination</span>
          <strong>{hospital.name}</strong>
        </div>
      </div>

      <div className="response-progress">
        <div className="response-progress-head">
          <span>Response progress</span>
          <strong>{progress}%</strong>
        </div>
        <div className="progress-track">
          <span style={{ width: `${progress}%` }} />
        </div>
        <div className="timeline">
          {steps.map((step) => (
            <div className={`timeline-item ${step.done ? "done" : ""}`} key={step.label}>
              <div className="timeline-dot">{step.done && <Check size={11} strokeWidth={3} />}</div>
              <div>
                <strong>{step.label}</strong>
                <span>{step.time}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {progress >= 100 ? (
        <button className="cyan-button" onClick={onReset}>
          <RotateCcw size={18} /> END DEMO & RESET
        </button>
      ) : (
        <div className="response-note">
          <Radio size={16} /> Tracking updates automatically in this simulation
        </div>
      )}
    </div>
  );
}

export default function App() {
  const [stage, setStage] = useState<Stage>("attention");
  const [countdown, setCountdown] = useState(10);
  const [alertSent, setAlertSent] = useState(false);
  const [responseProgress, setResponseProgress] = useState(15);

  const reset = () => {
    setStage("attention");
    setCountdown(10);
    setAlertSent(false);
    setResponseProgress(15);
  };

  useEffect(() => {
    if (stage !== "detection") return;
    const timer = window.setTimeout(() => {
      setCountdown(10);
      setStage("alarm");
    }, 2800);
    return () => window.clearTimeout(timer);
  }, [stage]);

  useEffect(() => {
    if (stage !== "alarm") return;
    if (countdown <= 0) {
      setStage("alert");
      return;
    }
    const timer = window.setTimeout(() => setCountdown((value) => value - 1), 1000);
    return () => window.clearTimeout(timer);
  }, [countdown, stage]);

  useEffect(() => {
    if (stage !== "alert") return;
    setAlertSent(false);
    const timer = window.setTimeout(() => setAlertSent(true), 2200);
    return () => window.clearTimeout(timer);
  }, [stage]);

  useEffect(() => {
    if (stage !== "response" || responseProgress >= 100) return;
    const timer = window.setTimeout(
      () => setResponseProgress((value) => Math.min(100, value + 17)),
      1400,
    );
    return () => window.clearTimeout(timer);
  }, [responseProgress, stage]);

  const hospital = useMemo(() => hospitals.find((item) => item.recommended) ?? hospitals[0], []);

  return (
    <div className={`app-shell stage-${stage}`}>
      <div className="ambient ambient--one" />
      <div className="ambient ambient--two" />
      <main className="app-frame">
        <Header stage={stage} onReset={reset} />
        <Workflow stage={stage} />
        <div className="screen-container">
          {stage === "attention" && <Attention onSimulate={() => setStage("detection")} />}
          {stage === "detection" && <Detection />}
          {stage === "alarm" && (
            <Alarm countdown={countdown} onCancel={reset} onConfirm={() => setStage("alert")} />
          )}
          {stage === "alert" && (
            <Alert sent={alertSent} onContinue={() => setStage("coordination")} />
          )}
          {stage === "coordination" && (
            <Coordination
              onDispatch={() => {
                setResponseProgress(15);
                setStage("response");
              }}
            />
          )}
          {stage === "response" && (
            <Response progress={responseProgress} hospital={hospital} onReset={reset} />
          )}
        </div>
        <footer className="app-footer">GOLDENHOUR AI · SAFE DEMONSTRATION ENVIRONMENT</footer>
      </main>
    </div>
  );
}
