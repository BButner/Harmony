import React, { Component } from 'react'

type CardProps = {
  children: any,
  className?: string,
  title?: string
}

export default class Card extends Component<CardProps, {}> {
  private getCardSizeClasses(size: Number): string {
    switch (size) {
      case 1:
        return 'pt-2 pb-5'
        break;
      case 2:
        return 'pt-4 pb-10 text-xl'
        break;
      case 3:
        return 'pt-6 pb-20 text-2xl'
        break;
      default:
        return 'pt-1 pb-1'
        break;
    }
  }

  public render(): JSX.Element {
    return (
      <div className={`bg-white border border-bluegrey-300 p-10 rounded-card ${this.props.className}`}>
        {this.props.title && <p className="text-2xl text-center mb-10">{this.props.title}</p>}
        {this.props.children}
      </div>
    )
  }
}