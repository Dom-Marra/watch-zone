import '../scss/components/Loader.scss';

function Loader() {
    return (
        <svg className="loader" viewBox="0 0 100 100">
            <circle className="outer-circle" cx="50%" cy="50%" r="45"></circle>
            <circle className="middle-circle" cx="50%" cy="50%" r="30"></circle>
            <circle className="inner-circle" cx="50%" cy="50%" r="15"></circle>
            
        </svg>
    )
}

export default Loader;