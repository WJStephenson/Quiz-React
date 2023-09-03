//loading animated icon

import './Loading.css'

function Loading() {
    return (
        <div className='loading-container'>
            <div className="lds-spinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
        </div>
    )
}

export default Loading