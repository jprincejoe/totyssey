import React from "react";

type ColorScheme = "default" | "white";

interface MySvgComponentProps extends React.SVGProps<SVGSVGElement> {
  colorScheme?: ColorScheme;
  className?: string;
}

const Logo: React.FC<MySvgComponentProps> = ({
  colorScheme = "default",
  className,
  ...props
}) => {
  const colors = {
    default: {
      "--color-1": "#f79032",
      "--color-2": "#004d77",
      "--color-3": "#70ccda",
    },
    white: {
      "--color-1": "#ffffff",
      "--color-2": "#ffffff",
      "--color-3": "#ffffff",
    },
  };

  const currentColors = colorScheme === "white" ? colors.white : colors.default;

  return (
    <svg
      id="Layer_1"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 612 165.61"
      style={currentColors as React.CSSProperties}
      className={className}
      {...props}
    >
      <defs>
        <style>
          {`.cls-1 { fill: var(--color-1); }
            .cls-2 { fill: var(--color-2); }
            .cls-3 { fill: var(--color-3); }`}
        </style>
      </defs>
      <rect
        className="cls-1"
        x="207.49"
        y="109.15"
        width="123.94"
        height="7.4"
      />
      <rect
        className="cls-1"
        x="397.82"
        y="109.15"
        width="130.7"
        height="7.4"
      />
      <g>
        <polygon
          className="cls-2"
          points="95.83 16.53 71.26 41.1 120.4 41.1 95.83 16.53"
        />
        <polygon
          className="cls-2"
          points="47.46 65 27.34 85.13 67.59 85.13 47.46 65"
        />
        <path
          className="cls-3"
          d="M71.26,44.77v25.67h12.66c0-6.58,5.33-11.91,11.91-11.91s11.91,5.33,11.91,11.91h12.66v-25.67h-49.14Z"
        />
        <path
          className="cls-3"
          d="M27.34,88.13v21.02h10.37c0-5.39,4.37-9.76,9.76-9.76s9.76,4.37,9.76,9.76h10.37v-21.02H27.34Z"
        />
        <rect
          className="cls-1"
          x="71.26"
          y="74.11"
          width="12.66"
          height="74.97"
        />
        <rect
          className="cls-1"
          x="57.22"
          y="112.16"
          width="10.37"
          height="23.6"
        />
        <rect
          className="cls-1"
          x="27.34"
          y="112.16"
          width="10.37"
          height="23.6"
        />
        <polygon
          className="cls-2"
          points="144.2 65 164.33 85.13 124.08 85.13 144.2 65"
        />
        <path
          className="cls-3"
          d="M164.33,88.13v21.02h-10.37c0-5.39-4.37-9.76-9.76-9.76-5.39,0-9.76,4.37-9.76,9.76h-10.37v-21.02h40.25Z"
        />
        <rect
          className="cls-1"
          x="124.08"
          y="112.16"
          width="10.37"
          height="23.6"
          transform="translate(258.52 247.93) rotate(-180)"
        />
        <rect
          className="cls-1"
          x="153.96"
          y="112.16"
          width="10.37"
          height="23.6"
          transform="translate(318.29 247.93) rotate(-180)"
        />
        <rect
          className="cls-1"
          x="107.75"
          y="74.11"
          width="12.66"
          height="74.97"
        />
      </g>
      <g>
        <path
          className="cls-2"
          d="M229.89,102.22h-21.33v-39.47h-15.69v-15.77h52.71v15.77h-15.69v39.47Z"
        />
        <path
          className="cls-2"
          d="M295.84,80.56c0,14.38-12.01,22.72-26.07,22.72s-26.23-8.26-26.23-22.72,12.09-22.72,26.23-22.72,26.07,8.34,26.07,22.72ZM275.82,80.56c0-4.09-2.45-7.6-6.13-7.6s-6.13,3.51-6.13,7.6,2.45,7.6,6.13,7.6,6.13-3.51,6.13-7.6Z"
        />
        <path
          className="cls-2"
          d="M299.36,58.9h4.49v-10.05h20.84v10.05h7.52v14.3h-7.52v11.52c0,3.43,2.53,4.66,5.07,4.66.74,0,1.55-.08,2.21-.16l1.64,11.52c-3.19,1.39-8.58,2.53-13.98,2.53-9.23,0-15.77-3.35-15.77-13.49v-16.59h-4.49v-14.3Z"
        />
        <path
          className="cls-2"
          d="M388.35,58.9v36.45c0,16.67-7.36,23.78-25.5,23.78-16.84,0-21.9-5.39-21.9-11.6,0-4.9,3.27-8.99,9.32-11.03-7.36-.57-11.28-4.74-11.28-11.36v-26.23h20.84v23.46c0,2.29,1.72,4.08,3.84,4.08s3.84-1.8,3.84-4.08v-23.46h20.84ZM367.51,96.66s-7.52,1.06-7.52,6.78c0,2.04.9,3.84,3.51,3.84,3.02,0,4.01-2.04,4.01-4.82v-5.8Z"
        />
        <path
          className="cls-2"
          d="M434.94,88.16c0,10.22-8.17,15.12-21,15.12-7.19,0-14.06-1.96-19.7-4.99l1.88-12.42c3.68,2.45,9.15,4.41,14.71,4.41,2.21,0,3.43-.57,3.43-1.64,0-2.7-18.63,0-18.63-15.61,0-10.3,8.5-15.2,21.33-15.2,6.05,0,11.69,1.39,16.67,3.51l-1.8,11.85c-2.94-1.31-8.25-2.62-11.69-2.62-2.04,0-4.33.08-4.33,1.47,0,3.02,19.12.08,19.12,16.1Z"
        />
        <path
          className="cls-2"
          d="M479.64,88.16c0,10.22-8.17,15.12-21,15.12-7.19,0-14.06-1.96-19.7-4.99l1.88-12.42c3.68,2.45,9.15,4.41,14.71,4.41,2.21,0,3.43-.57,3.43-1.64,0-2.7-18.63,0-18.63-15.61,0-10.3,8.5-15.2,21.33-15.2,6.05,0,11.69,1.39,16.67,3.51l-1.8,11.85c-2.94-1.31-8.25-2.62-11.69-2.62-2.04,0-4.33.08-4.33,1.47,0,3.02,19.12.08,19.12,16.1Z"
        />
        <path
          className="cls-2"
          d="M502.53,85.38c1.8,3.68,6.29,4.66,11.85,4.66,4.17,0,7.93-.9,11.36-2.04l2.12,12.26c-4.98,1.96-11.85,3.02-18.47,3.02-14.06,0-25.74-7.44-25.74-23.21,0-13.57,10.79-22.23,23.46-22.23,18.14,0,24.76,12.01,22.64,27.54h-27.21ZM512.74,75.66c-.41-3.11-1.88-5.72-5.15-5.72-3.43,0-4.99,2.61-5.64,5.72h10.79ZM512.74,75.66h-10.79,10.79Z"
        />
        <path
          className="cls-2"
          d="M584.66,58.9v36.45c0,16.67-7.36,23.78-25.5,23.78-16.84,0-21.9-5.39-21.9-11.6,0-4.9,3.27-8.99,9.32-11.03-7.36-.57-11.28-4.74-11.28-11.36v-26.23h20.84v23.46c0,2.29,1.72,4.08,3.84,4.08s3.84-1.8,3.84-4.08v-23.46h20.84ZM563.82,96.66s-7.52,1.06-7.52,6.78c0,2.04.9,3.84,3.51,3.84,3.02,0,4.01-2.04,4.01-4.82v-5.8Z"
        />
      </g>
    </svg>
  );
};

export default Logo;
