import React, { useEffect, useState } from 'react'
import { Number } from './Number'
import { Word } from './Word'

export const Countdown = ({ tgt = 600000, event, countDownData }) => {
    console.log(countDownData)
    // const [millis, setMillis] = useState(0);
    // const [seconds, setSeconds] = useState(0);
    // const [hours, setHours] = useState(0);

    // const [time, setTime] = useState(tgt);

    // useEffect(() => {
    //     const interval = setInterval(() => {

    //         setTime(time => {

    //             if (time < 0) {
    //                 clearInterval(interval);
    //                 setMillis(0);
    //                 setSeconds(0);
    //                 setHours(0);
    //                 event();
    //                 return 0;
    //             } else {
    //                 setMillis(time % 99);
    //                 setSeconds(Math.floor((time / 1000) % 60));
    //                 setHours(Math.floor(time / 1000 / 60));
    //                 return time - 60;
    //             }

    //         });
    //     }, 60);

    //     return e => clearInterval(interval);

    // }, []);

    // const addTime = ()=> {
    //     alert("You have to capture a picture before the earth is destroyed!");
    // }

    return (
        <div className='clock'>

            <div className='countdown'>
                <Number value={countDownData?.minutes} />
                <Word value={':'} />
                <Number value={countDownData?.seconds} />
                <Word value={':'} />
                <Number value={countDownData?.millis} />
            </div>

            {/* <button onClick={e=>addTime()}>Start the count!</button> */}

        </div>
    )
}
