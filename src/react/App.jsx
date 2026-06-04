export function App() {
    return (
        <div className="app">
            <div className="panel">
                <img alt="App Logo" className="logo" src="svg/Logo.svg" />
                <nav className="menu">
                    <div className="menu__list"></div>
                    <button className="menu__add">
                        <img alt="Add" src="svg/Add.svg" />
                    </button>
                </nav>
            </div>
            <div className="content">
                <div id="habit-header-root"></div>
                <main>
                    <div id="days"></div>
                    <div className="habit">
                        <div className="habit__day">Day 2</div>
                        <form className="habit__form">
                            <input className="input_icon" name="comment" placeholder="Comment" type="text" />
                            <img alt="Comment logo" className="input__icon" src="svg/Comment.svg" />
                            <button className="button" type="submit">Submit</button>
                        </form>
                    </div>
                </main>
                <div id="habit-footer-root"></div>
                <div id="habit-details-react-root"></div>
            </div>
            <div className="cover cover_hidden" id="add-habit-popup">
                <div className="popup">
                    <h2>New Habit</h2>
                    <div className="icon-label">Icon</div>
                    <div className="icon-select">
                        <button className="icon icon_active" data-icon="Sport">
                            <img alt="Sport" src="svg/Sport.svg" />
                        </button>
                        <button className="icon" data-icon="Water">
                            <img alt="Water" src="svg/Water.svg" />
                        </button>
                        <button className="icon" data-icon="Food">
                            <img alt="Food" src="svg/Food.svg" />
                        </button>
                    </div>
                    <form className="popup__form">
                        <input name="name" placeholder="Name" type="text" />
                        <input hidden name="icon" placeholder="icon" type="text" defaultValue="Sport" />
                        <input name="target" placeholder="Goal" type="number" />
                        <button className="button" type="submit">Add</button>
                    </form>
                    <button className="popup__close">
                        <img alt="Close popup" src="svg/Close.svg" />
                    </button>
                </div>
            </div>
        </div>
    );
}
