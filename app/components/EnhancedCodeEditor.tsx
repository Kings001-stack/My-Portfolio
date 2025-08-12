import React from "react";

interface EnhancedCodeEditorProps {
  code: string;
  language?: string;
  fileName?: string;
  theme?: "dark" | "darker" | "oceanic";
  style?: React.CSSProperties;
  highlightSyntax?: boolean;
}

const themes = {
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
        borderRadius: 10,
        boxShadow: "0 4px 32px rgba(0, 0, 0, 0.4)",
        fontFamily: "Fira Mono, Menlo, Monaco, Consolas, monospace",
        fontSize: 15,
        color: currentTheme.textColor,
        padding: 0,
        overflow: "hidden",
        border: `1px solid ${currentTheme.borderColor}`,
        width: "100%",
        ...style,
      }}
    >
      {/* Simple Editor Header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          height: 36,
          background: currentTheme.headerBg,
          borderTopLeftRadius: 10,
          borderTopRightRadius: 10,
          padding: "0 16px",
        }}
      >
        <span style={{ color: "#a3a3a3", fontSize: 13 }}>
          {fileName} - {language}
        </span>
      </div>

      {/* Editor Content */}
      <div
        style={{
          display: "flex",
          width: "100%",
          maxHeight: "400px",
          overflowY: "auto",
        }}
      >
        {/* Line Numbers */}
        <div
          style={{
            padding: "12px 0",
            background: currentTheme.lineNumbersBg,
            color: currentTheme.lineNumbersColor,
            userSelect: "none",
            textAlign: "right",
            paddingRight: 12,
            minWidth: 40,
            fontSize: 14,
            borderRight: `1px solid ${currentTheme.borderColor}`,
          }}
        >
          {lines.map((_, i) => (
            <div key={i} style={{ height: 22, lineHeight: "22px" }}>
              {i + 1}
            </div>
          ))}
        </div>

        {/* Code Content */}
        <div
          style={{
            padding: "12px 16px",
            minWidth: 0,
            width: "100%",
            overflowX: "auto",
          }}
        >
          {lines.map((line, i) => renderHighlightedLine(line, i))}
        </div>
      </div>

      {/* Simplified Status Bar */}
      <div
        style={{
          height: 4,
          background: currentTheme.headerBg,
          borderBottomLeftRadius: 10,
          borderBottomRightRadius: 10,
        }}
      ></div>
    </div>
  );
};

export default EnhancedCodeEditor;
