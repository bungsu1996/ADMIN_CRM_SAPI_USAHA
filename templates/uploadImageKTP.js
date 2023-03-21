import getConfig from 'next/config'
import Image from 'next/image'
import { Button } from 'primereact/button'
import { InputText } from 'primereact/inputtext'
import React from 'react'

const UploadImageKtp = ({ img, savePhoto, disabledPhoto, changeKtp }) => {
  const contextPath = getConfig().publicRuntimeConfig.contextPath;

  const openFile = () => {
    const file = document.getElementById("filesKtp");
    file.click();
  }

  return (
    <div className="grid">
      <div className="col-12">
        <div className="card">
          <div className='flex flex-row'>
            <div className="col-9 lg:col-9 md:col-9 xl:col-9">
              {img == null ? <div className="w-full relative text-center"><Image src={`${contextPath}/assets/images/no_foto.jpg`} className="w-full h-full top-0 left-0" width={256} height={256} widt={'true'} objectFit='full' alt="Default_Image" /></div> : <div className="w-full relative text-center"><Image src={img} alt='ktp' width={790} height={300} objectFit='scale-down' /></div>}
            </div>
            <div className="col-3 lg:col-3 md:col-3 xl:col-3 p-4 align-item-center justify-content-center m-auto">
              <Button className="p-button-raised" onClick={() => openFile()} label='Upload New Ktp'></Button>
              <InputText id="filesKtp" className='mt-2' type='file' style={{ display: "none" }} onChange={(e) => changeKtp(e)} />
              <Button className="p-button-raised p-button-success mt-2" label='Simpan' onClick={() => savePhoto()} disabled={disabledPhoto}></Button>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}

export default UploadImageKtp
