import React, { Component } from 'react'

type CardProps = {
  children: any;
  className?: string;
  title?: string;
}

export default class Card extends Component<CardProps, {}> {
  public render (): JSX.Element {
    return (
      // <div className={`bg-white border border-bluegrey-300 p-10 rounded-card ${this.props.className}`}>
      //   {this.props.title && <p className="text-2xl text-center mb-10">{this.props.title}</p>}
      //   {this.props.children}
      // </div>
      <div className={`bg-white p-10 soft-shadow ${this.props.className}`}>
        {this.props.title && <p className="text-2xl text-center mb-10">{this.props.title}</p>}
        {this.props.children}
      </div>
    )
  }
}
