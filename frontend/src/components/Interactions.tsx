import React from 'react'

const handleAmount = (amount: number) => {
    if (amount >= 1000000) {
        const text = Math.floor(amount / 1000000)
        return text + 'M'
    }
    if (amount >= 1000) {
        const text = Math.floor(amount / 1000)
        return text + 'K'
    }
    return amount;
}

import like from '../assets/like.png'
import voidLike from '../assets/void_like.png'
type Props = {
    state?: boolean,
    amount: number,
    func: () => void;
    extraClass?: string;
}
export function Like({ amount, state, func, extraClass }: Props) {
    const amountFormat = handleAmount(amount);
    return (
        <button className={`btn interaction ${extraClass}`} onClick={() => { func();; }}>
            {state ? (
                <img src={like} />
            ) : (<img src={voidLike} />)}
            <span className='ml-2'>
                {amountFormat}
            </span>
        </button>
    )
}

import mark from '../assets/mark.png'
import marked from '../assets/markEd.png'
export function Mark({ amount, state, func, extraClass }: Props) {
    const amountFormat = handleAmount(amount);

    return (
        <button className={`btn interaction ${extraClass}`} onClick={() => { func();; }}>
            {state ? (
                <img src={marked} />
            ) : (<img src={mark} />)}
            <span className='ml-2'>
                {amountFormat}
            </span>
        </button>
    )
}

import commentIcon from '../assets/comments.svg'
export function Comments({ amount, func, extraClass }: Props) {
    const amountFormat = handleAmount(amount);

    return (
        <button className={`btn interaction ${extraClass}`} onClick={() => { func();; }}>
            <img src={commentIcon} />
            <span className='ml-2'>
                {amountFormat}
            </span>
        </button>
    )
}
import report from '../assets/void_report.png'
import reported from '../assets/report.png'
export function Reports({ amount, func, extraClass }: Props) {
    const amountFormat = handleAmount(amount);

    return (
        <button className={`btn interaction ${extraClass}`} onClick={() => { func();; }}>
            <img src={report} />
            <span className='ml-2'>
                {amountFormat}
            </span>
        </button>
    )
}
