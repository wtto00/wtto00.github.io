function withOpacity(variableName) {
  return ({ opacityValue }) => {
    if (opacityValue !== undefined) {
      return `rgba(var(${variableName}), ${opacityValue})`;
    }
    return `rgb(var(${variableName}))`;
  };
}

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    // Remove the following screen breakpoint or add other breakpoints
    // if one breakpoint is not enough for you
    screens: {
      sm: "640px",
    },

    // Uncomment the following extend
    // if existing Tailwind color palette will be used

    // extend: {
    textColor: {
      skin: {
        base: withOpacity("--color-text-base"),
        accent: withOpacity("--color-accent"),
        inverted: withOpacity("--color-fill"),
      },
    },
    backgroundColor: {
      skin: {
        fill: withOpacity("--color-fill"),
        accent: withOpacity("--color-accent"),
        inverted: withOpacity("--color-text-base"),
        card: withOpacity("--color-card"),
        "card-muted": withOpacity("--color-card-muted"),
      },
    },
    outlineColor: {
      skin: {
        fill: withOpacity("--color-accent"),
      },
    },
    borderColor: {
      skin: {
        line: withOpacity("--color-border"),
        fill: withOpacity("--color-text-base"),
        accent: withOpacity("--color-accent"),
      },
    },
    fill: {
      skin: {
        base: withOpacity("--color-text-base"),
        accent: withOpacity("--color-accent"),
      },
      transparent: "transparent",
    },
    fontFamily: {
      mono: ["IBM Plex Mono", "monospace"],
    },
    keyframes: {
      'wave-hands': {
        '0%, 60%, 100%': { transform: 'rotate(0)' },
        '10%, 30%': { transform: 'rotate(14deg)' },
        '20%': { transform: 'rotate(-8deg)' },
        '40%': { transform: 'rotate(-4deg)' },
        '50%': { transform: 'rotate(10deg)' },
      },
      'blink-text-cursor': {
        '0%': { 'border-right-color': 'currentColor' },
        '100%': { 'border-right-color': 'transparent' },
      }
    },
    animation: {
      'wave-hands': 'wave-hands 2.5s linear infinite',
      'blink-text-cursor': 'blink-text-cursor 0.8s linear infinite'
    }
    // },
  },
  plugins: [require("@tailwindcss/typography")],
};
