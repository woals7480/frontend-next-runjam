import { style, globalStyle } from "@vanilla-extract/css";

export const container = style({
  minHeight: "100vh",
  background: "#f8fafc",
  color: "#0f172a",
  padding: "24px",
});
export const maxw = style({ maxWidth: "1120px", margin: "0 auto" });
export const header = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  marginBottom: "24px",
});
export const h1 = style({ fontSize: "22px", fontWeight: 700 });
export const footer = style({
  fontSize: "12px",
  color: "#64748b",
  paddingTop: "24px",
});

export const card = style({
  background: "#fff",
  borderRadius: "16px",
  boxShadow: "0 1px 2px rgba(0,0,0,0.06)",
  border: "1px solid #f1f5f9",
  padding: "16px",
});
export const cardHeader = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  marginBottom: "12px",
});
export const cardTitle = style({ fontSize: "16px", fontWeight: 600 });
export const actions = style({ display: "flex", gap: "8px" });
export const metaRow = style({ fontSize: "14px", color: "#0f172a" });
export const divider = style({
  height: 1,
  background: "#e2e8f0",
  margin: "12px 0",
});

export const input = style({
  border: "1px solid #e2e8f0",
  borderRadius: 8,
  padding: "8px 12px",
  fontSize: 14,
  outline: "none",
  selectors: {
    "&:focus": {
      boxShadow: "0 0 0 2px rgba(37,99,235,0.3)",
      borderColor: "#3b82f6",
    },
  },
});
export const button = style({
  padding: "8px 12px",
  borderRadius: 8,
  fontSize: 14,
  transition: "background .2s, border-color .2s",
  cursor: "pointer",
});
export const buttonSolid = style({
  background: "#2563eb",
  color: "#fff",
  selectors: { "&:hover": { background: "#1d4ed8" } },
});
export const buttonOutline = style({
  border: "1px solid #cbd5e1",
  color: "#334155",
  selectors: { "&:hover": { background: "#f8fafc" } },
});
export const buttonDanger = style({
  background: "#dc2626",
  color: "#fff",
  selectors: { "&:hover": { background: "#b91c1c" } },
});

export const tableWrap = style({ overflowX: "auto" });
export const table = style({
  width: "100%",
  borderCollapse: "collapse",
  fontSize: 14,
});

globalStyle(`${table} th`, {
  textAlign: "left",
  color: "#64748b",
  borderBottom: "1px solid #e2e8f0",
  padding: "8px 8px",
});
globalStyle(`${table} td`, {
  borderBottom: "1px solid #f1f5f9",
  padding: "8px 8px",
});

export const row = style({ display: "flex", alignItems: "center", gap: 8 });
export const col = style({ display: "grid", gap: 16 });
export const grid = style({ display: "grid", gap: 8 });
export const grid3 = style({
  display: "grid",
  gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
  gap: 8,
});
export const grid5 = style({
  display: "grid",
  gridTemplateColumns: "repeat(5, minmax(0, 1fr))",
  gap: 8,
});
export const shoesGrid = style({
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
  gap: 12,
});
export const paginationBar = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  marginTop: 12,
});
export const mileageItem = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: 8,
  border: "1px solid #e2e8f0",
  borderRadius: 10,
});
export const muted = style({ color: "#64748b", fontSize: 12 });
export const flex1 = style({ flex: 1 });
