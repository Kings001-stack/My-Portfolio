import React from "react";

interface EnhancedCodeEditorProps {
  code: string;
  language?: string;
  fileName?: string;
  theme?: "dark" | "darker" | "oceanic" | "macbook";
  style?: React.CSSProperties;
  highlightSyntax?: boolean;
}

interface Theme {
  background: string;
  headerBg: string;
  lineNumbersBg: string;
  lineNumbersColor: string;
  textColor: string;
  borderColor: string;
  dotRed?: string;
  dotYellow?: string;
  dotGreen?: string;
}

const themes: Record<string, Theme> = {
  dark: {
    background: "#1e1e1e",
    headerBg: "#2d2d30",
    lineNumbersBg: "#252526",
    lineNumbersColor: "#858585",
    textColor: "#e5e7eb",
    borderColor: "#3e3e42",
  },
  darker: {
    background: "#18181b",
    headerBg: "#27272a",
    lineNumbersBg: "#1f1f23",
    lineNumbersColor: "#71717a",
    textColor: "#e4e4e7",
    borderColor: "#3f3f46",
  },
  oceanic: {
    background: "#1b2b34",
    headerBg: "#343d46",
    lineNumbersBg: "#2d3c46",
    lineNumbersColor: "#65737e",
    textColor: "#cdd3de",
    borderColor: "#4f5b66",
  },
  macbook: {
    background: "#1e1e1e",
    headerBg: "#323233",
    lineNumbersBg: "#1e1e1e",
    lineNumbersColor: "#6e7681",
    textColor: "#e6edf3",
    borderColor: "#30363d",
    dotRed: "#ff5f56",
    dotYellow: "#ffbd2e",
    dotGreen: "#27c93f",
  },
};

const EnhancedCodeEditor: React.FC<EnhancedCodeEditorProps> = ({
  code,
  language = "javascript",
  fileName = "code.js",
  theme = "dark",
  style,
  highlightSyntax = true,
}) => {
  const lines = code.split("\n");
  const currentTheme = themes[theme];

  // Render a single line with token-based highlighting using React elements (no innerHTML)
  const renderHighlightedLine = (line: string, key: number) => {
    if (!highlightSyntax) {
      return (
        <div
          key={key}
          style={{ whiteSpace: "pre", height: 22, lineHeight: "22px" }}
        >
          {line.length ? line : "\u00A0"}
        </div>
      );
    }

    type Segment = { text: string; kind: "plain" | "string" | "comment" };
    const segments: Segment[] = [];
    let buffer = "";
    let inString = false;
    let quoteChar: '"' | "'" | "`" | null = null;
    let escapeNext = false;
    let i = 0;

    while (i < line.length) {
      const ch = line[i];

      // Single-line comments
      if (
        !inString &&
        i + 1 < line.length &&
        line[i] === "/" &&
        line[i + 1] === "/"
      ) {
        if (buffer) {
          segments.push({ text: buffer, kind: "plain" });
          buffer = "";
        }
        segments.push({ text: line.slice(i), kind: "comment" });
        buffer = "";
        break;
      }

      if (inString) {
        buffer += ch;
        if (escapeNext) {
          escapeNext = false;
        } else if (ch === "\\") {
          escapeNext = true;
        } else if (quoteChar && ch === quoteChar) {
          segments.push({ text: buffer, kind: "string" });
          buffer = "";
          inString = false;
          quoteChar = null;
        }
        i += 1;
        continue;
      }

      if (ch === '"' || ch === "'" || ch === "`") {
        if (buffer) {
          segments.push({ text: buffer, kind: "plain" });
          buffer = "";
        }
        inString = true;
        quoteChar = ch as '"' | "'" | "`";
        buffer += ch;
        i += 1;
        continue;
      }

      buffer += ch;
      i += 1;
    }

    if (buffer) {
      segments.push({ text: buffer, kind: inString ? "string" : "plain" });
    }

    const children: React.ReactNode[] = [];
    const pushPlain = (text: string) => {
      if (!text) return;
      const pattern =
        /([A-Za-z_$][A-Za-z0-9_$]*)\s*(\()|(\b(?:const|let|var|function|return|if|else|for|while|do|switch|case|break|continue|class|extends|super|import|export|from|as|try|catch|finally|throw|new|this|typeof|void|delete|in|of|instanceof|null|undefined|true|false)\b)|(\b\d+(?:\.\d+)?\b)|([=+\-*\/%<>!&|^~?:]+)/g;
      let last = 0;
      let m: RegExpExecArray | null;
      while ((m = pattern.exec(text)) !== null) {
        if (m.index > last) {
          children.push(text.slice(last, m.index));
        }
        if (m[1] && m[2]) {
          children.push(
            <span
              key={`${key}-fn-${children.length}`}
              className="code-function"
            >
              {m[1]}
            </span>
          );
          children.push("(");
        } else if (m[3]) {
          children.push(
            <span key={`${key}-kw-${children.length}`} className="code-keyword">
              {m[3]}
            </span>
          );
        } else if (m[4]) {
          children.push(
            <span key={`${key}-num-${children.length}`} className="code-number">
              {m[4]}
            </span>
          );
        } else if (m[5]) {
          children.push(
            <span
              key={`${key}-op-${children.length}`}
              className="code-operator"
            >
              {m[5]}
            </span>
          );
        }
        last = pattern.lastIndex;
      }
      if (last < text.length) {
        children.push(text.slice(last));
      }
    };

    segments.forEach((seg, idx) => {
      if (seg.kind === "string") {
        children.push(
          <span key={`${key}-str-${idx}`} className="code-string">
            {seg.text}
          </span>
        );
      } else if (seg.kind === "comment") {
        children.push(
          <span key={`${key}-com-${idx}`} className="code-comment">
            {seg.text}
          </span>
        );
      } else {
        pushPlain(seg.text);
      }
    });

    return (
      <div
        key={key}
        style={{ whiteSpace: "pre", height: 22, lineHeight: "22px" }}
      >
        {children.length ? children : "\u00A0"}
      </div>
    );
  };

  return (
    <div
      style={{
        background: currentTheme.background,
        borderRadius: 12,
        boxShadow:
          "0 8px 40px rgba(0, 0, 0, 0.6), 0 0 0 1px rgba(255, 255, 255, 0.05)",
        fontFamily:
          "'SF Mono', 'Fira Code', 'Menlo', 'Monaco', 'Consolas', monospace",
        fontSize: 14,
        color: currentTheme.textColor,
        padding: 0,
        overflow: "hidden",
        border: `1px solid ${currentTheme.borderColor}`,
        width: "100%",
        ...style,
      }}
    >
      {/* MacBook-style Header with Traffic Lights */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: 40,
          background: currentTheme.headerBg,
          borderTopLeftRadius: 12,
          borderTopRightRadius: 12,
          padding: "0 16px",
          borderBottom: `1px solid ${currentTheme.borderColor}`,
        }}
      >
        {/* Traffic Light Dots */}
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <div
            style={{
              width: 12,
              height: 12,
              borderRadius: "50%",
              background: currentTheme.dotRed || "#ff5f56",
              boxShadow: "0 1px 2px rgba(0,0,0,0.3)",
            }}
          />
          <div
            style={{
              width: 12,
              height: 12,
              borderRadius: "50%",
              background: currentTheme.dotYellow || "#ffbd2e",
              boxShadow: "0 1px 2px rgba(0,0,0,0.3)",
            }}
          />
          <div
            style={{
              width: 12,
              height: 12,
              borderRadius: "50%",
              background: currentTheme.dotGreen || "#27c93f",
              boxShadow: "0 1px 2px rgba(0,0,0,0.3)",
            }}
          />
        </div>

        {/* File Name */}
        <span
          style={{
            color: "#8b949e",
            fontSize: 13,
            fontWeight: 500,
            letterSpacing: "0.3px",
          }}
        >
          {fileName}
        </span>

        {/* Language Badge */}
        <span
          style={{
            color: "#58a6ff",
            fontSize: 11,
            fontWeight: 600,
            textTransform: "uppercase",
            letterSpacing: "0.5px",
          }}
        >
          {language}
        </span>
      </div>

      {/* Editor Content */}
      <div
        style={{
          display: "flex",
          width: "100%",
          maxHeight: "450px",
          overflowY: "auto",
          background: currentTheme.background,
        }}
      >
        {/* Line Numbers */}
        <div
          style={{
            padding: "16px 0",
            background: currentTheme.lineNumbersBg,
            color: currentTheme.lineNumbersColor,
            userSelect: "none",
            textAlign: "right",
            paddingRight: 16,
            paddingLeft: 16,
            minWidth: 50,
            fontSize: 13,
            fontWeight: 500,
          }}
        >
          {lines.map((_, i) => (
            <div key={i} style={{ height: 24, lineHeight: "24px" }}>
              {i + 1}
            </div>
          ))}
        </div>

        {/* Code Content */}
        <div
          style={{
            padding: "16px 20px",
            minWidth: 0,
            width: "100%",
            overflowX: "auto",
            fontSize: 14,
            lineHeight: "24px",
          }}
        >
          {lines.map((line, i) => renderHighlightedLine(line, i))}
        </div>
      </div>

      {/* Status Bar */}
      <div
        style={{
          height: 28,
          background: currentTheme.headerBg,
          borderBottomLeftRadius: 12,
          borderBottomRightRadius: 12,
          borderTop: `1px solid ${currentTheme.borderColor}`,
          display: "flex",
          alignItems: "center",
          padding: "0 16px",
          fontSize: 11,
          color: "#8b949e",
        }}
      >
        <span>UTF-8</span>
        <span style={{ marginLeft: "auto" }}>Ln 1, Col 1</span>
      </div>
    </div>
  );
};

export default EnhancedCodeEditor;
