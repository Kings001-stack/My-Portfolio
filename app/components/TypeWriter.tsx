"use client";

import React, { useState, useEffect, useRef } from "react";

interface TypeWriterProps {
  texts: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  delayAfterType?: number;
  delayAfterDelete?: number;
  loop?: boolean;
  startDelay?: number;
  className?: string;
  cursorClassName?: string;
}

const TypeWriter: React.FC<TypeWriterProps> = ({
  texts,
  typingSpeed = 100,
  deletingSpeed = 50,
  delayAfterType = 2000,
  delayAfterDelete = 500,
  loop = true,
  startDelay = 0,
  className = "",
  cursorClassName = "",
}) => {
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [textIndex, setTextIndex] = useState(0);
  const [isWaiting, setIsWaiting] = useState(false);
  const hasTexts = Array.isArray(texts) && texts.length > 0;
  const safeIndex = hasTexts
    ? ((textIndex % texts.length) + texts.length) % texts.length
    : 0;
  const currentText = hasTexts ? texts[safeIndex] : "";
  const timeoutRef = useRef<number | null>(null);

  // Reset when texts prop changes
  useEffect(() => {
    setDisplayText("");
    setIsDeleting(false);
    setTextIndex(0);
  }, [texts]);

  // Clear any pending timers when unmounting
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    // If waiting, keep the scheduled resume timer intact
    if (!hasTexts) return;
    if (isWaiting) return;

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    const handleTyping = () => {
      // If deleting
      if (isDeleting) {
        if (displayText.length === 0) {
          setIsDeleting(false);
          setTextIndex((prev) => {
            const next = prev + 1;
            if (!loop && next >= texts.length) {
              // Stop on last item if not looping
              return prev;
            }
            return next % texts.length;
          });
          setIsWaiting(true);
          timeoutRef.current = window.setTimeout(
            () => setIsWaiting(false),
            delayAfterDelete
          );
          return;
        }

        timeoutRef.current = window.setTimeout(() => {
          setDisplayText((prev) =>
            prev.length > 0 ? prev.slice(0, -1) : prev
          );
        }, deletingSpeed);
      }
      // If typing
      else {
        if (displayText === currentText) {
          setIsWaiting(true);
          timeoutRef.current = window.setTimeout(() => {
            setIsWaiting(false);
            setIsDeleting(true);
          }, delayAfterType);
          return;
        }

        timeoutRef.current = window.setTimeout(() => {
          setDisplayText((prev) => {
            const nextChar = currentText.charAt(prev.length);
            return prev + nextChar;
          });
        }, typingSpeed);
      }
    };

    if (
      startDelay > 0 &&
      displayText.length === 0 &&
      !isDeleting &&
      textIndex === 0
    ) {
      timeoutRef.current = window.setTimeout(() => handleTyping(), startDelay);
    } else {
      handleTyping();
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [
    displayText,
    isDeleting,
    textIndex,
    currentText,
    isWaiting,
    texts,
    typingSpeed,
    deletingSpeed,
    delayAfterType,
    delayAfterDelete,
    loop,
    hasTexts,
    startDelay,
  ]);

  return (
    <span className={className}>
      {displayText}
      <span className={`typewriter-cursor ${cursorClassName}`}></span>
    </span>
  );
};

export default TypeWriter;
