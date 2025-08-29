"use client";

import React, { useEffect, useRef } from "react";
import Typed from "typed.js";

interface TypedTextProps {
  strings: string[];
  typeSpeed?: number;
  backSpeed?: number;
  backDelay?: number;
  loop?: boolean;
  className?: string;
  cursorChar?: string;
}

const TypedText: React.FC<TypedTextProps> = ({
  strings,
  typeSpeed = 50,
  backSpeed = 30,
  backDelay = 1500,
  loop = true,
  className = "",
  cursorChar = "|",
}) => {
  const elementRef = useRef<HTMLSpanElement | null>(null);
  const typedInstanceRef = useRef<Typed | null>(null);

  useEffect(() => {
    if (
      !elementRef.current ||
      !Array.isArray(strings) ||
      strings.length === 0
    ) {
      return;
    }

    typedInstanceRef.current = new Typed(elementRef.current, {
      strings,
      typeSpeed,
      backSpeed,
      backDelay,
      loop,
      smartBackspace: true,
      showCursor: true,
      cursorChar,
    });

    return () => {
      typedInstanceRef.current?.destroy();
      typedInstanceRef.current = null;
    };
  }, [strings, typeSpeed, backSpeed, backDelay, loop, cursorChar]);

  return <span ref={elementRef} className={className} suppressHydrationWarning />;
};

export default TypedText;
