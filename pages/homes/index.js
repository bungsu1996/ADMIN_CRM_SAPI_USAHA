import getConfig from 'next/config';
import { Button } from 'primereact/button';
import { Chart } from 'primereact/chart';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Menu } from 'primereact/menu';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { ProductService } from '../../demo/service/ProductService';
import { LayoutContext } from '../../layout/context/layoutcontext';
import Link from 'next/link';
import { FaUsers } from 'react-icons/fa';
import { FcDataProtection } from 'react-icons/fc';
import { GiCow, GiMoneyStack, GiPayMoney, GiCardboardBox } from 'react-icons/gi';
import { GrUserAdmin } from 'react-icons/gr';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { CustomerService } from '../../demo/service/CustomerService';

const lineData = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  datasets: [
    {
      label: 'First Dataset',
      data: [65, 59, 80, 81, 56, 55, 40],
      fill: false,
      backgroundColor: '#2f4860',
      borderColor: '#2f4860',
      tension: 0.4
    },
    {
      label: 'Second Dataset',
      data: [28, 48, 40, 19, 86, 27, 90],
      fill: false,
      backgroundColor: '#00bb7e',
      borderColor: '#00bb7e',
      tension: 0.4
    }
  ]
};

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
  }, []);

  const headerTemplate = (data) => {
    return (
      <React.Fragment>
        <img alt={data.representative.name} src={`${contextPath}/demo/images/avatar/${data.representative.image}`} width="32" style={{ verticalAlign: 'middle' }} />
        <span className="font-bold ml-2">{data.representative.name}</span>
      </React.Fragment>
    );
  };

  const footerTemplate = (data) => {
    console.log(data.representative, "data.respresentative")
    return (
      <React.Fragment>
        <td colSpan="4" style={{ textAlign: 'right' }} className="text-bold pr-6">
          Total Customers
        </td>
        <td>{calculateCustomerTotal(data.representative.name)}</td>
      </React.Fragment>
    );
  };

  const calculateCustomerTotal = (name) => {
    let total = 0;
    if (customers3) {
      for (let customer of customers3) {
        if (customer.representative.name === name) {
          total++;
        }
      }
    }
    return total;
  };

  const countryBodyTemplate = (rowData) => {
    console.log(rowData.country, "rowData.country.code")
    return (
      <React.Fragment>
        <img alt="flag" src={`${contextPath}/demo/images/flag/flag_placeholder.png`} className={`flag flag-${rowData.country.code}`} width={30} />
        <span style={{ marginLeft: '.5em', verticalAlign: 'middle' }}>{rowData.country.name}</span>
      </React.Fragment>
    );
  };

  const statusBodyTemplate = (rowData) => {
    return <span className={`customer-badge status-${rowData.status}`}>{rowData.status}</span>;
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
    const getSubject = document.querySelector('#subject').value;
    console.log(getTile, getSubject);
    setDialogPlusNotif(false);
  };
  const basicDialogFooter = <Button type="button" label="Tambah" onClick={onCloseDialog} icon="pi pi-check" className="p-button-secondary" />;

  // KETIKA TRIGGER MENGHIDE DIALOG
  const onCloseMinusDialog = () => {
    console.log("Berhasil Menghapus")
    setDialogMinusNotif(false);
  };
  const dialogMinusFooter = <Button type="button" label="Hapus" onClick={onCloseMinusDialog} icon="pi pi-check" className="p-button-secondary" />;

  return (
    <div className="grid">
      <div className="col-12">
        <div className="card">
          <p className="text-base text-500">
            <FcDataProtection /> Selamat Datang Admin CRM Abah Farm{' '}
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
        {/* CARD UNTUK NOTIFIKASI INFORMASI TERBARU */}
        <div className="card">
          <div className="flex align-items-center justify-content-between mb-4">
            <h5>Notif Informasi</h5>
            <div>
              {/* BUTTON DAN DIALOG INFORMASI UNTUK TAMBAH NOTIFIKASI BARU */}
              <Button type="button" icon="pi pi-plus" className="p-button-rounded p-button-outlined mr-2" onClick={() => setDialogPlusNotif(true)} />
              <Dialog header="Notifikasi Baru" visible={DialogPlusNotif} style={{ width: '30vw' }} modal footer={basicDialogFooter} onHide={() => setDialogPlusNotif(false)}>
                <div className="card p-fluid">
                  <div className="field grid">
                    <label htmlFor="title" className="col-12 mb-2 md:col-2 md:mb-0">
                      Judul
                    </label>
                    <div className="col-12 md:col-10">
                      <InputText id="title" type="text" />
                    </div>
                  </div>
                  <div className="field grid">
                    <label htmlFor="subject" className="col-12 mb-2 md:col-2 md:mb-0">
                      Isi Notif
                    </label>
                    <div className="col-12 md:col-10">
                      <InputText id="subject" type="text" />
                    </div>
                  </div>
                </div>
              </Dialog>
              {/* BUTTON DAN DIALOG INFORMASI UNTUK MENGAHPUS NOTIFIKASIS */}
              <Button type="button" icon="pi pi-minus" className="p-button-rounded p-button-secondary p-button-outlined" onClick={() => setDialogMinusNotif(true)} />
              <Dialog header="Notifikasi Baru" visible={DialogMinusNotif} style={{ width: '30vw' }} modal footer={dialogMinusFooter} onHide={() => setDialogMinusNotif(false)}>
                <div className="col-12">
                  {/* <div className="card"> */}
                    <DataTable
                      value={customers3}
                      rowGroupMode="subheader"
                      groupRowsBy="representative.name"
                      sortMode="single"
                      sortField="representative.name"
                      sortOrder={1}
                      scrollable
                      scrollHeight="400px"
                      rowGroupHeaderTemplate={headerTemplate}
                      rowGroupFooterTemplate={footerTemplate}
                      responsiveLayout="scroll"
                    >
                      <Column field="name" header="Name" style={{ minWidth: '200px' }}></Column>
                      <Column field="country" header="Country" body={countryBodyTemplate} style={{ minWidth: '200px' }}></Column>
                      <Column field="company" header="Company" style={{ minWidth: '200px' }}></Column>
                      <Column field="status" header="Status" body={statusBodyTemplate} style={{ minWidth: '200px' }}></Column>
                      <Column field="date" header="Date" style={{ minWidth: '200px' }}></Column>
                    </DataTable>
                  {/* </div> */}
                </div>
              </Dialog>
            </div>

          </div>

          <span className="block text-600 font-medium mb-3">TODAY</span>
          <ul className="p-0 mx-0 mt-0 mb-4 list-none">
            <li className="flex align-items-center py-2 border-bottom-1 surface-border">
              <div className="w-3rem h-3rem flex align-items-center justify-content-center bg-blue-100 border-circle mr-3 flex-shrink-0">
                <i className="pi pi-dollar text-xl text-blue-500" />
              </div>
              <span className="text-900 line-height-3">
                Richard Jones
                <span className="text-700">
                  {' '}
                  has purchased a blue t-shirt for <span className="text-blue-500">79$</span>
                </span>
              </span>
            </li>
            <li className="flex align-items-center py-2">
              <div className="w-3rem h-3rem flex align-items-center justify-content-center bg-orange-100 border-circle mr-3 flex-shrink-0">
                <i className="pi pi-download text-xl text-orange-500" />
              </div>
              <span className="text-700 line-height-3">
                Your request for withdrawal of <span className="text-blue-500 font-medium">2500$</span> has been initiated.
              </span>
            </li>
          </ul>

          <span className="block text-600 font-medium mb-3">YESTERDAY</span>
          <ul className="p-0 m-0 list-none">
            <li className="flex align-items-center py-2 border-bottom-1 surface-border">
              <div className="w-3rem h-3rem flex align-items-center justify-content-center bg-blue-100 border-circle mr-3 flex-shrink-0">
                <i className="pi pi-dollar text-xl text-blue-500" />
              </div>
              <span className="text-900 line-height-3">
                Keyser Wick
                <span className="text-700">
                  {' '}
                  has purchased a black jacket for <span className="text-blue-500">59$</span>
                </span>
              </span>
            </li>
            <li className="flex align-items-center py-2 border-bottom-1 surface-border">
              <div className="w-3rem h-3rem flex align-items-center justify-content-center bg-pink-100 border-circle mr-3 flex-shrink-0">
                <i className="pi pi-question text-xl text-pink-500" />
              </div>
              <span className="text-900 line-height-3">
                Jane Davis
                <span className="text-700"> has posted a new questions about your product.</span>
              </span>
            </li>
          </ul>
        </div>
      </div>

      <div className="col-12 xl:col-6">
        {/* CARD JENIS SAPI BANYAK TERJUAL */}
        <div className="card">
          <div className="flex justify-content-between align-items-center mb-5">
            <h5>Jenis Sapi Banyak Terjual</h5>
            <div>
              <Button type="button" icon="pi pi-ellipsis-v" className="p-button-rounded p-button-text p-button-plain" onClick={(event) => menu1.current.toggle(event)} />
              <Menu
                ref={menu1}
                popup
                model={[
                  { label: 'Add New', icon: 'pi pi-fw pi-plus' },
                  { label: 'Remove', icon: 'pi pi-fw pi-minus' }
                ]}
              />
            </div>
          </div>
          <ul className="list-none p-0 m-0">
            <li className="flex flex-column md:flex-row md:align-items-center md:justify-content-between mb-4">
              <div>
                <span className="text-900 font-medium mr-2 mb-1 md:mb-0">Space T-Shirt</span>
                <div className="mt-1 text-600">Clothing</div>
              </div>
              <div className="mt-2 md:mt-0 flex align-items-center">
                <div className="surface-300 border-round overflow-hidden w-10rem lg:w-6rem" style={{ height: '8px' }}>
                  <div className="bg-orange-500 h-full" style={{ width: '50%' }} />
                </div>
                <span className="text-orange-500 ml-3 font-medium">%50</span>
              </div>
            </li>
            <li className="flex flex-column md:flex-row md:align-items-center md:justify-content-between mb-4">
              <div>
                <span className="text-900 font-medium mr-2 mb-1 md:mb-0">Portal Sticker</span>
                <div className="mt-1 text-600">Accessories</div>
              </div>
              <div className="mt-2 md:mt-0 ml-0 md:ml-8 flex align-items-center">
                <div className="surface-300 border-round overflow-hidden w-10rem lg:w-6rem" style={{ height: '8px' }}>
                  <div className="bg-cyan-500 h-full" style={{ width: '16%' }} />
                </div>
                <span className="text-cyan-500 ml-3 font-medium">%16</span>
              </div>
            </li>
            <li className="flex flex-column md:flex-row md:align-items-center md:justify-content-between mb-4">
              <div>
                <span className="text-900 font-medium mr-2 mb-1 md:mb-0">Supernova Sticker</span>
                <div className="mt-1 text-600">Accessories</div>
              </div>
              <div className="mt-2 md:mt-0 ml-0 md:ml-8 flex align-items-center">
                <div className="surface-300 border-round overflow-hidden w-10rem lg:w-6rem" style={{ height: '8px' }}>
                  <div className="bg-pink-500 h-full" style={{ width: '67%' }} />
                </div>
                <span className="text-pink-500 ml-3 font-medium">%67</span>
              </div>
            </li>
            <li className="flex flex-column md:flex-row md:align-items-center md:justify-content-between mb-4">
              <div>
                <span className="text-900 font-medium mr-2 mb-1 md:mb-0">Wonders Notebook</span>
                <div className="mt-1 text-600">Office</div>
              </div>
              <div className="mt-2 md:mt-0 ml-0 md:ml-8 flex align-items-center">
                <div className="surface-300 border-round overflow-hidden w-10rem lg:w-6rem" style={{ height: '8px' }}>
                  <div className="bg-green-500 h-full" style={{ width: '35%' }} />
                </div>
                <span className="text-green-500 ml-3 font-medium">%35</span>
              </div>
            </li>
            <li className="flex flex-column md:flex-row md:align-items-center md:justify-content-between mb-4">
              <div>
                <span className="text-900 font-medium mr-2 mb-1 md:mb-0">Mat Black Case</span>
                <div className="mt-1 text-600">Accessories</div>
              </div>
              <div className="mt-2 md:mt-0 ml-0 md:ml-8 flex align-items-center">
                <div className="surface-300 border-round overflow-hidden w-10rem lg:w-6rem" style={{ height: '8px' }}>
                  <div className="bg-purple-500 h-full" style={{ width: '75%' }} />
                </div>
                <span className="text-purple-500 ml-3 font-medium">%75</span>
              </div>
            </li>
            <li className="flex flex-column md:flex-row md:align-items-center md:justify-content-between mb-4">
              <div>
                <span className="text-900 font-medium mr-2 mb-1 md:mb-0">Robots T-Shirt</span>
                <div className="mt-1 text-600">Clothing</div>
              </div>
              <div className="mt-2 md:mt-0 ml-0 md:ml-8 flex align-items-center">
                <div className="surface-300 border-round overflow-hidden w-10rem lg:w-6rem" style={{ height: '8px' }}>
                  <div className="bg-teal-500 h-full" style={{ width: '40%' }} />
                </div>
                <span className="text-teal-500 ml-3 font-medium">%40</span>
              </div>
            </li>
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
