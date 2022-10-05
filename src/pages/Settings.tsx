import React from "react"
import TypeBar from '../components/TypeBar'

const Settings = () => {
    const checkDelayCollDelete = JSON.parse(localStorage.getItem('delayCollDelete')!)


    
    const delayCollDelete = () => {
        if (localStorage.getItem('delayCollDelete') === 'false'|| localStorage.getItem('delayCollDelete') === null) {
            localStorage.setItem('delayCollDelete', 'true')
        } else localStorage.setItem('delayCollDelete', 'false')
    }



    return (
        <div>
            <TypeBar />
            <div className='sett_parent'>
                <div className='sett'>
                    <div className='sett_one_row_titel'>
                        Settings
                    </div>
                    <div className='sett_row'>
                        <input
                            className="settings_input"
                            style={{ cursor: 'pointer' }}
                            type="checkbox"
                            value="checked"
                            onClick={() => delayCollDelete()}
                            defaultChecked={checkDelayCollDelete}
                        />
                        <p className="settings_text">Задержка при удалении коллекции</p>
                    </div>
                </div>
            </div>
        </div>

    )
}


export default Settings

