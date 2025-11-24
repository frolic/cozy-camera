export function Logo() {
  return (
    <div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="240"
        height="240"
        viewBox="0 0 256 256"
        stroke="#000"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <g transform="translate(0,24) rotate(-6)">
          <g transform="rotate(10) translate(40,-6)">
            <rect
              x="4"
              y="4"
              width="160"
              height="160"
              rx="0"
              stroke-width="8"
            />
            <rect x="24" y="24" width="120" height="120" rx="0" fill="#000" />
          </g>

          <rect
            x="4"
            y="4"
            width="160"
            height="160"
            rx="0"
            stroke-width="8"
            fill="white"
          />
          <rect x="24" y="24" width="120" height="120" rx="0" fill="#000" />

          <g transform="translate(-24,-44)">
            <path
              d="M104 108 c-8 -10 -22 -14 -32 -7 c-11 7 -12 22 -4 32 c8 10 24 23 40 33 c16 -10 32 -23 40 -33 c8 -10 7 -25 -4 -32 c-10 -7 -24 -3 -32 7 c-2 3 -4 6 -4 6 s-2 -3 -4 -6z"
              fill="white"
              stroke-width="8"
              stroke="white"
            />
          </g>
        </g>
      </svg>
    </div>
  );
}
