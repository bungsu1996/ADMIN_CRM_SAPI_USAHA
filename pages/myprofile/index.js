import { Button } from 'primereact/button'
import { Dropdown } from 'primereact/dropdown'
import { FileUpload } from 'primereact/fileupload'
import { InputText } from 'primereact/inputtext'
import { InputTextarea } from 'primereact/inputtextarea'
import { Toast } from 'primereact/toast'
import React, { useRef, useState } from 'react'
import "./index.module.css";

const MyProfile = () => {
  const [dropdownItem, setDropdownItem] = useState(null);
  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [status, setStatus] = useState("");
  const toast = useRef();
  const dropdownItems = [
    { name: 'Option 1', code: 'Option 1' },
    { name: 'Option 2', code: 'Option 2' },
    { name: 'Option 3', code: 'Option 3' }
  ];

  const onUpload = (e) => {
    console.log(e.files, "e")
    toast.current.show({ severity: 'info', summary: 'Success', detail: 'File Uploaded', life: 3000 });
  };

  const ImgUpload = ({ onChange, src }) =>
    <label htmlFor="photo-upload" className="custom-file-upload fas">
      <div className="img-wrap img-upload" style={{ position: "relative", width: "200px", height: "200px", overflow: "hidden", borderRadius: "50%" }}>
        {/* <div className="border-circle w-14rem h-14rem bg-yellow-500 text-gray-900 font-bold flex align-items-center justify-content-center"> */}
          <img htmlFor="photo-upload" src={src} />
        {/* </div> */}
      </div>
      <input id="photo-upload" type="file" onChange={onChange} />
    </label>

  const photoUpload = e => {
    e.preventDefault();
    const reader = new FileReader();
    const file = e.target.files[0];
    reader.onloadend = () => {
      setImage(reader.result);
    }
    reader.readAsDataURL(file);
  }

  return (
    <div className="grid">
      <Toast ref={toast} />
      <div className="col-12" style={{ border: "1px solid" }}>
        <div className="card">
          <span className="text-3xl font-semibold">My Profile</span>

        </div>
      </div>
      <div className='col-12' style={{ border: "1px solid" }}>
        <div className="card">
          <div className="flex flex-column align-items-center justify-content-center h-auto mb-3 py-2" style={{ border: "1px solid" }}>
            <div className="border-circle w-14rem h-14rem bg-yellow-500 text-gray-900 font-bold flex align-items-center justify-content-center">
              <ImgUpload onChange={photoUpload} src={image} />
            </div>
            <div className="mt-2 w-14rem h-14rem">
              {/* <Edit onSubmit={handleSubmit}>
                <ImgUpload onChange={photoUpload} src={image} />
                <Name onChange={editName} value={name} />
                <Status onChange={editStatus} value={status} />
              </Edit> */}
              {/* <FileUpload chooseLabel="Upload" mode="advanced" url="./upload.php" multiple={false} accept="image/*" maxFileSize={1000000} onSelect={(e) => onUpload(e)} /> */}
            </div>
          </div>
          <div className="p-fluid formgrid grid">
            <div className="field col-12 md:col-6">
              <label htmlFor="firstname2">Nama Awal</label>
              <InputText id="firstname2" type="text" />
            </div>
            <div className="field col-12 md:col-6">
              <label htmlFor="lastname2">Nama Akhir</label>
              <InputText id="lastname2" type="text" />
            </div>
            <div className="field col-12">
              <label htmlFor="address">Alamat Lengkap</label>
              <InputTextarea id="address" rows="4" />
            </div>
            <div className="field col-12 md:col-4">
              <label htmlFor="city">Provinsi</label>
              <InputText id="city" type="text" />
            </div>
            <div className="field col-12 md:col-4">
              <label htmlFor="city">Kota/ Kabupaten</label>
              <InputText id="city" type="text" />
            </div>
            <div className="field col-12 md:col-4">
              <label htmlFor="city">Kecamatan</label>
              <InputText id="city" type="text" />
            </div>
            <div className="field col-12 md:col-4">
              <label htmlFor="city">Kelurahan</label>
              <InputText id="city" type="text" />
            </div>
            <div className="field col-12 md:col-2">
              <label htmlFor="city">RW</label>
              <InputText id="city" type="number" />
            </div>
            <div className="field col-12 md:col-2">
              <label htmlFor="city">RT</label>
              <InputText id="city" type="number" />
            </div>
            <div className="field col-12 md:col-4">
              <label htmlFor="zip">Kode POS</label>
              <InputText id="zip" type="number" maxLength="5" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MyProfile
