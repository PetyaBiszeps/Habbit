import { useState } from 'react';

const ICONS = ['Sport', 'Water', 'Food'];

export function AddHabitModal({ onAddHabit }) {
    const [isOpen, setIsOpen] = useState(false);
    const [name, setName] = useState('');
    const [target, setTarget] = useState('');
    const [icon, setIcon] = useState('Sport');
    const [errors, setErrors] = useState({});

    function close() {
        setIsOpen(false);
    }

    function handleSubmit(event) {
        event.preventDefault();

        const nextErrors = {
            name: !name,
            target: !target,
        };

        setErrors(nextErrors);

        if (nextErrors.name || nextErrors.target) {
            return;
        }

        onAddHabit({ name, target, icon });
        setName('');
        setTarget('');
        setIcon('Sport');
        setErrors({});
        close();
    }

    return (
        <>
            <button className="menu__add" onClick={() => setIsOpen(true)} type="button">
                <img alt="Add" src="svg/Add.svg" />
            </button>
            <div className={`cover${isOpen ? '' : ' cover_hidden'}`} id="add-habit-popup">
                <div className="popup">
                    <h2>New Habit</h2>
                    <div className="icon-label">Icon</div>
                    <div className="icon-select">
                        {ICONS.map(iconName => (
                            <button
                                className={`icon${icon === iconName ? ' icon_active' : ''}`}
                                data-icon={iconName}
                                key={iconName}
                                onClick={() => setIcon(iconName)}
                                type="button"
                            >
                                <img alt={iconName} src={`svg/${iconName}.svg`} />
                            </button>
                        ))}
                    </div>
                    <form className="popup__form" onSubmit={handleSubmit}>
                        <input
                            className={errors.name ? 'error' : ''}
                            name="name"
                            onChange={event => {
                                setName(event.target.value);
                                setErrors({...errors, name: false});
                            }}
                            placeholder="Name"
                            type="text"
                            value={name}
                        />
                        <input hidden name="icon" placeholder="icon" type="text" value={icon} readOnly />
                        <input
                            className={errors.target ? 'error' : ''}
                            name="target"
                            onChange={event => {
                                setTarget(event.target.value);
                                setErrors({...errors, target: false});
                            }}
                            placeholder="Goal"
                            type="number"
                            value={target}
                        />
                        <button className="button" type="submit">Add</button>
                    </form>
                    <button className="popup__close" onClick={close} type="button">
                        <img alt="Close popup" src="svg/Close.svg" />
                    </button>
                </div>
            </div>
        </>
    );
}
