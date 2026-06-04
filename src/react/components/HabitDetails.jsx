import { createPortal } from 'react-dom';

export function HabitDetails({ habit, onDeleteHabit, onDeleteDay }) {
    const headerRoot = document.getElementById('habit-header-root');
    const daysRoot = document.getElementById('days');
    const footerRoot = document.getElementById('habit-footer-root');

    if (!headerRoot || !daysRoot || !footerRoot) {
        return null;
    }

    const progress = habit
        ? Math.min(habit.days.length / habit.target * 100, 100)
        : 0;

    return (
        <>
            {createPortal(
                <header>
                    <h1 className="h1">{habit ? habit.name : ''}</h1>
                    <div className="progress">
                        <div className="progress__text">
                            <p className="progress__name">Progress</p>
                            <p className="progress__percent">{habit ? `${progress.toFixed(0)}%` : ''}</p>
                        </div>
                        <div className="progress__bar">
                            <div className="progress__cover_bar" style={{ width: `${progress}%` }}></div>
                        </div>
                    </div>
                </header>,
                headerRoot
            )}
            {createPortal(
                <>
                    {habit?.days.map((day, index) => (
                        <div className="habit" key={index}>
                            <div className="habit__day">Day {index + 1}</div>
                            <div className="habit__comment">{day.comment}</div>
                            <button className="habit__delete" onClick={() => onDeleteDay(index)}>
                                <img alt={`Delete Day ${index + 1}`} src="svg/Delete.svg" />
                            </button>
                        </div>
                    ))}
                </>,
                daysRoot
            )}
            {createPortal(
                <footer>
                    <button className="del-button" onClick={onDeleteHabit}>Delete habit</button>
                </footer>,
                footerRoot
            )}
        </>
    );
}
