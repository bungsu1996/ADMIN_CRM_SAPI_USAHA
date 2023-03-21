import getConfig from 'next/config'
import Image from 'next/image'
import { Button } from 'primereact/button'
import { InputText } from 'primereact/inputtext'
import React from 'react'

const UploadImage = ({ img, savePhoto, disabledPhoto, ...rest }) => {
  const contextPath = getConfig().publicRuntimeConfig.contextPath;

  return (
    <div>
      {img == null ? <div className="w-full relative border-circle text-center" style={{border: "1px solid"}}><Image src={`${contextPath}/assets/images/no_foto.jpg`} className="border-circle w-full h-full top-0 left-0" width={256} height={256} widt={'true'} objectFit='cover' alt="Default_Image" /></div> : <div className="w-full relative text-center"><Image className='border-circle w-full h-full top-0 left-0' src={img} alt='preview' width={256} height={256} objectFit='cover' /></div>}
      <div className='field md:w-full mt-5 text-center'>
        <Button className="p-button-raised">
          <label htmlFor="files" style={{ cursor: "pointer" }}>Foto Baru</label>
        </Button>
        <Button className="p-button-raised p-button-success ml-2" label='Simpan' onClick={() => savePhoto()} disabled={disabledPhoto}></Button>
      </div>
      <InputText id="files" className='mt-2' type='file' {...rest} style={{ visibility: "hidden" }} />
    </div>
  )
}

export default UploadImage
