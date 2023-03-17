import getConfig from 'next/config';
import { Button } from 'primereact/button';
import { Chart } from 'primereact/chart';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Menu } from 'primereact/menu';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { ProductService } from '../../demo/service/ProductService';
import { Toast } from 'primereact/toast';
import { LayoutContext } from '../../layout/context/layoutcontext';
import Link from 'next/link';
import { FaUsers } from 'react-icons/fa';
import { FcDataProtection } from 'react-icons/fc';
import { GiCow, GiMoneyStack, GiPayMoney, GiCardboardBox } from 'react-icons/gi';
import { GrUserAdmin } from 'react-icons/gr';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { CustomerService } from '../../demo/service/CustomerService';
import Informasi from './widgets/Informasi';
import moment from 'moment/moment';
import 'moment/locale/id';
moment.locale('id')

let dates = moment().format("dddd, MMMM Do YYYY, h:mm:ss a");
const informasiData = [
  { id: 1, info: "Pembelian Sapi Limousin 2 Ekor", date: dates },
  { id: 2, info: "Pembelian Sapi Anak 6 Ekor", date: dates },
  { id: 3, info: "Vaksin Sapi Pmk", date: dates },
  { id: 4, info: "Penimbangan Bulanan", date: moment("3/14/2023", "MM/DD/YYYY").format("dddd, MMMM Do YYYY, h:mm:ss a") },
  { id: 5, info: "Penjualan Bibit", date: moment("3/15/2023", "MM/DD/YYYY").format("dddd, MMMM Do YYYY, h:mm:ss a") },
];

const kalkulasiSapiTerjual = [
  { id: 1, jenis: "Simental", level: "Super", count: 1 },
  { id: 2, jenis: "Marlboro", level: "Super", count: 1 },
  { id: 3, jenis: "Limousin", level: "Super", count: 1 },
  { id: 4, jenis: "Simental", level: "Super", count: 1 },
  { id: 5, jenis: "Simental", level: "Super", count: 1 },
  { id: 6, jenis: "Marlboro", level: "Super", count: 1 },
  { id: 7, jenis: "Pegon", level: "Premium", count: 1 },
  { id: 8, jenis: "Brangus", level: "Basic", count: 1 },
  { id: 9, jenis: "Simental", level: "Super", count: 1 },
  { id: 10, jenis: "Brahman", level: "Super", count: 1 },
  { id: 11, jenis: "Brahman", level: "Super", count: 1 },
  { id: 12, jenis: "Pegon", level: "Premium", count: 1 },
  { id: 13, jenis: "Pegon", level: "Premium", count: 1 },
  { id: 14, jenis: "Brahman", level: "Super", count: 1 },
  { id: 15, jenis: "Simental", level: "Super", count: 1 },
  { id: 16, jenis: "Brahman", level: "Super", count: 1 },
  { id: 17, jenis: "Limousin", level: "Super", count: 1 },
];

const Homes = () => {
  const [products, setProducts] = useState(null);
  const menu1 = useRef(null);
  const menu2 = useRef(null);
  const [lineOptions, setLineOptions] = useState(null);
  const { layoutConfig } = useContext(LayoutContext);
  const contextPath = getConfig().publicRuntimeConfig.contextPath;
  const [DialogPlusNotif, setDialogPlusNotif] = useState(false);
  const [DialogMinusNotif, setDialogMinusNotif] = useState(false);
  const [customers3, setCustomers3] = useState([]);
  const [infoData, setInfoData] = useState([]);
  const [kalJmlSapi, setKalJmlSapi] = useState([]);
  const toast = useRef();

  const customerService = new CustomerService();
  const productService = new ProductService();

  const applyLightTheme = () => {
    const lineOptions = {
      plugins: {
        legend: {
          labels: {
            color: '#495057'
          }
        }
      },
      scales: {
        x: {
          ticks: {
            color: '#495057'
          },
          grid: {
            color: '#ebedef'
          }
        },
        y: {
          ticks: {
            color: '#495057'
          },
          grid: {
            color: '#ebedef'
          }
        }
      }
    };

    setLineOptions(lineOptions);
  };

  const applyDarkTheme = () => {
    const lineOptions = {
      plugins: {
        legend: {
          labels: {
            color: '#ebedef'
          }
        }
      },
      scales: {
        x: {
          ticks: {
            color: '#ebedef'
          },
          grid: {
            color: 'rgba(160, 167, 181, .3)'
          }
        },
        y: {
          ticks: {
            color: '#ebedef'
          },
          grid: {
            color: 'rgba(160, 167, 181, .3)'
          }
        }
      }
    };

    setLineOptions(lineOptions);
  };

  useEffect(() => {
    productService.getProductsSmall().then((data) => setProducts(data));
    customerService.getCustomersMedium().then((data) => setCustomers3(data));
    setInfoData(informasiData);
    validateKalJmlSapi();
  }, []);

  const validateKalJmlSapi = () => {
    let data = kalkulasiSapiTerjual;
    let hasilKal = [];
    let helper = {};
    let result = data.reduce(function (r, o) {
      let key = o.jenis;
      if (!helper[key]) {
        helper[key] = Object.assign({}, o);
        r.push(helper[key]);
      } else {
        helper[key].count++;
      }
      return r;
    }, []);

    let sapiKal = 0;
    let warna = "";
    for (let i = 0; i < result.length; i++) {
      sapiKal = 0;
      warna = "";
      if (result[i].count >= 1) {
        sapiKal += Math.floor((result[i].count / result.length) * 100);
        warna += sapiKal >= 88 ? "green" : sapiKal < 88 && sapiKal >= 70 ? "cyan" : sapiKal < 70 && sapiKal >= 50 ? "yellow" : "red";
      }
      hasilKal.push({
        id: i + 1,
        jenis: result[i].jenis,
        count: result[i].count,
        kalkulasi: sapiKal,
        warna: warna,
      });
    }
    setKalJmlSapi(hasilKal);
  };

  useEffect(() => {
    if (layoutConfig.colorScheme === 'light') {
      applyLightTheme();
    } else {
      applyDarkTheme();
    }
  }, [layoutConfig.colorScheme]);

  const formatCurrency = (value) => {
    return value.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' });
  };

  // KETIKA TRIGGER MENGHIDE DIALOG
  const onCloseDialog = () => {
    const getTile = document.querySelector('#title').value;
    let newId = 0;
    for (let i = 0; i < infoData.length; i++) {
      if (infoData[i].id == infoData.length) {
        newId = infoData.length + 1;
      }
    }
    infoData.push({
      id: newId,
      info: getTile,
      date: dates,
    });
    setInfoData(infoData);
    setDialogPlusNotif(false);
    toast.current.show({ severity: 'success', summary: 'Berhasil', detail: 'Menambahkan Informasi Baru', life: 3000 });
  };
  const basicDialogFooter = <Button type="button" label="Tambah" onClick={onCloseDialog} icon="pi pi-check" className="p-button-secondary" />;

  // KETIKA TRIGGER MENGHIDE DIALOG
  const onCloseMinusDialog = () => {
    setDialogMinusNotif(false);
  };
  const dialogMinusFooter = <Button type="button" label="Cancel" onClick={onCloseMinusDialog} icon="" className="p-button-secondary" />;

  const actionBodyTable = (rowData) => {
    return (
      <React.Fragment>
        <Button type="button" icon="pi pi-trash" className="p-button-danger" label="Hapus" onClick={() => hapusInformasi(rowData.id)} />
      </React.Fragment>
    )
  };

  const hapusInformasi = (id) => {
    let idRemove = 0;
    for (let i = 0; i < infoData.length; i++) {
      if (infoData[i].id == id) {
        idRemove = i;
      }
    }
    if (idRemove > -1) {
      infoData.splice(idRemove, 1);
    }
    setInfoData(infoData);
    onCloseMinusDialog();
    toast.current.show({ severity: 'success', summary: 'Berhasil', detail: 'Berhasil Menghapus Informasi', life: 3000 });
  };

  return (
    <div className="grid">
      <div className="col-12">
        <div className="card">
          <p className="text-base text-500">
            <FcDataProtection /> Selamat Datang Admin CMS Abah Farm{' '}
          </p>
          <p className="font-medium text-xl">Hamzah</p>
        </div>
      </div>
      {/* CARD TOTAL JUMLAH INVESTOR */}
      <div className="col-12 lg:col-6 xl:col-3">
        <div className="card mb-0">
          <div className="flex justify-content-between mb-3">
            <div>
              <span className="block text-500 font-medium mb-3">Jumlah Investors</span>
              <div className="text-900 font-medium text-xl">3+</div>
            </div>
            <div className="flex align-items-center justify-content-center bg-blue-100 border-round" style={{ width: '2.5rem', height: '2.5rem' }}>
              <i className="text-blue-500 text-xl">
                <FaUsers />
              </i>
            </div>
          </div>
          {/* <span className="text-green-500 font-medium">24 new </span> */}
          <div className="text-right">
            <span className=" text-500">Orang Investor & Pemodal</span>
          </div>
        </div>
      </div>
      {/* CARD JUMLAH SAPI QURBAN */}
      <div className="col-12 lg:col-6 xl:col-3">
        <div className="card mb-0">
          <div className="flex justify-content-between mb-3">
            <div>
              <span className="block text-500 font-medium mb-3">Sapi Qurban</span>
              <div className="text-900 font-medium text-xl">28</div>
            </div>
            <div className="flex align-items-center justify-content-center bg-gray-100 border-round" style={{ width: '2.5rem', height: '2.5rem' }}>
              <i className="text-gray-500 text-2xl">
                <GiCow />
              </i>
            </div>
          </div>
          <div className="text-right">
            <span className=" text-500">Ekor Jumlah Sapi</span>
          </div>
        </div>
      </div>
      {/* CARD JUMLAH SAPI POTONG */}
      <div className="col-12 lg:col-6 xl:col-3">
        <div className="card mb-0">
          <div className="flex justify-content-between mb-3">
            <div>
              <span className="block text-500 font-medium mb-3">Sapi Potong</span>
              <div className="text-900 font-medium text-xl">15</div>
            </div>
            <div className="flex align-items-center justify-content-center bg-cyan-100 border-round" style={{ width: '2.5rem', height: '2.5rem' }}>
              <i className="text-cyan-500 text-2xl">
                <GiCow />
              </i>
            </div>
          </div>
          <div className="text-right">
            <span className=" text-500">Ekor Jumlah Sapi</span>
          </div>
        </div>
      </div>
      {/* CARD JUMLAH SAPI TERNAK */}
      <div className="col-12 lg:col-6 xl:col-3">
        <div className="card mb-0">
          <div className="flex justify-content-between mb-3">
            <div>
              <span className="block text-500 font-medium mb-3">Sapi Ternak</span>
              <div className="text-900 font-medium text-xl">1</div>
            </div>
            <div className="flex align-items-center justify-content-center bg-purple-100 border-round" style={{ width: '2.5rem', height: '2.5rem' }}>
              <i className="text-purple-500 text-2xl">
                <GiCow />
              </i>
            </div>
          </div>
          <div className="text-right">
            <span className=" text-500">Ekor Jumlah Sapi</span>
          </div>
        </div>
      </div>
      {/* CARD TOTAL MODAL YANG ADA */}
      <div className="col-12 lg:col-6 xl:col-3">
        <div className="card mb-0">
          <div className="flex justify-content-between mb-3">
            <div>
              <span className="block text-500 font-medium mb-3">Modal</span>
              <div className="text-900 font-medium text-xl">{formatCurrency(60000000)}</div>
            </div>
            <div className="flex align-items-center justify-content-center bg-green-100 border-round" style={{ width: '2.5rem', height: '2.5rem' }}>
              <i className="text-green-500 text-2xl">
                <GiMoneyStack />
              </i>
            </div>
          </div>
          <div className="text-right">
            <span className=" text-500">Total Modal Tertanam</span>
          </div>
        </div>
      </div>
      {/* CARD TOTAL PENGELUARAN YANG ADA */}
      <div className="col-12 lg:col-6 xl:col-3">
        <div className="card mb-0">
          <div className="flex justify-content-between mb-3">
            <div>
              <span className="block text-500 font-medium mb-3">Pengeluaran</span>
              <div className="text-900 font-medium text-xl">{formatCurrency(5000000)}</div>
            </div>
            <div className="flex align-items-center justify-content-center bg-red-100 border-round" style={{ width: '2.5rem', height: '2.5rem' }}>
              <i className="text-red-500 text-2xl">
                <GiPayMoney />
              </i>
            </div>
          </div>
          <div className="text-right">
            <span className=" text-500">Total Pengeluaran</span>
          </div>
        </div>
      </div>
      {/* CARD TOTAL ADMIN */}
      <div className="col-12 lg:col-6 xl:col-3">
        <div className="card mb-0">
          <div className="flex justify-content-between mb-3">
            <div>
              <span className="block text-500 font-medium mb-3">Admin</span>
              <div className="text-900 font-medium text-xl">3+</div>
            </div>
            <div className="flex align-items-center justify-content-center bg-orange-100 border-round" style={{ width: '2.5rem', height: '2.5rem' }}>
              <i className="text-orange-500 text-xl">
                <GrUserAdmin />
              </i>
            </div>
          </div>
          <div className="text-right">
            <span className=" text-500">Orang Admin</span>
          </div>
        </div>
      </div>
      {/* CARD TOTAL ASET */}
      <div className="col-12 lg:col-6 xl:col-3">
        <div className="card mb-0">
          <div className="flex justify-content-between mb-3">
            <div>
              <span className="block text-500 font-medium mb-3">Asset</span>
              <div className="text-900 font-medium text-xl">10+</div>
            </div>
            <div className="flex align-items-center justify-content-center bg-yellow-100 border-round" style={{ width: '2.5rem', height: '2.5rem' }}>
              <i className="text-yellow-500 text-xl">
                <GiCardboardBox />
              </i>
            </div>
          </div>
          <div className="text-right">
            <span className=" text-500">Jumlah Assets Yang Dimiliki</span>
          </div>
        </div>
      </div>

      <div className="col-12 xl:col-6">
        {/* CARD UNTUK INFORMASI INFORMASI TERBARU */}
        <div className="card">
          <div className="flex align-items-center justify-content-between mb-4">
            <h5>Informasi</h5>
            <div>
              <Toast ref={toast} />
              <Button type="button" icon="pi pi-ellipsis-v" className="p-button-rounded p-button-text p-button-plain" onClick={(event) => menu2.current.toggle(event)} />
              <Menu
                ref={menu2}
                popup
                model={[
                  { label: 'Tambah Baru', icon: 'pi pi-fw pi-plus', command: (e) => { setDialogPlusNotif(true) } },
                  { label: 'Hapus Notif', icon: 'pi pi-fw pi-minus', command: (e) => { setDialogMinusNotif(true) } }
                ]}
              />
              {/* DIALOG INFORMASI UNTUK TAMBAH INFORMASI BARU */}
              <Dialog header="Informasi Baru" visible={DialogPlusNotif} style={{ width: '30vw' }} modal footer={basicDialogFooter} onHide={() => setDialogPlusNotif(false)}>
                <div className="card p-fluid">
                  <div className="field grid">
                    <label htmlFor="title" className="col-12 mb-2 md:col-2 md:mb-0">
                      Isi Info
                    </label>
                    <div className="col-12 md:col-10">
                      <InputText id="title" type="text" />
                    </div>
                  </div>
                </div>
              </Dialog>
              {/* DIALOG INFORMASI UNTUK MENGAHPUS INFORMASIS */}
              <Dialog header="Hapus Informasi" visible={DialogMinusNotif} style={{ width: '50vw' }} modal footer={dialogMinusFooter} onHide={() => setDialogMinusNotif(false)}>
                <div className="col-12">
                  {/* <div className="card"> */}
                  <DataTable
                    value={infoData}
                    groupRowsBy="representative.name"
                    sortMode="single"
                    sortField="representative.name"
                    sortOrder={1}
                    scrollable
                    scrollHeight="400px"
                    responsiveLayout="scroll"
                  >
                    <Column field="info" header="Informasi" style={{ minWidth: '200px' }}></Column>
                    <Column field="date" header="Date" style={{ minWidth: '200px' }}></Column>
                    <Column header="Action" body={actionBodyTable} style={{ minWidth: '100px' }}></Column>
                  </DataTable>
                  {/* </div> */}
                </div>
              </Dialog>
            </div>

          </div>
          {infoData.length > 0 ? infoData.sort((a, b) => a.date > b.date ? 1 : -1).map((data) => (
            <div key={data.id}>
              <Informasi info={data.info} date={data.date} />
            </div>
          )) : <span className="block text-500 font-medium mb-3 text-center">Data Informasi Tidak Ditemukan!</span>}
        </div>
      </div>

      <div className="col-12 xl:col-6">
        {/* CARD JENIS SAPI BANYAK TERJUAL */}
        <div className="card">
          <div className="flex justify-content-between align-items-center mb-5">
            <h5>Jenis Sapi Banyak Terjual</h5>
          </div>
          <ul className="list-none p-0 m-0">
            {kalJmlSapi.map((sapi) => (
              <li key={sapi.id} className="flex flex-column md:flex-row md:align-items-center md:justify-content-between mb-4">
                <div>
                  <span className="text-900 font-medium mr-2 mb-1 md:mb-0">SAPI {sapi.jenis.toUpperCase()}</span>
                  <div className="mt-1 text-600">Terjual {sapi.count} Sapi</div>
                </div>
                <div className="mt-2 md:mt-0 flex align-items-center">
                  <div className="surface-300 border-round overflow-hidden w-10rem lg:w-6rem" style={{ height: '8px' }}>
                    <div className={"bg-" + `${sapi.warna}` + "-500 h-full"} style={{ width: `${sapi.kalkulasi}px` }} />
                  </div>
                  <span className="text-orange-500 ml-3 font-medium">{sapi.kalkulasi} %</span>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* <div
                    className="px-4 py-5 shadow-2 flex flex-column md:flex-row md:align-items-center justify-content-between mb-3"
                    style={{ borderRadius: '1rem', background: 'linear-gradient(0deg, rgba(0, 123, 255, 0.5), rgba(0, 123, 255, 0.5)), linear-gradient(92.54deg, #1C80CF 47.88%, #FFFFFF 100.01%)' }}
                >
                    <div>
                        <div className="text-blue-100 font-medium text-xl mt-2 mb-3">TAKE THE NEXT STEP</div>
                        <div className="text-white font-medium text-5xl">Try PrimeBlocks</div>
                    </div>
                    <div className="mt-4 mr-auto md:mt-0 md:mr-0">
                        <Link href="https://www.primefaces.org/primeblocks-react">
                            <a className="p-button font-bold px-5 py-3 p-button-warning p-button-rounded p-button-raised">Get Started</a>
                        </Link>
                    </div>
                </div> */}
      </div>
    </div>
  );
};

export default Homes;
