import { style } from "@vanilla-extract/css";

export const overlay = style({
  position: "fixed",
  inset: 0,
  background: "rgba(0,0,0,.35)",
  backdropFilter: "blur(2px)",
});

export const modal = style({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "min(560px, 92vw)",
  maxHeight: "80vh",
  overflow: "auto",
  borderRadius: 16,
  background: "#fff",
  color: "#111",
  boxShadow: "0 12px 40px rgba(0,0,0,.2)",
});

export const header = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "16px 20px",
  borderBottom: "1px solid #eee",
});

export const title = style({ fontSize: 18, fontWeight: 700 });
export const closeBtn = style({
  fontSize: 22,
  lineHeight: 1,
  border: "none",
  background: "transparent",
  cursor: "pointer",
});

export const form = style({ padding: 20, display: "grid", gap: 14 });
export const fieldRow = style({ display: "grid", gap: 8 });
export const label = style({ fontSize: 13, color: "#444" });
export const search = style({
  border: "1px solid #ddd",
  borderRadius: 10,
  padding: "10px 12px",
  outline: "none",
});

export const selectWrap = style({});
export const list = style({
  listStyle: "none",
  margin: 0,
  padding: 0,
  border: "1px solid #eee",
  borderRadius: 12,
  overflow: "hidden",
});
export const item = style({
  selectors: { "&:not(:last-child)": { borderBottom: "1px solid #f2f2f2" } },
});
export const itemSelected = style({ background: "#f7fbff" });
export const itemLabel = style({
  display: "flex",
  alignItems: "center",
  gap: 12,
  padding: 12,
  cursor: "pointer",
});
export const itemText = style({
  display: "flex",
  alignItems: "baseline",
  gap: 8,
  flexWrap: "wrap",
});
export const brandModel = style({ fontWeight: 600 });
export const nick = style({ color: "#666", fontStyle: "normal" });
export const mileage = style({
  marginLeft: "auto",
  fontSize: 12,
  color: "#666",
});

export const helper = style({ fontSize: 13, color: "#666", padding: "8px 0" });
export const error = style({});
export const errorText = style({
  color: "#c62929",
  fontSize: 12,
  paddingTop: 6,
});

export const footer = style({
  display: "flex",
  gap: 10,
  justifyContent: "flex-end",
  paddingTop: 6,
});
export const btn = style({
  border: "1px solid #ddd",
  borderRadius: 10,
  padding: "10px 14px",
  cursor: "pointer",
});
export const btnPrimary = style({
  background: "black",
  color: "white",
  borderColor: "black",
});
export const btnWarn = style({
  background: "#ffe8e8",
  color: "#c62929",
  borderColor: "#ffd0d0",
});
export const btnGhost = style({ background: "transparent" });
