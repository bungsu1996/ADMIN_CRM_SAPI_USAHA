import React, { useEffect, useState } from 'react'

const Informasi = (props) => {
  const [date, setDate] = useState(null);

  const dateTimeNow = () => {
    let x = new Date(Date.now()).toString();
    setDate(x);
  }
  useEffect(() => {
    dateTimeNow();
  }, []);

  return (
    <ul className="p-0 mx-0 mt-0 mb-4 list-none">
      <li className="flex align-items-center py-2 border-bottom-1 surface-border">
        <div className="w-3rem h-3rem flex align-items-center justify-content-center bg-blue-100 border-circle mr-3 flex-shrink-0">
          <i className="pi pi-dollar text-xl text-blue-500" />
        </div>
        <div className='w-full'>
          <div className="flex-column">
            <span className="text-900 line-height-3">
              {props.info}
            </span>
          </div>
          <div className="flex-column text-right text-sm text-400">
            <span className="line-height-3">{props.date.toString()}</span>
          </div>
        </div>
      </li>
    </ul>
  )
}

export default Informasi