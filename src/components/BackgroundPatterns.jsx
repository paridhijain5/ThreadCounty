import React from "react";
import { motion } from "motion/react";

export default function BackgroundPatterns() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      {/* Blueprint grid - primary */}
      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(39,196,255,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(39,196,255,0.8) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />
      {/* Sub-grid */}
      <div
        className="absolute inset-0 opacity-[0.012]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(29,139,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(29,139,255,0.6) 1px, transparent 1px)",
          backgroundSize: "8px 8px",
        }}
      />
      {/* Dot mesh */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "radial-gradient(rgba(39,196,255,0.5) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />

      {/* Radial glow - top right */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.12 }}
        transition={{ duration: 2.5 }}
        className="absolute -top-[20%] -right-[10%] w-[800px] h-[800px] rounded-full"
        style={{
          background: "radial-gradient(circle, #1D8BFF 0%, transparent 70%)",
          filter: "blur(120px)",
        }}
      />
      {/* Radial glow - bottom left */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.07 }}
        transition={{ duration: 2.5, delay: 0.5 }}
        className="absolute -bottom-[20%] -left-[10%] w-[600px] h-[600px] rounded-full"
        style={{
          background: "radial-gradient(circle, #19E3C7 0%, transparent 70%)",
          filter: "blur(100px)",
        }}
      />
      {/* Purple accent center */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.04 }}
        transition={{ duration: 3, delay: 1 }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full"
        style={{
          background: "radial-gradient(circle, #7568FF 0%, transparent 70%)",
          filter: "blur(80px)",
        }}
      />

      {/* Circuit board traces */}
      <div className="absolute inset-0 opacity-[0.04]">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern
              id="circuit"
              width="200"
              height="200"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M0 100 H60 V40 H140 V100 H200"
                fill="none"
                stroke="#1D8BFF"
                strokeWidth="1"
              />
              <path
                d="M100 0 V60 H160 V140 H100 V200"
                fill="none"
                stroke="#27C4FF"
                strokeWidth="0.8"
              />
              <path
                d="M0 60 H40 V160 H80"
                fill="none"
                stroke="#19E3C7"
                strokeWidth="0.6"
              />
              <circle cx="60" cy="40" r="2.5" fill="#1D8BFF" />
              <circle cx="140" cy="100" r="2.5" fill="#27C4FF" />
              <circle cx="100" cy="60" r="2" fill="#19E3C7" />
              <rect
                x="38"
                y="158"
                width="4"
                height="4"
                fill="none"
                stroke="#27C4FF"
                strokeWidth="0.8"
              />
              <rect
                x="58"
                y="38"
                width="4"
                height="4"
                fill="none"
                stroke="#19E3C7"
                strokeWidth="0.8"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#circuit)" />
        </svg>
      </div>

      {/* Hexagonal grid */}
      <div className="absolute inset-0 opacity-[0.02]">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern
              id="hexgrid"
              width="60"
              height="104"
              patternUnits="userSpaceOnUse"
            >
              <polygon
                points="30,2 58,17 58,47 30,62 2,47 2,17"
                fill="none"
                stroke="#27C4FF"
                strokeWidth="0.8"
              />
              <polygon
                points="30,54 58,69 58,99 30,114 2,99 2,69"
                fill="none"
                stroke="#1D8BFF"
                strokeWidth="0.6"
              />
              <polygon
                points="60,28 88,43 88,73 60,88 32,73 32,43"
                fill="none"
                stroke="#19E3C7"
                strokeWidth="0.6"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#hexgrid)" />
        </svg>
      </div>

      {/* Neural network connecting lines */}
      <div className="absolute inset-0 opacity-[0.035]">
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 1440 900"
          preserveAspectRatio="xMidYMid slice"
        >
          <line
            x1="120"
            y1="180"
            x2="380"
            y2="320"
            stroke="#1D8BFF"
            strokeWidth="1"
          />
          <line
            x1="380"
            y1="320"
            x2="680"
            y2="220"
            stroke="#27C4FF"
            strokeWidth="1"
          />
          <line
            x1="680"
            y1="220"
            x2="920"
            y2="420"
            stroke="#19E3C7"
            strokeWidth="0.8"
          />
          <line
            x1="920"
            y1="420"
            x2="1180"
            y2="280"
            stroke="#1D8BFF"
            strokeWidth="1"
          />
          <line
            x1="1180"
            y1="280"
            x2="1380"
            y2="400"
            stroke="#27C4FF"
            strokeWidth="0.8"
          />
          <line
            x1="200"
            y1="650"
            x2="480"
            y2="520"
            stroke="#7568FF"
            strokeWidth="0.8"
          />
          <line
            x1="480"
            y1="520"
            x2="780"
            y2="680"
            stroke="#27C4FF"
            strokeWidth="1"
          />
          <line
            x1="780"
            y1="680"
            x2="1080"
            y2="560"
            stroke="#19E3C7"
            strokeWidth="0.8"
          />
          <line
            x1="120"
            y1="180"
            x2="200"
            y2="650"
            stroke="#1D8BFF"
            strokeWidth="0.5"
            strokeDasharray="4,8"
          />
          <line
            x1="680"
            y1="220"
            x2="780"
            y2="680"
            stroke="#19E3C7"
            strokeWidth="0.4"
            strokeDasharray="4,8"
          />
          <circle cx="120" cy="180" r="3" fill="#1D8BFF" />
          <circle cx="380" cy="320" r="3" fill="#27C4FF" />
          <circle cx="680" cy="220" r="3" fill="#19E3C7" />
          <circle cx="920" cy="420" r="2.5" fill="#1D8BFF" />
          <circle cx="1180" cy="280" r="3" fill="#27C4FF" />
          <circle cx="200" cy="650" r="2.5" fill="#7568FF" />
          <circle cx="780" cy="680" r="2.5" fill="#19E3C7" />
        </svg>
      </div>

      {/* Fabric weave - corner accent */}
      <div className="absolute top-0 left-0 w-[300px] h-[300px] opacity-[0.04]">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern
              id="weave"
              width="16"
              height="16"
              patternUnits="userSpaceOnUse"
            >
              <line
                x1="0"
                y1="4"
                x2="16"
                y2="4"
                stroke="#27C4FF"
                strokeWidth="1.5"
              />
              <line
                x1="0"
                y1="12"
                x2="16"
                y2="12"
                stroke="#27C4FF"
                strokeWidth="1.5"
              />
              <line
                x1="4"
                y1="0"
                x2="4"
                y2="16"
                stroke="#1D8BFF"
                strokeWidth="1.5"
              />
              <line
                x1="12"
                y1="0"
                x2="12"
                y2="16"
                stroke="#1D8BFF"
                strokeWidth="1.5"
              />
              <rect
                x="2"
                y="2"
                width="4"
                height="4"
                fill="#27C4FF"
                opacity="0.3"
              />
              <rect
                x="10"
                y="10"
                width="4"
                height="4"
                fill="#1D8BFF"
                opacity="0.3"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#weave)" />
        </svg>
      </div>

      {/* PCB traces - bottom right */}
      <div className="absolute bottom-0 right-0 w-[450px] h-[350px] opacity-[0.04]">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M450 350 H300 V250 H200 V150 H100"
            fill="none"
            stroke="#19E3C7"
            strokeWidth="1.5"
          />
          <path
            d="M450 250 H350 V150 H250"
            fill="none"
            stroke="#1D8BFF"
            strokeWidth="1"
          />
          <path
            d="M450 150 H370 V60 H280"
            fill="none"
            stroke="#27C4FF"
            strokeWidth="1"
            strokeDasharray="6,4"
          />
          <circle
            cx="300"
            cy="250"
            r="4"
            fill="none"
            stroke="#19E3C7"
            strokeWidth="1.5"
          />
          <circle cx="200" cy="150" r="3" fill="#19E3C7" />
          <circle cx="350" cy="150" r="3" fill="#1D8BFF" />
          <circle cx="250" cy="150" r="3" fill="#27C4FF" />
        </svg>
      </div>
    </div>
  );
}
