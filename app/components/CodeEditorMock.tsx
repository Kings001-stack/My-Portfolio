import React from "react";

interface CodeEditorMockProps {
  code: string;
  language?: string;
  style?: React.CSSProperties;
}

const lineNumberStyle: React.CSSProperties = {
  color: "#555",
  userSelect: "none",
  textAlign: "right",
  paddingRight: 12,
  minWidth: 32,
  fontSize: 14,
  opacity: 0.6,
};

const CodeEditorMock: React.FC<CodeEditorMockProps> = ({ code, language, style }) => {
  const lines = code.split("\n");
  return (
    <div
      style={{
        background: "#18181b",
        borderRadius: 10,
        boxShadow: "0 4px 32px #0006",
        fontFamily: 'Fira Mono, Menlo, Monaco, Consolas, monospace',
        fontSize: 15,
        color: "#e5e7eb",
        padding: 0,
        overflow: "auto",
        border: "1px solid #23232b",
        ...style,
      }}
    >
      {/* Fake top bar */}
      <div style={{
        display: "flex",
        alignItems: "center",
        height: 32,
        background: "#23232b",
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        padding: "0 16px",
        gap: 8,
      }}>
        <span style={{ width: 12, height: 12, borderRadius: 6, background: "#f87171", display: "inline-block" }} />
        <span style={{ width: 12, height: 12, borderRadius: 6, background: "#fbbf24", display: "inline-block" }} />
        <span style={{ width: 12, height: 12, borderRadius: 6, background: "#34d399", display: "inline-block" }} />
        <span style={{ marginLeft: 16, color: "#a3a3a3", fontSize: 13 }}>{language || "index.tsx"}</span>
      </div>
      <div style={{ display: "flex", width: "100%" }}>
        <pre style={{ margin: 0, background: "none", padding: 0, display: "flex" }}>
          <code style={{ display: "flex" }}>
            <div style={{ padding: "12px 0 12px 12px", background: "#23232b", borderBottomLeftRadius: 10 }}>
              {lines.map((_, i) => (
                <div key={i} style={lineNumberStyle}>{i + 1}</div>
              ))}
            </div>
            <div style={{ padding: "12px 16px 12px 12px", minWidth: 0, width: "100%" }}>
              {lines.map((line, i) => (
                <div key={i} style={{ whiteSpace: "pre" }}>{line || "\u00A0"}</div>
              ))}
            </div>
          </code>
        </pre>
      </div>
    </div>
  );
};

export default CodeEditorMock;
