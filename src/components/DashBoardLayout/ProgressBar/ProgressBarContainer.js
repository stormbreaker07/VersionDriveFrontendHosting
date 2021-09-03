import classes from './ProgressBarContainer.module.css';
import ProgressBar from '../ProgressBar/ProgressBar';
const ProgressBarContainer = () => {

    return (
        <div className={classes.barContainer}>
            <ProgressBar percentage="40" />
        </div>
    )
}

export default ProgressBarContainer;