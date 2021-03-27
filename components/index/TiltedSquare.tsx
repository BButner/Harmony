import { motion } from 'framer-motion'
import { FunctionComponent } from 'react'

type TiltedSquareProps = {
  className: string;
  animated?: boolean;
}

export const TiltedSquare: FunctionComponent<TiltedSquareProps> = ({ className, animated }) => {
  if (animated) {
    return (
      <motion.div
        initial={{ rotate: 0 }}
        animate={{ rotate: -12 }}
        className={`${className} absolute w-full h-full transform rounded-xl shadow-2xl`}
      />
    )
  } else return <div
    className={`${className} absolute w-full h-full transform -rotate-12 rounded-xl shadow-2xl`}
  />
}