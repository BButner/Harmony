import React, { Component } from 'react'
import CardGeneric from '../cards/CardGeneric'

type ConfirmationProps = {
  title: string;
  message: string;
  onChangeValue: any;
}

export default class Confirmation extends Component<ConfirmationProps> {
  constructor (props) {
    super(props)
  }

  public render (): JSX.Element {
    return (
      <div className="w-screen h-screen fixed top-0 left-0 flex justify-center align-middle confirmation-card bg-animated">
        <div className="m-auto">
          <CardGeneric>
            <div className="text-center">
              <p className="text-2xl">{this.props.title}</p>
              <p>{this.props.message}</p>
              <div className="flex justify-center mt-10">
                <button className="animated w-32 mr-5 button button-teal" onClick={(): void => this.props.onChangeValue(true)}>Yes</button>
                <button className="animated w-32 button button-red" onClick={(): void => this.props.onChangeValue(false)}>No</button>
              </div>
            </div>
          </CardGeneric>
        </div>
      </div>
    )
  }
}
