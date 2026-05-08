import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div
      style={{ fontFamily: "'Jersey 25', sans-serif" }}
      className="w-screen h-screen bg-[#E8E5DC] flex flex-col overflow-hidden"
    >
      <div className="w-full h-[6%] border-b border-[#0C0C0C]/10 flex items-center px-7">
        <div className="jersey-25-regular text-[30px] text-[#0C0C0C] tracking-[0.18em] uppercase">
          CodeSave
        </div>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center px-6 gap-0">
        <div
          className="jersey-25-regular text-[160px] md:text-[220px] leading-none tracking-tight text-[#0C0C0C]/8 select-none"
          aria-hidden="true"
        >
          404
        </div>

        <div className="-mt-8 md:-mt-12 w-full max-w-md bg-white/60 border border-[#0C0C0C]/8 rounded-[14px] px-8 py-8 flex flex-col items-center gap-6 backdrop-blur-sm shadow-sm">
          <div className="w-12 h-12 rounded-full bg-[#C5A882]/15 border border-[#C5A882]/30 flex items-center justify-center">
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#C5A882"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
              <line x1="11" y1="8" x2="11" y2="12" />
              <line x1="11" y1="16" x2="11.01" y2="16" />
            </svg>
          </div>

          <div className="flex flex-col items-center gap-2 text-center">
            <div className="text-[11px] tracking-[0.18em] uppercase text-[#C5A882]/70 jersey-25-regular">
              Nothing here
            </div>
            <h1 className="jersey-25-regular text-[26px] md:text-[28px] text-[#0C0C0C] tracking-wide font-normal leading-snug">
              This snippet doesn't exist
            </h1>
            <p className="text-[13px] text-[#0C0C0C]/45 tracking-wide leading-relaxed max-w-xs">
              The link you followed may have expired, been deleted, or never
              existed in the first place.
            </p>
          </div>

          <div className="w-full h-px bg-[#0C0C0C]/8" />

          <button
            onClick={() => navigate("/")}
            className="w-full bg-[#0C0C0C] hover:bg-[#242424] text-[#E8E5DC] jersey-25-regular tracking-widest text-[14px] uppercase rounded-lg py-3 transition-all duration-150 cursor-pointer"
          >
            Back to Home
          </button>

          <p className="text-[11px] text-[#0C0C0C]/25 tracking-wide jersey-25-regular">
            Or create a new snippet from the home page
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
