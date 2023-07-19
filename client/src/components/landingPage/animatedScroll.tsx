import { motion } from "framer-motion";

export default function AnimatedScroll(props: { rotation: number }) {

  return (
    <motion.div
      style={{
        y: 0,
        opacity: props.rotation > 0 ? Math.abs(props.rotation / 4) : 0,
      }}
      className="absolute bottom-24 w-full h-12 md:flex items-center justify-center hidden flex-row  text-GreenishYellow "
    >
      <svg
        width="50"
        height="50"
        viewBox="0 0 1027 2112"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M949.774 1624.08L533.686 2089.74C524.387 2100.14 508.12 2100.2 498.749 2089.86L76.5478 1623.94C59.6754 1605.32 79.8644 1576.77 103.041 1586.48L505.987 1755.26C512.579 1758.02 520.007 1758 526.585 1755.21L923.063 1586.8C946.167 1576.98 966.499 1605.37 949.774 1624.08Z"
          fill="#CBFC01"
          stroke="#CBFC01"
          strokeWidth="3"
        />
        <path
          d="M77.2264 487.369L493.314 21.7162C502.613 11.3092 518.88 11.2526 528.251 21.5945L950.452 487.516C967.325 506.136 947.136 534.679 923.959 524.972L521.013 356.195C514.421 353.434 506.993 353.453 500.415 356.247L103.937 524.657C80.8333 534.47 60.5008 506.087 77.2264 487.369Z"
          fill="#CBFC01"
          stroke="#CBFC01"
          strokeWidth="3"
        />
        <path
          d="M849.146 1052.54C849.146 1239.91 699.034 1391.77 513.899 1391.77C328.763 1391.77 178.651 1239.91 178.651 1052.54C178.651 865.164 328.763 713.299 513.899 713.299C699.034 713.299 849.146 865.164 849.146 1052.54Z"
          fill="#CBFC01"
          stroke="#CBFC01"
          strokeWidth="3"
        />
      </svg>
      <div className="font-teko font-bold text-3xl pt-1 ">SCROLL</div>
    </motion.div>
  );
}
