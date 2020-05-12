import React, { Component } from 'react'
import Card from '../card'

type ConfirmationProps = {
  title: string,
  message: string,
  onChangeValue: any
}

export default class Confirmation extends Component<ConfirmationProps> {
  constructor(props) {
    super(props)
  }

  public render(): JSX.Element {
    return (
      <div className="w-screen h-screen fixed top-0 left-0 flex justify-center align-middle" style={{ backgroundColor: 'rgba(0, 0, 0, .5)' }}>
        <div className="m-auto">
          <Card>
            <div className="text-center">
              <p className="text-2xl">{this.props.title}</p>
              <p>{this.props.message}</p>
              <div className="flex justify-center mt-10">
                <button className="bg-teal-500 text-white hover:bg-teal-700 rounded pt-1 pb-1 pl-5 pr-5 animated w-32 mr-5" onClick={() => this.props.onChangeValue(true)}>Yes</button>
                <button className="bg-red-500 text-white hover:bg-red-700 rounded pt-1 pb-1 pl-5 pr-5 animated w-32" onClick={() => this.props.onChangeValue(false)}>No</button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    )
  }
}