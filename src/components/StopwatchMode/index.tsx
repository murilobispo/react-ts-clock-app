import { useEffect, useState } from "react"
import styles from './StopwatchMode.module.css'
import Clock from "../Clock"
import ClockOptions from "../ClockOptions"

function StopwatchMode () {

    document.title = 'Clock App'
    const [startSW, setStartSW] = useState<boolean>(false)
    const [milliseconds, setMilliseconds] = useState<number>(0)
    const [seconds, setSeconds]           = useState<number>(0)
    const [minutes, setMinutes]           = useState<number>(0)
    const [hours, setHours]               = useState<number>(0)

    useEffect(() => {
        const timerId = setInterval(() => {
            if (startSW){
                if (milliseconds + 10 < 1000 )  {
                    setMilliseconds(prevMilliseconds => prevMilliseconds + 10)
                } else  {
                    setMilliseconds(0)
                    if (seconds + 1 < 60) {
                        setSeconds(prevSeconds => prevSeconds + 1)
                    } else {
                        setSeconds(0)
                        if (minutes + 1 < 60){
                            setMinutes(prevMinutes => prevMinutes + 1)
                        } else {
                            setMinutes(0)
                            setHours(prevHours => prevHours + 1)
                        }
                    }
                }
            }
        }, 10)
        
        return () => clearInterval(timerId)
      }, [startSW, milliseconds])

    const handleStartButtonClick = () => {
        setStartSW(!startSW)
    };

    const handleResetButtonClick = () => {
        setStartSW(false)
        setHours(0)
        setMinutes(0)
        setSeconds(0)
        setMilliseconds(0)
    };
    return(
        <>
            <Clock>
                <ul onClick={handleStartButtonClick} className={styles.SWList}>
                    {!!hours && (
                    <li className={styles.SWListItem}>
                            <p>{hours}</p>
                            <p className={styles.TimeAbbr}>h</p>
                        </li>
                    )}
                    {(!!minutes || !!hours) &&(
                        <li className={styles.SWListItem}>
                            <p>
                                { minutes < 10 && !!hours
                                ? '0' + minutes
                                :minutes
                                }
                            </p>
                            <p className={styles.TimeAbbr}>m</p>
                        </li>
                    )}
                    <li className={styles.SWListItem}>
                        <p>
                            { (seconds < 10) && (!!minutes || !!hours)
                            ? '0' + seconds
                            : seconds
                            }
                        </p>
                        <p className={styles.TimeAbbr}>s</p>
                    </li>
                    <li className={styles.SWListItem}>
                        <p className={`${styles.TimeAbbr} ${styles.MillisecStyle}`}>
                            { milliseconds.toString().length < 2
                            ? '0' + milliseconds.toString().substring(0,2)
                            : milliseconds.toString().substring(0,2)
                            }
                        </p>
                    </li>
                </ul>
            </Clock>
            <ClockOptions>
                <p 
                    onClick={handleStartButtonClick} 
                    className={`${styles.SWButton} ${startSW && styles.SWButtonActivate}`}
                >
                    {startSW ? 'Pause' : 'Start'}
                </p>
                <p 
                    onClick={handleResetButtonClick} 
                    className={styles.SWButton}
                >
                    Reset
                </p>
            </ClockOptions>
        </>
    )
}

export default StopwatchMode