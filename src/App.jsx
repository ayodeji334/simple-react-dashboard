import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { createColumnHelper } from '@tanstack/react-table';
import DataTable from './components/DataTable';
import SideNav from './components/SideNav';
import Navbar from './components/Navbar';

function App() {
  const columnHelper = createColumnHelper();
  const [data, setData] = useState([
    {
      ref: "1",
      session: "2022",
      application_type: "success",
      status: "success",
      application_id: "202/343434"
    }
  ]);

  // the columns header title
  const tableColumnsHeader = [
    columnHelper.accessor("ref", {
      cell: (info) => {
        return info.getValue()
      },
      header: "S/N"
    }),
    columnHelper.accessor("session", {
      cell: (info) => {
        return info.getValue()
      },
      header: "session"
    }),
    columnHelper.accessor("application_id", {
      cell: (info) => {
        return info.getValue()
      },
      header: "form number"
    }),
    columnHelper.accessor("application_type", {
      cell: (info) => {
        return info.getValue()
      },
      header: "Type"
    }),
    columnHelper.accessor("status", {
      cell: (info) => {
        return info.getValue()
      },
      header: "status"
    }),
    columnHelper.accessor("reg_date", {
      cell: (info) => {
        return info.getValue()
      },
      header: "created on"
    }),
    columnHelper.display({
      id: "actions",
      header: "Actions",
      cell: (info) => {
        return <button type='button' className='bg-red-600 rounded-xl text-white'>delete</button>
      }
    })
  ]

  // useEffect(() => {
  //   let subscribe = true;
  //   let url = ""

  //   const fetchData = () => {
  //     if (subscribe) {
  //       fetch(url).then(res => {
  //         if (res.ok) {
  //           setData(res.json())
  //         }
  //       })
  //     }
  //   }

  //   fetchData()

  //   return () => { subscribe = false }
  // }, [])


  return (
    <>
      <div className='w-full'>
        <div className='h-full w-full relative'>
          <Navbar />
          <div className='w-full relative'>
            <SideNav />
            <div className='ml-52 flex-1 pt-20 px-4'>
              <div className="mx-9 border-2 rounded-2xl">
                <div className='px-3 border-b-2 py-2'>
                  <h1 className='text-lg font-extrabold'>Table Title</h1>
                </div>
                <div className='px-3'>
                  <DataTable columns={tableColumnsHeader} data={data} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
