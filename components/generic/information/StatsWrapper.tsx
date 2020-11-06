import React, { FunctionComponent } from 'react'

type StatsWrapperProps = {
  className?: String;
}

const StatsWrapper: FunctionComponent<StatsWrapperProps> = ({ className, children }) => {
  return (
    <div className="bg-purple-100 text-purple-700 text-center p-2 rounded-std-sm">
      {children}
    </div>
  )
}

export default StatsWrapper