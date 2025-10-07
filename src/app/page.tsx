"use client";
import { useState, useEffect, useRef } from "react";

export default function Home() {
  const [currentPage, setCurrentPage] = useState(0);
  const [skipAnim, setSkipAnim] = useState(false);
  const [activeVideo, setActiveVideo] = useState(1);
  const video1Ref = useRef<HTMLVideoElement | null>(null);
  const video2Ref = useRef<HTMLVideoElement | null>(null);


  const pages = [
    {
      title: "WELCOME TO MY PORTFOLIO",
      subtitle: "Explore my journey through code, design, and the stars.",
      content: "",
    },
    {
      title: "AYUSH",
      subtitle: "FRONT END DEVELOPER | AI ENTHUSIAST",
      content:
        "I am an enthusiastic and purpose-driven Information Science student seeking an opportunity to work in a creative, growth-oriented environment. Eager to apply my technical skills and creativity to build impactful solutions while continuously learning and evolving.",
    },
    {
      title: "MY PROJECTS",
      subtitle: "1. FINANCE TRACKER",
      content:
        "A user-friendly platform where users can input their income and track their total expenses. Built using React.js, Node.js, TensorFlow, and CSS. github : https://github.com/ayush2810-svg/finance-tracker",
    },
    {
      title: "MY PROJECTS",
      subtitle: "2. MY-PORTFOLIO",
      content:
        "My portfolio displayed in a cosmic form, where the user can walk through my portfolio and read information related to me. Built using JavaScript. github : https://github.com/ayush2810-svg/my-spaceAdv-portfolio",
    },
    {
      title: "SKILLS",
      subtitle: "",
      content:
        "💻 Languages: Java, JavaScript(basic), Python(basic)\n🎨 Frontend: React.js, Tailwind CSS\n⚙️ Backend: Node.js\n🤖 AI Tools: OpenAI APIs",
    },
    {
      title: "CONTACT",
      subtitle: "",
      content:
        "📧 Email: ayushkulal282@gmail.com\n🌐 GitHub: https://github.com/ayush2810-svg\n💼 LinkedIn: http://www.linkedin.com/in/ayush-kulal-769159374\n💻 Leetcode: https://leetcode.com/u/ayushkulal09/",
    },
  ];

  const handleSkip = () => {
    if (skipAnim) return;
    setSkipAnim(true);
    setTimeout(() => {
      setSkipAnim(false);
      setCurrentPage((prev) => (prev + 1) % pages.length);
    }, 2000);
  };

  // 🎥 Crossfade background videos
  useEffect(() => {
    const current = activeVideo === 1 ? video1Ref.current : video2Ref.current;
    const next = activeVideo === 1 ? video2Ref.current : video1Ref.current;

    const handleTimeUpdate = () => {
      if (current && next && current.duration - current.currentTime < 0.8) {
        // fade in next video slightly before the end
        next.currentTime = 0;
        next.play();
        next.style.opacity = "1";

        setTimeout(() => {
          current.style.opacity = "0";
          setActiveVideo(activeVideo === 1 ? 2 : 1);
        }, 500); // crossfade duration
      }
    };

    if (current) {
      current.addEventListener("timeupdate", handleTimeUpdate);
    }

    return () => {
      if (current) {
        current.removeEventListener("timeupdate", handleTimeUpdate);
      }
    };
  }, [activeVideo]);

  const { title, subtitle, content } = pages[currentPage];

  return (
    <div
      style={{
        position: "relative",
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
        backgroundColor: "black",
      }}
    >
      {/* 🌌 Two Background Videos for Crossfade */}
      <video
        ref={video1Ref}
        autoPlay
        muted
        playsInline
        preload="auto"
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          width: "100%",
          height: "100%",
          objectFit: "cover",
          transform: "translate(-50%, -50%)",
          zIndex: 0,
          opacity: activeVideo === 1 ? 1 : 0,
          transition: "opacity 1s ease-in-out",
          filter: "blur(10px) brightness(0.6) contrast(0.9)",
        }}
      >
        <source src="/cosmos.mp4" type="video/mp4" />
      </video>

      <video
        ref={video2Ref}
        autoPlay
        muted
        playsInline
        preload="auto"
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          width: "100%",
          height: "100%",
          objectFit: "cover",
          transform: "translate(-50%, -50%)",
          zIndex: 0,
          opacity: activeVideo === 2 ? 1 : 0,
          transition: "opacity 1s ease-in-out",
          filter: "blur(10px) brightness(0.6) contrast(0.9)",
        }}
      >
        <source src="/cosmos.mp4" type="video/mp4" />
      </video>

      {/* 🪐 Page Content */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          textAlign: "center",
          color: "white",
          zIndex: 2,
          opacity: skipAnim ? 0 : 1,
          transition: "opacity 1s ease",
        }}
      >
        <h1
          style={{
            fontSize: "4rem",
            fontWeight: "bold",
            textShadow: "0 0 25px rgba(255,255,255,0.8)",
            marginBottom: "1rem",
          }}
        >
          {title}
        </h1>

        {subtitle && (
          <h3
            style={{
              fontSize: "1.8rem",
              textShadow: "0 0 15px rgba(255,255,255,0.6)",
              marginBottom: "1.5rem",
            }}
          >
            {subtitle}
          </h3>
        )}

        {content && (
          <p
            style={{
              maxWidth: "700px",
              margin: "0 auto 2rem",
              fontSize: "1.2rem",
              lineHeight: "1.6",
              whiteSpace: "pre-line",
              textShadow: "0 0 10px rgba(255,255,255,0.6)",
            }}
          >
            {content}
          </p>
        )}

        <button
          onClick={handleSkip}
          style={{
            padding: "15px 35px",
            fontSize: "1.2rem",
            border: "2px solid white",
            background: "transparent",
            color: "white",
            cursor: "pointer",
            borderRadius: "10px",
            textTransform: "uppercase",
            transition: "all 0.3s ease",
          }}
          onMouseOver={(e) =>
            (e.currentTarget.style.background = "rgba(255,255,255,0.2)")
          }
          onMouseOut={(e) =>
            (e.currentTarget.style.background = "transparent")
          }
        >
          {currentPage === pages.length - 1 ? "Restart →" : "Next →"}
        </button>
      </div>

      {/* 🌀 Blackhole Animation */}
      {skipAnim && (
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            width: "200vmax",
            height: "200vmax",
            background:
              "radial-gradient(circle, black 0%, rgba(0,0,0,0.85) 40%, transparent 80%)",
            borderRadius: "50%",
            transform: "translate(-50%, -50%) scale(0)",
            animation: "blackhole 2s ease-in forwards",
            zIndex: 3,
          }}
        />
      )}

      <style jsx>{`
        @keyframes blackhole {
          0% {
            transform: translate(-50%, -50%) scale(0);
            filter: blur(0);
            opacity: 1;
          }
          50% {
            transform: translate(-50%, -50%) scale(1.5);
            filter: blur(8px);
          }
          100% {
            transform: translate(-50%, -50%) scale(3);
            filter: blur(15px);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}
