
import React from 'react';


function Table (props) {

    return (
        <div className='table-section'>    
            <div className='duration'>
                <div className='heading'> <span>Time of Sleep</span>           <span>Wake Up Time</span>
                    <span>Sleep Duration</span>
                </div>
                { props.data.length === 0 ? <p className="no-data" >No Entries</p> : <div className='table-container' >
                    <div className='days' style= { {height: `calc(14.2% * ${props.data.length})` }}>
                        {props.data.map((entry, index) => {
                            return (
                                <span key={index}>{new Date(entry.date).getMonth() + 1}/{new Date(entry.date).getDate()}</span>
                            );
                        })}
                        
                    </div>
                    <div className='table' style={ {height: `calc(14.2% * ${props.data.length})` }} >
                        <table cellSpacing='0'>
                            <tbody>
                                {props.data.map((item, index) => {
                                    return (
                                        <tr width="100" key={index}>
                                            <td align="center" height="30" width="100">
                                                {('0'+ new Date(item.sleepTime).getHours()).slice(-2)}:{('0'+ new Date(item.sleepTime).getMinutes()).slice(-2)}
                                            </td>
                                            <td align="center" height="30" width="100">
                                                {('0'+ new Date(item.wakeUpTime).getHours()).slice(-2)}:{('0'+new Date(item.wakeUpTime).getMinutes()).slice(-2)}
                                            </td>
                                            <td align="center" height="30" width="100">{Number.isInteger(item.timeElapsed) ? item.timeElapsed : item.timeElapsed.toFixed(2)} HRS</td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
              </div>}

            </div>
        </div>
    )
}
export default Table ;