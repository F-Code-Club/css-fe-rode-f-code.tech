import { useEffect, useState } from 'react';

import moment from 'moment';

const useCountdown = (minutes) => {
    const [countdownValue, setCountdownValue] = useState(0);
    const [minute, setMinute] = useState();
    const [second, setSecond] = useState();

    useEffect(() => {
        // let future = localStorage.getItem('countdownFuture');
        //
        // if (future) {
        //     future = moment(future);
        // } else {
        let future = moment().add(minutes, 'minutes');
        localStorage.setItem('countdownFuture', future.toString());
        // }
        const intervalId = setInterval(() => {
            const now = moment();
            const diff = moment.duration(future.diff(now));
            const totalMinutes = diff.asMinutes();
            const minutes = Math.floor(totalMinutes);
            const seconds = Math.floor((totalMinutes - minutes) * 60);
            const value = `${minutes.toString().padStart(3, '0')}:${seconds
                .toString()
                .padStart(2, '0')}`;
            setCountdownValue(value);
            setMinute(minutes);
            setSecond(seconds);
        }, 1000);

        return () => {
            clearInterval(intervalId);
        };
    }, [minutes]);
    return [minute, second, countdownValue];
};

export { useCountdown };
