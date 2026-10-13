import { useEffect, useRef, useState } from "react";

const IFRAME_API_URL = "https://www.youtube.com/iframe_api";
const STATE_ENDED = 0;

let apiPromise = null;

function loadYouTubeApi() {
  if (window.YT?.Player) return Promise.resolve(window.YT);
  if (!apiPromise) {
    apiPromise = new Promise((resolve, reject) => {
      const previous = window.onYouTubeIframeAPIReady;
      window.onYouTubeIframeAPIReady = () => {
        if (typeof previous === "function") previous();
        resolve(window.YT);
      };
      const script = document.createElement("script");
      script.src = IFRAME_API_URL;
      script.onerror = () => reject(new Error("YouTube API unavailable"));
      document.head.appendChild(script);
    });
  }
  return apiPromise;
}

export function VideoStage({ course, lesson, lessonNumber, onEnded }) {
  const mountRef = useRef(null);
  const endedRef = useRef(onEnded);
  const [apiFailed, setApiFailed] = useState(false);
  endedRef.current = onEnded;

  const videoId = lesson.videoId;
  const lessonLabel = `LESSON ${String(lessonNumber).padStart(2, "0")}`;
  const frameTitle = `${course.title} — ${lessonLabel}: ${lesson.title}`;

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount || !videoId) return undefined;

    setApiFailed(false);
    let cancelled = false;
    let player = null;
    const target = document.createElement("div");
    mount.appendChild(target);

    loadYouTubeApi()
      .then((YT) => {
        if (cancelled) return;
        player = new YT.Player(target, {
          videoId,
          playerVars: {
            rel: 0,
            modestbranding: 1,
            playsinline: 1,
            origin: window.location.origin,
          },
          events: {
            onStateChange: (event) => {
              if (event.data === (YT.PlayerState?.ENDED ?? STATE_ENDED)) {
                endedRef.current();
              }
            },
          },
        });
      })
      .catch(() => {
        if (!cancelled) setApiFailed(true);
      });

    return () => {
      cancelled = true;
      if (player && typeof player.destroy === "function") {
        try {
          player.destroy();
        } catch {
          /* player already gone */
        }
      } else if (target.parentNode) {
        target.parentNode.removeChild(target);
      }
    };
  }, [videoId]);

  return (
    <section className={`player-stage art-${course.color}`}>
      <div className="stage-window">
        <div className="stage-window-bar">
          <div>
            <i />
            <i />
            <i />
          </div>
          <span>
            THEMR ACADEMY · {lessonLabel} · {course.title}
          </span>
        </div>

        <div className="stage-frame">
          {apiFailed && videoId ? (
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${videoId}?rel=0&modestbranding=1`}
              title={frameTitle}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <div className="stage-mount" ref={mountRef} />
          )}
        </div>

        <div className="stage-caption">
          <div className="stage-lesson-label">{lessonLabel}</div>
          <div className="stage-caption-row">
            <h2>{lesson.title}</h2>
            <span className="stage-caption-duration">{lesson.minutes} min</span>
          </div>
          <p>{lesson.summary}</p>
        </div>
      </div>
    </section>
  );
}
