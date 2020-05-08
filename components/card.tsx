import React, { Component } from 'react'

type CardProps = {
    children: any,
    title: string,
    subtitle?: string,
    size: number,
    className?: string
}

export default class Card extends Component<CardProps, {}> {
    private getCardSizeClasses (size: Number): string {
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

    public render (): JSX.Element {
        return (
            <>
                <div className={`card rounded-card p-8 soft-shadow bg-white ${this.props.className}`}>
                    <div className={'text-center font-bold tracking-wide ' + this.getCardSizeClasses(this.props.size)}>
                        <p>{this.props.title}</p>
                        {this.props.subtitle && <p className='text-sm font-normal text-gray-600'>{this.props.subtitle}</p>}
                    </div>
                    <div className="card-body p-2">
                        {this.props.children}
                    </div>
                </div>
            </>
        )
    }
}