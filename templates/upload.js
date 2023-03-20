import { Button } from 'primereact/button'
import { InputText } from 'primereact/inputtext'
import React from 'react'

const UploadImage = ({ img, ...rest }) => {
  return (
    <div>
      {img == null ? <div className="border-circle w-16rem h-16rem bg-gray-500 text-gray-900 font-bold flex align-items-center justify-content-center mx-auto">No Foto</div> : <img className='border-circle preview w-16rem h-16rem block mx-auto' src={img} alt='preview' style={{ objectFit: "cover" }} />}
      { }
      <div className='field md:w-full mt-4 text-center'>
        <Button className="p-button-raised">
          <label htmlFor="files" style={{ cursor: "pointer" }}>Foto Baru</label>
        </Button>
      </div>
      <InputText id="files" className='mt-2' type='file' {...rest} style={{ visibility: "hidden" }} />
    </div>
  )
}

export default UploadImage
