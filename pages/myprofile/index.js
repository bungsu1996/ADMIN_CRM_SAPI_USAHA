import { Button } from 'primereact/button'
import { Dropdown } from 'primereact/dropdown'
import { FileUpload } from 'primereact/fileupload'
import { InputText } from 'primereact/inputtext'
import { InputTextarea } from 'primereact/inputtextarea'
import { Toast } from 'primereact/toast'
import React, { useEffect, useRef, useState } from 'react'
import "./index.module.css";
import { useRouter } from 'next/router'
import UploadImage from "./../../templates/upload";

const MyProfile = () => {
  const router = useRouter();
  const toast = useRef();
  const [imageProfile, setImageProfile] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const [useId, setUseId] = useState("");
  const [namaAwal, setNamaAwal] = useState("");
  const [namaAkhir, setNamaAkhir] = useState("");
  const [provinsi, setProvinsi] = useState("");
  const [kota, setKota] = useState("");
  const [kecamatan, setKecamatan] = useState("");
  const [kelurahan, setKelurahan] = useState("");
  const [rw, setRw] = useState("");
  const [rt, setRt] = useState("");
  const [kodePos, setKodePos] = useState("");
  const [alamat, setAlamat] = useState("");
  const [roleCheck, setRoleCheck] = useState(1);
  const [adminStatus, setAdminStatus] = useState(1);
  const roleChecks = [
    { name: 'Users'.toUpperCase(), code: 0 },
    { name: 'Investors'.toUpperCase(), code: 1 },
    { name: 'Basic Admins'.toUpperCase(), code: 2 },
    { name: 'Super Admins'.toUpperCase(), code: 3 },
  ];
  const statusAdmins = [
    { name: 'Tidak Aktif', code: 0 },
    { name: 'Aktif', code: 1 },
  ];

  useEffect(() => {
    setUseId("0000892636216");
    setNamaAwal("Muhammad Hamzah Sya'bani");
    setNamaAkhir("Abdul Jabbar Ruswendi Sudirman");
    setProvinsi("Jawa Barat");
    setKota("Kota Bandung");
    setKecamatan("Coblong");
    setKelurahan("Lebakgede");
    setRw("03");
    setRt("03");
    setAlamat("Sekeloa Tengah");
    setKodePos("40132");
  }, []);

  const changeRegex = (e) => {
    const re = /^[0-9\b]+$/;
    const target = e.target.value;
    const id = e.target.id;
    if (target === '' || re.test(target)) {
      if (id === "kodePos") {
        setKodePos(target)
      } else if (id === "rw") {
        setRw(target)
      } else if (id === "rt") {
        setRt(target)
      }
    }
  }

  const onImageUpload = (e) => {
    const file = e.target.files[0];
    setImageProfile(file)
    setImagePreview(URL.createObjectURL(file))
  }

  const onSubmit = () => {
    console.log(imageProfile, "imageProfile")
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
          {/* INI UNTUK FOTO PROFILE ADMIN */}
          <div className="flex flex-column align-items-center justify-content-center h-22rem mb-3 py-2">
            {/* <div className="border-circle w-14rem h-14rem bg-yellow-500 text-gray-900 font-bold flex align-items-center justify-content-center"> */}
              {/* UNTUK FOTO PROFILE */}
              <UploadImage onChange={(e) => onImageUpload(e)} img={imagePreview} />
            {/* </div> */}
          </div>
          {/* FORM PARENT */}
          <div className="p-fluid formgrid grid">
            {/* FORM DEFAULT UNTUK ROLE CHECK */}
            <div className="field col-12 md:col-3">
              <label htmlFor="roleCheck">Role Check <span className="font-medium text-red-500">(*)</span></label>
              <Dropdown className='font-semibold p-invalid' id="roleCheck" value={roleCheck} onChange={(e) => setRoleCheck(e.value)} options={roleChecks} optionValue='code' optionLabel="name" disabled={true}></Dropdown>
            </div>
            {/* FORM DEFAULT UNTUK ROLE CHECK ID */}
            <div className="field col-12 md:col-6">
              <label htmlFor="roleId">Role Check ID <span className="font-medium text-red-500">(*)</span></label>
              <InputText className='font-semibold p-invalid' id="roleId" type="text" onChange={(e) => setUseId(e.value)} value={useId} disabled={true} />
            </div>
            {/* FORM DEFAULT UNTUK ROLE CHECK STATUS */}
            <div className="field col-12 md:col-3">
              <label htmlFor="roleStatus">Role Check Status <span className="font-medium text-red-500">(*)</span></label>
              <Dropdown className='font-semibold p-invalid' id="roleStatus" value={adminStatus} onChange={(e) => setAdminStatus(e.value)} options={statusAdmins} optionValue='code' optionLabel="name" disabled={true}></Dropdown>
            </div>
            {/* FORM UNTUK NAMA AWAL */}
            <div className="field col-12 md:col-6">
              <label htmlFor="namaAwal">Nama Awal</label>
              <InputText id="namaAwal" type="text" value={namaAwal} />
            </div>
            {/* FORM UNTUK NAMA AKHIR */}
            <div className="field col-12 md:col-6">
              <label htmlFor="namaAkhir">Nama Akhir</label>
              <InputText id="namaAkhir" type="text" value={namaAkhir} />
            </div>
            {/* FORM UNTUK NAMA PROVINSI */}
            <div className="field col-12 md:col-4">
              <label htmlFor="provinsi">Provinsi</label>
              <InputText id="provinsi" type="text" value={provinsi} />
            </div>
            {/* FORM UNTUK NAMA KOTA/ KABUPATEN */}
            <div className="field col-12 md:col-4">
              <label htmlFor="kota">Kota/ Kabupaten</label>
              <InputText id="kota" type="text" value={kota} />
            </div>
            {/* FORM NAMA KECAMATAN */}
            <div className="field col-12 md:col-4">
              <label htmlFor="kecamatan">Kecamatan</label>
              <InputText id="kecamatan" type="text" value={kecamatan} />
            </div>
            {/* FORM NAMA KELURAHAN */}
            <div className="field col-12 md:col-4">
              <label htmlFor="kelurahan">Kelurahan</label>
              <InputText id="kelurahan" type="text" value={kelurahan} />
            </div>
            {/* FORM NOMER RW */}
            <div className="field col-12 md:col-2">
              <label htmlFor="rw">RW</label>
              <InputText id="rw" type='text' maxLength="5" onChange={(e) => changeRegex(e)} value={rw} />
            </div>
            {/* FORM NOMER RT */}
            <div className="field col-12 md:col-2">
              <label htmlFor="rt">RT</label>
              <InputText id="rt" type='text' maxLength="5" onChange={(e) => changeRegex(e)} value={rt} />
            </div>
            {/* FORM KODE POS */}
            <div className="field col-12 md:col-4">
              <label htmlFor="kodePos">Kode POS</label>
              <InputText id="kodePos" type='text' maxLength="5" onChange={(e) => changeRegex(e)} value={kodePos} />
            </div>
            {/* FORM ALAMAT LENGKAP */}
            <div className="field col-12">
              <label htmlFor="alamat">Alamat Lengkap</label>
              <InputTextarea id="alamat" rows="4" value={alamat} />
            </div>
            {/* FORM ALAMAT LENGKAP */}
            <div className="field col-12">
              <label htmlFor="alamat">Upload KTP</label>
              <InputTextarea id="alamat" rows="4" />
            </div>
            {/* BUTTON UNTUK ACTION FORM EDIT ATAU DETAIL */}
            <div className='field flex flex-row col-12 md:col-3 mx-auto'>
              <Button label="Cancel" icon="pi pi-times-circle" className="p-button-raised p-button-danger mr-2" onClick={() => router.back()}></Button>
              <Button label="Save" icon="pi pi-pencil" className="p-button-raised" onClick={() => onSubmit()}></Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MyProfile
