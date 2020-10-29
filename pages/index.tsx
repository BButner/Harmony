import React, { FunctionComponent, useState } from 'react'
import Layout from 'components/layout'
import { CSSTransition } from 'react-transition-group'

const index: FunctionComponent = () => {
  const [visible, setVisible] = useState<boolean>(false)

  return (
    // <div>

    //   <p>This is a test</p>
    //   <input type="checkbox" checked={visible} onChange={(): void => setVisible(!visible)}/>
    //   <button onClick={(): void => console.log(visible)}>Test</button>
      
    //   {/* <CSSTransition in={visible} unmountOnExit classNames="slide-new" timeout={{
    //     exit: 250
    //   }}>
    //     <div className="animation-testing">Test</div>
    //   </CSSTransition> */}
    // </div>
    <Layout pageTitle="Index">
      <p>Testing</p>
      <p>Testing</p>
      <p>Testing</p>
      <p>Testing</p>
      <p>Testing</p>
      <p>Testing</p>
      <p>Testing</p>
      <p>Testing</p>
      <p>Testing</p>
      <p>Testing</p>
      <p>Testing</p>
      <p>Testing</p>
      <p>Testing</p>
      <p>Testing</p>
      <p>Testing</p>
      <p>Testing</p>
      <p>Testing</p>
      <p>Testing</p>
      <p>Testing</p>
      <p>Testing</p>
      <p>Testing</p>
      <p>Testing</p>
      <p>Testing</p>
      <p>Testing</p>
      <p>Testing</p>
      <p>Testing</p>
      <p>Testing</p>
      <p>Testing</p>
      <p>Testing</p>
      <p>Testing</p>
      <p>Testing</p>
      <p>Testing</p>
      <p>Testing</p>
      <p>Testing</p>
      <p>Testing</p>
      <p>Testing</p>
      <p>Testing</p>
      <p>Testing</p>
      <p>Testing</p>
      <p>Testing</p>
      <p>Testing</p>
      <p>Testing</p>
      <p>shit</p>
    </Layout>
  )
}

export default index
