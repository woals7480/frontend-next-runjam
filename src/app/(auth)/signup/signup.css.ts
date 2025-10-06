import { style } from "@vanilla-extract/css";

export const main = style({ maxWidth: 720, margin: "20px auto", padding: 16 });

export const form = style({
  display: "grid",
  gap: 14,
});

export const label = style({
  display: "grid",
  gap: 6,
  fontSize: 14,
});

export const input = style({
  height: 44,
  padding: "0 12px",
  borderRadius: 10,
  border: "1px solid rgba(0,0,0,.12)",
  selectors: { ["&:focus"]: { outline: "2px solid rgba(0,0,0,.2)" } },
});

export const pwWrap = style({
  position: "relative",
});

export const pwToggle = style({
  position: "absolute",
  top: 8,
  right: 8,
  height: 28,
  padding: "0 8px",
  borderRadius: 8,
  border: "1px solid rgba(0,0,0,.1)",
  background: "#fff",
});

export const submit = style({
  height: 46,
  borderRadius: 12,
  border: "none",
  background: "#111",
  color: "#fff",
  fontWeight: 600,
});

export const err = style({
  color: "#d00",
  fontSize: 12,
});

export const helper = style({
  marginTop: 6,
  fontSize: 13,
  color: "#555",
});

export const link = style({
  color: "#0a66c2",
  textDecoration: "underline",
  margin: "0 4px",
});
