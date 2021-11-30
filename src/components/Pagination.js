//Styling
import '../scss/components/Pagination.scss';

//Icons
import { ChevronLeft, ChevronRight } from 'react-feather';

function Pagination({pages, currentPage, onChange}) {

    return (
        <nav className="pagination">
            <p>Page {currentPage} of {pages}</p>
            <button 
                onClick={() => {onChange(currentPage - 1)}} 
                disabled={currentPage === 1}>
                    <ChevronLeft />
            </button>
            <button 
                onClick={() => {onChange(currentPage + 1)}} 
                disabled={currentPage === pages}>
                <ChevronRight />
            </button>
        </nav>
    )
}

export default Pagination;